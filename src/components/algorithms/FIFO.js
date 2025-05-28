import React, { useState } from "react";
import "./AlgorithmStyles.css";

const FIFO = () => {
  const [referenceString, setReferenceString] = useState("");
  const [frameCount, setFrameCount] = useState(3);
  const [diskSize, setDiskSize] = useState(199);
  const [frames, setFrames] = useState([]);
  const [pageFaults, setPageFaults] = useState(0);
  const [animations, setAnimations] = useState([]);

  const handleSimulation = () => {
    const references = referenceString.split(",").map(Number);
    let frameQueue = [];
    let faults = 0;
    let animationSteps = [];

    references.forEach((page) => {
      let currentFrames = [...frameQueue];

      if (!frameQueue.includes(page)) {
        if (frameQueue.length < frameCount) {
          frameQueue.push(page);
        } else {
          frameQueue.shift(); // Remove oldest page (FIFO)
          frameQueue.push(page);
        }
        faults++;
      }
      animationSteps.push([...frameQueue]); // Capture animation step
    });

    setPageFaults(faults);
    setAnimations(animationSteps);
    animateFrames(animationSteps);
  };

  const animateFrames = (steps) => {
    let i = 0;
    const interval = setInterval(() => {
      if (i >= steps.length) {
        clearInterval(interval);
        return;
      }
      setFrames(steps[i]);
      i++;
    }, 800); // Delay for smooth animation
  };

  return (
    <div className="algorithm-container">
      <h2>FIFO Page Replacement</h2>
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
        />
      </div>
      <div className="input-group">
        <label>Disk Size (Max Cylinder):</label>
        <input
          type="number"
          value={diskSize}
          onChange={(e) => setDiskSize(Number(e.target.value))}
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

      {pageFaults !== null && <p>Page Faults: {pageFaults}</p>}
    </div>
  );
};

export default FIFO;
