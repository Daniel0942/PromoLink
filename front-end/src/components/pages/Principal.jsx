import { useState } from "react"
import CaixaProdutos from "../utilidades_principal/CaixaProdutos"
import HeaderPrincipal from "../utilidades_principal/HeaderPrincipal"
import MiniForm from "../utilidades_principal/MiniForm"
import Message from "../utilidades_global/Message"
import { useLocation } from "react-router-dom"
import axios from "axios"

function Principal() {
    let location = useLocation() //buscar state da página
    let username = location.state?.username || "Visitante" //armazenar state do username
    let [site, setSite] = useState("")
    let [gerenciador, setGerenciador] = useState([])
    let [carregamento, setCarregamento] = useState(false)
    
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
            BuscarProdutos()
            EnviarSiteHistorico()
        })
        .catch(error => {
            console.error(`Ocorreu o erro: ${error}`)
        })
    }
    
    // Função para buscar os produtos do back-end
    async function BuscarProdutos() {
        try {
            let response = await axios.get("http://127.0.0.1:5000/produtos")
            setGerenciador(response.data) // Atualiza com os produtos
        } 
        catch (err) {
            console.error(`Erro ao buscar produtos: ${err}`);
            // Verifica se tem resposta, se não tiver há uma falha na conexão.
            let mensagemErro = err.response.data.Error || "Falha na conexão com o servidor!"
            showMessage(mensagemErro, "danger")
        }
        finally {setCarregamento(false)}
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
    function adicionarFavorito(produto, preco, url) {
        setCarregamento(true)
        axios.post("http://127.0.0.1:5000/favoritos", {
            username_id: username,
            site: site,
            produto: produto,
            preco: preco,
            url: url
        })
        .then((response) => {
            setCarregamento(false)
            setMessage(true)
            let msg = response.data.Success || "Falha na conexão com o servidor"
            showMessage(msg, "sucess")
        })
        .catch((err) => {
            setCarregamento(false)
            console.error(`Deu erro ao adicionar produto aos favoritos: ${err}`)
            let msg = err.response.data.Error || "Falha na conexão com o servidor"
            showMessage(msg, "danger")
        })
    }
    return (
        <>
            <HeaderPrincipal username={username}/>
            <MiniForm setSite={setSite} função={EnviarSite}/>
            {message && <Message txt={msgTXT} estilo={estilo}/>}
            <CaixaProdutos 
            gerenciador={gerenciador} 
            carregamento={carregamento}
            adicionarFavorito={adicionarFavorito}
            />
        </>
    )
}
export default Principal