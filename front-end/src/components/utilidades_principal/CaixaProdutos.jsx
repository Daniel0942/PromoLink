import style from "./CaixaProdutos.module.css"
import Button from "../utilidades_global/Button"
import { FiExternalLink } from "react-icons/fi"
import Loading from "../utilidades_global/Loading"
import Message from "../utilidades_global/Message"
import { useState } from "react"
import axios from "axios"

function CaixaProdutos({username, gerenciador, favoritoAtivo, removerFavorito}) {
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

    // enviar produto para o back-end adicionar ele à tabela favoritos
    async function adicionarFavorito(link, produto, preco, url, site="indisponivel") {
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

    return (
        <>
            <div className={style.container}>
                {gerenciador.length > 0 ? (
                    gerenciador.map((produto, index)=> (
                        <div className={style.box_produtos} key={index}>
                            <div className={style.box_img}>
                                <img src={produto.url} alt="imagem do produto"/>
                            </div>
                            <p>{produto.produto}</p>
                            <p><span>{produto.preco}</span></p>

                            <div className={style.link}>
                                <FiExternalLink/>
                                <a href={produto.link} target="blank">
                                    Visitar o site
                                </a>
                            </div>
                            <Button 
                            txt={favoritoAtivo ? "Remover produto" : "Adicionar aos favoritos"}
                            tipo="button"
                            danger={favoritoAtivo ? "danger" : ""}
                            onClick={() => {
                                favoritoAtivo ? (
                                    (removerFavorito(produto.id))
                                )
                                : (adicionarFavorito(produto.link, produto.produto, produto.preco, produto.url))
                            }}
                            />
                        </div>
                        ))
                    ) : (
                        <p>{favoritoAtivo ? "Nenhum produto salvo nos favoritos" 
                            : "Nenhum site selecionado!"}</p>
                    )}
                </div>

                {carregamento && <Loading/>}
                {message && <Message txt={msgTXT} estilo={estilo}/>}
            </>
    )
}
export default CaixaProdutos