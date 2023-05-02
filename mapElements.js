//mapElements.js:

// Array with sphere coordinates
export const sphereCoordinates = [
    { lat: 43.36029, lon: -8.41158 },
    { lat: 43.37079, lon: -8.43055 },
    { lat: 43.354997, lon: -8.406491 },
    { lat: 42.169938, lon: -8.688057 },
];

// Array for 3D models
export const modelData = [
  //  Example of a model data
   {
        id: "model1",
        coordinates: { lat: 43.36029, lon: -8.41158 },
        modelName: "test.gltf",
        materialReference: {
           'part1': 'RED',
           'part2': 'BLUE',
        },
        animationReference: {
           "part1": "spinY",
           "part2": "scaleUpDown"
        },
        timestamp: new Date().getTime(),  // Use actual timestamp as required
    },
    {
        id: "model2",
        coordinates: { lat: 43.36059, lon: -8.41168 },
        modelName: "chimmy.gltf",
        animationReference: {
            "cuerpo": "spinY",
            "cabeza": "scaleUpDown"
        },
        timestamp: new Date().getTime(),  // Use actual timestamp as required
    },
    // Add more models as per your requirements
];

