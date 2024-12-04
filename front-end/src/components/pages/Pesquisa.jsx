import axios from "axios"
import HeaderPrincipal from "../utilidades_principal/HeaderPrincipal"
import { useEffect, useState } from "react"
import Loading from "../utilidades_global/Loading"
import Message from "../utilidades_global/Message"
import CaixaProdutos from "../utilidades_principal/CaixaProdutos"
import { useLocation } from "react-router-dom"
import BtnBack from "../utilidades_global/BtnBack"

function Pesquisa() {
    let location = useLocation() //buscar state da página
    let username = location.state?.username || "Visitante" //armazenar state do username
    let [carregamento, setCarregamento] = useState(false)
    let [gerenciadorPesquisa, setGerenciadorPesquisa] = useState([])

    // função para exibição de mensagens dinâmicas
    let [message, setMessage] = useState(false)
    let [msgTXT, setmsgTXT] = useState()
    let [estilo, setEstilo] = useState()
    function showMessage(txt, style) {
        setMessage(true)
        setmsgTXT(txt)
        setEstilo(style)
        setTimeout(() => {
            setMessage(false)
        }, 3000)
    }

    // Função para buscar todo o resultado da pesquisa
    useEffect(() => {
        setCarregamento(true)
        async function buscarPesquisa() {
            try {
                let response = await axios.get("http://127.0.0.1:5000/pesquisar")
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
    }, [])

    return (
        <>
            <HeaderPrincipal username={username}/>
            {carregamento && <Loading />}
            {message && <Message txt={msgTXT} estilo={estilo}/>}
            <BtnBack/>
            <CaixaProdutos gerenciador={gerenciadorPesquisa}/> 
        </>
    )
}
export default Pesquisa