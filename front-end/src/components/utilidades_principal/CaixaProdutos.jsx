import style from "./CaixaProdutos.module.css"
import Loading from "../utilidades_global/Loading"
import Button from "../utilidades_global/Button"

function CaixaProdutos({gerenciador, carregamento, adicionarFavorito, favoritoAtivo}) {
    return (
        <>
            {carregamento && <Loading/>}
            <div className={style.container}>
                {gerenciador.length > 0 ? (
                    gerenciador.map((produto, index)=> (
                        <div className={style.box_produtos} key={index}>
                            <div className={style.box_img}>
                                <img src={produto.url} alt="imagem do produto"/>
                            </div>
                            <p>{produto.produto}</p>
                            <p><span>{produto.preco}</span></p>

                            <Button 
                            txt={favoritoAtivo ? "Remover" : "Adicionar aos favoritos"}
                            tipo="button"
                            danger={favoritoAtivo ? "danger" : ""}
                            onClick={() => {
                                adicionarFavorito(produto.produto, produto.preco, produto.url)
                            }}
                            />
                        </div>
                        ))
                    ) : (
                        <p>{favoritoAtivo ? "Nenhum produto salvo nos favoritos" 
                            : "Nenhum site selecionado!"}</p>
                    )}
                </div>
            </>
    )
}
export default CaixaProdutos