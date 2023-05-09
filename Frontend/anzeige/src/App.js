import React, { useState } from "react";
import "./App.css";

function Page1({ onNextPage }) {
  const [firstName, setFirstName] = useState("");

  const [lastName, setLastName] = useState("");

  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onNextPage({ firstName, lastName, phone });
  };

  return (
    <div>
            <h2>Page 1</h2>
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

function Page2({ onSubmit }) {
  const [category, setCategory] = useState("");

  const [method, setMethod] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({ category, method });
  };

  return (
    <div>
            <h2>Page 2</h2>
           {" "}
      <form onSubmit={handleSubmit}>
                <label>Fall kategorisieren:</label>
               {" "}
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Bitte auswählen</option>
                    <option value="Option 1">Option 1</option>
                    <option value="Option 2">Option 2</option>
                    <option value="Option 3">Option 3</option>
                 {" "}
        </select>
                <br />
                <label>Kommunikationsmethode:</label>
               {" "}
        <div>
                   {" "}
          <label>
                       {" "}
            <input
              type="radio"
              name="method"
              value="Telefonat"
              checked={method === "Telefonat"}
              onChange={(e) => setMethod(e.target.value)}
            />
                        Telefonat          {" "}
          </label>
                 {" "}
        </div>
               {" "}
        <div>
                   {" "}
          <label>
                       {" "}
            <input
              type="radio"
              name="method"
              value="Textfeld"
              checked={method === "Textfeld"}
              onChange={(e) => setMethod(e.target.value)}
            />
                        Textfeld          {" "}
          </label>
                 {" "}
        </div>
                <br />
                <button type="submit">Abschicken</button>
             {" "}
      </form>
         {" "}
    </div>
  );
}

function App() {
  const [data, setData] = useState(null);

  const handleNextPage = (formData) => {
    setData(formData);
  };

  const handleSubmission = (formData) => {
    setData({ ...data, ...formData });

    console.log("Submitted data:", { ...data, ...formData });
  };

  return (
    <div>
            {!data && <Page1 onNextPage={handleNextPage} />}
            {data && <Page2 onSubmit={handleSubmission} />}
         {" "}
    </div>
  );
}
export default App;
