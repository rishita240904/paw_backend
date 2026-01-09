
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db.config');

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/pets", require("./routes/petRoutes"));
app.use("/api/swipes", require("./routes/swipeRoutes"));
app.use("/api/matches", require("./routes/matchRoutes"));
app.use("/api/messages", require("./routes/messageRoutes"));
app.use("/api/playdates", require("./routes/playdateRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));

app.get('/', (req, res) => {
    res.send('API is running 🚀');
});

module.exports = app;