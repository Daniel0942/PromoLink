import { useLocation } from "react-router-dom"
import HeaderPrincipal from "../utilidades_principal/HeaderPrincipal"
import CaixaProdutos from "../utilidades_principal/CaixaProdutos"
import { useEffect, useState } from "react"
import Loading from "../utilidades_global/Loading"
import Message from "../utilidades_global/Message"
import axios from "axios"
import BtnBack from "../utilidades_global/BtnBack"
import useMessage from "../utilidades_global/MessageFunction.js"

function Produtos() {
    let location = useLocation() //buscar state da página
    let username = location.state?.username || "Visitante"
    let [gerenciador, setGerenciador] = useState([])
    let [carregamento, setCarregamento] = useState(false)

    // Usando função importada para visibilidade da mensagem
    const { message, msgTXT, estilo, showMessage } = useMessage();

    // Função para buscar os produtos do back-end
    useEffect(() => {
        async function BuscarProdutos() {
            try {
                let response = await axios.get("http://127.0.0.1:5000/produtos")
                setGerenciador(response.data) // Atualiza com os produtos
            }
            catch (err) {
                console.error(`Erro ao buscar produtos: ${err}`);
                // Verifica se tem resposta, se não tiver há uma falha na conexão.
                let msg = err.response.data.Error || "Falha na conexão com o servidor!"
                showMessage(msg, "danger")
            }
            finally { setCarregamento(false) }
        }
        BuscarProdutos()
    }, [])

    return (
        <>
            <HeaderPrincipal username={username}/>
            <BtnBack/>
            <CaixaProdutos username={username}
            gerenciador={gerenciador}/>

            {carregamento && <Loading/>}
            {message && <Message txt={msgTXT} estilo={estilo}/>}
        </>
    )
}

export default Produtos