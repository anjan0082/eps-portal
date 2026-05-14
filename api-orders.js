// api/orders.js - Vercel serverless function
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  try {
    const { action, data } = req.body;
    const SUPABASE_URL = 'https://hdanqhtloceossakbmhpn.supabase.co';
    const SUPABASE_KEY = 'sb_secret_7ZoND5ohZChp8pUL2Crwkw_yKcJvgQt';

    if (action === 'SELECT') {
      const response = await fetch(
        `${SUPABASE_URL}/rest/v1/orders?select=*&order=created_at.desc&limit=100`,
        {
          method: 'GET',
          headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const orders = await response.json();
      return res.status(200).json({ success: true, data: orders });
    }

    if (action === 'INSERT') {
      const response = await fetch(
        `${SUPABASE_URL}/rest/v1/orders`,
        {
          method: 'POST',
          headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=representation'
          },
          body: JSON.stringify(data)
        }
      );

      const result = await response.json();
      return res.status(201).json({ success: true, data: result });
    }

    return res.status(400).json({ error: 'Unknown action' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
