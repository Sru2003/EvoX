import React, { useEffect, useMemo, useState } from "react";
import api from "../../Services/api";
import TopNav from "../../components/TopNav"
import {
  Alert,
  Button,
  Container,
  Col,
  Row,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Label,
} from "reactstrap";
import FileBase from 'react-file-base64';
import { useNavigate } from "react-router-dom";
import "./events.css";

function EventsPage() {
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
  const navigate=useNavigate();
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
      navigate("/login");
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
        await api.post("/event", eventData, { headers: { user, "Content-Type": "multipart/form-data", } });
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          navigate("/");
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
    
    <div className="bg-primary-black min-h-screen">
      
    <TopNav/>
   <Container className="p-8 rounded-lg">
  <h2 className="text-3xl font-semibold text-center mb-6 fontype">CREATE YOUR EVENT</h2>

  <Form onSubmit={handleEventSubmit}>
    <FormGroup className="mb-4 position-relative flex ">
      <Label for="exampleTitle ">Event Title</Label>
      <Input
        className="ml-16"
        bsSize="lg"
        id="title"
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Enter event title"
      />
    </FormGroup>

    <FormGroup className="mb-4 flex">
      <Label for="exampleText">Event Description</Label>
      <Input
        className="ml-4"
        bsSize="lg"
        id="description"
        type="textarea"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="Enter event description"
      />
    </FormGroup>

    <FormGroup className="mb-4 flex">
      <Label for="exampleSelect">Event Type</Label>
      <Input
        className="ml-14"
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

    <FormGroup className="mb-4 flex">
      <Label for="exampleText">Event Price</Label>
      <InputGroup className="flex ml-12">
        <InputGroupText addonType="prepend"> ₹</InputGroupText>
        <Input
          id="price"
          type="number"
          min="0"
          step="any"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          placeholder="Enter price"
                />
      </InputGroup>
    </FormGroup>

    <FormGroup className="mb-4 flex">
      <Label for="datefield">Select Date</Label>
      <Input
        className="ml-[47px]"
        id="datefield"
        type="date"
        value={date}
        onChange={(event) => setDate(event.target.value)}
        placeholder="Enter date of event"
      />
    </FormGroup>

    <FormGroup className="mb-4 flex">
      <Label for="exampleFile">Thumbnail</Label>
      <Input
        className="ml-12"
        id="thumbnail"
        type="file"
        onChange={(event) => setThumbnail(event.target.files[0])}
      />
      {/* <FileBase type="file" multiple={false} onDone={({ base64 }) => setThumbnail(base64)} /> */}
    </FormGroup>

    <FormGroup className="flex justify-between">
      <Button className="submit-btn special-btn" color="success" size="lg">
        Create Event
      </Button>
      <Button
        className="secondary-btn special-btn"
        onClick={() => navigate("/")}
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
  </div>
  );
}

export default EventsPage;
