import { createContext, useReducer } from "react";
import App from "../App";

export const WorkoutContext = createContext()

/**
 * 
 * @param {*} state - the previous state before we make a change to it - { workouts: null }
 * @param {Object} action
 * action.type - describe the state change (set, delete, ...)
 * action.payload - any property to make the change
 */
export const workoutsReducers = (state, action) => {
    switch (action.type) {
        case 'SET_WORKOUTS':
            return {
                // the array of all workouts
                workouts: action.payload
            }
        case 'CREATE_WORKOUT':
            return {
                // the single new workout object
                // ...state.workouts - the array of previous workouts
                workouts: [action.payload, ...state.workouts]
            }
        case 'DELETE_WORKOUT':
            return {
                workouts: state.workouts.filter((workout) => workout._id !== action.payload._id)
            }
        default:
            return state
    }
}

/**
 * 
 * @param {*} param0 what this component wraps
 * // see index.js, the children is <App />
 * @returns 
 */
export const WorkoutsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(workoutsReducers, {
        workouts: null
    })

    return (
        <WorkoutContext.Provider value={{ ...state, dispatch }}>
            {children}
        </WorkoutContext.Provider>
    )
}