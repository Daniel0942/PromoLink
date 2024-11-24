import { useState } from "react"
import CaixaProdutos from "../utilidades_principal/CaixaProdutos"
import HeaderPrincipal from "../utilidades_principal/HeaderPrincipal"
import MiniForm from "../utilidades_principal/MiniForm"
import { useLocation } from "react-router-dom"
import axios from "axios"

function Principal() {
    let location = useLocation() //buscar state da página
    let username = location.state?.username || "Visitante" //armazenar state do username
    let [site, setSite] = useState("")
    
    function EnviarSite(e) {
        e.preventDefault()
        axios.post(`http://127.0.0.1:5000/produtos/${site}`)
        .catch(error => {console.error(`Ocorreu o erro: ${error}`)})
    }
    return(
        <>
            <HeaderPrincipal username={username}/>
            <MiniForm setSite={setSite} função={EnviarSite}/>
            <CaixaProdutos/>
        </>
    )
}
export default Principal