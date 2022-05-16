import "./form.css"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { useState, useRef } from "react"

export default function LoginForm(){
    let [showLogin, setShowLogin] = useState(true)
    const formLogin = useRef()
    const formRegister = useRef()

    function switchLoginRegister(){
        showLogin == true ? setShowLogin(false) : setShowLogin(true)
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
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="light" type="submit">
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