import React from 'react';
import Utils from './Utils';

class VotingSummary extends React.Component {
  constructor(props) {
    super(props);
  }

    componentDidMount() {

/*
http://localhost:8080/events/{event}/choices
_links.votes
->
http://localhost:8080/choices/{choice}/votes
->
comments
_links.choice
_links.user
*/
        

        

    }

    render() {

        const { isLoaded, choiceData, data, error } = this.props;
        console.log(JSON.stringify(choiceData));
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
        return (
            <p>
                <b>{data.name}</b>
                <table>
                <tr>
                <th>&nbsp;</th>
                {"_embedded" in choiceData ? choiceData._embedded.choices.map(item => (
                <th key={item.title}>{item.title}</th>
                )) : ""}
                </tr>
                </table>



            </p>
      );
    }
  }


}

export default VotingSummary;
