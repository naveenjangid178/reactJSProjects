import { configureStore } from "@reduxjs/toolkit";
import todoReduucer from '../features/todo/todoSlice'

export const store = configureStore({
    reducer: todoReduucer
})