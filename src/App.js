import React from 'react';
import logo from './logo.svg';
import './App.css';
import Users from './Users.js';
import Events from './Events.js';
import Votes from './Votes.js';
import VotingSummary from './VotingSummary.js';
import EventVotes from './EventVotes.js';
import Choices from './Choices.js';
import Utils from './Utils';


class App extends React.Component {
  constructor(props) {
      super(props);
            this.handleEventChange = this.handleEventChange.bind(this);
      this.state = {votingSummaryData: {}, votingSummaryIsLoaded: false};
  }

    fetchData(url, onData, onError) {
      fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
            onData(result);
        },
        (error) => {
            onError(error);
        }
      );
    }

    handleEventChange(e){
        console.log("event changed app");
        const url = "http://localhost:3000/demo/eventVotes?eventId="+e.target.id;
        this.fetchData(url,
                       (result) => {this.setState({votingSummaryData:result, votingSummaryIsLoaded: true});},
                       (error) => {console.log(error);});        
    }
    
    render() {
            const votingSummaryData = this.state.votingSummaryData;
            const votingSummaryIsLoaded = this.state.votingSummaryIsLoaded;
        return (
    <div className="App">
          <header className="App-header">
          <h3>Events:</h3>
          <Events
      onEventChange={this.handleEventChange}
      />

          <h3>Voting Summary:</h3>
                <EventVotes
            isLoaded={votingSummaryIsLoaded}
            data={votingSummaryData}
      />


          <h3>Users:</h3>
          <Users/>
          <h3>Choices:</h3>
          <Choices/>
          <h3>Votes:</h3>
          <Votes/>
      </header>

    </div>
  );
    }
}

export default App;
