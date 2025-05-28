import React, { useState, useEffect } from 'react';
import './AlgorithmStyles.css';

const FCFS = () => {
  const [requests, setRequests] = useState('');
  const [headStart, setHeadStart] = useState(0);
  const [diskSize, setDiskSize] = useState(199);
  const [seekSequence, setSeekSequence] = useState([]);
  const [totalSeekTime, setTotalSeekTime] = useState(null);
  const [currentHead, setCurrentHead] = useState(null);
  const [animationSteps, setAnimationSteps] = useState([]);

  const handleSimulate = () => {
    let queue = requests.split(',').map(Number);
    let sequence = [];
    let animationSteps = [];
    let totalSeek = 0;
    let currentPosition = headStart;

    queue.forEach(request => {
      sequence.push(request);
      totalSeek += Math.abs(currentPosition - request);
      animationSteps.push({ from: currentPosition, to: request });
      currentPosition = request;
    });

    setSeekSequence(sequence);
    setTotalSeekTime(totalSeek);
    setAnimationSteps(animationSteps);
    setCurrentHead(headStart);
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
    }, 800); // Adjust speed as needed
  };

  return (
    <div className="algorithm-container">
      <h2>FCFS Disk Scheduling</h2>
      <div className="input-group">
        <label>Request Queue (comma-separated):</label>
        <input
          type="text"
          value={requests}
          onChange={(e) => setRequests(e.target.value)}
          placeholder="Example: 98,183,37,122,14,124,65,67"
        />
      </div>
      <div className="input-group">
        <label>Initial Head Position:</label>
        <input
          type="number"
          value={headStart}
          onChange={(e) => setHeadStart(Number(e.target.value))}
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
      <button onClick={handleSimulate}>Simulate</button>

      {totalSeekTime !== null && (
        <div className="result">
          <h3>Simulation Result</h3>
          <p><strong>Total Seek Time:</strong> {totalSeekTime} cylinders</p>
          <p><strong>Seek Sequence:</strong> {headStart} → {seekSequence.join(' → ')}</p>
        </div>
      )}

      {/* Animation */}
      <div className="disk-container">
        {seekSequence.map((req, index) => (
          <div
            key={index}
            className={`disk-request ${currentHead === req ? 'animate-disk' : ''}`}
          >
            {req}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FCFS;
