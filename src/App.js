import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

import HookFlow from './examples/hook-flow.jsx';
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
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/hookflow">
            <HookFlow />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
