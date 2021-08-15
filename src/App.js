import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

import HookFlow from './examples/hook-flow.jsx';
import GraphQL from './components/GraphQL';
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
              <Link to="/graphQLQuerry">GraphQL</Link>
            </li>
            <li>
              <Link to="/toolkit">Toolkit</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/hookflow">
            <HookFlow />
          </Route>
          <Route path="/graphQLQuerry">
            <GraphQL />
          </Route>
          <Route path="/toolkit">
            <Toolkit />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
