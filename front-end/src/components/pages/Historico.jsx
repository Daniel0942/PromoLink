import axios from "axios";
import Table from "../utilidades_principal/Table";
import { useEffect, useState } from "react";
import HeaderPrincipal from "../utilidades_principal/HeaderPrincipal";
import { useLocation } from "react-router-dom";
import BtnBack from "../utilidades_global/BtnBack";

function Historico() {
    let location = useLocation() //buscar state da página
    let username = location.state?.username || "Visitante" //armazenar state do username
    
    let [gerenciadorHistorico, setGerenciadorHistorico] = useState([])

    useEffect(()=>{
        let buscarHistorico = async ()=> {
            try {
                let response = await axios.get(`http://127.0.0.1:5000/historico/${username}`)
                setGerenciadorHistorico(response.data)
            } catch(err) {
                console.error(`Ocorreu o erro ao puxar o historico: ${err}`)
            }
        }
        buscarHistorico()
    }, [username])

    return (
        <>
            <HeaderPrincipal username={username}/>
            <BtnBack/>
            <Table gerenciadorHistorico={gerenciadorHistorico}
            username={username} />
        </>
    )
}
export default Historico