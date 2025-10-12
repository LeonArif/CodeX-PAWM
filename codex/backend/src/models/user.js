const supabase = require('../config/db');

async function getUserByGoogleid(googleid) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('googleid', googleid)
    .single();
  if (error && error.code !== 'PGRST116') {
    console.error('Supabase select error:', error);
    throw error;
  }
  return data;
}

async function createUser({ googleid, email, name, password }) {
  console.log('Insert user:', { googleid, email, name, password });
  const { data, error } = await supabase
    .from('users')
    .insert([{ googleid, email, name, password }])
    .select()
    .single();
  if (error) {
    console.error('Supabase insert error:', error);
    throw error;
  }
  console.log('Supabase insert result:', data);
  return data;
}

// Fungsi ini untuk mendapatkan user berdasarkan id (primary key di Supabase)
async function getUserById(id) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();
  if (error && error.code !== 'PGRST116') {
    console.error('Supabase select by ID error:', error);
    throw error;
  }
  return data;
}

module.exports = {
  getUserByGoogleid,
  createUser,
  getUserById
};