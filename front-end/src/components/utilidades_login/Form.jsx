import style from  "./Form.module.css"
import email from "../../img/email.svg"
import lock from "../../img/lock.svg"
import user from "../../img/user.svg"
import Button from "./Button.jsx"
import { Link } from "react-router-dom"

function Form({ txtTitulo, txt1, txt2, type1, type2, txtButton, input_user, txt_P1, txt_P2, rota_link }) {
    return (
        <>  
            <h1 className={style.txt_h1}>{txtTitulo}</h1>
            
            <form action="#" className={style.form}>
                {/*input do user da página de registrar*/}
                <div className={`${style.caixa_input} 
                ${style.desativar_input} ${style[input_user]}`}>
                    <img src={user} alt="user em svg do figma" />
                    <input type="text" placeholder="Seu Nome"/>
                </div>

                <div className={style.caixa_input}>
                    <img src={email} alt="email em svg do figma" />
                    <input type={type1} placeholder={txt1}/>
                </div>
                <div className={style.caixa_input}>
                    <img src={lock} alt="cadeado em svg do figma" />
                    <input type={type2} placeholder={txt2}/>
                </div>

                <p>{txt_P1} <Link to={rota_link}>{txt_P2}</Link></p>
                <Button txt={txtButton}/>
            </form>
        </>
    )
}
export default Form