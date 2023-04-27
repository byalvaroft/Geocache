AFRAME.registerComponent('gps-camera', {
    schema: {
        minLat: {type: 'number', default: 43.33579},
        maxLat: {type: 'number', default: 43.39133},
        minLon: {type: 'number', default: -8.45055},
        maxLon: {type: 'number', default: -8.37158}
    },

    init: function () {
        this._watchPositionId = null;

        // Calculate scale factors based on latitude and longitude differences
        const latScale = 111.32;
        const lonScale = 111.32 * Math.cos(((this.data.minLat + this.data.maxLat) / 2) * (Math.PI/180));

        const onSuccess = (position) => {
            const { latitude, longitude } = position.coords;

            // Calculate position in 3D model space
            const modelX = (longitude - this.data.minLon) * lonScale;
            const modelZ = (latitude - this.data.minLat) * latScale;

            // Update camera and model positions
            this.el.setAttribute('position', {x: 0, y: 0, z: 0});
            document.querySelector('#model').setAttribute('position', `${-modelX} 0 ${-modelZ}`);
        };

        const onError = (error) => {
            console.log('Error occurred: ', error);
        };

        // Wait for the model to load before starting to watch the user's position
        document.querySelector('#model').addEventListener('loaded', () => {
            if (!navigator.geolocation) {
                console.error('Geolocation API not available in this browser.');
            } else {
                this._watchPositionId = navigator.geolocation.watchPosition(onSuccess, onError, {
                    enableHighAccuracy: true,
                    maximumAge: 0,
                    timeout: 27000
                });
            }
        });
    },

    remove: function () {
        if (this._watchPositionId !== null) {
            navigator.geolocation.clearWatch(this._watchPositionId);
            this._watchPositionId = null;
        }
    }
});
