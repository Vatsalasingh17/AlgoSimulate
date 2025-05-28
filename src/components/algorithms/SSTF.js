import React, { useState, useEffect } from 'react';
import './AlgorithmStyles.css'; // Ensure styles are updated

const SSTF = () => {
  const [requests, setRequests] = useState('');
  const [head, setHead] = useState(50);
  const [diskSize, setDiskSize] = useState(199);
  const [sequence, setSequence] = useState([]);
  const [animations, setAnimations] = useState([]);
  const [totalSeekTime, setTotalSeekTime] = useState(0);
  const [currentHead, setCurrentHead] = useState(null);

  const handleSimulation = () => {
    let requestArray = requests.split(',').map(Number);
    let seekSequence = [];
    let animationSteps = [];
    let currentHeadPosition = head;
    let totalSeek = 0;

    while (requestArray.length > 0) {
      let closestIndex = requestArray.reduce((closest, req, i) =>
        Math.abs(req - currentHeadPosition) < Math.abs(requestArray[closest] - currentHeadPosition) ? i : closest, 0
      );

      let closestRequest = requestArray[closestIndex];
      requestArray.splice(closestIndex, 1);
      seekSequence.push(closestRequest);
      animationSteps.push({ from: currentHeadPosition, to: closestRequest });

      totalSeek += Math.abs(closestRequest - currentHeadPosition); // Calculate seek time
      currentHeadPosition = closestRequest;
    }

    setSequence(seekSequence);
    setAnimations(animationSteps);
    setTotalSeekTime(totalSeek);
    setCurrentHead(head);
    animateDisk(animationSteps);
  };

  const animateDisk = (steps) => {
    let i = 0;
    const interval = setInterval(() => {
      if (i >= steps.length) {
        clearInterval(interval);
        return;
      }
      setCurrentHead(steps[i].to);
      i++;
    }, 800); // Adjust time for smooth animation
  };

  return (
    <div className="algorithm-container">
      <h2>SSTF Disk Scheduling</h2>
      <div className="input-group">
        <label>Request Sequence (comma-separated):</label>
        <input
          type="text"
          value={requests}
          onChange={(e) => setRequests(e.target.value)}
          placeholder="Example: 82,170,43,140,24,16,190"
        />
      </div>
      <div className="input-group">
        <label>Initial Head Position:</label>
        <input
          type="number"
          value={head}
          onChange={(e) => setHead(Number(e.target.value))}
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

      {/* Display Total Seek Time */}
      {totalSeekTime > 0 && (
        <div className="result">
          <h3>Simulation Result</h3>
          <p><strong>Total Seek Time:</strong> {totalSeekTime} cylinders</p>
          <p><strong>Seek Sequence:</strong> {head} → {sequence.join(' → ')}</p>
        </div>
      )}

      {/* Disk Animation */}
      <div className="disk-container">
        {sequence.map((req, index) => (
          <div
            key={index}
            className={`disk-request ${
              currentHead === req ? 'animate-disk' : ''
            }`}
          >
            {req}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SSTF;
