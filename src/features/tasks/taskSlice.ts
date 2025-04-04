import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchTasks,
  createTask,
  updateTask as updateTaskAPI,
  deleteTask as deleteTaskAPI,
} from "./taskAPI";

interface Task {
  id: string;
  title: string;
  description: string;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
}

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  loading: false,
  error: null,
};

// Async thunks
export const fetchTasksAsync = createAsyncThunk(
  "tasks/fetchTasks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchTasks();
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch tasks"
      );
    }
  }
);

export const createTaskAsync = createAsyncThunk(
  "tasks/createTask",
  async (taskData: Omit<Task, "id">, { rejectWithValue }) => {
    console.log({ taskData });
    try {
      const response = await createTask(taskData);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create task"
      );
    }
  }
);

export const updateTaskAsync = createAsyncThunk(
  "tasks/updateTask",
  async (
    { id, taskData }: { id: string; taskData: Partial<Task> },
    { rejectWithValue }
  ) => {
    try {
      const response = await updateTaskAPI(id, taskData);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update task"
      );
    }
  }
);

export const deleteTaskAsync = createAsyncThunk(
  "tasks/deleteTask",
  async (id: string, { rejectWithValue }) => {
    try {
      await deleteTaskAPI(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete task"
      );
    }
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Tasks
      .addCase(fetchTasksAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchTasksAsync.fulfilled,
        (state, action: PayloadAction<Task[]>) => {
          state.loading = false;
          state.tasks = action.payload;
        }
      )
      .addCase(fetchTasksAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create Task
      .addCase(createTaskAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createTaskAsync.fulfilled,
        (state, action: PayloadAction<Task>) => {
          state.loading = false;
          state.tasks.push(action.payload);
        }
      )
      .addCase(createTaskAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update Task
      .addCase(updateTaskAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateTaskAsync.fulfilled,
        (state, action: PayloadAction<Task>) => {
          state.loading = false;
          state.tasks = state.tasks.map((task) =>
            task.id === action.payload.id ? action.payload : task
          );
        }
      )
      .addCase(updateTaskAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete Task
      .addCase(deleteTaskAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteTaskAsync.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.tasks = state.tasks.filter(
            (task) => task.id !== action.payload
          );
        }
      )
      .addCase(deleteTaskAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default taskSlice.reducer;
