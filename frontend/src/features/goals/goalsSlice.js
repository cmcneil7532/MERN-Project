import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  goals: [],
  isError: false,
  isLoading: false,
  isSucccess: false,
  message: "",
};

export const goalSlice = createSlice({
  name: "goal",
  initialState,
  //reset state
  reducers: {
    reset: (state) => initialState
  },

  extraReducers: () => {},
});

export const { reset } = goalSlice.actions;

export default goalSlice.reducer;
