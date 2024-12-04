import style from "./Message.module.css"

function Message({ txt, estilo }) { 
    return (
        <div className={style.container}>
            <p className={`${style.msg} ${style[estilo]}`}>{txt}</p>
        </div>
        
    )
}
export default Message