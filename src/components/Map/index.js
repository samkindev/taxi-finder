import React, { useState } from 'react';
import ReactMapbox, { GeolocateControl, Marker, FlyToInterpolator } from 'react-map-gl';
import { LocalTaxi } from '@mui/icons-material';

export default function Map({ taxiPosition }) {
    const [viewPort, setViewport] = useState({
        zoom: 13,
        width: '100%',
        height: '100%',
        latitude: -4.4419,
        longitude: 15.2663,
        bearing: 0,
        pitch: 50
    });

    const [settings, setSettings] = useState({
        dragPan: true,
        dragRotate: true,
        scrollZoom: true,
        touchZoom: true,
        touchRotate: true,
        keyboard: true,
        doubleClickZoom: true,
        minZoom: 0,
        maxZoom: 20,
        minPitch: 0,
        maxPitch: 100
    });

    const geolocateControlStyle = {
        right: 5,
        top: 5
    };

    return (
        <ReactMapbox
            mapboxApiAccessToken={"pk.eyJ1Ijoic2Fta2luIiwiYSI6ImNrazYzZm1vejAwNW0yeG4zZzcwcXhtc3cifQ.ncbMs_p8t-ie5IhwskX3UQ"}
            {...viewPort}
            {...settings}
            mapStyle="mapbox://styles/mapbox/dark-v9"
            onViewportChange={(newViewPort) => setViewport(newViewPort)}
            transitionDuration={1000}
            transitionInterpolator={new FlyToInterpolator()}
        >
            <GeolocateControl
                auto
                positionOptions={{ enableHighAccuracy: true }}
                style={geolocateControlStyle}
                trackUserLocation={true}
            />
            <Marker latitude={taxiPosition.lat} longitude={taxiPosition.lon}>
                <LocalTaxi color="primary" fontSize="medium" />
            </Marker>
        </ReactMapbox>
    )
}
