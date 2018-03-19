angular
.module("WaveRiderApp")
.factory("SurfFactory", function ($http) {

    return Object.create(null, {
        "beachCache": {
            value: null,
            enumerable: true,
            writable: true
        },
        "getAllSpots": {
            value: function () {
                return $http.get("http://localhost:5000/api/SurfSpots")
                    .then(results =>{
                        this.beachCache = results.data
                    })
            }
        },
    })
})