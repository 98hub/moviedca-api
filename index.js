
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/Database');
const movieRoutes = require('./routes/MovieRoute');
const HomeRoutes = require('./routes/HomeRoute');
const path = require("path");

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use(express.static(path.join(__dirname, "moviedca-api/public")));
app.use("/img", express.static(path.resolve(__dirname, "public/img")));


// Routes
app.use('/api', movieRoutes);

// Home Routes
app.use('/', HomeRoutes);

// Sync database and start server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});