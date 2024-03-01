mapboxgl.accessToken = 'pk.eyJ1IjoicGF1bGRpbmd1cyIsImEiOiJjbDBuejBybW0xa3oyM2NsNGZzdjVlYmplIn0.A3JBUdpcYMzg0Et6Bg-F5A'; // Replace with your Mapbox access token

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [36.51394395237915, -0.3370423786347967], // Adjust as needed
    zoom: 6
});

// Assuming you're fetching your GeoJSON data asynchronously
fetch('./demo_shapes.geojson') // Adjust the path to your GeoJSON file
    .then(response => response.json())
    .then(data => {
        data.features.forEach(function(feature) {
            const el = document.createElement('div');
            el.className = 'marker';

            // Using the first coordinate pair of the shape for simplicity
            const coordinates = feature.geometry.coordinates[0][0];
            const loc = feature.properties.loc;
            const weekday = feature.properties.weekday;

            new mapboxgl.Marker(el)
                .setLngLat(coordinates)
                .setPopup(new mapboxgl.Popup({ offset: 25 })
                    .setHTML('<div style="width: 200px; height: 300px;"><p>Loc: ' + loc + '</p><p>Weekday: ' + weekday + '</p><div id="popup-' + feature.id + '" style="width: 200px; height: 200px;"></div></div>'))
                .addTo(map)
                .getElement()
                .addEventListener('click', function() {
                    setTimeout(function() {
                        const popupMap = new mapboxgl.Map({
                            container: 'popup-' + feature.id,
                            style: 'mapbox://styles/mapbox/satellite-v9',
                            center: coordinates,
                            zoom: 16
                        });

                        // Add the shape to the popup map
                        popupMap.on('load', function() {
                            popupMap.addSource(feature.id, {
                                'type': 'geojson',
                                'data': feature
                            });

                            popupMap.addLayer({
                                'id': feature.id,
                                'type': 'fill',
                                'source': feature.id,
                                'layout': {},
                                'paint': {
                                    'fill-color': '#088',
                                    'fill-opacity': 0.5
                                }
                            });
                        });
                    }, 300); // Timeout ensures the popup is rendered before initializing the map
                });
        });
    });
