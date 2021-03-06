// this factory contains the get request to the wave rider server. It also contains a 
// cache to hold the list of waveRider supported beaches

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
        "getReportByBeachId": {
            value: function (beachId) {
                let url = "http://localhost:5000/api/CurrentSurfReport/" + beachId
                return $http.get(url)
            }
        },
        "getReportByUserCoords": {
            value: function (userLat, userLon) {
                let latString = userLat.toString()
                let lonString = userLon.toString()
                
                let url = "http://localhost:5000/api/CurrentSurfReport/" + latString + "/" + lonString
                return $http.get(url)
            }
        },
        "getReportsByCoordsAndCount": {
            value: function (userLat, userLon, reportCount) {
                let url = "http://localhost:5000/api/CurrentSurfReport/" + userLat + "/" + userLon +"/" + reportCount

                return $http.get(url)
            }
        },
        "get45DayReportBySpotId": {
            value: function (spotId) {
                let url = "http://localhost:5000/api/FullSurfReport/" + spotId

                return $http.get(url)
            }
        }
    })
})