import { useState } from "react"
import CaixaProdutos from "../utilidades_principal/CaixaProdutos"
import HeaderPrincipal from "../utilidades_principal/HeaderPrincipal"
import MiniForm from "../utilidades_principal/MiniForm"
import Message from "../utilidades_global/Message"
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios"
import Loading from "../utilidades_global/Loading"
import useMessage from "../utilidades_global/MessageFunction.js"

function Principal() {
    let token = localStorage.getItem("token")
    let location = useLocation() //buscar state da página
    let username = location.state?.username || "Visitante" //armazenar state do username
    let gerenciador = []
    let [site, setSite] = useState("")
    let [carregamento, setCarregamento] = useState(false)
    let [pesquisa, setPesquisa] = useState()
    let navigate = useNavigate()
    let principalAtivo = true

    // Usando função importada para visibilidade da mensagem
    const { message, msgTXT, estilo, showMessage } = useMessage();

    // função para enviar o site para o back-end 
    async function EnviarSite(e) {
        e.preventDefault()
        setCarregamento(true)

        if (site.length > 0) {
            // em post, o primeiro dicionário é o body e o segundo o headers
            await axios.post(`http://127.0.0.1:5000/produtos/${site}`, {}, {
                headers: {"Authorization": `Bearer ${token}`}
            })
            .then(()=> {
                setCarregamento(false)
                EnviarSiteHistorico()   
                navigate("/principal/produtos", {state: {username, site}})
            })
            .catch(error => {
                console.error(`Ocorreu o erro: ${error}`)
                setCarregamento(false)
                let msg = error.response.Error || "Falha na conexão com o servidor"
                showMessage(msg, "danger")
            })
        }
        else { 
            setCarregamento(false)
            showMessage("Escolha um das opções", "danger")
        } 
    }
    
    // enviar o site para o back-end colocar no historico
    function EnviarSiteHistorico() {
        axios.post(`http://127.0.0.1:5000/historico`, {
            username_id: username,
            site: site
        },
        {
            headers: {"Authorization": `Bearer ${token}`}
        })
        .catch(erro => {console.error(`Ocorreu ao enviar o siteHistorico: ${erro}`)})
    }

    // função para mandar a pesquisa para o back-end, ai o back-end faz a busca e retorna resultado completo
    async function PesquisarProduto() {
        if (pesquisa) {
            setCarregamento(true)
            try {
                let response = await axios.post(
                    `http://127.0.0.1:5000/pesquisar/${pesquisa}`, {}, {
                        headers: {"Authorization": `Bearer ${token}`}
                    })
                setCarregamento(false)
                let msg = response.data.Success || "Falha na conexão com o servidor"
                showMessage(msg, "sucess")
                navigate("/principal/pesquisa", {state: {username, pesquisa}})
            }
            catch (err) {
                setCarregamento(false)
                console.error(`Ocorreu o erro: ${err}`)
                let msg = err.response.data.Error || "Falha na conexão com o servidor"
                showMessage(msg, "danger")
            }
        } else {
            showMessage("Preencha o campo de pesquisa!", "danger")
        }
        
    }

    return (
        <>
            <HeaderPrincipal username={username} setPesquisa={setPesquisa} 
            PesquisarProduto={PesquisarProduto} principalAtivo={principalAtivo}/>
            <MiniForm setSite={setSite} função={EnviarSite}/>
            <CaixaProdutos gerenciador={gerenciador}/>

            {carregamento && <Loading/>}
            {message && <Message txt={msgTXT} estilo={estilo}/>}
        </>
    )
}
export default Principal