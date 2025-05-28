import React, { useState } from 'react';
import './AlgorithmStyles.css';

const MRU = () => {
  const [referenceString, setReferenceString] = useState('');
  const [frameCount, setFrameCount] = useState(3);
  const [pageFaults, setPageFaults] = useState(0);
  const [frames, setFrames] = useState([]);
  const [animations, setAnimations] = useState([]);

  const handleSimulation = () => {
    const references = referenceString.split(',').map(Number);
    let tempFrames = [];
    let faults = 0;
    let mostRecentIndex = -1;
    let animationSteps = [];

    references.forEach((page, index) => {
      let currentFrames = [...tempFrames];

      if (!tempFrames.includes(page)) {
        faults++;
        if (tempFrames.length < frameCount) {
          tempFrames.push(page);
        } else {
          tempFrames[mostRecentIndex] = page;
        }
      }
      mostRecentIndex = tempFrames.indexOf(page);
      animationSteps.push([...tempFrames]); // Capture animation step
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
      setFrames(steps[i]); // Update frames dynamically
      i++;
    }, 800); // Animation speed
  };

  return (
    <div className="algorithm-container">
      <h2>Most Recently Used (MRU) Page Replacement</h2>
      <div className="input-group">
        <label>Reference String (comma-separated):</label>
        <input
          type="text"
          value={referenceString}
          onChange={(e) => setReferenceString(e.target.value)}
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

export default MRU;
