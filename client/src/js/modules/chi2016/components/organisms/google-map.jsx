import React from 'react';
import googleMaps from 'google-maps';
import classNames from 'classnames';

class GoogleMap extends React.Component {
  constructor() {
    super();
    this.google = null;
    this.map = null;
  }
  componentDidMount() {
    const {lat, lng, zoom, onError} = this.props;
    googleMaps.load((google) => {
      if (google) {
        this.google = google;
        this.map = new this.google.maps.Map(this.mapContainer, {
          zoom,
          center: {lat, lng}
        });
      } else {
        onError(new Error('Google not loaded'));
      }
    });
  }
  render() {
    const {width, height, classList} = this.props;

    const style = {
      width,
      height
    };

    const map = (c) => {
      this.map = c;
    };

    const className = classNames(
      'google-map',
      classList.map((name) => (`${name}-google-map`))
    );

    return (
      <div className={className}>
        <div
          ref={map}
          style={style}
        >
        </div>
      </div>
    );
  }
}

GoogleMap.propTypes = {
  classList: React.PropTypes.arrayOf(React.PropTypes.string),
  height: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]),
  lat: React.PropTypes.number,
  lng: React.PropTypes.number,
  onError: React.PropTypes.func,
  width: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]),
  zoom: React.PropTypes.number
};

GoogleMap.defaultProps = {
  classList: [],
  height: 400,
  lat: 12.2969397,
  lng: 121.6576634,
  onError: () => null,
  width: '100%',
  zoom: 6
};

export default GoogleMap;
