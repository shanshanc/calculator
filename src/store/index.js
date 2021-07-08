import { configureStore } from "@reduxjs/toolkit";
import currentReducer from "./current.js";

export default configureStore({
  reducer: {
    current: currentReducer,
  },
});
