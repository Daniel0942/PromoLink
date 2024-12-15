import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function RefreshToken({ children }) {
    const [token, setToken] = useState(localStorage.getItem("token")); // Recupera o token do localStorage
    const refresh_token = localStorage.getItem("refresh_token") // Recupera o refresh_token do localStorage
    const navigate = useNavigate();

    // Função para verificar validade de token
    function isTokenValid(token) {
        try {
            const decoded = jwtDecode(token);
            const now = Date.now() / 1000; // Converte o tempo atual para segundos

            return decoded.exp > now; // Verifica se a expiração é maior que o tempo atual
        } catch (error) {
            console.error("Erro ao decodificar o token:", error);
            return false;
        }
    }

    useEffect(() => {
        async function buscarToken() {
            try {
                console.log(`Tentando renovar o token...`);
                const response = await axios.post("http://127.0.0.1:5000/refresh", {}, {
                    headers: {"Authorization": `Bearer ${refresh_token}`}
                });
                const newToken = response.data.access_token;
                setToken(newToken);
                localStorage.setItem("token", newToken); // Armazena o novo token no localStorage
            } catch (err) {
                console.error(`Erro ao renovar o token: ${err}`);
                localStorage.removeItem("token"); // Remove o token do localStorage em caso de erro
                navigate("/"); // Redireciona para a página de login
            }
        }

        if (isTokenValid(token)) {
            console.log("Token validado!");
        } else {
            console.log("Token expirado ou inválido, tentando renovar...");
            buscarToken();
        }
    }, [refresh_token, token, navigate]);

    return <>{children}</>; // pagina só será renderizada quando o token estiver presente!
}

export default RefreshToken;
