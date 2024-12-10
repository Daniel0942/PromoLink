import axios from "axios";
import Table from "../utilidades_principal/Table";
import { useEffect, useState } from "react";
import HeaderPrincipal from "../utilidades_principal/HeaderPrincipal";
import { useLocation } from "react-router-dom";
import BtnBack from "../utilidades_global/BtnBack";
import Loading from "../utilidades_global/Loading";

function Historico() {
    let location = useLocation() //buscar state da página
    let username = location.state?.username || "Visitante" //armazenar state do username
    let token = localStorage.getItem("token")
    let [carregamento, setCarregamento] = useState(false)
    let [gerenciadorHistorico, setGerenciadorHistorico] = useState([])

    useEffect(()=>{
        setCarregamento(true)
        let buscarHistorico = async ()=> {
            try {
                let response = await axios.get(`http://127.0.0.1:5000/historico/${username}`, {
                    headers: {"Authorization": `Bearer ${token}`}
                })
                setGerenciadorHistorico(response.data)
            } catch(err) {
                console.error(`Ocorreu o erro ao puxar o historico: ${err}`)
            }
            finally {setCarregamento(false)}
        }
        buscarHistorico()
    }, [username])

    return (
        <>
            <HeaderPrincipal username={username}/>
            <BtnBack/>
            {carregamento && <Loading/>}
            <Table gerenciadorHistorico={gerenciadorHistorico}
            username={username} />
        </>
    )
}
export default Historico