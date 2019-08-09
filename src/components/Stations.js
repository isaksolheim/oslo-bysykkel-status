import React from 'react';

function Stations(props) {
  let stations = props.stations;
  return(
    <section id="stations">
      <h1>Stasjoner</h1>
      <div className="stations">
        <div className="station-info" id="top">
          <p className="station">Stasjon</p>
          <p className="bikes">Sykkler</p>
          <p className="docs">Låser</p>
        </div>
        {stations.map(station => {
          return(
            <div className="station-info" key={station.station_id}>
              <p className="station">{station.name}</p>
              <div className="bikes">
                <i className="fas fa-bicycle"></i>
                <div className="number">{station.num_bikes_available}</div>
              </div>
              <div className="docs">
                <i className="fas fa-lock-open"></i>
                <div className="number">{station.num_docks_available}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Stations;