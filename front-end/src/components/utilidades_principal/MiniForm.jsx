import style from "./MiniForm.module.css"
import Button from "../utilidades_global/Button"

function MiniForm({setSite, função}) {
    return (
        <form action="" className={style.form} onSubmit={função}>
            <label>Selecione o site</label>

            <select name="site" onClick={(e)=> setSite(e.target.value)}>
                <option value="" disabled selected>Escolha uma das opções</option>
                <option value="Kabum">Kabum</option>
                <option value="Casas Bahia">Casas Bahia</option>
                <option value="Magazine Luiza">Magazine Luiza</option>
            </select>

            <Button txt="Selecionar"/>
        </form>
    )
}
export default MiniForm