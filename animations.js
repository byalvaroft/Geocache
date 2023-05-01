//animations.js:
export const animations = {
    spinY: (object, time) => {
        // Rotate around the Y-axis
        object.rotation.x += 0.01;
    },
    pulse: (object, time) => {
        // Make the object pulse
        let scale = Math.sin(time / 500); // change 500 to speed up or slow down the pulse
        object.scale.set(scale, scale, scale);
    }
    // Add more animations here...
};
