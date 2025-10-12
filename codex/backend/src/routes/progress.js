const express = require('express');
const router = express.Router();
const Progress = require('../models/progress');
const auth = require('../middleware/auth');

// Ambil progress user
router.get('/', auth, async (req, res) => {
  const { id } = req.user;
  const progress = await Progress.findOne({ where: { userId: id } });
  res.json(progress ? progress.modules : {});
});

// Update/tambah progress user dengan error handling
router.post('/', auth, async (req, res) => {
  try {
    const { id } = req.user;
    const { modules } = req.body; // { pyIfElse: true, ... }
    let progress = await Progress.findOne({ where: { userId: id } });

    if (!progress) {
      progress = await Progress.create({ userId: id, modules });
    } else {
      progress.modules = { ...progress.modules, ...modules };
      await progress.save();
    }
    res.json(progress.modules);
  } catch (err) {
    console.error("Progress update error:", err);
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
});

module.exports = router;