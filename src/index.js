import React from "react";
import ReactDOM from "react-dom/client";
import { data } from "./data";
import "./index.css";
import ScrollPanel from "./ScrollPanel";
import SomeContent from "./SomeContent";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div className="mainProjectWrapper">
    <SomeContent />
    <ScrollPanel data={data} />
    <SomeContent />
  </div>
);
