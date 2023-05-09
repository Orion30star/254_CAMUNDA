import React, { useState, useEffect } from "react";
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
  // Get the form element

  const form = document.getElementById("myForm");

  // Listen for form submit event

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("category", JSON.stringify(category)); // Clear the form inputs
    localStorage.setItem("method", JSON.stringify(method)); // Clear the form inputs
    onSubmit({ category, method });
    window.alert("You can call this number +41 76 722 26 48");
  };

  return (
    <div>
      <h2>Anzeigesystem</h2>
      <form onSubmit={handleSubmit}>
        <label>Fall kategorisieren:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Bitte auswählen</option>
          <option value="Verkehrdelikt">Verkehrdelikt</option>
          <option value="Einbruch">Einbruch</option>
          <option value="Körperverletzung">Körperverletzung</option>
          <option value="Sachbeschädigung">Sachbeschädigung</option>
          <option value="Sexuelle Belästigung">Sexuelle Belästigung</option>

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

function Page3({ onSubmit, onBack }) {
  const [comment, setComment] = useState("");

    const categoryLocalStorage = localStorage.getItem("category");
    const methodLocalStorage = localStorage.getItem("method");


  return (
    <div>
      <h2>Anzeigesystem</h2>
      <b>Zusammenfassung</b>
        <p>Kategorie: {categoryLocalStorage}</p>
        <p>Kommunikationsmethode: {methodLocalStorage}</p>
    </div>
  );
}

  
function App() {
    const [data, setData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
  
    const handleNextPage = (formData) => {
      setData(formData);
      setCurrentPage(currentPage + 1);
    };
  
    const handleBack = () => {
      setData(null);
      setCurrentPage(currentPage - 1);
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
        comment: { value: formData.comment, type: "String" },
      };
      completeServiceTask(data.serviceTaskId, variables);
    };
  
    return (
      <div className="container" style={{ width: "60%", margin: "0 auto" }}>
        {currentPage === 1 && <Page1 onNextPage={handleNextPage} />}
        {currentPage === 2 && <Page2 onSubmit={handleNextPage} onBack={handleBack} />}
        {currentPage === 3 && <Page3 onSubmit={handleSubmission} onBack={handleBack} />}
      </div>
    );
  }

export default App;
