const express = require('express')
const app = express();
const db = require("./config/database")
const cors = require('cors');
const UserRoute = require('./routes/auth.route');
const ConsumerRoute = require('./routes/consumer.route');
const FitnessGoal = require('./routes/fitnessGoal.route');
const Activity = require('./routes/activity.route');
const Workout = require('./routes/workout.route');
const BodyMeasurement = require('./routes/bodyMeasurement.route');
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/auth',UserRoute);
app.use('/consumer',ConsumerRoute);
app.use('/fitness-goal',FitnessGoal);
app.use('/activity',Activity);
app.use('/workout',Workout);
app.use('/body-measurement',BodyMeasurement);
db.connect();
app.listen(process.env.APP_PORT);