import "./App.css";
import Container from "react-bootstrap/Container";
import { Navbar } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import axios from 'axios';

function App() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const postUrl = async (url) => {
    console.log(url);
    const result = await axios.post('http://localhost:3001/url', {
      'url': url
    });
    console.log(result);
  }

  const submitUrl = (event) => 
  {
    const form = event.currentTarget;
    const url = form.querySelector('div>input').value;
    postUrl(url);
    event.preventDefault();
    handleClose();
  }

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Amet</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#">Home</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="https://github.com/MananJethwani/amazon-ekart-tracker">
                Github
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.75), rgba(255,255,255,.75)), url(/hero-bg.jpg)",
        }}
        className="container-fluid main fixed-top"
      >
        <div className="row rw">
          <div className="offset-md-2 col-md-8 offset-1 col-10">
            <h1>Welcome to AMET!!</h1>
            <h3>
              The one stop for traking and reviewing amazon products in best
              way!
            </h3>
          </div>
        </div>
      </div>
      <Button className="button" variant="primary" onClick={handleShow}>
        +
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="url" onSubmit={submitUrl}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Product Url</Form.Label>
              <Form.Control type="text" placeholder="Ener Url" />
              <Form.Text className="text-muted">
                Product might take a minute to be ready.
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" form="url" type="submit">
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default App;
