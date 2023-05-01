//animations.js:
export const animations = {
    spinY: (object, time) => {
        // Rotate around the Y-axis
        object.rotation.y += 0.5;
    },
    spinX: (object, time) => {
        // Rotate around the X-axis
        object.rotation.x += 0.01;
    },
    scaleUpDown: (object, time) => {
        const scale = 1 + Math.sin(time / 500) * 0.2; // Scale factor varies between 0.8 and 1.2
        object.scale.set(scale, scale, scale);
    }
    // Add more animations here...
};
