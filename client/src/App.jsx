import React, { useState } from "react";
import axios from "axios";
import './App.css'

function App() {
  const [res, setRes] = useState("apple");

  async function backEndRequestExample() {
    const response = await axios.get('http://localhost:5000/api');
    setRes(response.data["fruit"]);
  }
  
  return (
    <div>
      <h1>{res}</h1>
    </div>
  )
}

export default App
