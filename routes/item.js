import express from "express";
import Item from "../models/Items.js";

const router = express.Router();

router.get("/items", async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.put("/items", async (req, res) => {
  try {
    if (
      !req.body.name ||
      !req.body.price ||
      !req.body.category ||
      !req.body.stock
    ) {
      throw new Error("Missing data. Please fill all fields.");
    }
    const createdItem = await Item.create({
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      stock: req.body.stock,
    });
    res.status(200).json(createdItem);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.delete("/items", async (req, res) => {
  try {
    const deletedItem = await Item.deleteOne({
      _id: req.body._id,
    });
    res.status(200).json(deletedItem);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post("/items", async (req, res) => {
  try {
    const modifiedItem = await Item.updateOne(
      {
        _id: req.body._id,
      },
      { name: req.body.name }
    );
    res.status(200).json(modifiedItem);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default router;
