import React from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { key } from './not_an_api_key';

class Bikemap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showingInfoWindow: true,
      activeMarker: {},
      selectedStation: {}
    };
  }

  componentDidMount() {
    // Resizing the google-maps-react container
    let content = document.getElementById('bikemap');
    content.children[1].setAttribute('style', 'height: calc(70% - 50px); position: absolute; width: 100%');
  }

  handleMarkerClick = (props, marker) => {
    this.setState({ 
      showingInfoWindow: true,
      activeMarker: marker,
      selectedStation: props.station
    });
  }

  onClose = () => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    };
  }

  render() {
    let stations = this.props.stations;
    const { google } = this.props;
    const mapStyles = {
      width: '100%',
      height: '100%',
      maxWidth: '1000px',
      margin: '0 auto',
    };

    return(
      <section id="bikemap">
        <h1>Kart</h1>
        <Map
          google={this.props.google}
          zoom={12}
          style={mapStyles}
          initialCenter={{ lat: stations[0].lat, lng: stations[0].lon }}>
          {stations.map(station => {
            return(
              <Marker 
                key={station.station_id} 
                onClick={this.handleMarkerClick}
                position={{ lat: station.lat, lng: station.lon }} 
                title={station.station_name}
                station={station}
                icon={{
                  url: station.num_bikes_available ? './images/marker.png' : './images/marker-full.png',
                  anchor: new google.maps.Point(10,10),
                  scaledSize: new google.maps.Size(23,23)
                }} 
              />
            );
          })}
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}>
            <div className="infobox">
              <h2>{this.state.selectedStation.name}</h2>
              <div className="available">
                <p>{this.state.selectedStation.num_bikes_available}</p>
                <p>Sykler</p>
              </div>
              <div className="available">
                <p>{this.state.selectedStation.num_docks_available}</p>
                <p>Parkeringer</p>
              </div>
            </div>
          </InfoWindow>
        </Map>
      </section>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: key 
})(Bikemap);