let map = L.map("mapid").setView([0, 0], 3);

let myIcon = L.icon({
  iconUrl: "./img/iss.png",
  iconSize: [50, 32],
  iconAnchor: [25, 16],
  popupAnchor: [-3, -76]
});

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

let marker = L.marker([0, 0], { icon: myIcon }).addTo(map);

let firstTime = true;

async function getIss() {
  try {
    let iss_url = "https://api.wheretheiss.at/v1/satellites/25544";
    let resp = await fetch(iss_url);
    let data = await resp.json();
    let { latitude, longitude } = data;
    document.getElementById("lon").textContent = longitude.toFixed(2);
    document.getElementById("lat").textContent = latitude.toFixed(2);
    marker.setLatLng([latitude, longitude]);
    if (firstTime) {
      map.setView([latitude, longitude], 3);
      firstTime = false;
    }
  } catch (err) {
    console.log(err);
  }
}
setInterval(getIss, 1000);
