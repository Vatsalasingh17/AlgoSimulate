import React from 'react';
import { Link } from 'react-router-dom';
import './PageReplacement.css';

function PageReplacement() {
  return (
    <div>
      <h2>Page Replacement Algorithms</h2>
      <ul>
        <li>
          <Link to="/page-replacement/lru">Least Recently Used (LRU)</Link>
        </li>
        <li>
          <Link to="/page-replacement/fifo">First-In-First-Out (FIFO)</Link>
        </li>
        <li>
          <Link to="/page-replacement/optimal">Optimal</Link>
        </li>
        <li>
          <Link to="/page-replacement/mru">Most Recently Used (MRU)</Link>
        </li>
      </ul>
    </div>
  );
}

export default PageReplacement;
