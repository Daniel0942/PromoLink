import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Login from "./components/pages/Login";
import Registrar from "./components/pages/Registrar";
import Principal from "./components/pages/Principal";
import Historico from "./components/pages/Historico";
import Favoritos from "./components/pages/Favoritos";
import Pesquisa from "./components/pages/Pesquisa";
import Produtos from "./components/pages/Produtos";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/registrar" element={<Registrar/>}/>
        <Route path="/principal" element={<Principal/>}/>
        <Route path="/principal/produtos" element={<Produtos/>}/>
        <Route path="/principal/historico" element={<Historico/>}/>
        <Route path="/principal/favoritos" element={<Favoritos/>}/>
        <Route path="/principal/pesquisa" element={<Pesquisa/>}/>
      </Routes>
    </Router>
  );
}

export default App;
