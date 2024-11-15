import style from "./HeaderPrincipal.module.css"
import Logo from "../../img/Logo.svg"
import menu from "../../img/menu.svg"
import btn_fechar from "../../img/btn_fechar.svg"
import icone_user from "../../img/icone_user.svg"
import user_logout from "../../img/user_logout.svg"
import { useEffect } from "react"

function HeaderPrincipal() {
    useEffect(()=>{
    //Variáveis do menu
    let abrir_menu = document.getElementById("abrir_menu")
    let div_menu = document.getElementById("menu")
    //let fechar_menu = document.getElementById("fechar_menu")

    abrir_menu.addEventListener("click", ()=> {
        div_menu.classList.add("Menu_JS")
    })
    },[])
    

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

            <div className={style.abrir_menu} id="abrir_menu">
                <img src={menu} alt="icone de menu do figma" />
            </div>

            <div className={style.menu} id="menu">
                <div className={style.box_btn_txt} id="fechar_menu">
                    <img src={btn_fechar} className={style.btn_fechar}
                    alt="icone fechar"/>

                    <h1>Nome de usuário</h1>
                </div>

                <div className={style.btns_users}>

                    <img src={icone_user} alt="icone do user do figma"/>
                    <img src={user_logout} alt="icone do logout do figma"/>
                </div>
            </div>
        </div>
    )
}
export default HeaderPrincipal