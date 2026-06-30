const express = require("express");
const { validationResult, query } = require("express-validator");
const ExamPost = require("../models/ExamPost");
const { auth, authorize} = require("../middleware/auth");

const router = express.Router();

router.get(
  "/",
  [
    query("page").optional().isInt({ min: 1 }),
    query("limit").optional().isInt({ min: 1, max: 50 }),
    query("state").optional().isString(),
    query("search").optional().isString(),
    // query("type")
    //   .optional()
    //   .isIn(["Admit Card", "Result"])
    //   .withMessage("Type must be either 'Admit Card' or 'Result'"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
        });
      }

      const {
        page = 1,
        limit,
        search,
        state,
        type,
        sort = "createdAt",
        order = "desc",
      } = req.query;

      // Build filter
      const filter = {};

      if (search) {
        filter.title = { $regex: search, $options: "i" };
      }

      if (state && state !== "All India") {
        filter.state = state;
      }

      if (type) {
        filter.type = type;
      }

      // Sorting
      const sortObj = {
        [sort]: order === "desc" ? -1 : 1,
      };

      // Create query
      let examQuery = ExamPost.find(filter).sort(sortObj);

      // Apply pagination only if limit is provided
      if (limit) {
        const pageNumber = Number(page);
        const limitNumber = Number(limit);
        const skip = (pageNumber - 1) * limitNumber;

        examQuery = examQuery.skip(skip).limit(limitNumber);
      }

      const exams = await examQuery;
      const total = await ExamPost.countDocuments(filter);

      const response = {
        exams,
      };

      // Send pagination only when limit is provided
      if (limit) {
        response.pagination = {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / Number(limit)),
        };
      } else {
        response.total = total;
      }

      return res.status(200).json(response);
    } catch (error) {
      console.error("Get exams error:", error);
      return res.status(500).json({
        error: "Server error",
      });
    }
  }
);

router.get("/:slug", async (req, res) => {
  try {
    const slug = req.params.slug;
    const exam = await ExamPost.findOne({ slug });

    if (!exam) {
      return res.status(404).json({ error: "Exam not found" });
    }

    res.json({ exam });
  } catch (error) {
    console.error("Get Exam error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/", auth, authorize("admin"), async (req, res) => {
  try {
    const examData = {
      ...req.body,
    };

    const exam = new ExamPost(examData);
    await exam.save();

    const populatedExam = await ExamPost.findById(exam._id);

    res.status(200).json({
      message: "Exam created successfully",
      job: populatedExam,
    });
  } catch (error) {
    console.error("Create Exam error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.put("/:id", auth, authorize("admin"), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const exam = await ExamPost.findById(req.params.id);

    if (!exam) {
      return res.status(404).json({ error: "Exam not found" });
    }

    const updatedExam = await ExamPost.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      message: "Exam updated successfully",
      job: updatedExam,
    });
  } catch (error) {
    console.error("Update exam error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.delete("/:id", auth, authorize("admin"), async (req, res) => {
  try {
    const exam = await ExamPost.findById(req.params.id);
    if (!exam) {
      return res.status(404).json({ error: "exam not found" });
    }

    // Check if user owns the job or is admin

    await ExamPost.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Exam deleted successfully" });
  } catch (error) {
    console.error("Delete exam error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
