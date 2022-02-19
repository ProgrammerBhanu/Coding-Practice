// ------Get and post all api's for Polling station-----

const express = require("express");

const router = express.Router();
const Station = require("../models/station.model");
router.get("/",async(req,res)=>{
    try {
      const city = req.params.city;

        const station= await Station.find().lean().exec();

        return res.send({ station});
    } catch (e) {
        return res.status(500).json({ status: "failed", message: e.message });
    }
});
router.get("/:city",async(req,res)=>{
    try {
      const city = req.params.city;

        const station= await Station.find({city: { $regex: city}}).lean().exec();

        return res.send({ station});
    } catch (e) {
        return res.status(500).json({ status: "failed", message: e.message });
    }
});

router.post("/", async(req, res) => {
    try {
        // const user = req.user;

        const station = await Station.create(req.body);

        return res.status(201).json({ station });
    } catch (e) {
        return res.status(500).json({ status: "failed", message: e.message });
    }
});

module.exports = router;
