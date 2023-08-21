const express = require('express')
const app = express();
const db = require("./config/database")
const cors = require('cors');
const UserRoute = require('./routes/auth.route');
const ConsumerRoute = require('./routes/consumer.route');
const FitnessGoal = require('./routes/fitnessGoal.route');
const Activity = require('./routes/activity.route');
const User = require('./models/user.model');
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/auth',UserRoute);
app.use('/consumer',ConsumerRoute);
app.use('/fitness-goal',FitnessGoal);
app.use('/activity',Activity);
app.get('/users', async (req, res) => {
    try {
      // Use Mongoose to query the User model for all users
      const users = await User.find();
  
      // Send the list of users as a JSON response
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
db.connect();
app.listen(process.env.APP_PORT);