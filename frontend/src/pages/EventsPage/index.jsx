import React, { useEffect, useMemo, useState } from "react";
import api from "../../Services/api";
import {
  Alert,
  Button,
  Container,
  Col,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Label,
} from "reactstrap";

import "./events.css";

function EventsPage({ history }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [thumbnail, setThumbnail] = useState(null);
  const [date, setDate] = useState("");
  const [eventType, setEventType] = useState("Event Type");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [dropdownOpen, setOpen] = useState(false);
  const user = localStorage.getItem("user");

  useEffect(() => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    today = yyyy + "-" + mm + "-" + dd;
    document.getElementById("datefield").setAttribute("min", today);

    if (!user) {
      history.push("/login");
    }
  }, []);

  const toggle = () => setOpen(!dropdownOpen);

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail]);

  const handleEventSubmit = async (event) => {
    event.preventDefault();
    const eventData = new FormData();

    eventData.append("thumbnail", thumbnail);
    eventData.append("eventType", eventType);
    eventData.append("title", title);
    eventData.append("price", price);
    eventData.append("description", description);
    eventData.append("date", date);

    try {
      if (
        title !== "" &&
        description !== "" &&
        price !== null &&
        eventType !== "" &&
        date !== "" &&
        thumbnail !== null
      ) {
        await api.post("/viewevent", eventData, { headers: { user } });
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          history.push("/");
        }, 2000);
      } else {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 2000);
      }
    } catch (er) {
      Promise.reject(er);
      console.log(er.message);
    }

    return "";
  };

  return (
    <Container className="bg-white p-8 rounded-lg mt-10">
      <h2 className="text-3xl font-semibold text-center mb-6">Create your event</h2>

      <Form onSubmit={handleEventSubmit}>
        <FormGroup className="mb-4">
          <Label for="exampleTitle">Event Title</Label>
          <Input
            bsSize="lg"
            id="title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Enter event title"
          />
        </FormGroup>

        <FormGroup className="mb-4">
          <Label for="exampleText">Event Description</Label>
          <Input
            bsSize="lg"
            id="description"
            type="textarea"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Enter event description"
          />
        </FormGroup>

        <FormGroup className="mb-4">
          <Label for="exampleSelect">Event Type</Label>
          <Input
            type="select"
            name="select"
            id="exampleSelect"
            onChange={(event) => setEventType(event.target.value)}
          >
            <option disabled selected>
              Select event-type
            </option>
            <option value="webinar">Webinar</option>
            <option value="seminar">Seminar</option>
            <option value="workshop">Workshop</option>
          </Input>
        </FormGroup>

        <FormGroup className="mb-4">
          <Label for="exampleText">Event Price</Label>
          <InputGroup>
            <InputGroupText addonType="prepend">₹</InputGroupText>
            <Input
              id="price"
              type="number"
              min="0"
              step="any"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              placeholder="Enter price of event"
            />
          </InputGroup>
        </FormGroup>

        <FormGroup className="mb-4">
          <Label for="datefield">Select Date</Label>
          <Input
            id="datefield"
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            placeholder="Enter date of event"
          />
        </FormGroup>

        <FormGroup className="mb-4">
          <Label for="exampleFile">Thumbnail</Label>
          <Input
            id="thumbnail"
            type="file"
            onChange={(event) => setThumbnail(event.target.files[0])}
          />
        </FormGroup>

        <FormGroup className="flex justify-between">
          <Button className="submit-btn special-btn" color="success" size="lg">
            Create Event
          </Button>
          <Button
            className="secondary-btn special-btn"
            onClick={() => history.push("/")}
            color="danger"
            size="lg"
          >
            Cancel
          </Button>
        </FormGroup>

        {error ? (
          <Alert color="danger" className="event-validation mt-4">
            Missing required information
          </Alert>
        ) : (
          ""
        )}

        {success ? (
          <Alert color="success" className="event-validation mt-4">
            Event was created successfully
          </Alert>
        ) : (
          ""
        )}
      </Form>
    </Container>
  );
}

export default EventsPage;
