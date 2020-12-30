import React, {useState} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {Report} from './pages/Report/Report'
import {Sidebar} from './COM/Sidebar'
import {Create} from './pages/Create/Create'
import {Quiz} from './pages/Create/Quiz'
import {Exam} from './pages/Exam/Exam'
import {Solve} from "./pages/Exam/Solve";

/**
 * 2020.12.07 | gomip | fixed
 * @constructor
 */

function App() {
  // State ---------------------------–---------------------------–---------------------------–-------------------------
  const [bpd, setBpd] = useState('')
  const [showName, setShowName] = useState(false)
  // Function ----------------------------------------------------------------------------------------------------------
  const handleBpd = () => setBpd(bpd)
  const handleShowName = () => setShowName(true)
  const handleHideName = () => setShowName(false)
  // Dom ---------------------------------------------------------------------------------------------------------------
  return (
    <>
      <Router>
        {/*<NavBar/>*/}
        <Sidebar handleHideName={handleHideName} handleShowName={handleShowName}/>
        <Switch>
          {/*<Route path="/" exact component={() => <Home showName={showName}/>}/>*/}
          <Route path="/" exact component={() => <Create showName={showName}/>}/>
          <Route path="/create" component={() => <Create showName={showName}/>}/>
          <Route path="/reports" component={() => <Report showName={showName}/>}/>
          <Route path="/exam" component={() => <Exam showName={showName}/>}/>
          <Route path="/quiz" component={() => <Quiz/>}/>
          <Route path="/solve" component={() => <Solve/>}/>
        </Switch>
      </Router>
    </>
  );
}


export default App;
