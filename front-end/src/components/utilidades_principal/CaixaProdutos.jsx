import style from "./CaixaProdutos.module.css"
import { useEffect, useState } from "react"
import axios from "axios"
import Loading from "../utilidades_global/Loading"

function CaixaProdutos() {
    let [gerenciador, setGerenciador] = useState([])
    let [carregamento, setCarregamento] = useState(false)

    // Função para buscar os produtos da API
    const buscarProdutos = () => {
        setCarregamento(true)
        axios.get("http://127.0.0.1:5000/produtos")
            .then(response => {
                setCarregamento(false)
                setGerenciador(response.data); // Atualiza com os produtos
            })
            .catch(error => {
                console.error(`Ocorreu o erro na caixa de produtos: ${error}`);
            });
    };

    // Carregar os produtos quando o componente for montado
    useEffect(() => {
        buscarProdutos();
        // Definir polling para atualizar a cada 5 segundos
        const intervalId = setInterval(buscarProdutos, 5000); // 5 segundos

        // Limpar o intervalo quando o componente for desmontado
        return () => clearInterval(intervalId);
    }, []);

    return (
        <>
            {carregamento && <Loading/>}
            <div className={style.container}>
                {gerenciador.length > 0 ? (
                    gerenciador.map((produto, index)=> (
                        <div className={style.box_produtos} key={index}>
                            <div className={style.box_img}>
                                <img src={produto.Url} alt="imagem do produto"/>
                            </div>
                            <p>{produto.Produto}</p>
                            <p><span>{produto.Preço}</span></p>
                        </div>
                        ))
                    ) : (
                        <p>Não há produtos disponíveis</p>
                    )}
                </div>
            </>
    )
}
export default CaixaProdutos