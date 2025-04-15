import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { addField, removeField, updateField } from "../createSlice";
import { FormField } from "../types";
import { useState } from "react";

const FormBuilder = () => {
  const dispatch = useDispatch();
  const fields = useSelector((state: RootState) => state.form.fields);

  const [selectedType, setSelectedType] = useState<
    "text" | "number" | "checkbox" | "radio"
  >("text");

  const handleAddField = () => {
    const newField: Omit<FormField, "id"> = {
      type: selectedType,
      label: `${selectedType} field`,
      required: false,
      placeholder:
        selectedType === "text" || selectedType === "number"
          ? "Enter value"
          : undefined,
      options: selectedType === "radio" ? ["Option 1", "Option 2"] : undefined,
    };
    dispatch(addField(newField));
  };

  //   const handleRemove = (id: string) => {
  //     dispatch(removeField(id));
  //   };

  return (
    <div style={{ padding: "2rem", border: "1px solid #ddd" }}>
      <h2>Form Builder</h2>

      <select
        value={selectedType}
        onChange={(e) =>
          setSelectedType(
            e.target.value as "text" | "number" | "checkbox" | "radio"
          )
        }
      >
        <option value="text">Text</option>
        <option value="number">Number</option>
        <option value="checkbox">Checkbox</option>
        <option value="radio">Radio</option>
      </select>

      <button
        onClick={handleAddField}
        style={{
          marginLeft: "1rem",
          backgroundColor: "blue",
          color: "white",
          border: "none",
          padding: "0.5rem",
          borderRadius: "5px",
        }}
      >
        Add Field
      </button>
      <ul>
        {fields.map((field) => (
          <li
            key={field.id}
            style={{
              marginTop: "1rem",
              border: "1px solid #ccc",
              padding: "1rem",
            }}
          >
            <strong>{field.type.toUpperCase()} FIELD</strong>

            {/* Label */}
            <div>
              <label>Label: </label>
              <input
                type="text"
                value={field.label}
                onChange={(e) =>
                  dispatch(updateField({ ...field, label: e.target.value }))
                }
              />
            </div>

            {/* Placeholder (for text and number) */}
            {(field.type === "text" || field.type === "number") && (
              <div>
                <label>Placeholder: </label>
                <input
                  type="text"
                  value={field.placeholder || ""}
                  onChange={(e) =>
                    dispatch(
                      updateField({ ...field, placeholder: e.target.value })
                    )
                  }
                />
              </div>
            )}

            {/* Required Toggle */}
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={field.required}
                  onChange={(e) =>
                    dispatch(
                      updateField({ ...field, required: e.target.checked })
                    )
                  }
                />
                Required
              </label>
            </div>

            {/* Radio Options */}
            {field.type === "radio" && (
              <div>
                <label>Options (comma separated): </label>
                <input
                  type="text"
                  value={field.options?.join(", ") || ""}
                  onChange={(e) =>
                    dispatch(
                      updateField({
                        ...field,
                        options: e.target.value
                          .split(",")
                          .map((opt) => opt.trim()),
                      })
                    )
                  }
                />
              </div>
            )}

            <button
              onClick={() => dispatch(removeField(field.id))}
              style={{
                marginTop: "0.5rem",
                backgroundColor: "red",
                color: "white",
                border: "none",
                padding: "0.5rem",
                borderRadius: "5px",
              }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      {/* <ul>
        {fields.map((field) => (
          <li key={field.id} style={{ marginTop: "1rem" }}>
            <strong>{field.label}</strong> ({field.type})
            <button
              onClick={() => handleRemove(field.id)}
              style={{ marginLeft: "1rem" }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default FormBuilder;
