import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import { auth } from "../../firebase";

interface AuthState {
  isLoggedIn: boolean;
  userId?: string;
  user?: User;
  isLoading: boolean;
  authError?: unknown;
}
interface UserPayload {
  userPayload: User;
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
export const registerUser = createAsyncThunk(
  "user/register",
  async (userCredentials: UserCredentials, { rejectWithValue }) => {
    try {
      const newUser = await createUserWithEmailAndPassword(
        auth,
        userCredentials.userEmail,
        userCredentials.userPassword
      );
      return newUser.user;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const authSlice = createSlice({
  name: "User",
  initialState: initState,
  reducers: {
    setCurrentUser(state, action: PayloadAction<UserPayload>) {
      state.user = action.payload.userPayload;
      state.authError = undefined;
      state.isLoading = false;
      state.isLoggedIn = true;
      state.userId = action.payload.userPayload.uid;
    },
    clearCurrentUser(state) {
      state.user = undefined;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(signOutUser.pending, (state) => {
        state.isLoading = true;
        state.authError = undefined;
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
        state.userId = action.payload.user.uid;
        state.isLoggedIn = true;
      })
      .addCase(registerUser.pending, (state: AuthState) => {
        state.isLoggedIn = false;
        state.isLoading = true;
        state.authError = undefined;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.userId = action.payload?.uid;
        state.isLoggedIn = true;
        state.authError = undefined;

      })
      .addCase(
        registerUser.rejected,
        (state, action: PayloadAction<unknown>) => {
          state.authError = action.payload;
          state.isLoading = false;
          state.user = undefined;
          state.userId = undefined;
          state.isLoggedIn = false;
        }
      );
  },
});

export default authSlice.reducer;
export const setCurrentUserInState =  authSlice.actions.setCurrentUser;
export const clearCurrentUser =  authSlice.actions.clearCurrentUser;