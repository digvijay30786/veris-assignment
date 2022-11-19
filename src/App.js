import "./App.page.css";
import "./responsive.page.css";
// antd icon
import {
  ClockCircleFilled,
  CalendarFilled,
  GlobalOutlined,
} from "@ant-design/icons";

// antd components
import { Button, message, Modal } from "antd";
import React, { useRef, useState } from "react";

function App() {
  // setup usestate value
  const [modal2Open, setModal2Open] = useState(false);
  const [Details, setDetails] = useState({ name: "", email: "", comment: "" });

  // assign VALE IN REF
  const formRef = useRef(null);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const commentRef = useRef(null);

  // antd message toast configuration
  const [messageApi, contextHolder] = message.useMessage();

  // function creation
  const handleFormDetails = (e) => {
    const nameInput = nameRef.current;
    const emailInput = emailRef.current;
    const commentInput = commentRef.current;
    if (nameInput.value === "") {
      nameInput.focus();
      messageApi.open({
        type: "error",
        content: `${nameInput.name} should not be empty`,
      });
      return false;
    }
    if (emailInput.value === "") {
      emailInput.focus();
      messageApi.open({
        type: "error",
        content: `${emailInput.name} should not be empty`,
      });
      return false;
    }

    setDetails((pre) => {
      return {
        ...pre,
        name: nameInput.value,
        email: emailInput.value,
        comment: commentInput.value,
      };
    });

    setModal2Open(true);
  };
  const handleModalClose = (status) => {
    if (status) {
      nameRef.current.value = "";
      emailRef.current.value = "";
      commentRef.current.value = "";
    }

    setModal2Open(false);
  };
  return (
    <React.Fragment>
      {contextHolder}
      <Modal
        centered
        open={modal2Open}
        onOk={() => handleModalClose(1)}
        onCancel={() => handleModalClose(0)}
        className="meetup-modal"
      >
        <div className="top-section h-5">Meeting Details</div>
        <div className="center-section">
          <div className="h-4">Name : {Details.name}</div>
          <div className="h-4">Email : {Details.email}</div>
          <div className="h-4">Comment : {Details.comment}</div>
        </div>
      </Modal>
      <div className="container">
        <div className="meetup-card">
          <div className="meetup-details">
            <div className="details h-5">Digvijay singh</div>
            <div className="details h-2">15 Minute Meeting </div>
            <div className="meetup-time-details">
              <div className="h-5">
                <ClockCircleFilled /> 15 Min
              </div>
              <div className="h-5">
                <CalendarFilled /> 9:30am - 9:45am,Friday,September 16,2022
              </div>
              <div className="h-5">
                <GlobalOutlined /> India Standard Time
              </div>
            </div>
          </div>
          <div className="meetup-form">
            <div className="details h-3">Enter Details</div>
            <form ref={formRef} className="form-section">
              <div>
                <label className="h-4">Name *</label>
                <input
                  ref={nameRef}
                  placeholder="Enter Full Name"
                  className="form-input"
                  name="Name"
                />
              </div>
              <div>
                <label className="h-4">Email *</label>
                <input
                  placeholder="Enter Email Address"
                  className="form-input"
                  ref={emailRef}
                  name="Email"
                />
                <Button className="addGuest-btn">Add Guests</Button>
              </div>
              <div>
                <label className="h-4">
                  Please share anything that will help prepare for our meeting
                </label>
                <textarea
                  rows={3}
                  ref={commentRef}
                  placeholder="Enter Email Address"
                  className="form-input"
                  name="Comment"
                />
              </div>
              <div>
                <Button
                  type="primary"
                  onClick={handleFormDetails}
                  className="addGuest-btn"
                  style={{ color: "white" }}
                >
                  Schedule Event
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
