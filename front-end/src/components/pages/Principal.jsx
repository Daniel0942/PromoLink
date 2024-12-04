import { useState } from "react"
import CaixaProdutos from "../utilidades_principal/CaixaProdutos"
import HeaderPrincipal from "../utilidades_principal/HeaderPrincipal"
import MiniForm from "../utilidades_principal/MiniForm"
import Message from "../utilidades_global/Message"
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios"
import Loading from "../utilidades_global/Loading"

function Principal() {
    let location = useLocation() //buscar state da página
    let username = location.state?.username || "Visitante" //armazenar state do username
    let gerenciador = []
    let [site, setSite] = useState("")
    let [carregamento, setCarregamento] = useState(false)
    let [pesquisa, setPesquisa] = useState()
    let navigate = useNavigate()
    let principalAtivo = true

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

    // função para enviar o site para o back-end 
    function EnviarSite(e) {
        e.preventDefault()
        setCarregamento(true)
        axios.post(`http://127.0.0.1:5000/produtos/${site}`)
        .then(()=> {
            setCarregamento(false)
            EnviarSiteHistorico()   
            navigate("/principal/produtos", {state: {username}})
        })
        .catch(error => {
            console.error(`Ocorreu o erro: ${error}`)
            setCarregamento(false)
        })
    }
    
    // enviar o site para o back-end colocar no historico
    function EnviarSiteHistorico() {
        axios.post(`http://127.0.0.1:5000/historico`, {
            username_id: username,
            site: site
        })
        .catch(erro => {console.error(`Ocorreu ao enviar o siteHistorico: ${erro}`)})
    }

    // enviar produto para o back-end adicionar ele à tabela favoritos
    async function adicionarFavorito(link, produto, preco, url) {
        setCarregamento(true)
        try {
            let response = await axios.post("http://127.0.0.1:5000/favoritos", {
                username_id: username,
                link: link,
                site: site,
                produto: produto,
                preco: preco,
                url: url
            })
            setCarregamento(false)
            setMessage(true)
            let msg = response.data.Success || "Falha na conexão com o servidor"
            showMessage(msg, "sucess")
        }
        catch (err) {
            setCarregamento(false)
            console.error(`Deu erro ao adicionar produto aos favoritos: ${err}`)
            let msg = err.response.data.Error || "Falha na conexão com o servidor"
            showMessage(msg, "danger")
        }
    }

    // função para mandar a pesquisa para o back-end, ai o back-end faz a busca e retorna resultado completo
    async function PesquisarProduto() {
        setCarregamento(true)
        console.log("Produto chamado com sucesso")
        try {
            let response = await axios.post(`http://127.0.0.1:5000/pesquisar/${pesquisa}`)
            setCarregamento(false)
            let msg = response.data.Success || "Falha na conexão com o servidor"
            showMessage(msg, "sucess")
            navigate("/principal/pesquisa", {state: {username}})
        }
        catch (err) {
            setCarregamento(false)
            console.error(`Ocorreu o erro: ${err}`)
            let msg = err.response.data.Error || "Falha na conexão com o servidor"
            showMessage(msg, "danger")
        }
    }

    return (
        <>
            <HeaderPrincipal username={username} setPesquisa={setPesquisa} 
            PesquisarProduto={PesquisarProduto} principalAtivo={principalAtivo}/>
            <MiniForm setSite={setSite} função={EnviarSite}/>
            {carregamento && <Loading/>}
            {message && <Message txt={msgTXT} estilo={estilo}/>}
            <CaixaProdutos 
            gerenciador={gerenciador} adicionarFavorito={adicionarFavorito}/>
        </>
    )
}
export default Principal