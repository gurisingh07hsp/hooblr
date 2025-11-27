const express = require("express");
const { validationResult, query } = require("express-validator");
const GovtJob = require("../models/GovtJobs");
const { auth, authorize} = require("../middleware/auth");

const router = express.Router();

router.get(
  "/",
  [
    query("page").optional().isInt({ min: 1 }),
    query("limit").optional().isInt({ min: 1, max: 50 }),
    query("category").optional().isString(),
    query("state").optional().isString(),
    query("search").optional().isString(),
    query("salary").optional().isString(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const {
        page = 1,
        limit = 20,
        category,
        search,
        state,
        sort = "createdAt",
        order = "desc",
        salary,
      } = req.query;

      const filter = {};

      if (category && category != undefined){
        filter.category = category;
      } 
      //   if (state) filter.state = { $regex: location, $options: "i" };
      if (search) filter.title = { $regex: search, $options: "i" };

      if (state && state !== "All India") {
        filter["state"] = state ? state : {};
      }

      // Salary filter
      if (salary) {
        filter["salary"] = salary ? { $gte: salary } : {};
      }

      const sortObj = {};
      sortObj[sort] = order === "desc" ? -1 : 1;

      const skip = (page - 1) * limit;

      const jobs = await GovtJob.find(filter)
        .sort(sortObj)
        .skip(skip)
        .limit(parseInt(limit));

      const total = await GovtJob.countDocuments(filter);

      res.json({
        jobs,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      console.error("Get jobs error:", error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

router.get("/:title", async (req, res) => {
  try {
    const title = req.params.title;
    const job = await GovtJob.findOne({ title });

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.json({ job });
  } catch (error) {
    console.error("Get job error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/", auth, authorize("admin"), async (req, res) => {
  try {
    const jobData = {
      ...req.body,
    };

    const job = new GovtJob(jobData);
    await job.save();

    const populatedJob = await GovtJob.findById(job._id);

    res.status(200).json({
      message: "Job created successfully",
      job: populatedJob,
    });
  } catch (error) {
    console.error("Create job error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.put("/:id", auth, authorize("admin"), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const job = await GovtJob.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    const updatedJob = await GovtJob.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({
      message: "Job updated successfully",
      job: updatedJob,
    });
  } catch (error) {
    console.error("Update job error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.delete("/:id", auth, authorize("admin"), async (req, res) => {
  try {
    const job = await GovtJob.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    // Check if user owns the job or is admin

    await GovtJob.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Delete job error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
