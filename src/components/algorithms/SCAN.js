import React, { useState } from 'react';
import './AlgorithmStyles.css'; // Make sure this file has the updated animation styles

const SCAN = () => {
  const [requests, setRequests] = useState('');
  const [diskSize, setDiskSize] = useState(199);
  const [headStart, setHeadStart] = useState(0);
  const [direction, setDirection] = useState('left');
  const [seekSequence, setSeekSequence] = useState([]);
  const [totalSeekTime, setTotalSeekTime] = useState(null);
  const [animationSteps, setAnimationSteps] = useState([]);
  const [currentHead, setCurrentHead] = useState(null);

  const handleSimulate = () => {
    let queue = requests.split(',').map(Number).sort((a, b) => a - b);
    let totalSeek = 0;
    let sequence = [];
    let steps = [];
    let currentHeadPos = headStart;

    let left = queue.filter(req => req < headStart).reverse();
    let right = queue.filter(req => req >= headStart);

    if (direction === 'left') {
      sequence = [...left, 0, ...right]; // Moving left, then right
    } else {
      sequence = [...right, Math.max(...queue), ...left]; // Moving right, then left
    }

    for (let i = 0; i < sequence.length; i++) {
      totalSeek += Math.abs(currentHeadPos - sequence[i]);
      steps.push({ from: currentHeadPos, to: sequence[i] });
      currentHeadPos = sequence[i];
    }

    setSeekSequence(sequence);
    setTotalSeekTime(totalSeek);
    setAnimationSteps(steps);
    setCurrentHead(headStart);
    animateDisk(steps);
  };

  const animateDisk = (steps) => {
    let i = 0;
    setCurrentHead(null); // Reset before animation
    const interval = setInterval(() => {
      if (i >= steps.length) {
        clearInterval(interval);
        return;
      }
      setCurrentHead(steps[i].to);
      i++;
    }, 1000); // Adjust speed for visible animation
  };

  return (
    <div className="algorithm-container">
      <h2>SCAN Disk Scheduling</h2>

      <div className="input-group">
        <label>Request Queue (comma-separated):</label>
        <input
          type="text"
          placeholder="Example: 82,170,43,140,24,16,190"
          value={requests}
          onChange={e => setRequests(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label>Initial Head Position:</label>
        <input
          type="number"
          placeholder="Example: 50"
          value={headStart}
          onChange={e => setHeadStart(Number(e.target.value))}
        />
      </div>

      <div className="input-group">
        <label>Direction:</label>
        <select value={direction} onChange={e => setDirection(e.target.value)}>
          <option value="left">Left</option>
          <option value="right">Right</option>
        </select>
      </div>
      <div className="input-group">
        <label>Disk Size (Max Cylinder):</label>
        <input
          type="number"
          value={diskSize}
          onChange={(e) => setDiskSize(Number(e.target.value))}
        />
      </div>

      <button onClick={handleSimulate}>Simulate</button>

      {totalSeekTime !== null && (
        <div className="result">
          <h3>Simulation Result</h3>
          <p><strong>Total Seek Time:</strong> {totalSeekTime} cylinders</p>
          <p><strong>Seek Sequence:</strong> {headStart} → {seekSequence.join(' → ')}</p>
        </div>
      )}

      {/* Disk Animation */}
      <div className="disk-container">
        {seekSequence.map((req, index) => (
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

export default SCAN;
