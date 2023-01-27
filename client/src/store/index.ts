import { configureStore } from "@reduxjs/toolkit"
import todosReducer from "./reducers/todosReducer"

interface TodosState {
  todos: { id: number; text: string }[]
}

export interface RootState {
  todos: TodosState
}

const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
})

export type AppDispatch = typeof store.dispatch

export default store
