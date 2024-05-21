import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Project } from "../../models/Projects";
// import { createProject } from "../actions/projectModule";

export interface ProjectState {
  projects: Project[];
  isLoading: boolean;
}

const initState: ProjectState = {
  projects: [
    { id: "1", title: "help me find peach", content: "blah blah blah" },
    { id: "2", title: "collect all the stars", content: "blah blah blah" },
    { id: "3", title: "egg hunt with yoshi", content: "blah blah blah" },
  ],
  isLoading: false,
};

export const createProject = createAsyncThunk(
  "projects/createProject",
  async (project: Project, { rejectWithValue }) => {
    try {
      // call firestore with passed in project...
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const getProjects = createAsyncThunk(
    "projects/createProject",
    async (project: Project, { rejectWithValue }) => {
      try {
        // call firestore with passed in project...
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );
  
  export const deleteProject = createAsyncThunk(
    "projects/createProject",
    async (project: Project, { rejectWithValue }) => {
      try {
        // call firestore with passed in project...
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );

const projectSlice = createSlice({
  name: "projects",
  initialState: initState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(createProject.pending, (state) => {
        state.projects = [];
        state.isLoading = true;
      })
      // add logic to get action.payload
      .addCase(createProject.fulfilled, (state) => {
        state.projects = [];
        state.isLoading = false;
      })
      .addCase(createProject.rejected, (state) => {
        state.isLoading = false;
        state.projects = [];
      }),
});

export default projectSlice.reducer;
