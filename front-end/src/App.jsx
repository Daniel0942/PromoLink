import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Login from "./components/pages/Login";
import Registrar from "./components/pages/Registrar";
import Principal from "./components/pages/Principal";
import Historico from "./components/pages/Historico";
import Favoritos from "./components/pages/Favoritos";
import Pesquisa from "./components/pages/Pesquisa";
import Produtos from "./components/pages/Produtos";
import RefreshToken from "./components/pages/RefreshToken";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/registrar" element={<Registrar/>}/>
        <Route path="/principal" element={<RefreshToken><Principal/></RefreshToken>}/>
        <Route path="/principal/produtos" element={<RefreshToken><Produtos/></RefreshToken>}/>
        <Route path="/principal/historico" element={<RefreshToken><Historico/></RefreshToken>}/>
        <Route path="/principal/favoritos" element={<RefreshToken><Favoritos/></RefreshToken>}/>
        <Route path="/principal/pesquisa" element={<RefreshToken><Pesquisa/></RefreshToken>}/>
      </Routes>
    </Router>
  );
}

export default App;
