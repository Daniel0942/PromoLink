import axios from "axios"
import HeaderPrincipal from "../utilidades_principal/HeaderPrincipal"
import { useEffect, useState } from "react"
import Loading from "../utilidades_global/Loading"
import Message from "../utilidades_global/Message"
import CaixaProdutos from "../utilidades_principal/CaixaProdutos"
import { useLocation } from "react-router-dom"
import BtnBack from "../utilidades_global/BtnBack"
import useMessage from "../utilidades_global/MessageFunction.js"

function Pesquisa() {
    let location = useLocation() //buscar state da página
    let username = location.state?.username || "Visitante" //armazenar state do username
    let [carregamento, setCarregamento] = useState(false)
    let [gerenciadorPesquisa, setGerenciadorPesquisa] = useState([])
    let token = localStorage.getItem("token")

    // Usando função importada para visibilidade da mensagem
    const { message, msgTXT, estilo, showMessage } = useMessage();

    // Função para buscar todo o resultado da pesquisa
    useEffect(() => {
        setCarregamento(true)
        let pesquisa = location.state.pesquisa
        if (pesquisa) {
            async function buscarPesquisa() {
                try {
                    let response = await axios.get(
                        `http://127.0.0.1:5000/pesquisar/${pesquisa}`, {
                        headers: {"Authorization": `Bearer ${token}`}
                    })
                    // fazer achatamento da estrutura
                    let lista = response.data.flatMap((lista)=> lista)
                    setGerenciadorPesquisa(lista)
                    setCarregamento(false)
                }
                catch (err) {
                    setCarregamento(false)
                    let msg = err.response.data.Error || "Falha na conexão com o servidor"
                    showMessage(msg, "danger")
                }
            }
            buscarPesquisa()
        } else {
            showMessage("Ocorreu o erro na pesquisa")
        }
        
    }, [location.state.pesquisa])

    return (
        <>
            <HeaderPrincipal username={username}/>
            <BtnBack/>
            <CaixaProdutos username={username}
            gerenciador={gerenciadorPesquisa}/>

            {carregamento && <Loading />}
            {message && <Message txt={msgTXT} estilo={estilo}/>} 
        </>
    )
}
export default Pesquisa