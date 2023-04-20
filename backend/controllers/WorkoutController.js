const mongoose = require("mongoose");
const Workout = require("../models/WorkoutModel");



// Function to Get All Workouts
const getWorkouts = async (req, res) => {
    // -1: sorted in descending order
    const workouts = await Workout.find({}).sort({ createdAt: -1 });

    res.status(200).json(workouts);
}




// Function to Get A Single Workout
const getWorkout = async (req, res) => {
    // grab the id property from the request (/:id)
    const { id } = req.params;
    // check if the id is of mongoose ObjectId type
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout' })
    }

    const workout = await Workout.findById(id)

    if (!workout) {
        return res.status(400).json({ error: 'No such workout' })
    }

    res.status(200).json(workout)
}






// Function to Create A New Workout
const createWorkout = async (req, res) => {
    const { title, load, reps } = req.body

    // readable error messages
    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }
    if (!load) {
        emptyFields.push('load')
    }
    if (!reps) {
        emptyFields.push('reps')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }

    try {
        const workout = await Workout.create({ title, load, reps })
        // send back the workout document
        res.status(200).json(workout)
    } catch (error) {
        // send back the error message
        res.status(400).json({ error: error.message })
    }
}







// Function to Delete A Workout
const deleteWorkout = async (req, res) => {
    // grab the id property from the request (/:id)
    const { id } = req.params
    // check if the id is of mongoose ObjectId type
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout' })
    }

    const workout = await Workout.findOneAndDelete({ _id: id })

    if (!workout) {
        return res.status(400).json({ error: 'No such workout' })
    }

    res.status(200).json(workout)
}







// Function to Update A Workout
const updateWorkout = async (req, res) => {
    // grab the id property from the request (/:id)
    const { id } = req.params
    // check if the id is of mongoose ObjectId type
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such workout' })
    }
    /**
     * 1st parameter: find by what property
     * 2nd parameter: content to be updated
     * 3rd parameter: {new:true} - give back the new updated document instead of the original one
     */
    const workout = await Workout.findByIdAndUpdate({ _id: id }, { ...req.body }, { new: true })

    if (!workout) {
        return res.status(400).json({ error: 'No such workout' })
    }

    res.status(200).json(workout)
}




module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}