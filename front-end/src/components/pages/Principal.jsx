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
    let [gerenciador, setGerenciador] = useState([])
    let [carregamento, setCarregamento] = useState(false)

    
    function EnviarSite(e) {
        e.preventDefault()
        setCarregamento(true)
        axios.post(`http://127.0.0.1:5000/produtos/${site}`)
        .then(()=> {
            BuscarProdutos()
        })
        .catch(error => {console.error(`Ocorreu o erro: ${error}`)})
    }

    // Função para buscar os produtos da API
    async function BuscarProdutos() {
        try {
            let response = await axios.get("http://127.0.0.1:5000/produtos")
            setGerenciador(response.data) // Atualiza com os produtos
        } 
        catch (err) {
            console.error(`Ocorreu o erro na caixa de produtos: ${err}`)
        }
        finally {setCarregamento(false)}
    }

    return (
        <>
            <HeaderPrincipal username={username}/>
            <MiniForm setSite={setSite} função={EnviarSite}/>
            <CaixaProdutos 
            gerenciador={gerenciador} 
            carregamento={carregamento}
            />
        </>
    )
}
export default Principal