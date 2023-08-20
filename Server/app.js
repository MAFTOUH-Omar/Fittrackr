const express = require('express')
const app = express();
const db = require("./config/database")
const cors = require('cors');
const UserRoute = require('./routes/auth.route');
const ConsumerRoute = require('./routes/consumer.route');
const FitnessGoal = require('./routes/fitnessGoal.route');
const Activity = require('./routes/activity.route');
app.use(cors({
    origin: 'https://fittrackr-github.vercel.app/',
}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/auth',UserRoute);
app.use('/consumer',ConsumerRoute);
app.use('/fitness-goal',FitnessGoal);
app.use('/activity',Activity);
db.connect();
app.listen(process.env.APP_PORT);