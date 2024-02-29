mapboxgl.accessToken = 'pk.eyJ1IjoicGF1bGRpbmd1cyIsImEiOiJjbDBuejBybW0xa3oyM2NsNGZzdjVlYmplIn0.A3JBUdpcYMzg0Et6Bg-F5A'; // Replace with your Mapbox access token

const map = new mapboxgl.Map({
    container: 'map', // container ID in the HTML
    style: 'mapbox://styles/mapbox/streets-v11', // Map style
    center: [-98.5795, 39.8283], // Initial map center in [longitude, latitude]
    zoom: 3 // Initial zoom level
});

// Toy data for market locations
const markets = [
    { lng: -99.1332, lat: 19.4326, name: 'Market 1', description: 'This is Market 1.' },
    { lng: -118.2437, lat: 34.0522, name: 'Market 2', description: 'This is Market 2.' },
    // Add more markets as needed
];

// Add markers to the map
markets.forEach(function(market) {
    // Create a HTML element for each marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Make a marker for each market and add to the map
    new mapboxgl.Marker(el)
        .setLngLat([market.lng, market.lat])
        .setPopup(new mapboxgl.Popup({ offset: 25 }) // Add popups
        .setHTML('<h3>' + market.name + '</h3><p>' + market.description + '</p>'))
        .addTo(map);
});
