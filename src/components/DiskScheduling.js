import React from 'react';
import { Link } from 'react-router-dom';
import './DiskScheduling.css';

function DiskScheduling() {
  return (
    <div>
      <h2>Disk Scheduling Algorithms</h2>
      <ul>
        <li>
          <Link to="/disk-scheduling/fcfs">First-Come, First-Served (FCFS)</Link>
        </li>
        <li>
          <Link to="/disk-scheduling/sstf">Shortest Seek Time First (SSTF)</Link>
        </li>
        <li>
          <Link to="/disk-scheduling/scan">SCAN</Link>
        </li>
        <li>
          <Link to="/disk-scheduling/cscan">C-SCAN</Link>
        </li>
        <li>
          <Link to="/disk-scheduling/look">LOOK</Link>
        </li>
        <li>
          <Link to="/disk-scheduling/clook">C-LOOK</Link>
        </li>
      </ul>
    </div>
  );
}

export default DiskScheduling;
