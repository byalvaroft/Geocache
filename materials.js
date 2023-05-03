//materials.js:
import * as THREE from 'three';

// Add noise function for materials
function noise(x, y) {
    let mult = 0.1;
    return (Math.sin(x * mult) + Math.sin(y * mult)) * 0.5;
}


export const materials = {

    //MAP MATERIALS
    SPHERE_MATERIAL: new THREE.MeshPhongMaterial({color: 0xffff00}),
    ROAD_MATERIAL: new THREE.MeshPhongMaterial({
        color: 0x333333,
        specular: 0x050505,
        shininess: 100,
        polygonOffset: true,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 1
    }),
    GRASS_MATERIAL: new THREE.MeshStandardMaterial({
        color: 0x006400,
        roughness: 0.8,
        metalness: 0.1,
        vertexColors: THREE.VertexColors,
        onBeforeCompile: shader => {
            shader.uniforms.time = { value: 0 };
            shader.vertexShader = 'uniform float time;\n' + shader.vertexShader;
            shader.vertexShader = shader.vertexShader.replace(
                `#include <begin_vertex>`,
                `#include <begin_vertex>
                transformed.y += noise(position.x + time, position.z + time);
                vColor = vec3(clamp(noise(position.x + time, position.z + time), 0.0, 1.0));`
            );
            shader.fragmentShader = shader.fragmentShader.replace(
                `vec4 diffuseColor = vec4( diffuse, opacity );`,
                `vec4 diffuseColor = vec4( vColor * diffuse, opacity );`
            );
        },
    }),
    WATER_MATERIAL: new THREE.MeshPhysicalMaterial({
        color: 0xADD8E6,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        reflectivity: 0.9,
        depthPacking: THREE.RGBADepthPacking,
        flatShading: true,
        transparent: true,
        opacity: 0.8
    }),
    BUILDING_MATERIAL: new THREE.MeshPhysicalMaterial({
        color: 0x8A8AAA,
        roughness: 0.3,
        metalness: 0.8,
        clearcoat: 0.5,
        clearcoatRoughness: 0.05
    }),

    //PHYSICAL MATERIALS
    GOLD: new THREE.MeshPhysicalMaterial({
        color: 0xFFD700,
        metalness: 1,
        roughness: 0,
        reflectivity: 0.9
    }),
    SILVER: new THREE.MeshPhysicalMaterial({
        color: 0xC0C0C0,
        metalness: 0.9,
        roughness: 0.2,
        reflectivity: 0.8
    }),
    BRONZE: new THREE.MeshPhysicalMaterial({
        color: 0xCD7F32,
        metalness: 0.8,
        roughness: 0.3,
        reflectivity: 0.7
    }),
    GLASS: new THREE.MeshPhysicalMaterial({
        color: 0xFFFFFF,
        metalness: 0,
        roughness: 0,
        transparency: 0.9,
        opacity: 0.1,
        transparent: true,
    }),
    RUBBER: new THREE.MeshPhysicalMaterial({
        color: 0x111111,
        metalness: 0.1,
        roughness: 0.9,
        reflectivity: 0.3
    }),
    PLASTIC: new THREE.MeshPhysicalMaterial({
        color: 0x555555,
        metalness: 0,
        roughness: 0.5,
        reflectivity: 0.2
    }),
    WOOD: new THREE.MeshPhysicalMaterial({
        color: 0x8B4513,
        metalness: 0,
        roughness: 0.8,
        reflectivity: 0.1
    }),

    //BASIC COLOR MATERIALS

    RED: new THREE.MeshPhongMaterial({color: 0xff0000}),
    GREEN: new THREE.MeshPhongMaterial({color: 0x00ff00}),
    BLUE: new THREE.MeshPhongMaterial({color: 0x0000ff}),
    YELLOW: new THREE.MeshPhongMaterial({color: 0xffff00}),
    PURPLE: new THREE.MeshPhongMaterial({color: 0x800080}),
    ORANGE: new THREE.MeshPhongMaterial({color: 0xFFA500}),
    WHITE: new THREE.MeshPhongMaterial({color: 0xffffff}),
    BLACK: new THREE.MeshPhongMaterial({color: 0x000000}),

    // HOLOGRAPHIC MATERIALS

    HOLO_RED: new THREE.MeshPhysicalMaterial({
        color: 0xff0000,
        metalness: 1,
        roughness: 0.2,
        reflectivity: 1,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
        envMapIntensity: 5
    }),
    HOLO_GREEN: new THREE.MeshPhysicalMaterial({
        color: 0x00ff00,
        metalness: 1,
        roughness: 0.2,
        reflectivity: 1,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
        envMapIntensity: 5
    }),
    HOLO_BLUE: new THREE.MeshPhysicalMaterial({
        color: 0x0000ff,
        metalness: 1,
        roughness: 0.2,
        reflectivity: 1,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
        envMapIntensity: 5
    }),
    HOLO_YELLOW: new THREE.MeshPhysicalMaterial({
        color: 0xffff00,
        metalness: 1,
        roughness: 0.2,
        reflectivity: 1,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
        envMapIntensity: 5
    }),
    HOLO_PURPLE: new THREE.MeshPhysicalMaterial({
        color: 0x800080,
        metalness: 1,
        roughness: 0.2,
        reflectivity: 1,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
        envMapIntensity: 5
    }),
    HOLO_ORANGE: new THREE.MeshPhysicalMaterial({
        color: 0xFFA500,
        metalness: 1,
        roughness: 0.2,
        reflectivity: 1,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
        envMapIntensity: 5
    }),
    HOLO_WHITE: new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 1,
        roughness: 0.2,
        reflectivity: 1,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
        envMapIntensity: 5
    }),
    HOLO_BLACK: new THREE.MeshPhysicalMaterial({
        color: 0x000000,
        metalness: 1,
        roughness: 0.2,
        reflectivity: 1,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
        envMapIntensity: 5
    }),
};


