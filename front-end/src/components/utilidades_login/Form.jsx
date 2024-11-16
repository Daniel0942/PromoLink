import style from  "./Form.module.css"
import Email from "../../img/email.svg"
import lock from "../../img/lock.svg"
import user from "../../img/user.svg"
import Button from "./Button.jsx"
import { Link } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Form({ txtTitulo, txt1, txt2, type1, type2, txtButton, input_user, txt_P1, txt_P2, rota_link , requisisao}) {
    let [username, setUsername] = useState("")
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    let navigate = useNavigate() // redirecionamentos

    // Fazer requisião GET e verificar se o email e senha é igual ao do banco de dados, se for será redirecionado para a página principal
    function Logar(e) {
        e.preventDefault()
        axios.get("http://127.0.0.1:5000/users")
        .then(response => {
            let dados = response.data
            if (dados) { 
                let user = dados.find((user)=> user.email === email && user.password === password)
                console.log(user)
                // se tiver email e senha será redirecionado
                if (user) {
                    navigate("/principal")
                } 
                else {
                    console.log("Não tem usuário !")
                }  
            }
        })
        .catch(error => {
            console.error(`Ocorreu o erro ao buscar dados: ${error}`)
        })  
    }

    // Fazer requisisão POST
    function Registrar(e) { 
        e.preventDefault()
        if (username.length > 0 && email.length > 0 && password.length > 0) { 
            axios.post("http://127.0.0.1:5000/users", {
                username: username,
                email: email,
                password: password
            })
            .then(()=>{
                navigate("/")})
            .catch((error)=> {
                console.error(`Deu o erro ao registrar novo usuário: ${error}`)
            })
        }
        else {
            alert("[ERRO], Digite os campos obrigatórios !")
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
                <Button txt={txtButton}/>
            </form>
        </>
    )
}
export default Form