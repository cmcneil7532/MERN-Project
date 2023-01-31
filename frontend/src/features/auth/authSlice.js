import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

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

//Register User
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
      //Handle error from request
    } catch (error) {
      const message =
        (error.response && error.response.data && error.data.message) ||
        error.message ||
        error / toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Create the slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //Reset action
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: () => {},
});
//Bring our reducer function to other compoenents
export const { reset } = authSlice.actions;
export default authSlice.reducer;
