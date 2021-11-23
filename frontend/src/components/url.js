import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { decode } from "html-entities";
import hdate from "human-date";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Line } from "react-chartjs-2";

function Url(props) {
  const [show, setShow] = useState(false);
  const [url, setUrl] = useState({});
  const [min, setMin] = useState(0);
  const [GData, setGData] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const postUrl = async (email) => {
    await axios.post("http://localhost:3001/email", {
      email: email,
      url: url.url,
    });
  };

  const submitUrl = (event) => {
    const form = event.currentTarget;
    const email = form.querySelector("div>input").value;
    postUrl(email);
    event.preventDefault();
    handleClose();
  };

  let data = useLocation();
  useEffect(() => {
    axios
      .get("http://localhost:3001/url/find", {
        params: {
          id: data.state.id,
        },
      })
      .then((dt) => {
        if (!url.name) {
          setUrl(dt.data);
        }
        let i = 0;
        let m = 0;
        if (url.values && !GData.labels) {
          url.values.forEach((u) => {
            if (u === url.minimum_value) {
              m = i;
            }
            i++;
          });
          console.log("here");
          setGData({
            labels: url.dates.map((date) => hdate.prettyPrint(date)),
            datasets: [
              {
                label: "Price",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(75,192,192,1)",
                borderColor: "rgba(0,0,0,1)",
                borderWidth: 2,
                data: url.values,
              },
            ],
          });
        }
        setMin(m);
      });
  }, [url, data, GData]);
  return (
    <>
      <div className="row image-col">
        <div className="offset-2 col-3">
          <img className="image" src={url.imageUrl} alt="urlImage" />
        </div>
        <div className="offset-1 col-4 mid-text">
          <div className="row">
            <h2 className="productName col-12">{decode(url.name)}</h2>
            <br />
            <h3 className="productMin col-12">
              Minimum Price: INR {url.minimum_value}, Last ovserved at:{" "}
              {url.dates && hdate.prettyPrint(url.dates[min])}
            </h3>
            <h3 className="productCurrent col-12">
              Latest Price: INR {url.values && url.values.slice(-1)}, On:{" "}
              {url.dates && hdate.prettyPrint(url.dates.slice(-1))}
            </h3>
            <button className="btn btn-primary" onClick={handleShow}>
              Track Product
            </button>
          </div>
        </div>
      </div>
      <div className="row ">
        <div className="offset-2 col-8 mt-5">
          <Line className="mt-5"
            data={GData}
            options={{
              title: {
                display: true,
                text: "Average Rainfall per month",
                fontSize: 20,
              },
              legend: {
                display: true,
                position: "right",
              },
            }}
          />
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Modal heading</Modal.Title>
          <button className="btn-close" onClick={handleClose}></button>
        </Modal.Header>
        <Modal.Body>
          <Form id="url" onSubmit={submitUrl}>
            <Form.Group classNameName="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Ener Email" />
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

export default Url;
