//mapElements.js:

// Array with sphere coordinates
export const sphereCoordinates = [
    { lat: 43.36029, lon: -8.41158 },
    { lat: 43.37079, lon: -8.43055 },
    { lat: 43.354997, lon: -8.406491 },
];

// Array for 3D models
export const modelData = [
    {
        id: "model1",
        coordinates: { lat: 43.36029, lon: -8.41158 },
        modelName: "test.gltf",
        materialReference: "BUILDING_MATERIAL",
        timestamp: new Date().getTime(),  // Use actual timestamp as required
        partAnimations: [
            {
                partName: 'part1', // Replace with the actual name of the model part
                animationReference: 'spinY',
            },
            {
                partName: 'part2', // Replace with the actual name of the model part
                animationReference: 'pulse',
            },
        ],
    },
    // Add more models as per your requirements
];