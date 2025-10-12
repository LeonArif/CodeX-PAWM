const express = require('express');
const router = express.Router();
const { createProgress, getProgressByUserId } = require('../models/progress');
const supabase = require('../config/db');
const auth = require('../middleware/auth');

// GET: Ambil progress user
router.get('/', auth, async (req, res) => {
  const { id } = req.user;
  const progress = await getProgressByUserId(id);
  console.log("progress GET:", JSON.stringify(progress, null, 2));
  res.json(progress ? progress.modules : {});
});

// POST: Update/tambah progress user
router.post('/', auth, async (req, res) => {
  try {
    const { id } = req.user;
    const { modules } = req.body;
    let progress = await getProgressByUserId(id);

    if (!progress) {
      // Insert baru
      progress = await createProgress({ userid: id, modules });
      if (!progress) throw new Error("Insert failed");
    } else {
      // Update modules
      const newModules = { ...progress.modules, ...modules };
      const { data, error } = await supabase
        .from('progress')
        .update({ modules: newModules })
        .eq('id', progress.id)
        .select()
        .single();
      if (error) throw error;
      progress = data;
    }
    res.json(progress.modules);
  } catch (err) {
    console.error("Progress update error:", err);
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
});

module.exports = router;