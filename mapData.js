//mapData.js:

import { modelData } from './mapElements.js';
import { map } from './main.js';
import { MIN_LAT, MAX_LAT, MIN_LON, MAX_LON } from './mapCorners.js';
import { animations } from './animations.js';
import { materials } from './materials.js';

export function createModel(data, scene, loader) {
    // Convert lat lon to model coordinates
    const modelX = map(data.coordinates.lon, MIN_LON, MAX_LON, -3200, 3200);
    const modelZ = map(data.coordinates.lat, MIN_LAT, MAX_LAT, 3200, -3200);

    loader.load(data.modelName, function (gltf) {
        // When the model is loaded
        const model = gltf.scene;

        // Assign material to the model
        model.traverse((o) => {
            if (o.isMesh) {
                o.material = materials[data.materialReference];
            }
        });

        // Set model position
        model.position.set(modelX, 0, modelZ);

        // Add the model to the scene
        scene.add(model);

        // Add animations if they exist
        if (data.animationReference) {
            // Save the model to the model data
            data.instance = model;

            model.traverse((o) => {
                if (o.isMesh) {
                    const partAnimation = data.animationReference[o.name];
                    if (partAnimation && animations[partAnimation]) {
                        // Create a new object to store the part instance and its animation
                        data.instance[o.name] = {
                            part: o,
                            animation: animations[partAnimation],
                        };
                    }
                }
            });
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
    let timeDifference = currentTime - data.timestamp;
    // Convert difference from milliseconds to hours
    timeDifference = timeDifference / (1000 * 60 * 60);

    // If time difference is less than 1 hour, model should be visible
    return timeDifference < 1;
}

export { modelData };
