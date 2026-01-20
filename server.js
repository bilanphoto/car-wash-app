// server.js - Car Wash Backend API
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ⚠️ AI for Thai API Key
const AIFORTHAI_API_KEY = process.env.AIFORTHAI_API_KEY || 'ovLBG3crDxeZp75sgbPymmrT0loH8EZL';

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static('public'));

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API: อ่านป้ายทะเบียน (ใช้ AI for Thai)
app.post('/api/read-plate', async (req, res) => {
    try {
        const { image, mediaType } = req.body;
        
        if (!image) {
            return res.status(400).json({ error: 'ไม่มีรูปภาพ' });
        }
        
        // แปลง base64 เป็น Buffer
        const imageBuffer = Buffer.from(image, 'base64');
        
        // สร้าง FormData สำหรับ AI for Thai
        const FormData = require('form-data');
        const formData = new FormData();
        formData.append('image', imageBuffer, {
            filename: 'plate.jpg',
            contentType: mediaType || 'image/jpeg'
        });
        
        const response = await fetch('https://api.aiforthai.in.th/lpr-v2', {
            method: 'POST',
            headers: {
                'Apikey': AIFORTHAI_API_KEY,
                ...formData.getHeaders()
            },
            body: formData
        });
        
        const data = await response.json();
        console.log('AI for Thai response:', data);
        
        // Parse response
        let plate = '';
        let province = '';
        
        if (data.result && data.result.length > 0) {
            plate = data.result[0].license_plate || data.result[0].lp || '';
            province = data.result[0].province || '';
        } else if (data.license_plate) {
            plate = data.license_plate;
            province = data.province || '';
        } else if (data.lp) {
            plate = data.lp;
            province = data.province || '';
        }
        
        if (plate) {
            return res.json({ plate, province });
        }
        
        return res.json({ plate: '', province: '', error: 'ไม่พบป้ายทะเบียน' });
        
    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).json({ error: 'เกิดข้อผิดพลาด: ' + error.message });
    }
});

// Serve frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚗 Car Wash Server running on port ${PORT}`);
    console.log(`📍 Local: http://localhost:${PORT}`);
    console.log('✅ Using AI for Thai API');
});
