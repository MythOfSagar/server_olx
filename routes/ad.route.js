const { Router } = require("express");
const { AdModel } = require("../models/ad.model");
const adRouter = Router();

adRouter.post("/create", async (req, res) => {
  const adData = req.body;

  try {
    const newAd = new AdModel({ ...adData });

    await newAd.save();

    res.send("Product Successfully added for Sale");
  } catch (err) {
    res.send("Error Please Try Again");
  }
});

adRouter.get("/", async (req, res) => {
  const query = req.query;

  console.log(query);

  try {

    let page = 0;
    if (query.page) {
      page = (4)* (+(query.page)-1);
    }
    

    let AllAds = await AdModel.find().limit(4).skip(page);

    if (query.search) {
      AllAds = await AdModel.find({ name: query.search }).limit(4).skip(page);
    } else if (query.category && query.sort == "asc") {
      AllAds = await AdModel.find({ category: query.category })
        .sort({
          postedAt: 1,
        })
        .limit(4)
        .skip(page);
    } else if (query.category && query.sort == "desc") {
      AllAds = await AdModel.find({ category: query.category })
        .sort({
          postedAt: -1,
        })
        .limit(4)
        .skip(page);
    } else if (query.category) {
      AllAds = await AdModel.find({ category: query.category })
        .limit(4)
        .skip(page);
    } else if (query.sort == "asc") {
      AllAds = await AdModel.find()
        .sort({
          postedAt: 1,
        })
        .limit(4)
        .skip(page);
    } else if (query.sort == "desc") {
      AllAds = await AdModel.find()
        .sort({
          postedAt: -1,
        })
        .limit(4)
        .skip(page);
    }

    res.send(AllAds);

    res.send("Product Fetched Successfully ");
  } catch (err) {
    res.send("Error Please Try Again");
  }
});


adRouter.delete("/buy/:id", async (req, res) => {
    const {id}=req.params;

    console.log(id)
    try {

      await AdModel.findByIdAndDelete(id);
  
      res.send("Successfull Purchase");
    } catch (err) {
      res.send("Error Please Try Again");
    }
  });

module.exports = { adRouter };
