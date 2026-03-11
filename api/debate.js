export const config = {
  maxDuration: 30
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'API key not found' });
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(req.body)
    });
    
    const data = await response.json();
    console.log('Anthropic response status:', response.status);
    console.log('Anthropic response body:', JSON.stringify(data));
    
    res.status(response.status).json(data);
  } catch(error) {
    console.log('Catch error:', error.message);
    res.status(500).json({ error: error.message });
  }
}
