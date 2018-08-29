import React, { Component } from 'react';
import mapMarker from './media/map-marker.svg';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import * as maps from './maps.js';
import Header from './Header.js';
import Footer from './Footer.js';
import './App.css';


class App extends Component {

  constructor(props) {
    super(props);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
    this.onMouseoverMarker = this.onMouseoverMarker.bind(this);
    this.state = { error: null, errorInfo: null };
    this.state = {
      showingInfoWindow: false,
      selectedPlace: "",
      activeMarker: {},
      venues: [],
      success: false,
      infoLoaded: true,
      query: "",
      findPlaces: [],
      markerfl: null,
      hasError: false
    };
  }

  //Handles error catching
  componentDidCatch(error, errorInfo) {
    console.log("An error occured " + error);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  //Get information about map location using foursquare.API
  getLocations() {
        maps.getLocationsAll()
        .then(venues => {
        this.setState({ venues: venues })

  })
        .catch(error => this.componentDidCatch(error, error.toString()))
  }

componentDidMount () {
  this.getLocations()
}
 // On Clik marker function
  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
      icon: mapMarker,
     });
  };
  // On Clik list function
  onListClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
      icon: mapMarker,
     });
  };

  // On map click function
  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
        selectedPlace: props,
        icon: mapMarker,

      })
    }
  };

  // On mouseover marker function
  onMouseoverMarker(props, marker, e) {
      this.setState({
      selectedPlace: props,
      activeMarker: marker,
      icon: mapMarker,

    });
  };
  // On InfoWindow Close marker function
  onInfoWindowClose= (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
       showingInfoWindow: false,
       activeMarker: null,
       icon: mapMarker
      })
    }
  };

  // Update locations list
  updateQuery = (query) => {
    this.setState({ query: query })
     this.setState({
        showingInfoWindow: false,
        activeMarker: null,
        icon: mapMarker,

      })
    this.updatesfindLocations(query)
  }
  // Find locations list
  updatesfindLocations = (query) => {
        //query interogation, look for locations that match
        if (query) {
            //using maps display matching places
            maps.getSelectedAll(query).then((findPlaces) => {
                //check if search query doesn't exist or generate error, then no results, empty array
                //Reference: https://dev.to/sarah_chima/error-boundaries-in-react-3eib
                               //in location math with query then it are displayed
                    this.setState({ findPlaces: findPlaces })
                    this.setState({ venues: findPlaces })
            })
            .catch(error => this.componentDidCatch(error, error.toString()))
            //no query shows us no results, empty array
        } else {
            this.setState({ findPlaces: [] })
        }
    }

  render() {

      if (this.state.errorInfo) {
      // Error path
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error.stack}
          </details>
        </div>
      );
    }

     return (
  // HTML content
  <div className="wrapper">
  <header className="header"><Header/></header>
    <article className="main"> { (
          <Map
          google={this.props.google}
          onClick={this.onMapClicked}
          initialCenter={{
          lat: 45.134503,
          lng: 25.73285
          }}
          zoom={13}
        >
     {this.state.venues.map(myMarker =>
        <Marker
          ondomready={this.onListClick}
          key={myMarker.id}
          id={myMarker.id}
          onClick={this.onMarkerClick}
          icon={this.state.selectedPlace.id === myMarker.id ? this.state.icon : mapMarker }
          position={myMarker.location}
          title={myMarker.title}
          name={myMarker.name}
          animation={this.state.activeMarker ? (this.state.selectedPlace.id === myMarker.id ? '1' : '0') : '0'}
        >
        </Marker>
      )}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          position={this.state.selectedPlace.location}
          onClose={this.onInfoWindowClose}
        >
           <div key={this.state.selectedPlace.id}>
           <h1> {this.state.selectedPlace.name} </h1>
          {this.state.venues.map(info =>
           <div key={info.id}>
           <p>{this.state.selectedPlace.id === info.id ?info.location.address : ''} </p>
           <p>{this.state.selectedPlace.id === info.id ?info.location.crossStreet : ''} </p>
           </div>
        )}
            </div>
        </InfoWindow>
      </Map>
       )}
  </article>
  <aside className="aside aside-1">
        <h2>Places in Campina</h2>
      <div className="input-wrapper">
          <input
            type="text"
            placeholder="Search"
            aria-label="Search"
            onChange={e => this.updateQuery(e.target.value)}
          />
      </div>
      <div>
        <ul className="filtered-list" tabIndex="0">
          {
        this.state.venues.map(place =>
              <li
                key={place.id}
                className="result-item"
                tabIndex="0"
                id={place.id}
                onClick={e => this.onListClick(place, this.marker, e)}
              >
                {place.name}
              </li>
            )
          }
        </ul>
      </div>
      </aside>
  <footer className="footer"><Footer/></footer>
  </div>
    );
  }
}

    // Insert Google API
    export default GoogleApiWrapper({
      apiKey: "AIzaSyDlN7aQHbGpkK85nmc_tDFZEGcuq999SwA",
      v: "3.32"
    })(App);
