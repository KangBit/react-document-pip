import "./App.css";
import { useState } from "react";

import DocumentPip from "@/components/DocumentPIP";
import PIPContent from "@/components/PIPContent";

function App() {
  const [isPipOpen, setIsPipOpen] = useState(false);

  return (
    <>
      <div style={{ width: "500px", height: "200px" }}>
        <DocumentPip
          isPipOpen={isPipOpen}
          onClose={() => setIsPipOpen(false)}
          size={{ width: 500, height: 200 }}
        >
          <PIPContent />
        </DocumentPip>
      </div>
      <button onClick={() => setIsPipOpen(!isPipOpen)}>Toggle PIP</button>
    </>
  );
}

export default App;
