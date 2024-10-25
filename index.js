// Import necessary libraries
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk"; // Import as named import
import logger from "redux-logger"; // Ensure logger is imported correctly
import axios from "axios";

// Action Types
const INC = "increment";
const DEC = "decrement";
const INIT = "init";
const INC_BY_AMNT = "incrementByAmount";

// Reducer
function reducer(state = { amount: 1 }, action) {
  switch (action.type) {
    case INIT:
      return { amount: action.payload };
    case INC:
      return { amount: state.amount + 1 };
    case DEC:
      return { amount: state.amount - 1 };
    case INC_BY_AMNT:
      return { amount: state.amount + action.payload };
    default:
      return state;
  }
}

// Create store with middleware
const store = createStore(
  reducer,
  applyMiddleware(logger, thunk) // Ensure logger and thunk are valid functions
);

// Action Creators
const initUser = () => async (dispatch) => {
  try {
    const { data } = await axios.get("http://localhost:3000/accounts/1");
    dispatch({ type: INIT, payload: data.amount });
  } catch (error) {
    console.error("Error fetching user data:", error.message);
  }
};

function increment() {
  return { type: INC };
}

function decrement() {
  return { type: DEC };
}

function incrementByAmount(value) {
  return { type: INC_BY_AMNT, payload: value };
}

// Call the function to fetch the user
store.dispatch(initUser()); // Dispatch as a thunk action

// Dispatching actions every 4 seconds (optional, for testing)
setTimeout(() => {
  store.dispatch(initUser()); // Call again after 4 seconds if needed
}, 4000);

// Uncomment to log the state changes to the history array
// const history = [];
// store.subscribe(() => {
//   history.push(store.getState());
//   console.log(store.getState());
// });

// Initial dispatch to test increment action
// store.dispatch(increment());
