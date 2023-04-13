import React, { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLngExpression } from "leaflet";

interface ISelectPosition {
  lat: number;
  lon: number;
  display_name: string;
}

interface IMapsProps {
  selectPosition: ISelectPosition | null;
}

const icon = L.icon({
  iconUrl: "./placeholder.png",
  iconSize: [38, 38],
});

var pos: LatLngExpression = [33.680943, 73.085861];

function ResetCenterView(props: { selectPosition: ISelectPosition | null }) {
  const { selectPosition } = props;
  const map = useMap();

  useEffect(() => {
    if (selectPosition) {
      pos=[selectPosition.lat, selectPosition.lon];
      var targetLatLng = L.latLng(selectPosition?.lat, selectPosition?.lon);
      map.panTo(targetLatLng, {
        duration: 2, // Duration of the animation in seconds
        animate: true // Enable animation
      });
    }
  }, [selectPosition]);

  return null;
}

export default function Maps(props: IMapsProps) {
  const { selectPosition } = props;
  const locationSelection: LatLngExpression | undefined = selectPosition ? [selectPosition.lat, selectPosition.lon] : undefined;

  if (!pos) {
    return null; // if position is not defined, return null to prevent rendering the map container
  }

  return (
    <MapContainer
      center={pos}
      zoom={13}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer
        // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=TZqtcxyVA3M5qEvRyxgk"
      />
      {selectPosition && (
        <Marker position={locationSelection} icon={icon} >
          <Popup>
            {selectPosition.display_name}
          </Popup>
        </Marker>
      )}
      <ResetCenterView selectPosition={selectPosition} />
    </MapContainer>
  );
}
