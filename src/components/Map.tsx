'use client'

import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { env } from '~/env';

const containerStyle = {
   width: '100%',
   height: '300px'
};

function Map({ lat, lng } : { lat: number, lng: number }) {
   const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
   })

   const [map, setMap] = React.useState(null)

   const center = { lat, lng }
   // @ts-ignore
   const onLoad = React.useCallback(function callback(map) {
      const position = new window.google.maps.LatLng(lat, lng);
      // TODO: Update to AdvancedMarkerElement soon.
      const marker = new window.google.maps.Marker({ position, draggable: false });
      map.setCenter(position);
      marker.setMap(map);


      setMap(map)
   }, [])

   const onUnmount = React.useCallback(function callback() {
      setMap(null)
   }, [])

   return isLoaded ? (
      <GoogleMap
         mapContainerStyle={containerStyle}
         onLoad={onLoad}
         center={center}
         zoom={17}
         onUnmount={onUnmount}
         options={{
            disableDefaultUI: true,
         }}
      >
         { /* Child components, such as markers, info windows, etc. */ }
         <></>
      </GoogleMap>
   ) : <></>
}

export default React.memo(Map)
