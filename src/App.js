import React from "react";
import Body from "./Component/body";
// import Header from "./Component/Header"; // Unused import removed
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>GitHub Profiles</h1>
      </header>
      <main>
        <Body />
      </main>
    </div>
  );
}

export default App;
