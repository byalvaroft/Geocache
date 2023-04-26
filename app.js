const targetCoordinates = { latitude: 43.353579286149305, longitude: -8.406895195310744 }; // Set your desired coordinates here
const distanceThreshold = 5; // Distance threshold in meters
let watchId;

window.onload = function() {
    if (!navigator.geolocation) {
        document.getElementById('status').innerHTML = 'Geolocation is not supported by your browser.';
    } else {
        navigator.geolocation.getCurrentPosition(() => {
            watchId = navigator.geolocation.watchPosition(verifyPosition, error);
        }, error);
    }
}

function verifyPosition(position) {
    const distance = calculateDistance(position.coords.latitude, position.coords.longitude, targetCoordinates.latitude, targetCoordinates.longitude);
    if (distance <= distanceThreshold) {
        alert('You are within 30 meters of the target location.');
        navigator.geolocation.clearWatch(watchId);
    } else {
        document.getElementById('status').innerHTML = `You are ${distance.toFixed(2)} meters away from the target location.`;
    }
}

function error() {
    document.getElementById('status').innerHTML = 'Unable to retrieve your location.';
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // Earth's radius in meters
    const lat1Rad = lat1 * Math.PI / 180;
    const lat2Rad = lat2 * Math.PI / 180;
    const deltaLat = (lat2 - lat1) * Math.PI / 180;
    const deltaLon = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
        Math.cos(lat1Rad) * Math.cos(lat2Rad) *
        Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}
