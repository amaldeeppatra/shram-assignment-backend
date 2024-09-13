const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoute = require('./routes/authRoute');
const scoreRoute = require('./routes/scoreRoute');

const app = express();

// middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use(cors({ origin: 'https://shram-assignment.vercel.app' }));

mongoose.connect(process.env.mongoDBUrl).then((e) => console.log("Mongodb connected"));

// api routes
app.use('/api/users', authRoute);
app.use('/api/scores', scoreRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));