const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const multer = require('multer');  // Import multer for file uploads
const bodyParser = require('body-parser');  // Import bodyParser for parsing requests
const Razorpay = require('razorpay');

const app = express();
const port = process.env.PORT || 3000;

// Import models
const User = require('./models/User.js');
const Event = require('./models/eventSchema.js');
const Past = require('./models/PastEvents.js');
const Request=require("./models/request.js")
const Community = require('./models/community.js');

// Set up file upload limits

const upload = multer({ limits: { fileSize: 50 * 1024 * 1024 } }); // Limit file size to 50MB

// Middleware to parse JSON bodies
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Enable CORS for all origins
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));

// Middleware
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
mongoose.connect('mongodb+srv://manual:nrtGC7D6tG2GjS1E@cluster0.60idrdx.mongodb.net/hack_02?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

// Define Routes

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
        console.error('Error adding event:', err);
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

// Get Past Events
app.get('/getPastEvents', async (req, res) => {
    try {
        const pastEvents = await Past.find({});
        res.json(pastEvents);
    } catch (error) {
        console.error('Error fetching past events:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get Messages for an Event
app.get('/getMessages', async (req, res) => {
    const { eventId } = req.query;
    console.log('Event ID:', eventId);
    try {
        const messages = await Community.find({ event_id: eventId });
        res.json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        return res.status(500).json({ message: 'Internal server error' });

    }
});

// Send Message
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

// Send Email with Attachment
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
});

// Donation Schema
const donationSchema = new mongoose.Schema({
    name: String,
    email: String,
    amount: Number,
    payment_id: String,
});
  
const Donation = mongoose.model('Donation', donationSchema);

// Razorpay Instance
const razorpay = new Razorpay({
    key_id: "rzp_test_TrzRx21MJ6LUPk",
    key_secret: "UwctxLjbAG3ouKFj3dJs0CtS",
});
  
// Donate Route
app.post('/donate', async (req, res) => {
    const { name, email, amount } = req.body;
  
    const options = {
        amount: amount * 100, // Amount in paise
        currency: 'INR',
        receipt: 'receipt#1',
        payment_capture: 1,
    };

    try {
        const response = await razorpay.orders.create(options);
        const donation = new Donation({
            name,
            email,
            amount,
            payment_id: response.id,
        });
  
        await donation.save();
  
        res.json({
            id: response.id,
            currency: response.currency,
            amount: response.amount,
        });
    } catch (error) {
        console.error('Error processing donation:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// Get Event Route
app.get("/getEvent", async (req, res) => {

    try {
        const event = await Event.find({}); // Fetch all events
        if (!event) return res.status(404).json({ message: 'Event not found' });
        res.json(event);
    } catch (err) {
        console.error('Error fetching event:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Update Volunteer Count
app.put('/updateVolunteerCount/:id', async (req, res) => {
    const { id } = req.params;
    const { vol } = req.body;
  
    try {
        const event = await Event.findById(id);
        if (event) {
            event.vol = vol;
            await event.save();
            res.status(200).json({ success: true });
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        console.error('Error updating volunteer count:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/resource_requests', async (req, res) => {
    const { resource, organization, quantity, dueDate } = req.body;
    console.log(req.body)
    try {
        // Create a new request
        const newRequest = new Request({
            prod: resource,             // Correct field name mapping
            to: organization,           // Correct field name mapping
            quan: quantity,             // Correct field name mapping
            estimate_time: dueDate      // Correct field name mapping
        });

        // Save the request to the database
        await newRequest.save();

        res.status(201).json({
            message: 'Resource request submitted successfully',
            resource,
            organization,
            quantity,
            dueDate
        });
    } catch (err) {
        console.log(err);
        res.status(422).json({ error: 'Failed to submit request', details: err.message });
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
