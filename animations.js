//animations.js:
export const animations = {
    spinY: (object, time) => {
        // Rotate around the Y-axis
        object.rotation.y += 0.01;
    },
    oscillate: (object, time) => {
        // Oscillate in size
        let scale = Math.abs(Math.sin(time / 1000));  // The division by 1000 is to slow down the oscillation
        object.scale.set(scale, scale, scale);
    }
    // Add more animations here...
};
