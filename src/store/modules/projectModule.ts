import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { Project } from "../../models/Projects";

export interface ProjectState {
  projects: Project[];
  isLoading: boolean;
  errorMessage?: unknown;
  currentProject?: Project;
}

const initState: ProjectState = {
  projects: [],
  isLoading: false,
  errorMessage: undefined,
};

interface ProjectPayload {
  project: Project;
}

export const createProject = createAsyncThunk(
  "projects/createProject",
  async (project: Project, { rejectWithValue }) => {
    try {
      const docRef = await addDoc(collection(db, "projects"), {
        ...project,
        createdAt: new Date(),
      });

      const newProject: Project = { id: docRef.id, ...project };

      return newProject;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getProjectsByUserId = createAsyncThunk(
  "projects/getProjectByUserId",
  async (userId: string, { rejectWithValue }) => {
      try {
        if (!userId) {
          return rejectWithValue("No User!");
        } 
        const q = query(
          collection(db, "projects"),
          where("userId", "==", userId)
        );
        const querySnapShot = await getDocs(q);
        const projects: Project[] = [];

        querySnapShot.forEach((doc) => {
          projects.push({ id: doc.id, ...(doc.data() as Project) });
        });
        return projects;
      } catch (error) {
        return rejectWithValue(error);
      }
    
  }
);
export const getProjectByProjectId = createAsyncThunk(
  "projects/getProjectByProjectId",
  async (projectId: string, { rejectWithValue }) => {
    try {
      if (!projectId) {
        return rejectWithValue("No ProjectId !");
      } 
      const docRef = doc(db, "projects", projectId);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        return rejectWithValue("Project not found");
      }

      return { id: docSnap.id, ...(docSnap.data() as Project) };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const projectSlice = createSlice({
  name: "projects",
  initialState: initState,
  reducers: {
    setCurrentProject(state, action: PayloadAction<ProjectPayload>) {
      state.currentProject = action.payload.project;
    },
    clearCurrentProject(state) {
      state.currentProject = undefined;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(createProject.pending, (state: ProjectState) => {
        state.isLoading = true;
        state.errorMessage = undefined;
        state.currentProject = undefined;
      })
      .addCase(
        createProject.fulfilled,
        (state, action: PayloadAction<Project>) => {
          state.projects.push(action.payload);
          state.isLoading = false;
          state.currentProject = undefined;
        }
      )
      .addCase(
        createProject.rejected,
        (state, action: PayloadAction<unknown>) => {
          state.isLoading = false;
          state.errorMessage = action.payload;
        }
      )
      .addCase(getProjectsByUserId.pending, (state: ProjectState) => {
        state.isLoading = true;
        state.errorMessage = undefined;
        state.currentProject = undefined;
      })
      .addCase(
        getProjectsByUserId.fulfilled,
        (state, action: PayloadAction<Project[]>) => {
          state.isLoading = false;
          state.errorMessage = undefined;
          state.projects = action.payload;
        }
      )
      .addCase(
        getProjectsByUserId.rejected,
        (state, action: PayloadAction<unknown>) => {
          state.isLoading = false;
          state.errorMessage = action.payload;
        }
      )
      .addCase(getProjectByProjectId.pending, (state: ProjectState) => {
        state.isLoading = true;
        state.errorMessage = undefined;
        state.currentProject = undefined;
      })
      .addCase(
        getProjectByProjectId.fulfilled,
        (state, action: PayloadAction<Project>) => {
          state.isLoading = false;
          state.errorMessage = undefined;
          state.currentProject = action.payload;
        }
      )
      .addCase(
        getProjectByProjectId.rejected,
        (state, action: PayloadAction<unknown>) => {
          state.isLoading = false;
          state.errorMessage = action.payload;
        }
      ),
});

export default projectSlice.reducer;
