import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import PageReplacement from './components/PageReplacement';
import DiskScheduling from './components/DiskScheduling';
import LRU from './components/algorithms/LRU';
import FIFO from './components/algorithms/FIFO';
import Optimal from './components/algorithms/Optimal';
import MRU from './components/algorithms/MRU';
import FCFS from './components/algorithms/FCFS';
import SSTF from './components/algorithms/SSTF';
import SCAN from './components/algorithms/SCAN';
import CSCAN from './components/algorithms/CSCAN';
import LOOK from './components/algorithms/LOOK';
import CLOOK from './components/algorithms/CLOOK';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/page-replacement" element={<PageReplacement />} />
        <Route path="/disk-scheduling" element={<DiskScheduling />} />
        <Route path="/page-replacement/lru" element={<LRU />} />
        <Route path="/page-replacement/fifo" element={<FIFO />} />
        <Route path="/page-replacement/optimal" element={<Optimal />} />
        <Route path="/page-replacement/mru" element={<MRU />} />
        <Route path="/disk-scheduling/fcfs" element={<FCFS />} />
        <Route path="/disk-scheduling/sstf" element={<SSTF />} />
        <Route path="/disk-scheduling/scan" element={<SCAN />} />
        <Route path="/disk-scheduling/cscan" element={<CSCAN />} />
        <Route path="/disk-scheduling/look" element={<LOOK />} />
        <Route path="/disk-scheduling/clook" element={<CLOOK />} />
      </Routes>
    </Router>
  );
}

export default App;
