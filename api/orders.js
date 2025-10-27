// api/orders.js
const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;

module.exports = async (req, res) => {
  // 設置 CORS 頭部
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // 處理 OPTIONS 請求 (CORS preflight)
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
    console.log('收到訂單請求:', req.body);
    
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { 
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(req.body)
    });
    
    if (!response.ok) {
      throw new Error(`Google Script 回應錯誤: ${response.status}`);
    }
    
    const result = await response.json();
    console.log('Google Script 回應:', result);
    
    res.status(200).json(result);
  } catch (error) {
    console.error('API 錯誤:', error);
    res.status(500).json({ 
      success: false, 
      message: '伺服器錯誤: ' + error.message 
    });
  }
};
