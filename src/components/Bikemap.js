import React from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

class Bikemap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showingInfoWindow: true,
      activeMarker: {},
      selectedStation: {}
    }
  }

  handleMarkerClick = (props, marker) => {
    this.setState({ 
      showingInfoWindow: true,
      activeMarker: marker,
      selectedStation: props.station
    });
  }

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  }

  render() {
    const mapStyles = {
      width: '100%',
      height: '60%',
    }

    let stations = this.props.stations;
    return(
      <section id="bikemap">
        <h1>Kart</h1>
        <Map
          id="yeet"
          google={this.props.google}
          zoom={11}
          style={mapStyles}
          initialCenter={{ lat: stations[0].lat, lng: stations[0].lon }}
        >
          {stations.map(station => {
            return(
              <Marker 
                onClick={this.handleMarkerClick}
                key={station.station_id} 
                position={{ lat: station.lat, lng: station.lon }} 
                title={station.station_name}
                station={station} />
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
  apiKey: 'AIzaSyCAeT2hCm_hFWi-NM6aRv9v5KyZxiNktOM'
})(Bikemap);