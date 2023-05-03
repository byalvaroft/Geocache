// animations.js
export const animations = {
    // Existing animations...
    spinY: (object, time) => {
        object.rotation.y += 0.01;
    },
    spinX: (object, time) => {
        object.rotation.x += 0.01;
    },
    scaleUpDown: (object, time) => {
        const scale = 1 + Math.sin(time / 500) * 0.2;
        object.scale.set(scale, scale, scale);
    },
    bounce: (object, time) => {
        object.position.y = Math.abs(Math.sin(time / 500) * 2);
    },
    moveLeftRight: (object, time) => {
        object.position.x = Math.sin(time / 500) * 2;
    },
    rotateZ: (object, time) => {
        object.rotation.z += 0.01;
    },
    spinFastY: (object, time) => {
        object.rotation.y += 0.05;
    },
    colorShift: (object, time) => {
        const colorShift = (Math.sin(time / 1000) + 1) / 2;
        object.material.color.setHSL(colorShift, 1, 0.5);
    },
    spiralMovement: (object, time) => {
        // Object moves in a spiral
        object.position.x = Math.sin(time / 500) * 2;
        object.position.y = Math.cos(time / 500) * 2;
        object.position.z = time / 1000; // Spiral upwards
    },
    pendulumMovement: (object, time) => {
        // Object swings like a pendulum
        object.rotation.z = Math.sin(time / 500) * Math.PI / 4;
    },
    scaleAndRotate: (object, time) => {
        const scale = 1 + Math.sin(time / 500) * 0.2;
        object.scale.set(scale, scale, scale);
        object.rotation.y += 0.01;
    },
    chaoticRotation: (object, time) => {
        object.rotation.x += Math.sin(time / 1000);
        object.rotation.y += Math.cos(time / 1000);
    },
    orbit: (object, time, center = new THREE.Vector3()) => {
        const radius = 5;
        object.position.x = center.x + radius * Math.sin(time / 1000);
        object.position.y = center.y;
        object.position.z = center.z + radius * Math.cos(time / 1000);
    },
    ellipticalOrbit: (object, time, center = new THREE.Vector3()) => {
        // Object orbits in an ellipse
        const xRadius = 5; // Ellipse size in x-direction
        const zRadius = 3; // Ellipse size in z-direction
        object.position.x = center.x + xRadius * Math.sin(time / 1000);
        object.position.y = center.y;
        object.position.z = center.z + zRadius * Math.cos(time / 1000);
    },
    corkscrew: (object, time, center = new THREE.Vector3()) => {
        const radius = 3;
        const height = 0.1;
        object.position.x = center.x + radius * Math.sin(time / 1000);
        object.position.y = center.y + height * time / 1000;
        object.position.z = center.z + radius * Math.cos(time / 1000);
    },
    sineWave: (object, time, axis = 'y', amplitude = 1, frequency = 1) => {
        object.position[axis] = amplitude * Math.sin(frequency * time / 1000);
    },
    bounceAndSpin: (object, time) => {
        object.position.y = Math.abs(Math.sin(time / 500) * 2);
        object.rotation.y += 0.01;
    },
    colorPulse: (object, time) => {
        const colorShift = (Math.sin(time / 500) + 1) / 2;
        object.material.color.setHSL(colorShift, 1, 0.5);

        const scale = 1 + Math.sin(time / 500) * 0.2;
        object.scale.set(scale, scale, scale);
    },spinAndMove: (object, time) => {
        object.rotation.y += 0.01;
        const radius = 5;
        object.position.x = radius * Math.sin(time / 1000);
        object.position.z = radius * Math.cos(time / 1000);
    },
    randomRotation: (object, time) => {
        object.rotation.x += (Math.random() - 0.5) / 100;
        object.rotation.y += (Math.random() - 0.5) / 100;
        object.rotation.z += (Math.random() - 0.5) / 100;
    },
    figureEight: (object, time) => {
        const radius = 5;
        object.position.x = radius * Math.sin(time / 1000);
        object.position.z = radius * Math.sin(time / 500) * Math.cos(time / 1000);
    },
    scaleAndColorShift: (object, time) => {
        const scale = 1 + Math.sin(time / 500) * 0.2;
        object.scale.set(scale, scale, scale);

        const colorShift = (Math.sin(time / 1000) + 1) / 2;
        object.material.color.setHSL(colorShift, 1, 0.5);
    }
};
