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

        // Assign material and animations to the model
        model.traverse((o) => {
            if (o.isMesh) {
                console.log(o.name); // check if the name matches with the partName in partAnimations
                o.material = materials[data.materialReference];
                const partAnimation = data.partAnimations.find((part) => part.partName === o.name.toLowerCase());
                console.log(partAnimation); // check if the correct partAnimation is being looked up
                if (partAnimation && animations[partAnimation.animationReference]) {
                    o.userData.animation = animations[partAnimation.animationReference];
                }
            }
        });

        // Set model position
        model.position.set(modelX, 0, modelZ);

        // Add the model to the scene
        scene.add(model);

        // Save the model to the model data
        data.instance = model;
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
