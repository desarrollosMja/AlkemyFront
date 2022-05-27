import "./session.css"
import ModalEditEntries from "./modal.js"
import Alert from "react-bootstrap/Alert"
import Table from "react-bootstrap/Table"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Nav from "react-bootstrap/Nav"
import { useContext, useEffect, useRef, useState } from "react"
import { context } from "../context/context.js"
import { config } from "../../config"
import { useParams, useNavigate } from "react-router-dom"

export default function Session(){
    const [validated, setValidated] = useState(false);
    const [showModal, setShowModal] = useState(false)
    const contexto = useContext(context)
    const { userEmail } = useParams()
    const navigate = useNavigate()
    const radioInput = useRef()
    const radioOutput = useRef()
    const userSession = sessionStorage.getItem("user")
    const [operationId, setOperationId] = useState()

    function handleInputRadioClick(e){
        if (radioOutput.current.checked == true) radioOutput.current.checked = false
        
    }

    function handleOutputRadioClick(e){
        if (radioInput.current.checked == true) radioInput.current.checked = false
    }

    function resetForm(e){
        e.target[0].value = ""
        e.target[1].value = ""
        e.target[2].value = ""
        setValidated(false)
    }

    function getBalance(){
        contexto.operations.map(elem => {
            let aux = contexto.balance
            if (elem.type == "input") aux = aux + elem.amount
            if (elem.type == "output") aux = aux - elem.amount
            contexto.setBalance(aux)
        })
        return contexto.balance
    }

    function sendForm(e){
        e.preventDefault()
        setValidated(true)
        const data = {
            concept: e.target[0].value,
            amount: e.target[1].value,
            date: e.target[2].value,
            type: e.target[3].checked == true ? "input" : "output",
            userEmail: userEmail
        }

        if (data.concept != "" && data.amount != "" && data.date != ""){
            fetch(`http://localhost:${config.BACK_PORT}/api/inputs/new-operation`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
                mode: "cors"
            })
                .then(res => res.json())
                .then(json => {
                    if (json.operation == "success") {
                        contexto.setOperations([...contexto.operations, json.item])
                        let aux = contexto.balance
                        if (json.item.type == "input") aux += json.item.amount
                        if (json.item.type == "output") aux -= json.item.amount
                        contexto.setBalance(aux)
                        resetForm(e)
                    }
                })
                .catch(err => console.log(err))
        }
    }

    useEffect(() => {
        if (userSession != userEmail) navigate("/")
   },[])

    return(
        <>  
            <nav>
                <Nav.Link href="/">Close session</Nav.Link>
                <h6>Bienvenido/a {userEmail}</h6>
            </nav>

            <section id="dataInput">
                <h4>Add new operation</h4>
                <Form id="form" onSubmit={e => sendForm(e)} noValidate validated={validated}>
                    <Form.Group className="mb-3">
                        <Form.Control type="text" placeholder="Operation concept / description" required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control type="number" placeholder="Amount" required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control type="date" placeholder="Date" required />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Check
                            inline
                            label="Input"
                            type="radio"
                            id="radioInput"
                            ref={radioInput}
                            onClick={e => handleInputRadioClick(e)}
                            defaultChecked
                        />
                        <Form.Check
                            inline
                            label="Output"
                            type="radio"
                            id="radioOutput"
                            ref={radioOutput}
                            onClick={e => handleOutputRadioClick(e)}
                        />
                    </Form.Group>
                    
                    <Button variant="success" type="submit">
                        Add
                    </Button>
                </Form>
            </section>

            <section id="balance">
                <Alert variant="secondary">
                    Actual balance is:  
                    <span id="balance-text">
                        {contexto.operations != undefined && contexto.balance}
                    </span>
                </Alert>
            </section>

            <section id="table">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Date</th>
                            <th>Concept</th>
                            <th>Amount</th>
                            <th>Type</th>
                            <th>User</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {contexto.operations != undefined && 
                        contexto.operations.map(elem => {
                            return <tr key={elem.operationId}>
                                        <td>{elem.operationId}</td>
                                        <td>{elem.date}</td>
                                        <td>{elem.description}</td>
                                        <td>{elem.amount}</td>
                                        <td>{elem.type}</td>
                                        <td>{elem.userEmail}</td>
                                        <td>{elem.userEmail == userEmail && 
                                                <a href="#" id={elem.operationId} onClick={(e) => {
                                                    e.preventDefault()
                                                    setOperationId(elem.operationId)
                                                    setShowModal(true)
                                                }}>Edit entry</a>
                                            }
                                        </td>
                                    </tr>
                        })}
                    </tbody>
                </Table>
            </section>
            
            <ModalEditEntries operationId={operationId} show={showModal} onHide={() => setShowModal(false)}/>
        </>
    )
}