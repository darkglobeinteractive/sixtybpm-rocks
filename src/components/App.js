import React, { Component } from 'react';
import './App.css';
import SixtyBPM from '../apis/sixtybpm';
import Header from './Header';
import Form from './Form';
import Stones from './Stones';
import StonesLoading from './StonesLoading';
import Footer from './Footer';

class App extends Component {

  // Create constructor and instantiate state
  constructor(props) {
    super(props);
    this.state = {
      stones: []
    }
  }

  // On render request Gallery items in the "Roaming Stone" collection
  componentDidMount() {

    SixtyBPM.get('/gallery', {
      params: {
        orderby: 'title',
        order: 'asc',
        per_page: 100,
        collection: 118,
        _fields: 'acf.roaming_stone_location,title,id,gallery_image'
      }
    }).then((res) => {

      // Return a stone object for each item in the response
      const stones = res.data.map(stone => {
        return {
          id: stone.id,
          title: stone.title.rendered,
          location: stone.acf.roaming_stone_location,
          image_url: stone.gallery_image
        }
      });

      // Set the state with the new stones array
      this.setState({
        stones
      });

    });

  }

  // Render the loading component until the stones state object has been populated
  renderStones() {
    if (this.state.stones.length === 0) {
      return (
        <StonesLoading />
      );
    }
    return (
      <Stones stones={this.state.stones} />
    );
  }

  render() {
    return (
      <div id="page">
        <div className="section">
          <Header />
          <Form />
        </div>
        {this.renderStones()}
        <Footer />
      </div>
    );
  }
}

export default App;
