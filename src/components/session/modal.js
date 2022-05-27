import "./modal.css"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import { config } from "../../config"
import { useContext, useRef } from "react"
import { context } from "../context/context"

export default function ModalEditEntries(props){    
    const contexto = useContext(context)
    const inputDescription = useRef()
    const inputAmount = useRef()
    const inputDate = useRef()
    let { operations, setOperations } = contexto
    let operationObj = {}

    if (props.operationId != null){
        for (const operation of operations) {
            if (operation.operationId == props.operationId){
                operationObj = {...operation}
            }
        }
    }

    function saveEdit(){

        if (inputDescription.current.value != "") operationObj.description = inputDescription.current.value
        if (inputAmount.current.value != "") operationObj.amount = inputAmount.current.value
        if (inputDate.current.value != "") operationObj.date = inputDate.current.value
    
        fetch(`http://localhost:${config.BACK_PORT}/api/inputs/modify`, {
            method: "PUT",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(operationObj),
            mode: "cors"
        })
            .then(res => res.json())
            .then(json => props.onHide())
            .catch(err => console.log(err))
    }

    return(
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            id="modal"
            >
            <Modal.Body id="modal-body">
                <h4>OPERATION #{operationObj.operationId}</h4>
                <Form.Group className="mb-3">
                    <Form.Control 
                        ref={inputDescription} 
                        type="text" 
                        defaultValue={`${operationObj.description}`}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control 
                        ref={inputAmount} 
                        type="number" 
                        defaultValue={`${operationObj.amount}`}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control 
                        ref={inputDate} 
                        type="date" 
                        defaultValue={`${operationObj.date}`}
                        required
                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer id="modal-footer">
                <Button variant="success" onClick={saveEdit}>Save</Button>
            </Modal.Footer>
        </Modal>
    )
}