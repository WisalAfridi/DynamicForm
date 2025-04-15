import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";

const LivePreview = () => {
  const fields = useSelector((state: RootState) => state.form.fields);

  return (
    <div style={{ padding: "1rem", border: "1px solid #ddd" }}>
      <h2>Live Preview</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const form = e.currentTarget as HTMLFormElement;
          const formData = new FormData(form);

          const values: Record<string, FormDataEntryValue> = {};
          for (const [key, value] of formData.entries() as Iterable<
            [string, FormDataEntryValue]
          >) {
            values[key] = value;
          }

          console.log("Submitted Values:", values);
        }}
      >
        {fields.map((field) => {
          const commonProps = {
            name: field.id,
            required: field.required,
            placeholder: field.placeholder,
          };

          return (
            <div key={field.id} style={{ marginBottom: "1rem" }}>
              <label>
                {field.label}
                <br />
                {field.type === "text" || field.type === "number" ? (
                  <input type={field.type} {...commonProps} />
                ) : field.type === "checkbox" ? (
                  <input type="checkbox" {...commonProps} />
                ) : field.type === "radio" ? (
                  field.options?.map((option, index) => (
                    <div key={index}>
                      <label>
                        <input
                          type="radio"
                          name={field.id}
                          value={option}
                          required={field.required}
                        />
                        {option}
                      </label>
                    </div>
                  ))
                ) : null}
              </label>
            </div>
          );
        })}

        {fields.length > 0 && <button type="submit" style={{backgroundColor:" blue",color:"white"}}>Submit</button>}
      </form>
    </div>
  );
};

export default LivePreview;
