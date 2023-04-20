const express = require("express");
const {  getWorkouts, getWorkout, createWorkout, deleteWorkout, updateWorkout } = require('../controllers/WorkoutController');
const router = express.Router(); // this  creates an instance of router for us

// To get all workouts
// router.get('/', (req, res) => {
//     res.json({ mssg: "Dummy GET all workouts" })
// });
router.get('/', getWorkouts);


// To get a single workout
// router.get("/:id", (req, res) => {
//     res.json({ msg: "GET a single workout" })
// })
router.get("/:id",getWorkout)


// POST a new workout 
// router.post("/", async (req, res) => {
//     const { title, load, reps } = req.body
//     try {
//         const workout= await Workout.create({title,load,reps})
//         res.status(200).json(workout);
//     } catch (error) {
//         res.status(400).json({error:error.message});
//     }
//     // res.json({ mssg: "POST a new workout" })
// })

router.post("/", createWorkout)

// DELETE a  workout 
// router.delete("/:id", (req, res) => {
//     res.json({ mssg: "DELETE a  workout" })
// })
router.delete("/:id",deleteWorkout)

// UPDATE a  workout 
// router.patch("/:id", (req, res) => {
//     res.json({ mssg: "UPDATE a workout" })
// })
router.patch("/:id",updateWorkout)





module.exports = router;