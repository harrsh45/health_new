# 🩺 ElderMed Backend

The **ElderMed Backend** is a Node.js + Express.js REST API powering a healthcare reminder system for elderly patients and their caretakers. It handles user management, medication tracking, and automated WhatsApp reminders using Twilio. This backend ensures role-based access, secure authentication, and scheduled alerts for timely medication adherence.

## 🚀 Features

- 👤 **User Registration & Login** with JWT-based authentication  
- 🧑‍⚕️ **Role-based access** for users and caretakers  
- 🔗 **User-Caretaker linking** for dependent monitoring  
- 💊 **Medication management** with dosage, time, frequency, and custom notes  
- ⏰ **Automated reminders** sent via WhatsApp using Twilio  
- 🔐 **Secure API** endpoints with token-based middleware  
- 🌐 **RESTful routes** using Express routers  

## 🗂️ Folder Structure

eldermed-backend/ │ ├── src/ │ ├── config/ # MongoDB connection config │ ├── controllers/ # Route handlers (User, Medications) │ ├── middleware/ # JWT auth middleware │ ├── models/ # Mongoose schemas (User, Medication) │ ├── routes/ # API route definitions │ ├── schedulers/ # Cron jobs (e.g., WhatsApp reminders) │ ├── utils/ # Utility functions (e.g., Twilio messaging) │ └── app.js # Express app setup │ ├── .env # Environment variables ├── server.js # Main entry point ├── package.json # Project dependencies ├── testdb.js # MongoDB connection test script ├── test-Whatsapp.js # Manual WhatsApp message test

markdown
Copy
Edit

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js  
- **Database**: MongoDB + Mongoose  
- **Auth**: JWT (JSON Web Tokens)  
- **Scheduling**: node-cron  
- **Messaging**: Twilio WhatsApp API  
- **Utilities**: dotenv, moment  

## 🔐 Environment Variables

Create a `.env` file in the root with the following keys:

```env
PORT=5000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
⚠️ Never commit your .env file to version control.

📦 Installation & Setup
bash
Copy
Edit
# 1. Clone the repo
git clone https://github.com/yourusername/eldermed-backend.git

# 2. Install dependencies
cd eldermed-backend
npm install

# 3. Start the server
npm run dev    # for development (nodemon)
# or
npm start      # for production
📬 API Endpoints
👤 User Routes (/api/users)
Method	Endpoint	Description
POST	/	Register user
POST	/login	Login user
POST	/:id/link	Link user to caretaker (auth)
💊 Medication Routes (/api/meds)
Method	Endpoint	Description
POST	/	Add medication
GET	/user/:userId	Get medications by user ID
GET	/caretaker	Get meds for caretaker’s linked users (auth)
📅 Reminder Scheduler
Runs every minute to check for upcoming meds

Sends WhatsApp messages via Twilio to remind users of medication time

🧪 Testing
bash
Copy
Edit
# Test WhatsApp reminder manually
node test-Whatsapp.js
Ensure your Twilio config is set correctly in src/utils/sendWhatsapp.js.

💡 Future Improvements
SMS & email reminders

Medication refill tracking

Admin dashboard

Push notification integration

Multi-language support

👨‍💻 Author
Made with 💙 for elder care by Vedant Bhole
