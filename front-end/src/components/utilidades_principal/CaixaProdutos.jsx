import style from "./CaixaProdutos.module.css"
import Loading from "../utilidades_global/Loading"

function CaixaProdutos({gerenciador, carregamento}) {
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
                        <p>Nenhum site selecionado!</p>
                    )}
                </div>
            </>
    )
}
export default CaixaProdutos