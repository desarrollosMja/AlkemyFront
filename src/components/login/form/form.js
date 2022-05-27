import "./form.css"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Alert from "react-bootstrap/Alert"
import { useState, useRef, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { context } from "../../context/context.js"
import { config } from "../../../config"

export default function LoginForm(){
    let [showLogin, setShowLogin] = useState(true)
    let [showAlertUserExists, setShowAlertUserExists] = useState(false)
    const [validatedRegister, setValidatedRegister] = useState(false);
    const [validatedLogin, setValidatedLogin] = useState(false);
    const [showMailPassIncorrect, setShowMailPassIncorrect] = useState(false)
    const formLogin = useRef()
    const formRegister = useRef()
    const loginEmail = useRef()
    const loginPass = useRef()
    const registerEmail = useRef()
    const registerPass = useRef()
    const contexto = useContext(context)
    let navigate = useNavigate()

    function switchLoginRegister(){
        showLogin == true ? setShowLogin(false) : setShowLogin(true)
    }

    function createUser(e){
        e.preventDefault()
        setValidatedRegister(true)
        const obj = {
            email: registerEmail.current.value,
            password: registerPass.current.value
        }

        if (obj.email != "" && obj.password != ""){
            fetch(`http://localhost:${config.BACK_PORT}/api/users/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj),
                mode: "cors"
            })
            .then(res => res.json())
            .then(json => {
                if (json.operation == "Failed"){
                    setShowAlertUserExists(true)
                } else{
                    sessionStorage.setItem("user",obj.email)
                    contexto.setUser(obj)
                    navigate(`/session/${obj.email}`)
                }
            })
            .catch(err => console.log(err))
        }
    }

    function login(e){
        e.preventDefault()
        setValidatedLogin(true)
        const obj = {
            email: loginEmail.current.value,
            password: loginPass.current.value
        }

        if (obj.email != "" && obj.password != ""){
            fetch(`http://localhost:${config.BACK_PORT}/api/users/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj),
                mode: "cors"
            })
            .then(res => res.json())
            .then(json => {
                if (json.access == "Granted"){
                    sessionStorage.setItem("user",obj.email)
                    contexto.setUser(obj)
                    navigate(`/session/${obj.email}`)
                }
                if (json.access == "Denied") setShowMailPassIncorrect(true)
            })
            .catch(err => console.log(err))
        }
    }

    return(
        <div>
            {showLogin == true && 
                <Form id="form-login" ref={formLogin} noValidate validated={validatedLogin}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="Enter email" 
                            ref={loginEmail}
                            required 
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Password" 
                            ref={loginPass}
                            required 
                        />
                    </Form.Group>
                    <Button variant="success" type="submit" onClick={e => login(e)}>
                        Login
                    </Button>
                </Form>
            }
            
            {showLogin == false &&
                <Form id="create-user" ref={formRegister} noValidate validated={validatedRegister} >
                    <Form.Group className="mb-3" controlId="registerEmailInput" >
                        <Form.Label>Email address</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="Enter email" 
                            ref={registerEmail}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="registerPassInput" >
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Password" 
                            ref={registerPass}
                            required
                        />
                    </Form.Group>
                    <Button variant="light" type="submit" onClick={e => createUser(e)}>
                        Create user
                    </Button>
                </Form>
            }

            {showAlertUserExists == true &&
                <Alert variant="warning" id="alert-user-exists">
                    Email already used!
                </Alert>
            }

            {showMailPassIncorrect == true &&
                <Alert variant="danger" id="alert-user-exists">
                    Email or password incorrect
                </Alert>
            }

            <Form.Check 
                type="switch"
                id="login-new-account-switch"
                onChange={switchLoginRegister}
                variant="light"
            />
            <Form.Label>Login / Create new account</Form.Label>
        </div>
    )
}