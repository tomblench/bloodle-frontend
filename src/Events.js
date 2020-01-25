import React from 'react';



class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
      this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:3000/events")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result._embedded.events
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
          (error) => {
              this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
 handleClick(e) {
    e.preventDefault();
     console.log("It was clicked "+e);
     this.props.onEventChange(e);
}

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {items.map(item => (
            <li key={item.name}>
                  <a href="#" onClick={this.handleClick} id={item._links.self.href}>      
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      );
    }
  }
}

export default Events;
