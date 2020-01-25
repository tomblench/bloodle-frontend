import React from 'react';
import logo from './logo.svg';
import './App.css';
import Users from './Users.js';
import Events from './Events.js';
import Votes from './Votes.js';
import VotingSummary from './VotingSummary.js';
import Choices from './Choices.js';
import Utils from './Utils';


class App extends React.Component {
  constructor(props) {
      super(props);
            this.handleEventChange = this.handleEventChange.bind(this);
      this.state = {voteData: {}, choiceData: {}, eventData: {}, eventIsLoaded: false, eventError: null};
  }


    fetchVote(url) {
      fetch(url)
      .then(res => res.json())
      .then(
          (result) => {
          this.setState({
              voteData: result,
          });

        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
            this.setState({
                eventError: error
          });
        }
      );
    }

    
    fetchChoices(url) {
      fetch(url)
      .then(res => res.json())
      .then(
          (result) => {
              console.log(JSON.stringify(result));
          this.setState({
              choiceData: result,
          });
              console.log(JSON.stringify("***"+result._embedded.choices));
              const that = this;
              result._embedded.choices.forEach(function(ch) {
                  console.log(ch._links.votes.href);
                  const voteUrl = Utils.rewriteLink(ch._links.votes.href);
                  console.log(voteUrl);
                  that.fetchVote(voteUrl);
              });

        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
            this.setState({
                eventError: error
          });
        }
      );
    }

    fetchEvent(url) {
        fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
              eventData: result,
              eventIsLoaded: true              
          });
            const choicesUrl = Utils.rewriteLink(result._links.choices.href);
            this.fetchChoices(choicesUrl);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
            this.setState({
                eventError: error
          });
        }
      )

    }
    
    handleEventChange(e){
        console.log("event changed app");
        const url = Utils.rewriteLink(e.target.id);
        this.fetchEvent(url);        
    }
    
    render() {
            const eventData = this.state.eventData;
            const eventIsLoaded = this.state.eventIsLoaded;
            const eventError = this.state.eventError;
            const choiceData = this.state.choiceData;
        return (
    <div className="App">
          <header className="App-header">
          <h3>Events:</h3>
          <Events
      onEventChange={this.handleEventChange}
      />

          <h3>Voting Summary:</h3>
          <VotingSummary
            choiceData={choiceData} data={eventData} isLoaded={eventIsLoaded} error={eventError}
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
