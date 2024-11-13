import style from "./HeaderPrincipal.module.css"
import Logo from "../../img/Logo.svg"
import menu from "../../img/menu.svg"

function HeaderPrincipal() {
    return (
        <div className={style.header}>
            <img src={Logo} alt="Logo em svg do figma" />

            <nav className={style.btns_menu}>
                <ul>
                    <li>Sobre</li>
                    <li>Favoritos</li>
                    <li>Histórico</li>
                </ul>
            </nav>

            <div className={style.abrir_menu}>
                <img src={menu} alt="" />
            </div>
        </div>
    )
}
export default HeaderPrincipal