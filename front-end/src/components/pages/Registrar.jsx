import HeaderLogin from "../utilidades_login/HeaderLogin"
import Form from "../utilidades_login/Form"

function Registrar() {
    return (
        <>
            <HeaderLogin/>
            <Form 
            txtTitulo="Cadastrar"
            input_user="ativar_input" 
            txt1="Seu Email" 
            txt2="Sua Senha" 
            type1="email" 
            type2="password" 
            txtButton="Cadastrar"
            txt_P1="Já tem conta?"
            txt_P2="Logue aqui"
            rota_link="/"
            requisisao="registrar"/>
        </>
    )
}
export default Registrar