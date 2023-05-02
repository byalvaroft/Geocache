//materials.js:

// Vertex shader
const vertexShader = `
    varying vec3 vNormal;
    void main() 
    { 
        vNormal = normalize( normalMatrix * normal );
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
`;

// Fragment shader
const fragmentShader = `
    varying vec3 vNormal;
    uniform vec3 color1;
    uniform vec3 color2;

    void main() 
    { 
        float intensity = pow( vNormal.y, 4. );
        vec3 color = mix( color1, color2, intensity );
        gl_FragColor = vec4( color, 1. );
    }
`;

// Building material
const BUILDING_MATERIAL = new THREE.ShaderMaterial( {
    uniforms: {
        color1: { value: new THREE.Color("skyblue") }, // Change the color as needed
        color2: { value: new THREE.Color("white") } // Change the color as needed
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    side: THREE.DoubleSide
} );

export const materials = {
    SPHERE_MATERIAL: new THREE.MeshPhongMaterial({color: 0xffff00}),
    ROAD_MATERIAL: new THREE.MeshPhongMaterial({
        color: 0x333333,
        transparent: false,
        polygonOffset: true,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 1
    }),
    GRASS_MATERIAL: new THREE.MeshPhongMaterial({color: 0x006400, transparent: false}),
    WATER_MATERIAL: new THREE.MeshPhongMaterial({color: 0x1E90FF, transparent: false}),
    BUILDING_MATERIAL: BUILDING_MATERIAL
    // Add more materials as needed
};



