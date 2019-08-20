import React from 'react';
import './styles/main.scss';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Stations from './components/Stations';
import Footer from './components/Footer';
import Landing from './components/Landing';
import Bikemap from './components/Bikemap';

// API urls
const infoAPI = 'https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json';
const statusAPI = 'https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      infoData: [],
      statusData: [],
      isLoaded: false,
      error: null
    }
  }

  componentDidMount() {
    // API calls
    let infoAPICall = fetch(infoAPI);
    let statusAPICall = fetch(statusAPI);

    Promise.all([infoAPICall, statusAPICall])
      // fetching both APIs and updating the state
      .then(res => Promise.all(res.map(value => value.json())))
      .then(data => this.setState({ infoData: data[0], statusData: data[1], isLoaded: true }))
      .catch(error => this.setState({ isLoaded: true, error: error }));
  }

  render() {
    let { infoData, statusData, isLoaded, error } = this.state;
    
    if (error) {
      console.log(error);
      return(
        <p>Noe gikk galt.</p>
      );
    } else if (!isLoaded) {
      return(
        <div className="app"> 
          <Router>
            <Navbar />
              <h1 id="loading">Laster inn...</h1>
            <Footer />
          </Router>
        </div>
      );
    } else {
      let info = infoData.data.stations;
      let status = statusData.data.stations;
      let stations = [];

      // pushing data from both APIs into 'stations' array
      for (var i = 0; i < info.length; i++) {
        stations.push({...info[i], ...status[i]});
      }

      return(
        <div className="App">
          <Router>
              <Navbar />
              <Route exact path="/" component={Landing} />
              <Route exact path="/stasjoner" render={(props) => (
                <Stations {...props} stations={stations} />
              )}/>
              <Route exact path="/kart" render={(props) => (
                <Bikemap {...props} stations={stations} />
              )}/>
              <Footer />
          </Router>
        </div>
      );
    }
  }
}

export default App;