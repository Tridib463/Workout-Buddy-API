const express  = require('express');
const router = express.Router();
const Workout = require('../models/workoutModel');
const {createWorkout, getWorkouts, getWorkout, deleteWorkout, updateWorkout} = require('../controllers/workoutController');
const requireAuth = require('../middleware/requireAuth');

//require auth for all workout
router.use(requireAuth);

//GET ALL WORKOUTS
router.get('/', getWorkouts);

//GET a single WORKOUT
router.get('/:id', getWorkout);

//POST a new WORKOUT
router.post('/', createWorkout);
 

//Delete a workout
router.delete('/:id', deleteWorkout);

//Update a workout
router.patch('/:id', updateWorkout);


module.exports = router;
