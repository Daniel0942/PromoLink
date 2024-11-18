import CaixaProdutos from "../utilidades_principal/CaixaProdutos"
import HeaderPrincipal from "../utilidades_principal/HeaderPrincipal"
import MiniForm from "../utilidades_principal/MiniForm"
import { useLocation } from "react-router-dom"

function Principal() {
    let location = useLocation() //buscar state da página
    let username = location.state?.username || "Visitante" //armazenar state do username

    return(
        <>
            <HeaderPrincipal username={username}/>
            <MiniForm/>
            <CaixaProdutos/>
        </>
    )
}
export default Principal