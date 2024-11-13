import style from "./Button.module.css"

function Button({ txt }) {
    return (
        <button type="submit " className={style.button}>{txt}</button>
    )
}
export default Button