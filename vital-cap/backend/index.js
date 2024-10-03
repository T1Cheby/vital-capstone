const express = require("express")
const app = express();
const authRoute = require("./routes/authRoute");
const adminRoute = require("./routes/adminRoute");

const chatRoute = require("./routes/chatRoute");
const fileRoute = require("./routes/fileRoute");
const profileRoute = require("./routes/profileRoute");
require("./helper/connectionDB");
const llmRoute = require("./routes/llmRoute");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/admin', adminRoute);
app.use('/api/v1/chat', chatRoute);
app.use('/api/v1/file', fileRoute);
app.use('/api/v1/profile', profileRoute);
app.use('/api/v1/llm', llmRoute);
module.exports = app;

