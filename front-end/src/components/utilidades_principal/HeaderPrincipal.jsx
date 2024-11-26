import style from "./HeaderPrincipal.module.css"
import Logo from "../../img/Logo.svg"
import menu from "../../img/menu.svg"
import btn_fechar from "../../img/btn_fechar.svg"
import icone_user from "../../img/icone_user.svg"
import user_logout from "../../img/user_logout.svg"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

function HeaderPrincipal({username}) {
    // Funções menu dinâmico
    let [Menu, setMenu] = useState(false)
    function abrirMenu() {
        setMenu( ! Menu )
    }
    function fecharMenu() {
        setMenu(false)
    }

    let navigate = useNavigate()
    // função pra redirecionar para a página de historico e enviar o username
    function redirecionarHistorico() {
        navigate("/principal/historico", { state: {username} })
    }
    
    // função pra redirecionar para a página de favoritos e enviar o username
    function redirecionarFavoritos() {
        navigate("/principal/favoritos", { state: {username} })
    }

    // função pra redirecionar para a página de principal e enviar o username
    function redirecionarPrincipal() {
        navigate("/principal", { state: {username} })
    }

    return (
        <div className={style.header}>
            <img src={Logo} alt="Logo em svg do figma" onClick={redirecionarPrincipal}/>

            <nav className={style.btns_menu}>
                <ul>
                    <li>Sobre</li>
                    <li onClick={redirecionarFavoritos}>Favoritos</li>
                    <li onClick={redirecionarHistorico}>Histórico</li>
                    
                </ul>
            </nav>

            <div className={style.abrir_menu} onClick={abrirMenu}>
                <img src={menu} alt="icone de menu do figma" />
            </div>

            <div className={`${style.menu} ${Menu ? style.Menu_JS : ""}`}>
                <div className={style.box_btn_txt} onClick={fecharMenu}>
                    <img src={btn_fechar} className={style.btn_fechar}
                    alt="icone fechar"/>

                    <h1>{username}</h1>
                </div>

                <div className={style.btns_users}>
                    {username === "Visitante" ?
                        <Link to="/Registrar">
                            <img src={icone_user} alt="icone do user do figma"/>
                        </Link>

                    : <Link to="/">
                        <img src={user_logout} alt="icone do logout do figma"/>
                    </Link>
                    } 

                    
                </div>
            </div>
        </div>
    )
}
export default HeaderPrincipal