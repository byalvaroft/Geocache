function createModel(modelData, scene, loader) {
    loader.load(modelData.modelName, function(gltf) {
        var model = gltf.scene;
        var x = map(modelData.lon, MIN_LON, MAX_LON, -3200, 3200);
        var z = map(modelData.lat, MIN_LAT, MAX_LAT, 3200, -3200);
        model.position.set(x, 0, z);
        modelData.instance = model;
        scene.add(model);
    });
}

function removeModel(modelData, scene) {
    if (modelData.instance) {
        scene.remove(modelData.instance);
        modelData.instance = null;
    }
}

function checkModelVisibility(modelData, currentTime) {
    var timeDiff = currentTime - modelData.timestamp;
    return timeDiff >= 0 && timeDiff < 3600000; // 1 hour = 3600000 ms
}

export { modelData, createModel, removeModel, checkModelVisibility };
