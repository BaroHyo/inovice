import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { InoviceApp } from "./InoviceApp";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <InoviceApp />
  </StrictMode>
);
