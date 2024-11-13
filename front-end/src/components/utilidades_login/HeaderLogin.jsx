import style from "./HeaderLogin.module.css"
import Logo from "../../img/Logo.svg"

function HeaderLogin() {
    return (
        <div className={style.header}>
            <img src={Logo} alt="Logo do site, svg do figma" className={style.logo}/>
        </div>
    )
}
export default HeaderLogin