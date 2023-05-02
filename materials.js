//materials.js:

const MAP_OPACITY = 0.5;

export const materials = {
    SPHERE_MATERIAL: new THREE.MeshPhongMaterial({color: 0xffff00}),
    ROAD_MATERIAL: new THREE.MeshPhongMaterial({
        color: 0x333333,
        transparent: false,
        polygonOffset: true,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 1
    }),
    GRASS_MATERIAL: new THREE.MeshPhongMaterial({color: 0x006400, transparent: true, opacity: MAP_OPACITY}),
    WATER_MATERIAL: new THREE.MeshPhongMaterial({color: 0xADD8E6, transparent: true, opacity: MAP_OPACITY}),
    BUILDING_MATERIAL: new THREE.MeshPhongMaterial({color: 0x8A8AAA, transparent: true, opacity: MAP_OPACITY}),
    RED: new THREE.MeshPhongMaterial({ color: 0xff0000 }),
    BLUE: new THREE.MeshPhongMaterial({ color: 0x0000ff }),
};


