const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

// URL của trang web bạn muốn nhúng
const TARGET_URL = 'https://i.b52.club';

app.get('/proxy', async (req, res) => {
  try {
    const response = await axios.get(TARGET_URL);

    // Xóa các tiêu đề bảo mật X-Frame-Options và Content-Security-Policy
    res.removeHeader('X-Frame-Options');
    res.removeHeader('Content-Security-Policy');
    
    // Gửi nội dung trang web về cho trình duyệt
    res.send(response.data);
  } catch (error) {
    console.error('Lỗi khi gọi trang gốc:', error.message);
    res.status(500).send('Lỗi máy chủ proxy.');
  }
});

app.listen(port, () => {
  console.log(`Proxy server đang chạy trên cổng ${port}`);
});
