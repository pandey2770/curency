import React from "react";
import "./App.css";
import { useSelector } from "react-redux";

import CalculateRate from "../CalculateRate";
function App() {
  const { loader } = useSelector(state => state.constData);
  return (
    <div>
      {loader && (
        <div className="modal">
          <div className="modal-content-loader">
            <div class="loader"></div>
          </div>
        </div>
      )}
      <CalculateRate />
    </div>
  );
}

export default App;
