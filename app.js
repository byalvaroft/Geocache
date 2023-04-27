import { OBJLoader } from 'OBJLoader.js';

const targetCoordinates = { latitude: 43.353579286149305, longitude: -8.406895195310744 }; // Set your desired coordinates hereconst targetCoordinates = { latitude: 51.5074, longitude: -0.1278 }; // Set your desired coordinates here
const distanceThreshold = 30; // Distance threshold in meters
let watchId;

const maxLat = 43.39133;
const minLon = -8.45055;
const maxLon = -8.37158;
const minLat = 43.33579;

let scene, camera, renderer;
let objModel;

window.onload = function() {
    initThreeJs();

    if (!navigator.geolocation) {
        document.getElementById('status').innerHTML = 'Geolocation is not supported by your browser.';
    } else {
        navigator.geolocation.getCurrentPosition(() => {
            watchId = navigator.geolocation.watchPosition(verifyPosition, error);
        }, error);
    }
}

function initThreeJs() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('canvas').appendChild(renderer.domElement);

    const loader = new THREE.ObjectLoader();
    loader.load('city.obj', function(object) {
        objModel = object;
        scene.add(object);
        animate();
    }, onProgress, onError);
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

function verifyPosition(position) {
    const latRatio = (position.coords.latitude - minLat) / (maxLat - minLat);
    const lonRatio = (position.coords.longitude - minLon) / (maxLon - minLon);

    camera.position.x = objModel.boundingBox.min.x + (objModel.boundingBox.max.x - objModel.boundingBox.min.x) * lonRatio;
    camera.position.y = objModel.boundingBox.max.y; // To look from the top
    camera.position.z = objModel.boundingBox.min.z + (objModel.boundingBox.max.z - objModel.boundingBox.min.z) * latRatio;

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
    const deltaLon = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
        Math.cos(lat1Rad) * Math.cos(lat2Rad) *
        Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}

function onProgress(xhr) {
    if (xhr.lengthComputable) {
        const percentComplete = xhr.loaded / xhr.total * 100;
        console.log(Math.round(percentComplete, 2) + '% downloaded');
    }
}

function onError() {
    console.error('An error occurred while loading the 3D model.');
}
