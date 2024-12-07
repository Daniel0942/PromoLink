import { useState } from 'react';

function useMessage() {
    const [message, setMessage] = useState(false);
    const [msgTXT, setmsgTXT] = useState();
    const [estilo, setEstilo] = useState();

    const showMessage = (txt, style) => {
        setMessage(true);
        setmsgTXT(txt);
        setEstilo(style);
        setTimeout(() => {
            setMessage(false);
        }, 3000);
    };

    return { message, msgTXT, estilo, showMessage };
}

export default useMessage;