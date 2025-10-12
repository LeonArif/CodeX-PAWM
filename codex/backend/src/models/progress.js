const supabase = require('../config/db');
const TABLE = 'progress';

// Fungsi untuk create progress
async function createProgress({ userid, modules }) {
  // Hanya insert jika belum ada row user tersebut
  const { data, error } = await supabase
    .from(TABLE)
    .insert([{ userid, modules }])
    .select()
    .single();
  if (error) {
    console.error('Supabase insert progress error:', error);
    throw error;
  }
  return data;
}

// Fungsi untuk get progress by userid
async function getProgressByUserId(userid) {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('userid', userid)
    .limit(1); // ambil satu saja
  if (error) {
    console.error('Supabase select progress error:', error);
    throw error;
  }
  // data adalah array, ambil index 0
  return data && data[0] ? data[0] : null;
}

module.exports = { createProgress, getProgressByUserId };