import style from "./CaixaProdutos.module.css"
import imgTeste from "../../img/imgTeste.png"

function CaixaProdutos() {
    let cont = [1, 2, 3, 4, 5]
    
    return (
        <div className={style.container}>
            {cont.map((cont)=> (
                <div className={style.box_produtos} key={cont}>
                <div className={style.box_img}>
                    <img src={imgTeste} alt=""/>
                </div>
                <p>Nome do produto</p>
                <p>Preço do produto</p>
            </div>
            ))}
        </div>
    )
}
export default CaixaProdutos