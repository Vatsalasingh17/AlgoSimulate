import React, { useState } from "react";
import "./AlgorithmStyles.css";

const Optimal = () => {
  const [referenceString, setReferenceString] = useState("");
  const [frameCount, setFrameCount] = useState(3);
  const [pageFaults, setPageFaults] = useState(0);
  const [frames, setFrames] = useState([]);
  const [animations, setAnimations] = useState([]);

  const handleSimulation = () => {
    const references = referenceString.split(",").map(num => parseInt(num, 10));
    let tempFrames = [];
    let faults = 0;
    let animationSteps = [];

    references.forEach((page, i) => {
      if (!tempFrames.includes(page)) {
        if (tempFrames.length < frameCount) {
          tempFrames.push(page);
        } else {
          // Find the page to replace using Optimal Algorithm
          let futureIndices = tempFrames.map(frame => {
            let futureIndex = references.slice(i + 1).indexOf(frame);
            return futureIndex === -1 ? Infinity : futureIndex;
          });

          let replaceIndex = futureIndices.indexOf(Math.max(...futureIndices));
          tempFrames[replaceIndex] = page;
        }
        faults++;
      }

      animationSteps.push([...tempFrames]); // Capture animation step
    });

    setPageFaults(faults);
    setAnimations(animationSteps);
    animateFrames(animationSteps);
  };

  const animateFrames = (steps) => {
    let i = 0;
    setFrames([]); // Reset frames for animation
    const interval = setInterval(() => {
      if (i >= steps.length) {
        clearInterval(interval);
        return;
      }
      setFrames(steps[i]);
      i++;
    }, 800); // Animation delay
  };

  return (
    <div className="algorithm-container">
      <h2>Optimal Page Replacement</h2>
      
      <div className="input-group">
        <label>Reference String (comma-separated):</label>
        <input
          type="text"
          value={referenceString}
          onChange={(e) => setReferenceString(e.target.value)}
          placeholder="Example: 7,0,1,2,0,3,4,2,3,0,3,2"
        />
      </div>

      <div className="input-group">
        <label>Number of Frames:</label>
        <input
          type="number"
          value={frameCount}
          onChange={(e) => setFrameCount(Number(e.target.value))}
          min="1"
        />
      </div>

      <button onClick={handleSimulation}>Simulate</button>

      {/* Animation Display */}
      <div className="frame-container">
        {frames.map((frame, index) => (
          <div key={index} className="frame-box animate-frame">
            {frame}
          </div>
        ))}
      </div>

      <p>Page Faults: {pageFaults}</p>
    </div>
  );
};

export default Optimal;
