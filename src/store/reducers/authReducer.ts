import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword, User } from "firebase/auth";
import { auth } from "../../firebase";

interface AuthState {
  isLoggedIn: boolean;
  userId?: string;
  user?: User;
  isLoading: boolean;
  authError?: unknown;
}

const initState: AuthState = {
  isLoggedIn: false,
  userId: undefined,
  user: undefined,
  isLoading: false,
};

export type UserCredentials = {
  userEmail: string;
  userPassword: string;
};

//signinThunk
export const signInUser = createAsyncThunk(
  "user/signIn",
  async (userCredentials: UserCredentials, { rejectWithValue }) => {
    try {
      const userResults = await signInWithEmailAndPassword(
        auth,
        userCredentials.userEmail,
        userCredentials.userPassword
      );
      return userResults;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//signout
export const signOutUser = createAsyncThunk("user/signout", async () => {
  try {
    await auth.signOut();
    return;
  } catch (error) {
    return error;
  }
});

//registerUser

const authSlice = createSlice({
  name: "User",
  initialState: initState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(signOutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        signOutUser.rejected,
        (state, action: PayloadAction<unknown>) => {
          state.isLoading = false;
          state.authError = action.payload;
        }
      )
      .addCase(signOutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = undefined;
        state.authError = undefined;
        state.isLoggedIn = false;
        state.userId = undefined;
      })

      .addCase(signInUser.pending, (state: AuthState) => {
        state.isLoggedIn = false;
        state.user = undefined;
        state.userId = undefined;
        state.isLoading = true;
      })
      .addCase(signInUser.rejected, (state, action: PayloadAction<unknown>) => {
        state.authError = action.payload;
        state.isLoading = false;
        state.user = undefined;
        state.userId = undefined;
        state.isLoggedIn = false;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.authError = undefined;
        state.isLoading = false;
        state.userId = action.payload.user.email!;
        state.isLoggedIn = true;
      });
  },
});

export default authSlice.reducer;
