import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

import HookFlow from './examples/hook-flow.jsx';
import {Circles} from './components/VisualisationD3/Circles';
import {Buildings} from './components/VisualisationD3/Buildings';
import {LineChart} from './components/VisualisationD3/LineChart';
import {ScatterPlot} from './components/VisualisationD3/ScatterPlot';
import {BarChart} from './components/VisualisationD3/BarChart';
import Toolkit from './components/Toolkit';
import './App.css';

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/hookflow">HookFlow</Link>
            </li>
            <li>
              <Link to="/toolkit">Toolkit</Link>
            </li>
            <li>
              <Link to="/circles">Circles</Link>
            </li>
            <li>
              <Link to="/buildings">Buildings</Link>
            </li>
            <li>
              <Link to="/line-chart">LineChart</Link>
            </li>
            <li>
              <Link to="/scatter-plot">ScatterPlot</Link>
            </li>
            <li>
              <Link to="/barchart">BarChart</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/hookflow">
            <HookFlow />
          </Route>
          <Route path="/toolkit">
            <Toolkit />
          </Route>
          <Route path="/circles">
            <Circles />
          </Route>
          <Route path="/buildings">
            <Buildings />
          </Route>
          <Route path="/line-chart">
            <LineChart />
          </Route>
          <Route path="/scatter-plot">
            <ScatterPlot />
          </Route>
          <Route path="/barchart">
            <BarChart />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
