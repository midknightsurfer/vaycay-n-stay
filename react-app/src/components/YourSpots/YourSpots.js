import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Autocomplete,
} from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

export default function YourSpots() {
  const dispatch = useDispatch();
  const [latitudeAvg, setLatitudeAvg] = useState(null);
  const [longitudeAvg, setLongitudeAvg] = useState(null);

  // Get an array of user's spots
  const spots = useSelector((state) => Object.values(state.yourSpots));
  const user = useSelector((state) => state.session.user);

  //will do a useEffect to grab all user's spots.
  if (spots) {
    let latitude = 0;
    let longitude = 0;

    spots.forEach((spot) => {
      lat += spot.lat;
      lng += spot.lng;
    });

    const length = spots?.length;
    setLatitudeAvg(parseFloat(latitude / length));
    setLongitudeAvg(parseFloat(longitude / length));
  }

  useEffect(() => {
    dispatch(getUserSpots(user.id));
  });

  const toSpotPage = (spotId) => {
    // redirect user to spotPage (detail)
  };

  return (
    <div className="main_content_your_spots">
      <div className="your_spots_list">
        <div>
          <h1>Your Spots</h1>
        </div>
        {spots?.map((spot) => {
          return (
            <div className="your_spot_container" key={`your_spot_${spot.id}`}>
              {/* Will add spotSlide component, pass in spot={spot} key={`spot_slide_${spot.id}`} */}
              <div className="your_spot_info">
                <div className="your_spot_name">{spot.name}</div>
                <div className="your_spot_information">
                  <div>{/* price*/}</div>
                  <div>{/* City */}</div>
                  <div>{/* Description */}</div>
                  <div>{/* address */}</div>
                </div>
                <div>
                  <div>EDIT</div>
                  <div>DELETE</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="your_spots_map">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={{
            lat: latitudeAvg,
            lng: longitudeAvg,
          }}
          zoom={6}
        >
          {spots?.map((spot) => (
            <Marker
              key={`${spot.id}`}
              position={{ lat: spot.lat, lng: spot.lng }}
              label={{ text: `${spot.price}` }}
              onClick={() => toSpotPage(spot.id)}
            />
          ))}
        </GoogleMap>
      </div>
    </div>
  );
}