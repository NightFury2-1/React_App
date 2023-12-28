import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CounterState {
  value: number;
  islogin: Boolean;
  pglink: number;
}

const initialState: CounterState = {
  value: 0,
  islogin: false,
  pglink: 0,
};

const counterSlice = createSlice({
  name: "Counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    setLogin: (state, action: PayloadAction<boolean>) => {
      state.islogin = action.payload;
    },
    setLink: (state, action: PayloadAction<number>) => {
      state.pglink = action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount, setLogin, setLink } =
  counterSlice.actions;
export default counterSlice.reducer;
