import axios from "axios"
import { useEffect, useState } from "react"
import HeaderPrincipal from "../utilidades_principal/HeaderPrincipal"
import CaixaProdutos from "../utilidades_principal/CaixaProdutos"
import { useLocation } from "react-router-dom"

function Favoritos() {
    let location = useLocation() //buscar state da página
    let username = location.state?.username || "Visitante" 
    let [gerenciadorFavoritos, setGerencidorFavoritos] = useState([])
    let favoritoAtivo = true

    useEffect(()=>{
        async function BuscarFavoritos() {
            try {
                let response = await axios.get(`http://127.0.0.1:5000/favoritos/${username}`)
                setGerencidorFavoritos(response.data)
            } 
            catch (err) {console.error(`Deu o erro: ${err}`)}
            
        }
        BuscarFavoritos()
    }, [username])

    return (
        <>
            <HeaderPrincipal username={username}/>
            <CaixaProdutos gerenciador={gerenciadorFavoritos}
            favoritoAtivo={favoritoAtivo}/>
        </>
    )
}
export default Favoritos