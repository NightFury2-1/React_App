import { createSlice } from "@reduxjs/toolkit";

interface anchorType {
  Pgno: number;
}

const initialState: anchorType = {
  Pgno: 0,
};

const linkSlice = createSlice({
  name: "link",
  initialState,
  reducers: {
    ChangeHome: (state) => {
      state.Pgno -= 1;
    },
    ChangeAdd: (state) => {
      state.Pgno += 1;
    },
  },
});

export const { ChangeAdd, ChangeHome } = linkSlice.actions;

export default linkSlice.reducer;
