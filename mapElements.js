// Array with sphere coordinates
export const sphereCoordinates = [
    { lat: 43.36029, lon: -8.41158 },
    { lat: 43.37079, lon: -8.43055 },
    { lat: 43.354997, lon: -8.406491 },
];

// Array for 3D models
export const modelData = [
    // Example of a model data
 //   {
 //       id: "model1",
 //       coordinates: { lat: 43.36029, lon: -8.41158 },
 //       modelName: "modelName.gltf",
 //       materialReference: "material1",
 //       animationReference: "animation1",
 //       timestamp: new Date().getTime(),  // Use actual timestamp as required
 //   },
    // Add more models as per your requirements
];

// Function to create a 3D model at the given latitude and longitude
export function createModel(data, scene, loader) {
    // Convert lat lon to model coordinates
    var modelX = map(data.coordinates.lon, MIN_LON, MAX_LON, -3200, 3200);
    var modelZ = map(data.coordinates.lat, MIN_LAT, MAX_LAT, 3200, -3200);

    loader.load(data.modelName, function (gltf) {
        // When the model is loaded
        var model = gltf.scene;

        // Assign material to the model
        model.traverse((o) => {
            if (o.isMesh) {
                o.material = data.materialReference;
            }
        });

        // Set model position
        model.position.set(modelX, 0, modelZ);

        // Add the model to the scene
        scene.add(model);

        // Add animation if exists
        if (data.animationReference) {
            // Add animation logic here
        }
    });
}

// Function to check if model should be visible based on the current time and the model's timestamp
export function checkModelVisibility(data, currentTime) {
    var timeDifference = currentTime - data.timestamp;
    // Convert difference from milliseconds to hours
    timeDifference = timeDifference / (1000 * 60 * 60);

    // If time difference is less than 1 hour, model should be visible
    if (timeDifference < 1) {
        return true;
    } else {
        return false;
    }
}
