import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

import HookFlow from './examples/hook-flow.jsx';
import {Circles} from './components/VisualisationD3/Circles';
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
        </Switch>
      </div>
    </Router>
  );
}
