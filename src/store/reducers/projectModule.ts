import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Project } from "../../models/Projects";
import {  addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";

interface ProjectError {
  errorMessage: string
}
export interface ProjectState {
  projects: Project[];
  isLoading: boolean;
  errorMessage?: unknown;
}

const initState: ProjectState = {
  projects: [],
  isLoading: false,
  errorMessage:undefined
};

export const createProject = createAsyncThunk<
  Project,
  Project,
  { rejectValue: ProjectError }
>("projects/createProject", async (project: Project, rejectWithValue) => {
  try {
     const docRef = await addDoc(
      collection(db, 'projects'),
      {...project,
        authorFirstName:"omes",
        authorFirstLame: "faheehzz",
        userId:"omesf1",
        createdAt: new Date()
      }
    );
    
    const newProject:Project = {id: docRef.id ,...project}

    return  newProject;

  } catch (error) {
    return rejectWithValue.rejectWithValue(error as ProjectError);
  }
});


export const getProjectsByUserId = createAsyncThunk(
    "projects/createProject",
    async (userId:string, { rejectWithValue }) => {
      try {
        // call firestore with passed in project...
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );
  
  export const deleteProjectByProjectId = createAsyncThunk(
    "projects/createProject",
    async (projectId: string, { rejectWithValue }) => {
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
      .addCase(createProject.pending, (state:ProjectState) => {
        state.isLoading = true;
        state.errorMessage = undefined;
      })
      // add logic to get action.payload
      .addCase(createProject.fulfilled, (state , action: PayloadAction<Project>) => {
        console.log( "ACTIOn . PAYLOAD",action.payload)
        console.log("state.projects: "  , state.projects)
        state.projects.push(action.payload)
        state.isLoading = false;
      })
      //add logic to get error 
      .addCase(createProject.rejected, (state , action: PayloadAction<unknown>) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
        state
      }),
}); 

export default projectSlice.reducer;
