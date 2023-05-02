//main.js:

import { modelData, createModel, removeModel, checkModelVisibility } from './mapData.js';
import { sphereCoordinates } from './mapElements.js';
import { materials } from './materials.js';
import { mapFiles } from './mapFiles.js';

// Define global variables
var scene, camera, renderer;
var model;
var loader;
var spheres = [];
var MIN_LON, MAX_LON, MIN_LAT, MAX_LAT;

// Define global constants
const CAMERA_HEIGHT = 200;

// Setup scene
scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

// Add light to the scene
var light = new THREE.AmbientLight(0xffffff);
scene.add(light);

// Add directional light for shadows
var dirLight = new THREE.DirectionalLight(0xffffff);
dirLight.position.set(0, 200, 100);
dirLight.castShadow = true;
scene.add(dirLight);

// Setup camera
camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 10000);
camera.position.y = CAMERA_HEIGHT;

// Setup renderer
renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;  // Enable shadow
document.body.appendChild(renderer.domElement);

// Load city model
loader = new THREE.GLTFLoader();

if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
        // Find the map file that covers the user's location

        let mapFile = findMapFile(position.coords.latitude, position.coords.longitude);

        MIN_LON = mapFiles.find(file => file.filename === mapFile).MIN_LON;  // Update here
        MIN_LAT = mapFiles.find(file => file.filename === mapFile).MIN_LAT;
        MAX_LON = mapFiles.find(file => file.filename === mapFile).MAX_LON;
        MAX_LAT = mapFiles.find(file => file.filename === mapFile).MAX_LAT;

        if (mapFile) {
            loader.load("maps/"+mapFile, function (gltf) {
                // When the model is loaded
                console.log("Model loaded successfully");
                model = gltf.scene;

                // Assign material to different parts of the model
                model.traverse((o) => {
                    if (o.isMesh) {
                        if (o.name.toLowerCase().includes('road') || o.name.toLowerCase().includes('path')) {
                            o.material = materials.ROAD_MATERIAL;
                        } else if (o.name.toLowerCase().includes('vegetation') || o.name.toLowerCase().includes('forest')) {
                            o.material = materials.GRASS_MATERIAL;
                        } else if (o.name.toLowerCase().includes('water')) {
                            o.material = materials.WATER_MATERIAL;
                        } else {
                            o.material = materials.BUILDING_MATERIAL;
                        }
                        // Enable shadows for each mesh
                        o.castShadow = true;
                        o.receiveShadow = true;
                    }
                });

    // Add the model to the scene
    scene.add(model);

    // Add spheres to the coordinates
    sphereCoordinates.forEach(function(coordinate) {
        createSphere(coordinate.lat, coordinate.lon, scene);
    });

    // Try to get the user's position
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            updateCameraPosition(position.coords.latitude, position.longitude);
        });
    } else {
        alert("Geolocation is not supported by your browser");
    }
            }, undefined, function (error) {
                console.error(error);
            });
        } else {
            alert("No map available for your location");
        }
    });
} else {
    alert("Geolocation is not supported by your browser");
}

// Continuously update the camera position based on user's location
if ("geolocation" in navigator) {
    navigator.geolocation.watchPosition(function(position) {
        updateCameraPosition(position.coords.latitude, position.coords.longitude);
    });
}

var targetCameraPosition = new THREE.Vector3();

// Function to update the camera position
function updateCameraPosition(lat, lon) {
    console.log("Geolocation update: ", lat, lon);

    var modelX = map(lon, MIN_LON, MAX_LON, -3200, 3200);
    var modelZ = map(lat, MIN_LAT, MAX_LAT, 3200, -3200);

    console.log("Updated coordinates: ", modelX, modelZ);

    var minDist = Infinity;
    sphereCoordinates.forEach(function(coordinate) {
        var dist = haversineDistance(lat, lon, coordinate.lat, coordinate.lon);
        if (dist < minDist) {
            minDist = dist;
        }
    });

    var targetY = camera.position.y;
    if (minDist <= 0.3) {
        targetY = map(minDist, 0, 0.4, 1, 250);
    }
    targetY = Math.min(targetY, 250);

    targetCameraPosition.set(modelX, targetY, modelZ);

    camera.lookAt(new THREE.Vector3(modelX, 0, modelZ));

    renderer.render(scene, camera);
}

// Haversine Distance function to calculate the distance between two coordinates
function haversineDistance(lat1, lon1, lat2, lon2) {
    function toRad(x) {
        return x * Math.PI / 180;
    }

    var dLat = toRad(lat2 - lat1);
    var dLon = toRad(lon2 - lon1);

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return 6371 * c;
}

// Function to create a sphere at the given latitude and longitude
function createSphere(lat, lon, scene) {
    var modelX = map(lon, MIN_LON, MAX_LON, -3200, 3200);
    var modelZ = map(lat, MIN_LAT, MAX_LAT, 3200, -3200);

    var geometry = new THREE.SphereGeometry(5, 32, 32);
    var sphere = new THREE.Mesh(geometry, materials.SPHERE_MATERIAL);

    sphere.position.set(modelX, 100, modelZ);

    spheres.push({sphere: sphere, originalPosition: new THREE.Vector3(modelX, 100, modelZ)});

    scene.add(sphere);
}

// Function to find the map file that covers the user's current location
function findMapFile(lat, lon) {
    for (let i = 0; i < mapFiles.length; i++) {
        if (lat >= mapFiles[i].MIN_LAT && lat <= mapFiles[i].MAX_LAT &&
            lon >= mapFiles[i].MIN_LON && lon <= mapFiles[i].MAX_LON) {
            return mapFiles[i].filename;
        }
    }
    return null; // Return null if no map file covers the user's location
}

// Handle device orientation changes
if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientationabsolute", function(event) {
        var alpha = 180 + event.alpha;
        var beta = event.beta;
        var gamma = event.gamma;

        if (alpha !== null && beta !== null && gamma !== null) {

            // Convert degrees to radians
            const alphaRad = alpha * (Math.PI / 180);
            const betaRad = beta * (Math.PI / 180);
          //  const gammaRad = gamma * (Math.PI / 180);

            // Compute the position where the camera should look at
            const lookPoint = new THREE.Vector3(
                camera.position.x + Math.sin(alphaRad) * Math.sin(betaRad),
                camera.position.y - Math.cos(betaRad),
                camera.position.z + Math.cos(alphaRad) * Math.sin(betaRad)
            );

            // Make the camera look at the computed position
            camera.lookAt(lookPoint);
        }
    }, true);
} else {
    console.log("Device Orientation not supported");
}

// Function to map a value from one range to another
export function map(value, start1, stop1, start2, stop2) {
    return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
}

// Main loop
let lastChecked = null;

function animate() {
    var time = Date.now();
    requestAnimationFrame(animate);

    // Check for visibility every 10 seconds
    if (!lastChecked || time - lastChecked >= 10000) {
        // Update visibility of models
        modelData.forEach(function(model) {
            if (checkModelVisibility(model, new Date().getTime())) {
                if (!model.instance) {
                    createModel(model, scene, loader);
                }
            } else {
                removeModel(model, scene);
            }
        });

        lastChecked = time;
    }

    // Update animations for each part of each model
    modelData.forEach(function(model) {
        if (model.instance && model.animation) {
            for (const part in model.animation) {
                const object = model.instance.getObjectByName(part + '_wrapper');
                if (object) {
                    model.animation[part](object, time);
                }
            }
        }
    });

    // Smoothly move the camera to the target position
    camera.position.lerp(targetCameraPosition, 0.05);

    // Scale and move spheres based on the distance to the camera
    spheres.forEach(function(sphereObj) {
        var sphere = sphereObj.sphere;
        var originalPosition = sphereObj.originalPosition;
        var distance = camera.position.distanceTo(sphere.position);

        if (distance < 200) {

            // If the sphere is close to the camera, make it smaller and lower
            var scale = map(distance, 0, 200, 0, 1);
            sphere.scale.set(scale, scale, scale);
            sphere.position.y = map(distance, 0, 200, 0, originalPosition.y);
        } else {

            // If the sphere is far from the camera, restore its original size and position
            sphere.scale.set(1, 1, 1);
            sphere.position.y = originalPosition.y;
        }
    });

    // Render the scene
    renderer.render(scene, camera);
}

// Start the main loop
animate();