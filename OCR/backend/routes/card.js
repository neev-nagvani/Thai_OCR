const express = require("express");
const router = express.Router();
const Card = require("../models/card"); // Adjust the path based on your project structure

// Get all cards
router.get("/cards", async (req, res) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific card
router.get("/cards/:id", getCard, (req, res) => {
  res.json(res.card);
});

// Create a new card
router.post("/cards", async (req, res) => {
  const card = new Card({
    name: req.body.name,
    last_name: req.body.last_name,
    identification_number: req.body.identification_number,
    date_of_issue: req.body.date_of_issue,
    date_of_expiry: req.body.date_of_expiry,
    date_of_birth: req.body.date_of_birth,
    status: req.body.status,
  });

  try {
    const newCard = await card.save();
    res.status(201).json(newCard);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a card
router.post("/cards/:id", async (req, res) => {
  console.log(req.body)
  const card = await Card.findById(req.params.id)
  if (req.body.name != null) {
    card.name = req.body.name;
  }
  if (req.body.last_name != null) {
    card.last_name = req.body.last_name;
  }

  if (req.body.identification_number != null) {
    card.identification_number = req.body.identification_number;
  }
  if (req.body.date_of_birth != null) {
    card.date_of_birth = req.body.date_of_birth;
  }
  if (req.body.date_of_issue != null) {
    card.date_of_issue = req.body.date_of_issue;
  }

  if (req.body.date_of_expiry != null) {
    card.date_of_expiry = req.body.date_of_expiry;
  }
  // Add similar lines for other fields

  try {
    const updatedCard = await card.save();
    res.json(updatedCard);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a card
router.delete("/cards/:id",  async (req, res) => {
 
  try {
    const card = await Card.findById(req.params.id);
    console.log(card)
    await card.deleteOne();
    res.json({ message: "Card deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getCard(req, res, next) {
  try {
    const card = await Card.findById(req.params.id);
    if (card == null) {
      return res.status(404).json({ message: "Card not found" });
    }
    res.card = card;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = router;
