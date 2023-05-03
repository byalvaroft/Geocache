//materials.js:
import * as THREE from 'three';
const MAP_OPACITY = 0.5;

// Function to generate procedural noise
function generateNoiseTexture(width, height, intensity) {
    const size = width * height;
    const data = new Uint8Array(size);
    const noise = new THREE.SimplexNoise();

    for (let i = 0; i < size; i++) {
        const x = i % width;
        const y = Math.floor(i / width);
        data[i] = (noise.noise2D(x / 10, y / 10) * intensity + intensity) * 255;
    }

    const texture = new THREE.DataTexture(data, width, height, THREE.LuminanceFormat, THREE.UnsignedByteType);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
}

const grassNoiseTexture = generateNoiseTexture(128, 128, 0.5);
const waterNoiseTexture = generateNoiseTexture(128, 128, 0.2);

export const materials = {

    //MAP MATERIALS
    SPHERE_MATERIAL: new THREE.MeshPhongMaterial({color: 0xffff00}),
    ROAD_MATERIAL: new THREE.MeshPhongMaterial({
        color: 0x333333,
        transparent: false,
        polygonOffset: true,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 1
    }),
    GRASS_MATERIAL: new THREE.MeshPhongMaterial({
        color: 0x006400,
        map: grassNoiseTexture,
        transparent: true,
        opacity: MAP_OPACITY
    }),
    WATER_MATERIAL: new THREE.MeshPhongMaterial({
        color: 0xADD8E6,
        map: waterNoiseTexture,
        transparent: true,
        opacity: MAP_OPACITY
    }),
    BUILDING_MATERIAL: new THREE.MeshPhongMaterial({
        color: 0x8A8AAA,
        transparent: true,
        opacity: MAP_OPACITY
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


