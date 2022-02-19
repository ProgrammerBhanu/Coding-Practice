const City = require('../models/city.model');

const express = require('express');

const router = express.Router();

router.get("/",async(req,res)=>{
    try {
        const page = +req.query.page || 1;
        const size = +req.query.size || 4;

        const offset = (page - 1) * size;

        const city= await City.find().skip(offset).limit(size).lean(size).catch();

        const totalPage = Math.ceil(
            (await City.find().countDocuments()) / size
        );

        return res.send({ city, totalPage });
    } catch (e) {
        return res.status(500).json({ status: "failed", message: e.message });
    }
});

router.post("/", async(req, res) => {
    try {
        // const user = req.user;

        const city = await City.create(req.body);

        return res.status(201).json({ city });
    } catch (e) {
        return res.status(500).json({ status: "failed", message: e.message });
    }
});


// Sorting
router.get("/sort=:sort",async(req,res)=>{
    try {
        const population = req.params.sort;
        let sortPopulation =
        population == "asc" ? 1 : population == "desc" ? -1 : 0;
        const page = +req.query.page || 1;
        const size = +req.query.size || 4;

        const offset = (page - 1) * size;

        const city= await City.find().skip(offset).limit(size).lean(size).sort({'population':sortPopulation}).catch();

        const totalPage = Math.ceil(
            (await City.find().countDocuments()) / size
        );

        return res.send({ city, totalPage });
    } catch (e) {
        return res.status(500).json({ status: "failed", message: e.message });
    }
});

// Filters :- citytype (town, metro & village)

router.get("/:filter",async(req,res)=>{
    try {
        const cityType = req.params.filter;
        
        const page = +req.query.page || 1;
        const size = +req.query.size || 4;

        const offset = (page - 1) * size;

        const city= await City.find({cityType: { $regex: cityType },}).skip(offset).limit(size).lean(size).catch();

        const totalPage = Math.ceil(
            (await City.find().countDocuments()) / size
        );

        return res.send({ city, totalPage });
    } catch (e) {
        return res.status(500).json({ status: "failed", message: e.message });
    }
});
module.exports = router;
