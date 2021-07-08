import { createSlice } from "@reduxjs/toolkit";

export const currentSlice = createSlice({
  name: 'current',
  initialState: {
    displayStr: '0',
    operator: '',
    subtotal: 0,
  },
  reducers: {
    setDisplayStr: (state, action) => {
      state.displayStr = action.payload
    },
    setSubtotal: (state, action) => {
      state.subtotal = action.payload
    },
    setOperator: (state, action) => {
      state.operator = action.payload
    },
    resetAll: (state) => {
      state.displayStr = '0';
      state.operator = '';
      state.subtotal = 0;
    },
  }
});

export const { setDisplayStr, setSubtotal, setOperator, resetAll } = currentSlice.actions;
export default currentSlice.reducer;
