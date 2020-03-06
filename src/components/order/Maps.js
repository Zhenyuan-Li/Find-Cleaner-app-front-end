import React from "react";
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Marker
} from "react-google-maps";
// import getLocation from '../.././api/geocoding';

const GOOGLE_MAP_API_KEY = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}`;
const CustomSkinMap = withScriptjs(
	withGoogleMap(props => (
		// console.log(getLocation(props.address)),
		<GoogleMap
			defaultZoom={13}
			defaultCenter={{ lat: -27.468055, lng: 153.025035 }}
			defaultOptions={{
				scrollwheel: false,
				zoomControl: true,
				styles: [
					{
						featureType: "water",
						stylers: [
							{ saturation: 43 },
							{ lightness: -11 },
							{ hue: "#0088ff" }
						]
					},
					{
						featureType: "road",
						elementType: "geometry.fill",
						stylers: [
							{ hue: "#ff0000" },
							{ saturation: -100 },
							{ lightness: 99 }
						]
					},
					{
						featureType: "road",
						elementType: "geometry.stroke",
						stylers: [{ color: "#808080" }, { lightness: 54 }]
					},
					{
						featureType: "landscape.man_made",
						elementType: "geometry.fill",
						stylers: [{ color: "#ece2d9" }]
					},
					{
						featureType: "poi.park",
						elementType: "geometry.fill",
						stylers: [{ color: "#ccdca1" }]
					},
					{
						featureType: "road",
						elementType: "labels.text.fill",
						stylers: [{ color: "#767676" }]
					},
					{
						featureType: "road",
						elementType: "labels.text.stroke",
						stylers: [{ color: "#ffffff" }]
					},
					{ featureType: "poi", stylers: [{ visibility: "off" }] },
					{
						featureType: "landscape.natural",
						elementType: "geometry.fill",
						stylers: [{ visibility: "on" }, { color: "#b8cb93" }]
					},
					{
						featureType: "poi.park",
						stylers: [{ visibility: "on" }]
					},
					{
						featureType: "poi.sports_complex",
						stylers: [{ visibility: "on" }]
					},
					{
						featureType: "poi.medical",
						stylers: [{ visibility: "on" }]
					},
					{
						featureType: "poi.business",
						stylers: [{ visibility: "simplified" }]
					}
				]
			}}
		>
			<Marker position={{ lat: -27.468055, lng: 153.025035 }} />

			{/* <Marker position={getLocation(props.address)} /> */}
		</GoogleMap>
	))
);

export default function Maps(props) {
	return (
		<CustomSkinMap
			googleMapURL={googleMapURL}
			loadingElement={<div style={{ height: `100%` }} />}
			containerElement={<div style={{ height: `100%`, width: `100%` }} />}
			mapElement={<div style={{ height: `100%` }} />}
			address={props.address}
		/>
	);
}
