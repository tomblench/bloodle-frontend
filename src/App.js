import React from 'react';
import './App.css';
import Vote from './Vote.js';
import Create from './Create.js';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";

class App extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <Router>
              <Switch>
                <Route path="/vote/:id">
                  <div className="App">
                    <header className="App-header">
                      <h3>Please Vote:</h3>
                      <VoteRoot/>
                    </header>
                  </div>
                </Route>
                <Route path="/create">
                  <div className="App">
                    <header className="App-header">
                      <h3>Create A Poll:</h3>
                      <CreateRoot/>
                    </header>
                  </div>
                </Route>
              </Switch>
            </Router>
        );
    }
    
}

function VoteRoot() {
    let { id } = useParams();
    return (
        <Vote eventId={id}/>
    );
}

function CreateRoot() {
    return (
        <Create/>
    );
}


export default App;
