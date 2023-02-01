import React, {useState, useEffect} from "react";
import axios from "axios";
import './App.css';

function App() {
  const BACKEND = "http://127.0.0.1:5000/"
  const [newuser, setNewuser] = useState("");
  const [firstLoad, setFirstLoad] = useState(true);
  const [message, setMessage] = useState("");

  const handleAddUser = () => {
    if (newuser ==="") return;
    var formdata = {
      username: newuser
    }
    axios.post(BACKEND, formdata).then((response) => {
      console.log("response", response);
    })
  }

  useEffect(()=> {
    async function getUser(){
      axios.get(BACKEND).then((res) => {
        console.log("user", res);
        setMessage(res.data.data);
      })
    }
    if (firstLoad){
      getUser();
      setFirstLoad(false);
    }
  },[firstLoad])
  return (
    <div className="App">
      <header className="App-header">
        <p>{message}</p>
        <p>
          Enter new name to add!
        </p>
        <div className="App-row">
          <input className="App-input-username" value = {newuser} onChange = {(e) => setNewuser(e.target.value)} placeholder="James"/>
          <button className="App-button-username" onClick = {()=> handleAddUser()}>Add</button>
        </div>
      </header>
    </div>
  );
}

export default App;
