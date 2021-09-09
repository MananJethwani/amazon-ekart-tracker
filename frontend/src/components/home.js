import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import axios from 'axios';
import hdate from 'human-date';

function Home() {
    const [show, setShow] = useState(false);
    const [urlData, setUrlData] = useState([]);

    const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    axios.get('http://localhost:3001/url').then(({data}) => {
      console.log(data);
      setUrlData(data);
    });
  })

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
        <div
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.75), rgba(255,255,255,.75)), url(/hero-bg.jpg)",
        }}
        className="container-fluid main"
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
        {urlData.map(url => {
          return (<div class="row mt-5">
            <div class="offset-1 col-10 urlBox">
              <div class="urlName">{url.name}</div>
              <div class="urlMinValue">Minimum Value: INR {url.minimum_value}, Last Observed At: {hdate.prettyPrint(url.date)}</div>
            </div>
          </div>);
        })}
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
  )
}

export default Home;