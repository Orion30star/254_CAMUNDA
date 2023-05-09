import React, { useState } from "react";
import "./App.css";

import { startProcess } from "./Service";
import { completeServiceTask } from "./Service";

function Page1({ onNextPage }) {
  const [firstName, setFirstName] = useState("");

  const [lastName, setLastName] = useState("");

  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("");
  const [method, setMethod] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // send data to Camunda as process variable
    const config = {
      workerId: "worker1",
      topics: [{ topicName: "my-topic", lockDuration: 10000 }],
      variables: {
        firstName: { value: firstName, type: "String" },
        lastName: { value: lastName, type: "String" },
        phone: { value: phone, type: "String" },
        category: { value: category, type: "String" },
        method: { value: method, type: "String" },
      },
    };
    startProcess(config);

    onNextPage({ firstName, lastName, phone });
  };
  return (
    <div>
            <h2>Anzeigesystem</h2>
           {" "}
      <form onSubmit={handleSubmit}>
                <label>Vorname:</label>
               {" "}
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
                <br />
                <label>Nachname:</label>
               {" "}
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
                <br />
                <label>Telefonnummer:</label>
               {" "}
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
                <br />
                <button type="submit">Weiter</button>
             {" "}
      </form>
         {" "}
    </div>
  );
}

function Page2({ onSubmit, onBack }) {
  const [category, setCategory] = useState("");
  const [method, setMethod] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ category, method });
  };

  return (
    <div>
      <h2>Anzeigesystem</h2>
      <form onSubmit={handleSubmit}>
        <label>Fall kategorisieren:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Bitte auswählen</option>
          <option value="Option 1">Option 1</option>
          <option value="Option 2">Option 2</option>
          <option value="Option 3">Option 3</option>
        </select>
        <br />
        <label>Kommunikationsmethode:</label>
        <div>
          <label>
            <input
              type="radio"
              name="method"
              value="Telefonat"
              checked={method === "Telefonat"}
              onChange={(e) => setMethod(e.target.value)}
            />
            Telefonat
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="method"
              value="Textfeld"
              checked={method === "Textfeld"}
              onChange={(e) => setMethod(e.target.value)}
            />
            Textfeld
          </label>
        </div>
        <br />
        <button type="submit">Abschicken</button>
        <button type="button" onClick={onBack}>
          Zurück
        </button>
      </form>
    </div>
  );
}

function App() {
  const [data, setData] = useState(null);

  const handleNextPage = (formData) => {
    setData(formData);
  };

  const handleBack = () => {
    setData(null);
  };

  const handleSubmission = (formData) => {
    setData({ ...data, ...formData });

    // send updated data to Camunda as process variables
    const variables = {
      firstName: { value: data.firstName, type: "String" },
      lastName: { value: data.lastName, type: "String" },
      phone: { value: data.phone, type: "String" },
      category: { value: data.category, type: "String" },
      method: { value: data.method, type: "String" },
    };
    completeServiceTask(data.serviceTaskId, variables);
  };

  return (
    <div className="container" style={{ width: "60%", margin: "0 auto" }}>
      {!data && <Page1 onNextPage={handleNextPage} />}
      {data && <Page2 onSubmit={handleSubmission} onBack={handleBack} />}
    </div>
  );
}

export default App;
