// JavaScript const variable declaration
const map = L.map('the_map').setView([34.03, -118.447899], 12); 

// Leaflet tile layer, i.e. the base map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map); 

//JavaScript let variable declaration to create a marker


            
saltnstraw = '<p>Salt and Straw is a handmade ice cream parlor and they change their special flavors monthly. They have vegan options too!</p>' + '<br /> Here is the ' + '<a href="https://saltandstraw.com/pages/flavors">menu</a>';
wanderlust = '<p>Wanderlust has really unique flavors and never disappoints! They also just opened a location in Sawtelle!</p>' + '<br /> Here is the '+'<a href="https://wanderlustcreamery.com/menu">menu</a>';
somisomi = '<p>SomiSomi has some of the tastiest soft serve I have had. I always order the ah-boong because the fish-shaped waffle cone makes it taste even better ;)</p>' + '<br /> Here is the ' + '<a href="https://www.somisomi.com/menu">menu</a>';
milletcrepe = '<p>Millet Crepe serves their ice cream in a crepe rolled like a cone. When you go, you MUST order the creme brulee crepe.</p>' + '<br /> Here is the ' + '<a href="https://www.milletcrepe.com/#dYfCDj">menu</a>';
dipnmix = '<p>Dip n Mix is the best late-night ice cream option for UCLA students. They are also probably one of the only places I know of that does not charge extra for acai bowl toppings</p>' + '<br /> They do not have a website, but here is their ' + '<a href="https://www.yelp.com/biz/dipnmix-los-angeles-6">Yelp</a>';

new_marker(33.989052, -118.462440,saltnstraw);
new_marker(33.999859, -118.465607,wanderlust);
new_marker(34.039450,-118.442750,somisomi);
new_marker(34.040489,-118.443588,milletcrepe);
new_marker(34.062620,-118.448190,dipnmix);

function addMarker(lat,lng,title,message){
    console.log(message)
    L.marker([lat,lng]).addTo(map).bindPopup(`<h2>${title}</h2> <h3>${message}</h3>`)
    createButtons(lat,lng,title);
    return message
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
    document.getElementById("contents").appendChild(newButton); 
