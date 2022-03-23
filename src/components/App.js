import React, { Component } from 'react';
import './App.css';
import SixtyBPM from '../apis/sixtybpm';
import Stone from './Stone';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      stones: []
    }
  }

  componentDidMount() {

    SixtyBPM.get('/gallery', {
      params: {
        orderby: 'title',
        order: 'asc',
        per_page: 100,
        collection: 118
      }
    }).then((res) => {

      const stones = res.data.map(stone => {

        return {
          id: stone.id,
          title: stone.title.rendered,
          location: stone.acf.roaming_stone_location,
          image_id: stone.acf.gallery_image,
          image_url: ''
        }

      });

      this.setState({
        stones
      });

    });

  }

  // https://stackoverflow.com/questions/51721983/change-restructure-output-of-wordpress-rest-api-to-include-more-data
  // SixtyBPM.get(`/media/${stone.acf.gallery_image}`).then((res) => {
  //   stone_item['image_url'] = res.data.media_details.sizes.large.source_url
  // });

  renderStones() {
    if (this.state.stones.length === 0) {
      return <></>
    }
    return (
      <div className="stone-container">
        <div className="wrap">
          <h2>Currently Circulating Stones</h2>
          <div className="stone-grid">
            {this.state.stones.map((stone, index) => {
              return (
                <Stone key={index} stone={stone} />
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div id="page">
        <div id="header">
          <div className="wrap">
            <h1>60bpm :: Roaming Stones</h1>
            <p>Decorated stones with unique codes have been distributed around the country. If you've found one, fill-out the form below to learn about the stone's journey so far and add your own story to the mix.</p>
          </div>
        </div>
        <div id="form-container">
          <div className="wrap">
            <form id="form" action="https://60bpm.com/roaming-stones/" method="post">
              <div className="field-set">
                <label htmlFor="rocks-check">Enter the code found on the back of your stone below:</label>
                <input type="text" id="rocks-check" name="rocks_check" />
                <div className="notes">Charcters are either <strong>numbers</strong> or <strong>capitalized letters</strong>.</div>
              </div>
              <div className="field-set">
                <input type="submit" value="Submit" />
              </div>
            </form>
          </div>
        </div>
        {this.renderStones()}
        <div id="footer">
          <div className="wrap">
            <p>Copyright &copy; 2022 60bpm.com</p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
