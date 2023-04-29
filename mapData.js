import { modelData } from './mapElements.js';
import { map } from './main.js';
import { MIN_LAT, MAX_LAT, MIN_LON, MAX_LON } from './mapCorners.js';
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

export function removeModel(modelData, scene) {
    if (modelData.instance) {
        scene.remove(modelData.instance);
        modelData.instance = null;
    }
}

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

export { modelData };
