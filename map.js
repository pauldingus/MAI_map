mapboxgl.accessToken = 'pk.eyJ1IjoicGF1bGRpbmd1cyIsImEiOiJjbDBuejBybW0xa3oyM2NsNGZzdjVlYmplIn0.A3JBUdpcYMzg0Et6Bg-F5A'; // Replace with your Mapbox access token

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [36.51394395237915, -0.3370423786347967], // Adjust as needed
    zoom: 6
});

// Path to your GeoJSON file
const geojsonUrl = './demo_shapes.geojson';

// Load GeoJSON using fetch API
fetch(geojsonUrl)
    .then(response => response.json())
    .then(data => {
        data.features.forEach(feature => {
            // Use the first coordinate set of the polygon for the marker
            const firstCoord = feature.geometry.coordinates[0][0];
            const centroid = [firstCoord[0], firstCoord[1]];

            // Create a marker element
            const el = document.createElement('div');
            el.className = 'marker';

            // Add marker to the map
            new mapboxgl.Marker(el)
                .setLngLat(centroid)
                .setPopup(new mapboxgl.Popup({ offset: 25 })
                    .setHTML('<div style="width: 200px; height: 200px;"><p>Loc: ' + loc + '</p><p>Weekday: ' + weekday + '</p><div id="popup-' + feature.id + '" style="width: 200px; height: 200px;"></div></div>'))
                .addTo(map)
                .getElement()
                .addEventListener('click', function() {
                    setTimeout(function() {
                        const popupMap = new mapboxgl.Map({
                            container: 'popup-' + feature.id,
                            style: 'mapbox://styles/mapbox/satellite-v9',
                            center: centroid,
                            zoom: 14
                        });

                        // Display the complete shape on the popup map
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
                                    'fill-color': '#FC712B',
                                    'fill-opacity': 0.6
                                }
                            });
                        });
                    }, 300); // Adjust timeout as needed
                });
        });
    })
    .catch(error => console.error('Error loading the GeoJSON data: ', error));
