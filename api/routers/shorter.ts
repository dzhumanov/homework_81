import { Router } from "express";
import Shorter from "../models/Shorter";
import { linkModel } from "../types";
import crypto from "crypto";

const shorterRouter = Router();

shorterRouter.get("/", async (req, res) => {
  try {
    const results = await Shorter.find();
    res.send(results);
  } catch (e) {
    console.error(e);
  }
});

shorterRouter.get("/:shortUrl", async (req, res) => {
  try {
    const product = await Shorter.findOne({ shortUrl: req.params.shortUrl });
    if (product) {
      res.status(301).redirect(product.originalUrl);
    } else {
      res.status(404).send("Short URL not found");
    }
  } catch (e) {
    console.error(e);
  }
});

shorterRouter.post("/links", async (req, res, next) => {
  try {
    const linkData: linkModel = {
      originalUrl: req.body.url,
      shortUrl: crypto.randomBytes(3).toString("hex"),
    };

    const link = new Shorter(linkData);
    await link.save();
    res.send(link);
  } catch (e) {
    return next(e);
  }
});

export default shorterRouter;
