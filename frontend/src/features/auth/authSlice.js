import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

//Get user from local storage from reading the user
const user = JSON.parse(localStorage.getItem("user"));

//Create initial state for our authentication
const initialState = {
  user: user ? user : null,
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
      //Waiting for user data
      return await authService.register(user);
      //Handle error from request
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Login user
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    //Waiting for user data
    return await authService.login(user);
    //Handle error from request
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

//Logout User
export const logout = createAsyncThunk("/auth/logout", async () => {
  await authService.logout();
});

//Create the slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  //Are not async
  reducers: {
    //Reset action
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  //Account for pending, fulfilled, and reject
  //Async thunk function
  extraReducers: (builder) => {
    builder

      //-----------------REGISTER-----------------
      //Check for pending during register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      //If we got data back we want to do an action
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      //--------------------LOGOUT----------------
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      //--------------------LOGIN-----------------
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      //If we got data back we want to do an action
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      });
  },
});
//Bring our reducer function to other compoenents
export const { reset } = authSlice.actions;
export default authSlice.reducer;
