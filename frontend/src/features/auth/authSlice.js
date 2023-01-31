import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//Get user from local storage from reading the user
const user = JSON.parse(localStorage.getItem("user"));

//Create initial state for our authentication
const initialState = {
  user: user ? user : "null",
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Create the slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  //not async
  reducers: {
    //reset some intial state values
    reset: (state) => {
      (state.isLoading = false), (state.isError = false);
      (state.isSuccess = false), (state.message = "");
    },
  },
  extraReducers: () => {},
});
//Bring our reducer function to other compoenents
export const { reset } = authSlice.actions;
export default authSlice.reducer;
