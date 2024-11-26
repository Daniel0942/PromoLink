import style from "./MiniForm.module.css"
import Button from "../utilidades_global/Button"

function MiniForm({setSite, função}) {
    return (
        <form action="" className={style.form} onSubmit={função}>
            <label>Selecione o site</label>
            <input type="text" name="site" list="sites_disponiveis" placeholder="Escolha uma opção" onChange={(e)=> setSite(e.target.value)}/>
            
            <datalist id="sites_disponiveis">
                <option value="Kabum"></option>
                <option value="Casas Bahia"></option>
                <option value="Magazine Luiza"></option>
            </datalist>

            <Button txt="Selecionar"/>
        </form>
    )
}
export default MiniForm