import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"

export const fetchTodos = createAsyncThunk("todosReducer/fetchTodos", async () => {
  const response = await axios.get("https://jsonplaceholder.typicode.com/todos")
  return response.data
})

interface Todo {
  id: number
  text: string
  completed?: boolean
}

interface TodosState {
  todos: Todo[]
  status?: "loading" | "succeeded" | "failed"
  error?: string
}

const initialState: TodosState = {
  todos: [],
}

const todosSlice: any = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload)
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find((t) => t.id === action.payload)
      if (todo) {
        todo.completed = !todo.completed
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.todos = action.payload
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
  },
})

export const { addTodo, toggleTodo } = todosSlice.actions

export default todosSlice.reducer
