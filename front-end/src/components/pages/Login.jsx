import Form from "../utilidades_login/Form"
import HeaderLogin from "../utilidades_login/HeaderLogin"
function Login() {
    return (
        <>  
            <HeaderLogin/>
            <Form 
            txt1="Seu Email" 
            txt2="Sua Senha" 
            type1="email" 
            type2="password" 
            txtButton="Logar" 
            txtTitulo="Login" 
            txt_P1="Não tem conta?"
            txt_P2="cadastre-se aqui"
            rota_link="/registrar"/> 
        </>
    )
}
export default Login