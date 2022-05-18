// JavaScript const variable declaration
const map = L.map('the_map').setView([37.278520, -169.426411], 3.2); 

// Leaflet tile layer, i.e. the base map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map); 
//L.imageOverlay('iceCream.png',[[33.989052, -118.462440],[34.062620,-118.448190]]);
//JavaScript let variable declaration to create a marker


fetch("map.geojson")
    .then(response => {
        return response.json()
    })
    .then(data =>{
        // Basic Leaflet method to add GeoJSON data
        L.geoJSON(data, {
                pointToLayer: (feature, latlng) => { 
                    return L.circleMarker(latlng, {color: feature.properties.color})
                }
            }).bindPopup(layer => {
                return layer.feature.properties.descrip;
            }).addTo(map);
    })