import React from "react";
import "./App.css";
import Customers from "./components/customers/customers";
import Main from "./main";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Customers />
        <Main />
      </header>
    </div>
  );
}

export default App;
