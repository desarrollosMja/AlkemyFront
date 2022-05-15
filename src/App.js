import './App.css';
import { Routes, Route } from "react-router-dom"
import Login from "./components/login/login.js"
import Session from "./components/session/session.js"

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/session' element={<Session/>}/>
    </Routes>
  );
}

export default App;
