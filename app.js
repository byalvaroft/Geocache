const targetCoordinates = { latitude: 43.353579286149305, longitude: -8.406895195310744 }; // Set your desired coordinates here
const distanceThreshold = 30; // Distance threshold in meters
let watchId;

const maxLat = 43.39133;
const minLon = -8.45055;
const maxLon = -8.37158;
const minLat = 43.33579;

let cityModel;

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

    const camera = document.querySelector('#camera');
    camera.setAttribute('position', '0 1.6 0'); // Set the camera position

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
    const latRatio = (position.coords.latitude - minLat) / (maxLat - minLat);
    const lonRatio = (position.coords.longitude - minLon) / (maxLon - minLon);

    cityModel.object3D.position.x = cityModel.getAttribute('bounding-box').min.x + (cityModel.getAttribute('bounding-box').max.x - cityModel.getAttribute('bounding-box').min.x) * lonRatio;
    cityModel.object3D.position.y = cityModel.getAttribute('bounding-box').max.y; // To look from the top
    cityModel.object3D.position.z = cityModel.getAttribute('bounding-box').min.z + (cityModel.getAttribute('bounding-box').max.z - cityModel.getAttribute('bounding-box').min.z) * latRatio;

    const distance = calculateDistance(position.coords.latitude, position.coords.longitude, targetCoordinates.latitude, targetCoordinates.longitude);
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
