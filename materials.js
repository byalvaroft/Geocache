const MAP_OPACITY = 0.5;

export const materials = {
    SPHERE_MATERIAL: new THREE.MeshBasicMaterial({color: 0xffff00}),
    ROAD_MATERIAL: new THREE.MeshBasicMaterial({color: 0x333333, transparent: true, opacity: MAP_OPACITY}),
    GRASS_MATERIAL: new THREE.MeshBasicMaterial({color: 0x006400, transparent: true, opacity: MAP_OPACITY}),
    WATER_MATERIAL: new THREE.MeshBasicMaterial({color: 0xADD8E6, transparent: true, opacity: MAP_OPACITY}),
    BUILDING_MATERIAL: new THREE.MeshBasicMaterial({color: 0x000080, transparent: true, opacity: MAP_OPACITY})
};

