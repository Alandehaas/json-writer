import React, { useState } from "react";
import "../css/dynamicJsonForm.css"; // Import the external CSS file

const DynamicJsonForm = () => {
  const [formData, setFormData] = useState([{ key: "", value: "" }]);
  const [jsonObject, setJsonObject] = useState(null);
  const [isCopiedMessageVisible, setIsCopiedMessageVisible] = useState(false);

  const handleAddField = () => {
    setFormData([...formData, { key: "", value: "" }]);
  };

  const handleInputChange = (index, field, value) => {
    const newFormData = [...formData];
    newFormData[index][field] = value;
    setFormData(newFormData);
  };

  const handleGenerateJson = () => {
    const generatedObject = {};
    formData.forEach((field) => {
      if (field.key.trim() !== "") {
        generatedObject[field.key] = field.value;
      }
    });
    setJsonObject(generatedObject);
  };

  const handleCopyToClipboard = () => {
    const jsonString = JSON.stringify(jsonObject, null, 2);
    navigator.clipboard.writeText(jsonString).then(() => {
      setIsCopiedMessageVisible(true);
    });
  };

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div className="json-form-container">
      {formData.map((field, index) => (
        <div key={index} className="json-field">
          <input
            className="form-control"
            type="text"
            placeholder="Key"
            value={field.key}
            onChange={(e) => handleInputChange(index, "key", e.target.value)}
          />
          <input
            className="form-control"
            type="text"
            placeholder="Value"
            value={field.value}
            onChange={(e) => handleInputChange(index, "value", e.target.value)}
          />
        </div>
      ))}
      <div className="buttons">
        <button className="btn btn-primary" onClick={handleAddField}>Add Field</button>
        <button className="btn btn-success" onClick={handleGenerateJson}>Generate JSON</button>
        <button className="btn btn-primary" onClick={handleCopyToClipboard}>Copy to Clipboard</button>
      </div>
      {jsonObject && (
        <div className="json-result">
          <h3>Generated JSON:</h3>
          <pre>{JSON.stringify(jsonObject, null, 2)}</pre>
        </div>
      )}
      {isCopiedMessageVisible && <div>"JSON Copied to Clipboard!"</div>}{" "}
      <button className="refresh btn btn-secondary" onClick={refreshPage}>
        Refresh Writer
      </button>
    </div>
  );
};

export default DynamicJsonForm;
