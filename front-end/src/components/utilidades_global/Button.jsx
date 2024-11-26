import style from "./Button.module.css"

function Button({ txt, tipo, onClick, danger }) {
    return (
        <button type={tipo} className={`${style.button} ${style[danger]}`}
        onClick={onClick}>
            {txt}
        </button>
    )
}
export default Button