const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');

const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const multer = require('multer');
require('dotenv').config();


const User = require('./models/User.js');
const Event = require('./models/eventSchema.js');
const Past = require('./models/PastEvents.js');
const Community = require('./models/community.js');

const app = express();
const port = process.env.PORT || 3000;
const upload = multer({ limits: { fileSize: 50 * 1024 * 1024 } }); // Limit file size to 50MB

// Middleware to parse JSON bodies
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Enable CORS for all origins

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    credentials: true,
    origin: process.env.ORIGIN || 'http://localhost:5173', // Replace with your frontend domain
}));



// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://manual:nrtGC7D6tG2GjS1E@cluster0.60idrdx.mongodb.net/hack_02?retryWrites=true&w=majority&appName=Cluster0')

    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });


// Routes

// Add Event
app.post('/addEvent', async (req, res) => {
    const { ogName, loc, date, time, dur, fund, vol } = req.body;
    
    try {
        const newEvent = await Event.create({
            ogName,
            loc,
            date,
            time,
            dur,
            fund,
            vol
        });
        
        // Respond with the newly created event
        res.json(newEvent);
    } catch (err) {
        console.log(err);
        res.status(422).json(err); // Send an error response with a 422 status code
    }
});

// Login
app.post('/authorize/login', async (req, res) => {
    const { userId, password } = req.body;
    

    try {
        const user = await User.findOne({ userId });

        if (!user) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);

        if (isMatch) {
            return res.status(200).json({ message: 'Login successful' });
        } else {
            return res.status(400).json({ message: 'Invalid password' });
        }
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
app.get('/getPastEvents', async (req, res) => {
    try {
        const pastEvents = await Past.find({});
        res.json(pastEvents);
    } catch (error) {
        console.error('Error fetching past events:', error);
    }
});
app.get('/getMessages', async (req, res) => {
    const { eventId } = req.query;
    console.log('Event ID:', eventId);
    try {
        const messages = await Community.find({ event_id: eventId });
        res.json(messages);
        console.log(messages);
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }});
app.post('/sendMessage', async (req, res) => {
    const { userId, text, time, eventId } = req.body;
    try {
        const newMessage = await Community.create({
            user_id: userId,
            text,
            time,
            event_id: eventId
        });
        res.json(newMessage);
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to handle sending email with attachment
app.post('/sendEmailWithAttachment', upload.single('attachment'), (req, res) => {
    const { to, subject, html, user, pass } = req.body;
    const attachment = req.file; // Access the file uploaded through multer

    if (!to || !subject || !html || !attachment) {
        return res.status(400).send('Missing required fields');
    }

    // Log the attachment to debug
    attachment.originalname = 'certificate';
    console.log('Attachment received:', attachment.originalname);
    console.log('user:', user || process.env.USER);
    console.log('pass:', pass || process.env.PASS);

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: user || process.env.USER, // Use provided user or fallback to environment variable
                pass: pass || process.env.PASS  // Use provided pass or fallback to environment variable
            }
        });

        const attachments = [{
            filename: attachment.originalname,
            content: attachment.buffer,
            contentType: attachment.mimetype
        }];

        const mailOptions = {
            from: user || 'your-email@example.com',
            to: to,
            subject: subject,
            html: html,
            attachments: attachments
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Failed to send email:', error);
                return res.status(500).send('Failed to send email');
            }
            console.log('Email sent:', info.response);
            res.send('Email sent');
        });
    } catch (error) {
        console.log('Error processing attachment:', error);
        res.status(500).send('Error processing attachment');
    }
});



// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);

app.get("/getEvent",async(req,res)=>{
    try {
        // Fetch event data from the database
        const event = await Event.find({}); // Adjust query as needed
        if (!event) return res.status(404).send('Event not found');
        res.json(event);
    } catch (err) {
        res.status(500).send('Server error');
    }  
})


});