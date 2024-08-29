const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const cookieparser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const app = express();
const User = require('./models/User.js');

app.use(express.json());
app.use(cookieparser());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));

mongoose.connect('mongodb+srv://manual:nrtGC7D6tG2GjS1E@cluster0.60idrdx.mongodb.net/hack_02?retryWrites=true&w=majority&appName=Cluster0')
    .then(async () => {
        console.log('Connected to MongoDB');

        
        
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

    

    //createUser("maureen","234");

app.post('/authorize/login', async (req, res) => {
    console.log("check");
    const { userId, password } = req.body;
    console.log(userId);
    console.log(password);

    try {
        const user = await User.findOne({ userId });

        if (!user) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        console.log("done");
        if (isMatch) {
            console.log("done");
            return res.status(200).json({ message: 'Login successful' });
        } else {
            return res.status(400).json({ message: 'Invalid password' });
        }
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});



app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
