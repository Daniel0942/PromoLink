import { IoMdArrowRoundBack } from "react-icons/io";
import style from "./BtnBack.module.css"
import { useNavigate } from "react-router-dom"

function BtnBack() {
    let navigate = useNavigate()

    // Função para voltar rota anterior
    function voltar() {
        navigate(-1)
    }
    return (
        <div className={style.btn_back} onClick={voltar}>
            <IoMdArrowRoundBack/>
        </div>
    )
}
export default BtnBack