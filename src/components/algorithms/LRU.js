import React, { useState } from "react";
import "./AlgorithmStyles.css";

const LRU = () => {
  const [referenceString, setReferenceString] = useState("");
  const [frameCount, setFrameCount] = useState(3);
  const [frames, setFrames] = useState([]);
  const [pageFaults, setPageFaults] = useState(0);
  const [animations, setAnimations] = useState([]);

  const handleSimulation = () => {
    const references = referenceString.split(",").map(Number);
    let frameArray = [];
    let faults = 0;
    let lruMap = new Map();
    let animationSteps = [];

    references.forEach((page, index) => {
      let currentFrames = [...frameArray];

      if (!frameArray.includes(page)) {
        if (frameArray.length < frameCount) {
          frameArray.push(page);
        } else {
          // Find the least recently used page and replace it
          let leastUsedPage = Array.from(lruMap.keys()).reduce((a, b) =>
            lruMap.get(a) < lruMap.get(b) ? a : b
          );
          let replaceIndex = frameArray.indexOf(leastUsedPage);
          frameArray[replaceIndex] = page;
          lruMap.delete(leastUsedPage);
        }
        faults++;
      }
      lruMap.set(page, index); // Update last used index
      animationSteps.push([...frameArray]); // Capture animation step
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
      <h2>LRU Page Replacement</h2>
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

export default LRU;
