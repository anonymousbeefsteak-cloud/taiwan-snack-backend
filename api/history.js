// api/history.js
const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: '只允許 POST 請求' 
    });
  }

  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { 
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify({
        action: 'getOrders',
        ...req.body
      })
    });
    
    if (!response.ok) {
      throw new Error(`Google Script 回應錯誤: ${response.status}`);
    }
    
    const result = await response.json();
    res.status(200).json(result);
  } catch (error) {
    console.error('查詢歷史訂單錯誤:', error);
    res.status(500).json({ 
      success: false, 
      message: '查詢失敗' 
    });
  }
};
