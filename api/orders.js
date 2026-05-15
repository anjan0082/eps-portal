export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const SUPABASE_URL = 'https://hdanqhtloceossakbmhpn.supabase.co';
    const SUPABASE_KEY = 'sb_secret_7ZoND5ohZChp8pUL2Crwkw_yKcJvgQt';

    if (req.method === 'POST') {
      const { action, ...data } = req.body;

      if (action === 'SELECT') {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/orders?select=*`, {
          method: 'GET',
          headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`,
          },
        });

        if (!response.ok) {
          const error = await response.text();
          return res.status(response.status).json({ success: false, error });
        }

        const orders = await response.json();
        return res.status(200).json({ success: true, data: orders });
      }

      if (action === 'INSERT') {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/orders`, {
          method: 'POST',
          headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=representation',
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          const error = await response.text();
          return res.status(response.status).json({ success: false, error });
        }

        const result = await response.json();
        return res.status(200).json({ success: true, data: result });
      }

      return res.status(400).json({ success: false, error: 'Invalid action' });
    }

    return res.status(405).json({ success: false, error: 'Method not allowed' });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}
