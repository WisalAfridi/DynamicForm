export interface FormField {
  id: string;
  type: "text" | "number" | "checkbox" | "radio";
  label: string;
  required: boolean;
  options?: string[]; // For radio buttons
  placeholder?: string;
}
