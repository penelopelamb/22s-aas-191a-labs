// JavaScript const variable declaration
const map = L.map('the_map').setView([33.999859, -118.465607], 14); 

// Leaflet tile layer, i.e. the base map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map); 
//L.imageOverlay('iceCream.png',[[33.989052, -118.462440],[34.062620,-118.448190]]);
//JavaScript let variable declaration to create a marker


            
saltnstraw = '<p>Salt and Straw is a handmade ice cream parlor and they change their special flavors monthly. They have vegan options too!</p>' + '<br /> Here is the ' + '<a href="https://saltandstraw.com/pages/flavors">menu</a>';
wanderlust = '<p>Wanderlust has really unique flavors and never disappoints! They also just opened a location in Sawtelle!</p>' + '<br /> Here is the '+'<a href="https://wanderlustcreamery.com/menu">menu</a>';
somisomi = '<p>SomiSomi has some of the tastiest soft serve I have had. I always order the ah-boong because the fish-shaped waffle cone makes it taste even better ;)</p>' + '<br /> Here is the ' + '<a href="https://www.somisomi.com/menu">menu</a>';
milletcrepe = '<p>Millet Crepe serves their ice cream in a crepe rolled like a cone. When you go, you MUST order the creme brulee crepe.</p>' + '<br /> Here is the ' + '<a href="https://www.milletcrepe.com/#dYfCDj">menu</a>';
dipnmix = '<p>Dip n Mix is the best late-night ice cream option for UCLA students. They are also probably one of the only places I know of that does not charge extra for acai bowl toppings</p>' + '<br /> They do not have a website, but here is their ' + '<a href="https://www.yelp.com/biz/dipnmix-los-angeles-6">Yelp</a>';
saffronrose = '<p>Saffron and Rose serves delicious, creamy Persian Ice Cream. I always order the Saffron Pistachio and White Rose (which makes me basic because those are their most popular flavors).</p>' + '<br /> Here is their ' + '<a href="https://saffronrosepersianicecream.com/flavors/">menu</a>';

const dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQaqt_cytRgZLP_zz6bDh-Ye25FthzWdYWtAd1fWcqIv9YWrwJxaverrbaGmPUGrNGEblnyDcVvyT39/pub?output=csv" 

let yesVegan = L.featureGroup();
let noVegan = L.featureGroup();

let circleOptions = {
    radius: 8,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
}


function loadData(url){
    Papa.parse(url, {
        header: true,
        download: true,
        complete: results => processData(results)
    })
}

function processData(results){
    console.log(results)
    results.data.forEach(data => {
        console.log(data)
        addMarker(data)
    })
    yesVegan.addTo(map) // add our layers after markers have been made
    noVegan.addTo(map) // add our layers after markers have been made  
    let allLayers = L.featureGroup([yesVegan,noVegan]);
    map.fitBounds(allLayers.getBounds());
}

function addMarker(data){
    console.log(data)
    myPhoto = '<img src="' + data['Photo?'] + '">';
    if(data['Are there vegan or dairy free options?'] == 'Yes'){
        circleOptions.fillColor = 'red';
        yesVegan.addLayer(L.circleMarker([data.lat,data.lng],circleOptions)
            .addTo(map).bindPopup(`<h3>${data.Name}</h3> 
                <p>${data['What makes it so good?']}</p>`));
    }
    else{
        circleOptions.fillColor = "blue";
        noVegan.addLayer(L.circleMarker([data.lat,data.lng],circleOptions)
            .addTo(map).bindPopup(`<h3>${data.Name}</h3> 
                <p>${data['What makes it so good?']}`)
               ); 
    }
    createButtons(data.lat,data.lng,data.Name);
    return data
}


function addSurvey(title){
    const newButton = document.createElement("button"); 
    newButton.id = "button"+title; 
    newButton.innerHTML = title; 
    newButton.style.background = 'pink';
    newButton.addEventListener('click', function(){
        window.open('https://forms.gle/q2ax7zattjs6Cgm79', '_blank'); 
    })
    document.getElementById("space_for_buttons").appendChild(newButton);
}
function createButtons(lat,lng,title){
    const newButton = document.createElement("button"); 
    newButton.id = "button"+title; 
    newButton.innerHTML = title; 
    newButton.setAttribute("lat",lat); 
    newButton.setAttribute("lng",lng); 
    newButton.addEventListener('click', function(){
        map.flyTo([lat,lng]); 
    })
    document.getElementById("space_for_buttons").appendChild(newButton);
}


loadData(dataUrl)
addSurvey('Add your own!')