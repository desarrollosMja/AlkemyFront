import './App.css';
import { Routes, Route } from "react-router-dom"
import Login from "./components/login/login.js"
import Session from "./components/session/session.js"
import { ProviderContext } from "./components/context/context"

function App() {
  return (
    <ProviderContext>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/session/:userEmail' element={<Session/>}/>
      </Routes>
    </ProviderContext>
  );
}

export default App;
