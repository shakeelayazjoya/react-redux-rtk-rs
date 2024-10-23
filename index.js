import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

const inc = "increment";
const dec = "decrement";
const incByAmnt = "incrementByAmount";
// Create store with middleware
const store = createStore(reducer, applyMiddleware(logger.default));
const history = [];

// Corrected reducer logic
function reducer(state = { amount: 1 }, action) {
  if (action.type === inc) {
    return { amount: state.amount + 1 };
  }
  if (action.type === dec) {
    return { amount: state.amount - 1 };
  }

  if (action.type === incByAmnt) {
    return { amount: state.amount + action.payload };
  }

  return state;
}

// action creators

function increment() {
  return { type: inc };
}

function decrement() {
  return { type: dec };
}

function incrementByAmount(value) {
  return { type: incByAmnt, payload: value };
}

// Global state
// store.subscribe(() => {
//   history.push(store.getState()); // Push the new state to history array every time the state changes.
//   console.log(store.getState());
// });

// Dispatching actions every 4 seconds
setInterval(() => {
  store.dispatch(incrementByAmount(4));
}, 3000);

// setInterval(() => {
//   store.dispatch({ type: "incrementByAmount", payload: 4 });
// }, 4000);

// Initial dispatch to test
// store.dispatch({ type: "increment" });
