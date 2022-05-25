import React, { useContext } from "react"
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import Settings from './Settings'
import { lenContext } from "../App";
function ListComments(props) {
    const {length,setLength,setRequest} = useContext(lenContext)

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [value, setValue] = useState('')
    const [commentList, setComment] = useState([])

    const filterId = props.filterId;
    const likerId = props.likerId;

    const getVal = (e) => {
        e.preventDefault();
        setValue(e.target.value)
    }

    const sender = (e) => {

        fetch('http://localhost:3002/comment', {
            method: 'POST',
            headers: new Headers({ "content-type": "application/json" }),
            body: JSON.stringify({
                ownerID: likerId,
                postID: filterId,
                text: value
            })
        }).then(commentAdded => commentAdded.json())
            .then( () => {
                fetch(`http://localhost:3002/comment/${filterId}`)
                    .then(comments => comments.json())
                    .then(commentsjson=> {
                        console.log("onfinishpost", commentsjson);
                        setComment(commentsjson)
                    })
            })
        localStorage.setItem('commentBody', value)
        setValue('')
 
    }

    const checker = props.check;

    useEffect(() => {
        if (checker) {
            fetch(`http://localhost:3002/comment/${filterId}`)
                .then(result => result.json())
                .then(json => {
                    setComment(json)
                    console.log("componentDiMount", json)
                    // console.log("List comment Length",json.length)
                    // setLength(json.length)
                   
                   
                })
        } else {

        }
    }, [filterId])

    return (
        <>
            <Button variant="outline-success" onClick={handleShow}> <FontAwesomeIcon icon="message" /> </Button>

            <Modal show={show} onHide={handleClose}>

                <Modal.Header>
                    <Modal.Title>Comments</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form >

                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Marie</Form.Label>
                            <Form.Control as="textarea" rows={2} value={value} onChange={getVal} />
                        </Form.Group>

                        {
                            commentList.map(elem => {
                                console.log('elem', elem);
                                console.log("LENGTH",commentList.length)
                                props.checkit(commentList.length)
                                return (

                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <div>
                                            <h4>{elem.ownerID?.userName}<Settings /> </h4>
                                            <p>
                                                {elem.text}
                                            </p>
                                        </div>

                                    </Form.Group>
                                )
                            })
                        }

                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={sender} on>Send</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ListComments