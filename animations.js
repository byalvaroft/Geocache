//animations.js:
export const animations = {
    spinY: (object, time) => {
        // Rotate around the Y-axis
        const euler = new THREE.Euler(0, 0.1, 0, 'XYZ');
        object.rotateOnWorldAxis(euler.toVector3(), 0.1);
    },
    pulse: (object, time) => {
        // Make the object pulse
        let scale = Math.sin(time / 500); // change 500 to speed up or slow down the pulse
        object.scale.set(scale, scale, scale);
    }
    // Add more animations here...
};
