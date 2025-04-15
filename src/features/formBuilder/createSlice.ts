import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormField } from "./types";
// import { v4 as uuidv4 } from "uuid"; //for normal form builder
interface FormState {
  fields: FormField[];
}

// const initialState: FormState = {
//   fields: [],     //for normal form builder
// };

const initialState: FormState = {
  fields: JSON.parse(localStorage.getItem("formFields") || "[]"), // Load from localStorage
};
const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    // addField: (state, action: PayloadAction<Omit<FormField, "id">>) => {
    //   state.fields.push({
    //     id: uuidv4(),
    //     ...action.payload,     //for normal form builder
    //   });
    // },
    addField: (state, action: PayloadAction<Omit<FormField, "id">>) => {
      const newField = { ...action.payload, id: new Date().toISOString() };
      state.fields.push(newField);
      localStorage.setItem("formFields", JSON.stringify(state.fields)); // Save to localStorage
    }, // save to localStorage
    // updateField: (state, action: PayloadAction<FormField>) => {
    //   const index = state.fields.findIndex((f) => f.id === action.payload.id);
    //   if (index !== -1) {
    //     state.fields[index] = action.payload;
    //   } // for normal dynamic form builder
    // },

    updateField: (state, action: PayloadAction<FormField>) => {
      const index = state.fields.findIndex((f) => f.id === action.payload.id);
      if (index !== -1) {
        state.fields[index] = action.payload;
        localStorage.setItem("formFields", JSON.stringify(state.fields)); // Save to localStorage
      }
    },
    removeField: (state, action: PayloadAction<string>) => {
      state.fields = state.fields.filter(
        (field) => field.id !== action.payload
      );
      localStorage.setItem("formFields", JSON.stringify(state.fields)); // Save to localStorage
    },
    // removeField: (state, action: PayloadAction<string>) => {
    //   state.fields = state.fields.filter((f) => f.id !== action.payload);
    // }, // for normal dynamic form builder
  },
});

export const { addField, updateField, removeField } = formSlice.actions;
export default formSlice.reducer;
