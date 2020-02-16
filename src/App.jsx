import React from "react";
import "./App.css";
import SearchForm from "./components/SearchForm";
import MainNav from "./components/MainNav";

function App() {
  return (
    <div className="container">
      <SearchForm />
      <MainNav />
    </div>
  );
}

export default App;
