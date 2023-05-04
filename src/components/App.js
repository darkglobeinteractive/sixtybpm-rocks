import React, { Component } from 'react';
import SixtyBPM from '../apis/sixtybpm';

import '../css/App.css';
import Header from './Header';
import Form from './Form';
import Stones from './Stones';
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
        collection: 119,
        _fields: 'acf.roaming_stone_location,acf.roaming_stone_name,title,id,gallery_image'
      }
    }).then((res) => {

      // Return a stone object for each item in the response
      const stones = res.data.map(stone => {
        return {
          id: stone.id,
          title: stone.acf.roaming_stone_name,
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

  render() {
    return (
      <div id="page">
        <div className="section">
          <Header />
          <Form />
        </div>
        <Stones stones={this.state.stones} />
        <Footer />
      </div>
    );
  }
}

export default App;
