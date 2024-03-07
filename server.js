require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const workoutRoutes = require('./routes/workout');
const userRoutes = require('./routes/user');



app.use(express.json());

//connect to DB
mongoose.connect(process.env.MONGO_URI)
.then(()=> {
    app.listen(process.env.PORT , () => {
        console.log(`Server connected to port number ${process.env.PORT}`);
    })
})
.catch((error) => {
    console.log(error)
})

//routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);


