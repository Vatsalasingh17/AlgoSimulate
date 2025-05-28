import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
function Home() {
  return (
    <div>
      <h1>Algorithm Visualizer</h1>
      <div>
        <Link to="/page-replacement">
          <button className="homebutton">Page Replacement Algorithms</button>
        </Link>
        <Link to="/disk-scheduling">
          <button className="homebutton">Disk Scheduling Algorithms</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
