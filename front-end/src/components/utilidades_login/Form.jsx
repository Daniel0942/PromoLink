import style from  "./Form.module.css"
import Email from "../../img/email.svg"
import lock from "../../img/lock.svg"
import user from "../../img/user.svg"
import Button from "../utilidades_global/Button.jsx"
import { Link } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Message from "../utilidades_global/Message.jsx"
import Loading from "../utilidades_global/Loading.jsx"

function Form({ txtTitulo, txt1, txt2, type1, type2, txtButton, input_user, txt_P1, txt_P2, rota_link , requisisao}) {
    let [username, setUsername] = useState("")
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    let [msgVisible, setMsgVisible] = useState(false)
    let [txtMessage, setTxtMessage] = useState("") 
    let [msgStyle, setMsgStyle] = useState("")
    let navigate = useNavigate() // redirecionamentos
    let [carregamento, setCarregamento] = useState(false)

    // função de mostrar msg de erro ou sucesso [danger, sucess]
    function ShowMsg(msg, style) {
        setTxtMessage(msg) 
        setMsgStyle(style)
        setMsgVisible(true)
        setTimeout(()=> {setMsgVisible(false)}, 3000)
    }
    
    async function Logar(e) {
        setCarregamento(true)
        e.preventDefault()
        try {
            let response = await axios.post("http://127.0.0.1:5000/users", {
                email: email,
                password: password
            })
            setCarregamento(false)
            let username = response.data.Username || "Falha na conexão com o servidor"
            navigate("/principal", { state: {username} })
        }
        catch(err) {
            setCarregamento(false)
            setEmail("")
            setPassword("")
            let msg = err.response.data.Error || "Falha na conexão com o servidor"
            ShowMsg(msg, "danger")
        }
    }

    function Registrar(e) { 
        setCarregamento(true)
        e.preventDefault()
        if (username.length > 0 && email.length > 0 && password.length > 0) { 
            axios.post("http://127.0.0.1:5000/registrar", {
                username: username,
                email: email,
                password: password
            })
            .then((response)=>{
                setCarregamento(false)
                let msg = response.data.Success || "Falha na conexão com o servidor"
                ShowMsg(msg, "sucess")
                setTimeout(()=> {
                    navigate("/")
                }, 3000)   
            })

            .catch((error)=> {
                setCarregamento(false)
                // pegando respostas do servidor, mandados lá do back-end
                if (error.response) {
                    let msg = error.response.data.Error || "Falha na conexão com o servidor"
                    ShowMsg(msg, "danger")
                }
            })
        }
    }

    return (
        <>  
            <h1 className={style.txt_h1}>{txtTitulo}</h1>
            
            <form action="#" className={style.form} 
            onSubmit={requisisao === "logar" ? Logar : Registrar}>
                {/*input do user da página de registrar*/}
                <div className={`${style.caixa_input} 
                ${style.desativar_input} ${style[input_user]}`}>
                    <img src={user} alt="user em svg do figma" />
                    <input type="text" placeholder="Seu Nome"
                    onChange={(e)=> setUsername (e.target.value)}/>
                </div>

                <div className={style.caixa_input}>
                    <img src={Email} alt="email em svg do figma" />
                    <input type={type1} placeholder={txt1}
                    onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className={style.caixa_input}>
                    <img src={lock} alt="cadeado em svg do figma" />
                    <input type={type2} placeholder={txt2}
                    onChange={(e)=>setPassword(e.target.value)}/>
                </div>

                <p>{txt_P1} <Link to={rota_link}>{txt_P2}</Link></p>
                <Button txt={txtButton} tipo="submit"/>
            </form>

            {msgVisible && <Message txt={txtMessage} estilo={msgStyle}/>}
            {carregamento && <Loading/>}
        </>
    )
}
export default Form