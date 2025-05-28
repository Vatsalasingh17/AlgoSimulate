import React, { useState } from 'react';
import './AlgorithmStyles.css';

const CLOOK = () => {
  const [requests, setRequests] = useState('');
  const [headStart, setHeadStart] = useState(0);
  const [diskSize, setDiskSize] = useState(199);
  const [seekSequence, setSeekSequence] = useState([]);
  const [totalSeekTime, setTotalSeekTime] = useState(null);
  const [currentHead, setCurrentHead] = useState(null);
  const [animationSteps, setAnimationSteps] = useState([]);

  const handleSimulate = () => {
    let queue = requests.split(',').map(Number).sort((a, b) => a - b);
    let sequence = [];
    let animationSteps = [];
    let totalSeek = 0;
    let currentPosition = headStart;

    let right = queue.filter(request => request >= headStart);
    let left = queue.filter(request => request < headStart);

    sequence = [...right, ...left];

    for (let i = 0; i < sequence.length; i++) {
      totalSeek += Math.abs(currentPosition - sequence[i]);
      animationSteps.push({ from: currentPosition, to: sequence[i] });
      currentPosition = sequence[i];
    }

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
    }, 800); // Adjust time for smooth animation
  };

  return (
    <div className="algorithm-container">
      <h2>C-LOOK Disk Scheduling</h2>
      <div className="input-group">
        <label>Request Queue (comma-separated):</label>
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

export default CLOOK;
