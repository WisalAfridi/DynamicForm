import FormBuilder from "./features/formBuilder/components/FormBuilder";
import LivePreview from "./features/formBuilder/components/LivePreview";

function App() {
  return (
    <div style={{ display: "flex", gap: "2rem", padding: "2rem" }}>
      <FormBuilder />
      <LivePreview />
    </div>
  );
}

export default App;
