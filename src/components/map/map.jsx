import React, {useEffect, useRef} from "react";
import leaflet from 'leaflet';
import "leaflet/dist/leaflet.css";
import markersProp from "./markers.prop";
import {connect} from "react-redux";

const Map = ({markers, activeMouseOffer}) => {
  const [city] = markers;
  const {location, points} = city;
  const {latitude, longitude, zoom} = location;
  const mapRef = useRef();

  useEffect(()=> {
    const customIcon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [27, 39]
    });

    mapRef.current = leaflet.map(`map`).setView([latitude, longitude], zoom);
    leaflet.tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {attributes: `© OpenStreetMap contributors © CARTO`})
      .addTo(mapRef.current);
    leaflet.marker([latitude, longitude], {icon: customIcon}).addTo(mapRef.current);

    points.forEach((({point}) => {
      const {latitude, longitude} = point;
      const isActive = activeMouseOffer ? point.id === activeMouseOffer : false;
      const customIcon = leaflet.icon({
        iconUrl: isActive ? `img/pin-active.svg` : `img/pin.svg`,
        iconSize: [27, 39]
      });
      leaflet.marker([latitude, longitude], {icon: customIcon})
        .addTo(mapRef.current)
        .bindPopup(point.title);

    }));
    return () => {
      mapRef.current.remove();
    };
  }, [markers, activeMouseOffer, points]);

  return (
    <div id="map" style={{height: `100%`}} ref={mapRef}></div>
  );
};

const mapStateToProps = ({OFFERS_DATA}) => ({
  activeMouseOffer: OFFERS_DATA.activeMouseOffer,
});

const mapDispatchToProps = () => ({});

Map.propTypes = {
  markers: markersProp,
};

export {Map};
export default connect(mapStateToProps, mapDispatchToProps)(Map);
