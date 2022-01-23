import PropTypes from "prop-types";
import styles from "./Button.module.css";

function Button({banana}){

    return<button className={styles.btn}>{banana}</button>;
}

Button.propTypes={
    banana:PropTypes.string.isRequired,

}
export default Button; //App.js에서 button을 쓸 수 있도록