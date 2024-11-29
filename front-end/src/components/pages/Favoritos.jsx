import axios from "axios"
import { useEffect, useState } from "react"
import HeaderPrincipal from "../utilidades_principal/HeaderPrincipal"
import CaixaProdutos from "../utilidades_principal/CaixaProdutos"
import { useLocation } from "react-router-dom"
import Message from "../utilidades_global/Message"

function Favoritos() {
    let location = useLocation() //buscar state da página
    let username = location.state?.username || "Visitante" 
    let [gerenciadorFavoritos, setGerenciadorFavoritos] = useState([])
    let favoritoAtivo = true

    // função para msgs dinâmicas
    let [message, setMessage] = useState(false)
    let [msgTXT , setmsgTXT] = useState()
    let [estilo, setEstilo] = useState()
    function showMessages(txt, style) {
        setMessage(true)
        setmsgTXT(txt)
        setEstilo(style)
        setTimeout(()=>{
            setMessage(false)
        }, 3000)
    }
    useEffect(()=>{
        async function BuscarFavoritos() {
            try {
                let response = await axios.get(`https://promolink.onrender.com/favoritos/${username}`)
                setGerenciadorFavoritos(response.data)
            } 
            catch (err) {console.error(`Deu o erro: ${err}`)}
            
        }
        BuscarFavoritos()
    }, [username])

    // função para deletar o favorito
    function removerFavorito(id) {
        axios.post(`https://promolink.onrender.com/favoritos/${id}`)
        .then(response => {
            // Remover o item localmente da lista de favoritos
            setGerenciadorFavoritos((prevState) =>
                prevState.filter(favorito => favorito.id !== id)
            );
            let mensagemSucesso = response.data.Success || "Falha na conexão com o servidor "
            showMessages(mensagemSucesso, "sucess")
        })
        .catch((err) => {
            console.error(`Ocorreu o erro ao remover produto: ${err}`)
            let mensagemErro = err.response.data.Error || "Falha na conexão com o servidor"
            showMessages(mensagemErro, "danger")
        })
    }

    return (
        <>
            <HeaderPrincipal username={username}/>
            {message && <Message txt={msgTXT} estilo={estilo}/>}
            <CaixaProdutos gerenciador={gerenciadorFavoritos}
            favoritoAtivo={favoritoAtivo}
            removerFavorito={removerFavorito}/>
        </>
    )
}
export default Favoritos