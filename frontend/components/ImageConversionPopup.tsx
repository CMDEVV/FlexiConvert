import React, { useState } from "react";

function ImageConversionPopup({ file, onSave, onClose }) {
  const [quality, setQuality] = useState(file.customQuality || 80);
  const [width, setWidth] = useState(file.customWidth || "");
  const [height, setHeight] = useState(file.customHeight || "");

  const handleSave = () => {
    onSave(quality, width, height);
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <h3>Edit Settings for {file.file.name}</h3>
        <div>
          <label>Quality:</label>
          <input
            type="number"
            value={quality}
            min="1"
            max="100"
            onChange={(e) => setQuality(parseInt(e.target.value))}
          />
        </div>
        <div>
          <label>Width:</label>
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
          />
        </div>
        <div>
          <label>Height:</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default ImageConversionPopup;
