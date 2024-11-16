import style from "./Message.module.css"

function Message({ txt, estilo }) { 
    return (
        <p className={`${style.msg} ${style[estilo]}`}>{txt}</p>
        
    )
}
export default Message