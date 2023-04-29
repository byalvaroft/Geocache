export const animations = {
    spinY: (object, time) => {
        // Rotate around the Y-axis
        object.rotation.y += 0.01;
    },
    spinX: (object, time) => {
        // Rotate around the X-axis
        object.rotation.x += 0.01;
    }
    // Add more animations here...
};
