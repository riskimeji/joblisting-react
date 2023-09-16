import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  pesan: "",
  subscriptionMessage: "",
};

export const subscriptionUser = createAsyncThunk(
  "user/Subscription",
  async (subscription, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/subscription",
        {
          name: subscription.name,
          email: subscription.email,
        }
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        const subscriptionMessage = error.response.data;
        return thunkAPI.rejectWithValue(subscriptionMessage);
      }
    }
  }
);

export const LoginUser = createAsyncThunk(
  "user/LoginUser",
  async (user, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/login",
        {
          email: user.email,
          password: user.password,
        }
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        const pesan = error.response.data.msg;
        return thunkAPI.rejectWithValue(pesan);
      }
    }
  }
);
export const getMe = createAsyncThunk("user/getMe", async (_, thunkAPI) => {
  try {
    const response = await axios.get("http://localhost:5000/api/auth/me");
    return response.data;
  } catch (error) {
    if (error.response) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
});

export const LogOut = createAsyncThunk("user/logOut", async () => {
  await axios.delete("http://localhost:5000/api/user/logout");
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(LoginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(LoginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(LoginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.pesan = action.payload;
    });

    //Get User Login
    builder.addCase(getMe.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(getMe.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    //Subscription User
    builder.addCase(subscriptionUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(subscriptionUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.subscriptionMessage = action.payload;
    });
    builder.addCase(subscriptionUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.subscriptionMessage = action.payload;
    });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
