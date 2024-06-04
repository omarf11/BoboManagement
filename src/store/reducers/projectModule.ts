import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Project } from "../../models/Projects";
import {  addDoc, collection, getDocs, query, where } from "firebase/firestore";
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
>("projects/createProject", async (project: Project, {rejectWithValue}) => {
  try {
     const docRef = await addDoc(
      collection(db, 'projects'),
      {...project,
        createdAt: new Date()
      }
    );
    
    const newProject:Project = {id: docRef.id ,...project}

    return  newProject;

  } catch (error) {
    return rejectWithValue(error as ProjectError);
  }
});


export const getProjectsByUserId = createAsyncThunk(
    "projects/createProject",
    async (userId:string, { rejectWithValue }) => {
      try {

        const q = query(collection(db, "projects"), where("userId", "==", userId));
        const querySnapShot = await getDocs(q);
        const projects:Project[] = [];

        querySnapShot.forEach((doc)=> {
          projects.push({id:doc.id , ...doc.data() as Project})
        })
        
        return projects;

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
        state.projects.push(action.payload)
        state.isLoading = false;
      })
      //add logic to get error 
      .addCase(createProject.rejected, (state , action: PayloadAction<unknown>) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      })
      .addCase(getProjectsByUserId.pending , (state:ProjectState) => {
        state.isLoading = true;
        state.errorMessage = undefined;
      })
      .addCase(getProjectsByUserId.fulfilled , (state, action: PayloadAction<Project[]>) => {
        state.isLoading = false;
        state.errorMessage = undefined;
        state.projects = action.payload;
      })
      .addCase(getProjectsByUserId.rejected , (state , action: PayloadAction<unknown>)  => {
        state.isLoading = false;
        state.errorMessage = action.payload;
      })      
}); 

export default projectSlice.reducer;
