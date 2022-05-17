import "./form.css"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { useState, useRef, useContext } from "react"
import { context } from "../../context/context.js"
import { config } from "../../../config"

export default function LoginForm(){
    let [showLogin, setShowLogin] = useState(true)
    const formLogin = useRef()
    const formRegister = useRef()
    const registerEmail = useRef()
    const registerPass = useRef()
    const contexto = useContext(context)

    function switchLoginRegister(){
        showLogin == true ? setShowLogin(false) : setShowLogin(true)
    }

    function createUser(e){
        e.preventDefault()
        const obj = {
            email: registerEmail.current.value,
            password: registerPass.current.value
        }

        contexto.setUser(obj)

        fetch(`http://localhost:${config.BACK_PORT}/api/users/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj),
            mode: "cors"
        })
        .then(res => res.json())
        .then(json => console.log(json))
        .catch(err => console.log(err))
    }

    return(
        <div>
            {showLogin == true && 
                <Form id="form-login" ref={formLogin}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="success" type="submit">
                        Login
                    </Button>
                </Form>
            }
            
            {showLogin == false &&
                <Form id="create-user" ref={formRegister}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" name="user" placeholder="Enter email" ref={registerEmail} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" placeholder="Password" ref={registerPass} />
                    </Form.Group>
                    <Button variant="light" type="submit" onClick={e => createUser(e)}>
                        Create user
                    </Button>
                </Form>
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