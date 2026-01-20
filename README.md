# 🚗 Car Wash - ระบบรับรถร้านล้างรถ

ระบบถ่ายรูปอ่านป้ายทะเบียนด้วย Claude AI พร้อม Dashboard และ Admin Panel

## ✨ ฟีเจอร์

- 📷 ถ่ายรูป / เลือกรูปป้ายทะเบียน
- 🔍 อ่านป้ายทะเบียนอัตโนมัติด้วย Claude AI
- 🎫 ออกบัตรคิว
- 📺 Dashboard แสดงสถานะคิว (สำหรับลูกค้าดู)
- ⚙️ Admin Panel (จัดการคิว, ประวัติ, สถิติรายได้)

---

## 🚀 Deploy บน Railway (แนะนำ)

### ขั้นตอนที่ 1: สร้าง GitHub Repository

```bash
# สร้าง repo ใหม่บน GitHub แล้ว clone มา
git clone https://github.com/YOUR_USERNAME/car-wash-app.git
cd car-wash-app

# คัดลอกไฟล์ทั้งหมดไปใส่ แล้ว push
git add .
git commit -m "Initial commit"
git push origin main
```

### ขั้นตอนที่ 2: สมัคร Railway

1. ไปที่ [railway.app](https://railway.app)
2. กด **Login** → เลือก **Login with GitHub**
3. อนุญาตให้ Railway เข้าถึง GitHub

### ขั้นตอนที่ 3: สร้าง Project ใหม่

1. กด **New Project**
2. เลือก **Deploy from GitHub repo**
3. เลือก repository `car-wash-app`
4. รอ Railway detect project

### ขั้นตอนที่ 4: ตั้งค่า Environment Variable

1. ไปที่ **Variables** tab
2. กด **+ New Variable**
3. เพิ่ม:
   - **Variable name:** `ANTHROPIC_API_KEY`
   - **Value:** `sk-ant-api03-xxxxx` (API Key ของคุณ)
4. กด **Add**

### ขั้นตอนที่ 5: Deploy

1. Railway จะ auto-deploy เมื่อเพิ่ม variable
2. รอสักครู่จนเห็น **Success**
3. กด **Settings** → ดู **Domains**
4. กด **Generate Domain** เพื่อสร้าง URL

### ขั้นตอนที่ 6: เปิดใช้งาน

เข้าเว็บที่ได้รับ เช่น `https://car-wash-app-xxxx.up.railway.app`

---

## 🔑 วิธีขอ Anthropic API Key

1. ไปที่ [console.anthropic.com](https://console.anthropic.com)
2. สมัครสมาชิก / Login
3. ไปที่ **API Keys**
4. กด **Create Key**
5. คัดลอก key (ขึ้นต้นด้วย `sk-ant-`)

---

## 💻 รันบนเครื่องตัวเอง (Development)

```bash
# 1. ติดตั้ง dependencies
npm install

# 2. ตั้งค่า API Key
export ANTHROPIC_API_KEY=sk-ant-xxxxx

# หรือสร้างไฟล์ .env
echo "ANTHROPIC_API_KEY=sk-ant-xxxxx" > .env

# 3. รัน server
npm start

# 4. เปิด browser
# http://localhost:3000
```

---

## 📁 โครงสร้างไฟล์

```
car-wash-railway/
├── server.js          # Backend API
├── package.json       # Dependencies
├── .gitignore         # Git ignore
├── README.md          # คู่มือ
└── public/
    └── index.html     # Frontend (React)
```

---

## 📱 วิธีใช้งาน

### 📝 หน้ารับรถ (พนักงาน)
1. ถ่ายรูปป้ายทะเบียน → อ่านอัตโนมัติ
2. เลือกบริการ → กด **รับคิว**
3. แสดงบัตรคิวให้ลูกค้า
4. Tab **จัดการคิว**:
   - กด **เริ่มล้าง** เมื่อเริ่มล้างรถ
   - กด **ล้างเสร็จ** เมื่อล้างเสร็จ

### 📺 หน้า Dashboard (ลูกค้าดู)
- แสดงรถที่กำลังล้าง
- แสดงรถที่ล้างเสร็จ (เชิญรับรถ)
- แสดงคิวรอถัดไป

### ⚙️ หน้า Admin
- รับเงิน & ปิดงาน เมื่อลูกค้ามารับรถ
- ดูประวัติ
- ดูสถิติรายได้วันนี้/เดือนนี้

---

## 💰 ค่าใช้จ่าย

| รายการ | ราคา |
|--------|------|
| Railway (Hobby Plan) | $5/เดือน |
| Anthropic API | ~$0.003/ครั้งที่อ่านป้าย |

**ประมาณการ:** ถ้าอ่านป้าย 100 ครั้ง/วัน = ~$9/เดือน รวม Railway

---

## 🔧 แก้ไขปัญหา

### API Key ไม่ทำงาน
- ตรวจสอบว่า key ขึ้นต้นด้วย `sk-ant-`
- ตรวจสอบว่ามี credit ใน Anthropic account

### อ่านป้ายไม่ได้
- ถ่ายรูปให้ชัด เห็นตัวอักษรชัดเจน
- หลีกเลี่ยงแสงสะท้อน
- ลองกรอกเองได้

---

**Made with ❤️ using Claude AI**
