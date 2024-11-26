import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Login from "./components/pages/Login";
import Registrar from "./components/pages/Registrar";
import Principal from "./components/pages/Principal";
import Historico from "./components/pages/Historico";
import Favoritos from "./components/pages/Favoritos";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/registrar" element={<Registrar/>}/>
        <Route path="/principal" element={<Principal/>}/>
        <Route path="/principal/historico" element={<Historico/>}/>
        <Route path="/principal/favoritos" element={<Favoritos/>}/>
      </Routes>
    </Router>
  );
}

export default App;
