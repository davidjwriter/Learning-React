import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth';
import counterSlice from './counter';


// Normal Redux

// const counterReducer = (state = initState, action) => {
//     if (action.type === "INCREMENT") {
//         return {
//             counter: state.counter + 1,
//             showCounter: state.showCounter,
//         };
//     }

//     if (action.type === "INCREASE") {
//         return {
//             counter: state.counter + action.amount,
//             showCounter: state.showCounter,
//         }
//     }

//     if (action.type === "DECREMENT") {
//         return {
//             counter: state.counter - 1,
//             showCounter: state.ShowCounter,
//         };
//     }

//     if (action.type === "TOGGLE") {
//         return {
//             counter: state.counter,
//             showCounter: !state.showCounter,
//         }
//     }

//     return state;
// }

const store = configureStore({
    reducer: {
        counter: counterSlice,
        auth: authSlice,
    }
});



export default store;