import spinner from "../../img/spinner.svg"
import style from "./Loading.module.css"

function Loading() {
    return (
        <img className={style.loading} src={spinner} alt="loading" />
    )
}
export default Loading