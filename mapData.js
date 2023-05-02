//mapData.js:

import { modelData } from './mapElements.js';
import { map } from './main.js';
import { MIN_LAT, MAX_LAT, MIN_LON, MAX_LON } from './main.js';
import { animations } from './animations.js';
import { materials } from './materials.js';

export function createModel(data, scene, loader) {
    // Convert lat lon to model coordinates
    const modelX = map(data.coordinates.lon, MIN_LON, MAX_LON, -3200, 3200);
    const modelZ = map(data.coordinates.lat, MIN_LAT, MAX_LAT, 3200, -3200);

    loader.load("public/models/"+data.modelName, function (gltf) {
        // When the model is loaded
        const model = gltf.scene;

        // Add materials if exists
        if (data.materialReference) {
            for (const part in data.materialReference) {
                const object = model.getObjectByName(part);
                if (object && materials[data.materialReference[part]]) {
                    object.material = materials[data.materialReference[part]];
                }
            }
        }

        // Enable shadows for each mesh
        model.traverse(function (object) {
            if (object.isMesh) {
                object.castShadow = true;
                object.receiveShadow = true;
            }
        });


        // Set model position
        model.position.set(modelX, 0, modelZ);

        // Add the model to the scene
        scene.add(model);

        // Add animation if exists
        if (data.animationReference) {
            for (const part in data.animationReference) {
                if (animations[data.animationReference[part]]) {
                    const object = model.getObjectByName(part);
                    if (object) {
                        const wrapper = new THREE.Object3D();
                        object.parent.add(wrapper);
                        wrapper.add(object);
                        model.remove(object);
                        wrapper.name = part + '_wrapper';
                    }

                    data.animation = data.animation || {};
                    data.animation[part] = animations[data.animationReference[part]];
                }
            }
        }

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
