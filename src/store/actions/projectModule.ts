import { createAsyncThunk } from "@reduxjs/toolkit"
import { Project } from "../../models/Projects"

export const createProject = createAsyncThunk(
    'projects/createProject' ,
async (project:Project, {rejectWithValue}) =>{

    try {
        // call firestore with passed in project...
    } catch (error) {
        return rejectWithValue(error);
    }
}
);


