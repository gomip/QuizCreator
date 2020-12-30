import React from 'react'
// @ts-ignore
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {LoginPage} from './COM/LoginPage'
import {GeneratePage} from './COM/GeneratePage'

/**
 * 2020.12.07 | gomip | created
 */

export const AppRouter: React.FC = () => {
  return (
    <Router>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route><LoginPage /></Route>
          <Route><GeneratePage /></Route>
        </Switch>
      </React.Suspense>
    </Router>
  );
}
