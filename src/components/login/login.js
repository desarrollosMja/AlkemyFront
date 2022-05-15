import "./login.css"
import LoginForm from "./form/form.js"

export default function Login(){
    return(
        <div id="login-container">
            <div id="login">
                <LoginForm/>
            </div>
        </div>
    )
}