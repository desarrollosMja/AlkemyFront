import "./form.css"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

export default function LoginForm(){
    return(
        <div>
            <Form id="form-login">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="success" type="submit">
                    Submit
                </Button>
            </Form>

            <Form.Check 
                type="switch"
                id="login-new-account-switch"
            />
            <Form.Label>Login / Create new account</Form.Label>
        </div>
    )
}