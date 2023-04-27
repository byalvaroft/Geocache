const targetCoordinates = { latitude: 43.353579286149305, longitude: -8.406895195310744 }; // Set your desired coordinates here
const distanceThreshold = 30; // Distance threshold in meters
let watchId;

const maxLat = 43.39133;
const minLon = -8.45055;
const maxLon = -8.37158;
const minLat = 43.33579;

let cityModel;
let camera;

window.onload = function() {
    initAFrame();

    if (!navigator.geolocation) {
        document.getElementById('status').innerHTML = 'Geolocation is not supported by your browser.';
    } else {
        navigator.geolocation.getCurrentPosition(() => {
            watchId = navigator.geolocation.watchPosition(verifyPosition, error);
        }, error);
    }
}

function initAFrame() {
    const scene = document.querySelector('a-scene');

    camera = document.querySelector('#camera');
    camera.setAttribute('position', '0 10 0'); // Set the camera position
    camera.setAttribute('rotation', '-90 0 0'); // Set the camera rotation

    const cityModelEntity = document.createElement('a-entity');
    cityModelEntity.setAttribute('id', 'city-model');
    cityModelEntity.setAttribute('obj-model', 'obj: #city');
    cityModelEntity.setAttribute('scale', '0.01 0.01 0.01');
    scene.appendChild(cityModelEntity);

    const cityModelAsset = document.createElement('a-asset-item');
    cityModelAsset.setAttribute('id', 'city');
    cityModelAsset.setAttribute('src', 'city.obj');
    scene.appendChild(cityModelAsset);

    cityModel = document.querySelector('#city-model');
}

function verifyPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    const x = ((lon - minLon) / (maxLon - minLon)) * 2 - 1; // Normalize longitude to [-1, 1]
    const z = ((lat - minLat) / (maxLat - minLat)) * 2 - 1; // Normalize latitude to [-1, 1]

    const camPosition = camera.getAttribute('position');
    camera.setAttribute('position', {
        x: x * 50, // Scale the camera position by 50 to match the size of the model
        y: camPosition.y,
        z: z * 50 // Scale the camera position by 50 to match the size of the model
    });

    const distance = calculateDistance(lat, lon, targetCoordinates.latitude, targetCoordinates.longitude);
    if (distance <= distanceThreshold) {
        alert('You are within 30 meters of the target location.');
        navigator.geolocation.clearWatch(watchId);
    }
}

function error() {
    document.getElementById('status').innerHTML = 'Unable to retrieve your location.';
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // Earth's radius in meters
    const lat1Rad = lat1 * (Math.PI / 180);
    const lat2Rad = lat2 * (Math.PI / 180);
    const deltaLat = (lat2 - lat1) * (Math.PI / 180);
    const deltaLon = (lon2 - lon1) * (Math.PI / 180);


    const a =
        Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
        Math.cos(lat1Rad) *
        Math.cos(lat2Rad) *
        Math.sin(deltaLon / 2) *
        Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}
