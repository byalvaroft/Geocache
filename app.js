const targetCoordinates = { latitude: 43.353579286149305, longitude: -8.406895195310744 };
const distanceThreshold = 30; // Distance threshold in meters
let watchId;

const maxLat = 43.39133;
const minLon = -8.45055;
const maxLon = -8.37158;
const minLat = 43.33579;

let engine, scene, camera;
let objModel;

window.onload = function() {
    initBabylonJs();

    if (!navigator.geolocation) {
        document.getElementById('status').innerHTML = 'Geolocation is not supported by your browser.';
    } else {
        navigator.geolocation.getCurrentPosition(() => {
            watchId = navigator.geolocation.watchPosition(verifyPosition, error);
        }, error);
    }
}

function initBabylonJs() {
    const canvas = document.getElementById('canvas');
    engine = new BABYLON.Engine(canvas, true);
    scene = new BABYLON.Scene(engine);
    camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, new BABYLON.Vector3(0,0,0), scene);
    camera.attachControl(canvas, true);

    BABYLON.SceneLoader.ImportMesh("", "./", "city.obj", scene, function (meshes) {
        objModel = meshes[0];
        objModel.position = new BABYLON.Vector3(0, 0, 0);
        objModel.scaling = new BABYLON.Vector3(0.01, 0.01, 0.01);
    });

    engine.runRenderLoop(function () {
        scene.render();
    });
}

function verifyPosition(position) {
    if (!objModel) return;

    const latRatio = (position.coords.latitude - minLat) / (maxLat - minLat);
    const lonRatio = (position.coords.longitude - minLon) / (maxLon - minLon);

    camera.target.y = objModel.position.y;
    camera.target.x = objModel.getBoundingInfo().boundingBox.minimum.x + (objModel.getBoundingInfo().boundingBox.maximum.x - objModel.getBoundingInfo().boundingBox.minimum.x) * lonRatio;
    camera.target.z = objModel.getBoundingInfo().boundingBox.minimum.z + (objModel.getBoundingInfo().boundingBox.maximum.z - objModel.getBoundingInfo().boundingBox.minimum.z) * latRatio;

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
    const lat1Rad = lat1 * Math.PI / 180;
    const lat2Rad = lat2 * Math.PI / 180;
    const deltaLat = (lat2 - lat1) * Math.PI / 180;
    const deltaLon = (lon2     - lon1) * Math.PI / 180;

    const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
        Math.cos(lat1Rad) * Math.cos(lat2Rad) *
        Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}

window.addEventListener('resize', function() {
    engine.resize();
});

