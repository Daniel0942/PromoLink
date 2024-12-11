import axios from "axios"
import { useEffect, useState } from "react"
import HeaderPrincipal from "../utilidades_principal/HeaderPrincipal"
import CaixaProdutos from "../utilidades_principal/CaixaProdutos"
import { useLocation } from "react-router-dom"
import Message from "../utilidades_global/Message"
import Loading from "../utilidades_global/Loading"
import BtnBack from "../utilidades_global/BtnBack"
import useMessage from "../utilidades_global/MessageFunction.js"

function Favoritos() {
    let location = useLocation() //buscar state da página
    let username = location.state?.username || "Visitante" 
    let [gerenciadorFavoritos, setGerenciadorFavoritos] = useState([])
    let favoritoAtivo = true
    let [carregamento, setCarregamento] = useState(false)
    let token = localStorage.getItem("token")
    
    // Usando função importada para visibilidade da mensagem
    const { message, msgTXT, estilo, showMessage } = useMessage();

    useEffect(()=>{
        setCarregamento(true)
        async function BuscarFavoritos() {
            try {
                let response = await axios.get(`http://127.0.0.1:5000/favoritos/${username}`, {
                    headers: {"Authorization": `Bearer ${token}`}
                })
                setGerenciadorFavoritos(response.data)
                setCarregamento(false)
            } 
            catch (err) {
                console.error(`Deu o erro: ${err}`)
            }
            
        }
        BuscarFavoritos()
    }, [username])

    // função para deletar o favorito
    function removerFavorito(id) {
        setCarregamento(true)
        axios.post(`http://127.0.0.1:5000/favoritos/${id}`)
        .then(response => {
            setCarregamento(false)
            // Remover o item localmente da lista de favoritos
            setGerenciadorFavoritos((prevState) =>
                prevState.filter(favorito => favorito.id !== id)
            );
            let mensagemSucesso = response.data.Success || "Falha na conexão com o servidor "
            showMessage(mensagemSucesso, "sucess")
        })
        .catch((err) => {
            setCarregamento(false)
            console.error(`Ocorreu o erro ao remover produto: ${err}`)
            let mensagemErro = err.response.data.Error || "Falha na conexão com o servidor"
            showMessage(mensagemErro, "danger")
        })
    }

    return (
        <>
            <HeaderPrincipal username={username}/>
            <BtnBack/>
            <CaixaProdutos gerenciador={gerenciadorFavoritos}
            favoritoAtivo={favoritoAtivo}
            removerFavorito={removerFavorito}/>

            {message && <Message txt={msgTXT} estilo={estilo}/>}
            {carregamento && <Loading/>}
        </>
    )
}
export default Favoritos