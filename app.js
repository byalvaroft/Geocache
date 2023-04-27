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
    const sceneEl = document.querySelector("a-scene");

    objModelEl.setAttribute("obj-model", {
        obj: "city.obj",
        mtl: "city.mtl",
    });

    const cameraEl = document.createElement("a-camera");
    cameraEl.setAttribute("position", "0 20 0");
    cameraEl.setAttribute("rotation", "-90 0 0");
    sceneEl.appendChild(cameraEl);

    sceneEl.appendChild(objModelEl);
}

function verifyPosition(position) {
    const latRatio = (position.coords.latitude - minLat) / (maxLat - minLat);
    const lonRatio = (position.coords.longitude - minLon) / (maxLon - minLon);

    const cameraEntity = document.querySelector("[camera]");
    const cameraPosition = cameraEntity.object3D.position;

    cameraPosition.x =
        objModelEl.boundingBox.min.x +
        (objModelEl.boundingBox.max.x - objModelEl.boundingBox.min.x) * lonRatio;
    cameraPosition.y = objModelEl.boundingBox.max.y + 10; // To look from the top
    cameraPosition.z =
        objModelEl.boundingBox.min.z +
        (objModelEl.boundingBox.max.z - objModelEl.boundingBox.min.z) * latRatio;

    const distance = calculateDistance(
        position.coords.latitude,
        position.coords.longitude,
        targetCoordinates.latitude,
        targetCoordinates.longitude
    );
    if (distance <= distanceThreshold) {
        alert("You are within 30 meters of the target location.");
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
