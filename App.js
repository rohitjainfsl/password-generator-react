import React from "react";
import { useState } from "react";
import { characters } from "./characters";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

function App() {
  const [passwordLength, setPasswordLength] = useState(10);
  const [whatToIncludeState, setWhatToIncludeState] = useState([]);
  const [finalPassword, setFinalPassword] = useState("");

  function handleCheckBoxClick(e) {
    if (e.target.checked) {
      setWhatToIncludeState([
        ...whatToIncludeState,
        characters[e.target.value],
      ]);
    } else {
      setWhatToIncludeState(
        whatToIncludeState.filter((ch) => {
          return ch !== characters[e.target.value];
        })
      );
    }
  }

  function handleClick() {
    if (passwordLength <= 0) {
      alert("Enter the desired length");
    } else {
      //Generate Strong Password

      const whatToIncludeString = whatToIncludeState.join("");
      let finalPassword = "";

      for (let i = 0; i < passwordLength; i++) {
        finalPassword +=
          whatToIncludeString[
            Math.floor(Math.random() * whatToIncludeString.length)
          ];
      }
      setFinalPassword(finalPassword);
    }
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(finalPassword);
  }

  return (
    <div>
      <h2>Password Generator</h2>
      <div className="">
        <input
          type="number"
          placeholder="Enter the desired length"
          id="passwordLength"
          value={passwordLength}
          onChange={(e) => setPasswordLength(e.target.value)}
        />
      </div>
      <div className="requirements">
        <label>
          <input
            type="checkbox"
            id="uppercase"
            value="uppercase"
            onChange={handleCheckBoxClick}
          />
          <span>Upper Case Alphabets</span>
        </label>
        <br />

        <label>
          <input
            type="checkbox"
            id="lowercase"
            value="lowercase"
            onChange={handleCheckBoxClick}
          />
          <span>Lower Case Alphabets</span>
        </label>
        <br />

        <label>
          <input
            type="checkbox"
            id="numbers"
            value="numbers"
            onChange={handleCheckBoxClick}
          />
          <span>Numbers</span>
        </label>
        <br />

        <label>
          <input
            type="checkbox"
            id="spChars"
            value="spChars"
            onChange={handleCheckBoxClick}
          />
          <span>Special Characters</span>
        </label>
      </div>

      <button onClick={handleClick}>Generate Strong Password</button>

      { finalPassword &&
        <p className="password">
          {
            <span>
              {finalPassword} <ContentCopyIcon onClick={copyToClipboard} />
            </span>
          }
        </p>
      }
    </div>
  );
}

export default App;
