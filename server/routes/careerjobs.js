const express = require("express");
const { validationResult, query } = require("express-validator");
const CareerJob = require("../models/CareerJobs");
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

      if (category) filter.category = category;
      //   if (state) filter.state = { $regex: location, $options: "i" };
      if (search) filter.title = { $regex: search, $options: "i" };

      const sortObj = {};
      sortObj[sort] = order === "desc" ? -1 : 1;

      const skip = (page - 1) * limit;

      const jobs = await CareerJob.find(filter)
        .sort(sortObj)
        .skip(skip)
        .limit(parseInt(limit));

      const total = await CareerJob.countDocuments(filter);

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

router.put('/apply/:id', async(req, res, next) => {
    try{
        const job = await CareerJob.findByIdAndUpdate(
            req.params.id,
            { $push: { enteries: req.body } },
            { new: true, runValidators: true }
        );
        if(!job){
            return res.status(400).json({
                success: false,
                message: 'Job not found'
            })
        }
        return res.status(200).json({
            success: true,
            message: 'Application submitted successfully'
        })
    }catch(error){
        next(error);
    }
})

router.post("/", auth, authorize("admin"), async (req, res) => {
  try {
    const jobData = {
      ...req.body,
    };

    const job = new CareerJob(jobData);
    await job.save();

    const populatedJob = await CareerJob.findById(job._id);

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

    const job = await CareerJob.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    const updatedJob = await CareerJob.findByIdAndUpdate(
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
    const job = await CareerJob.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    // Check if user owns the job or is admin

    await CareerJob.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Delete job error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
