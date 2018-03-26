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
                return $http.get("https://api.waverider.garrettwarddev.com/api/SurfSpots")
                    .then(results =>{
                        this.beachCache = results.data
                    })
            }
        },
        "getReportByBeachId": {
            value: function (beachId) {
                let url = "https://api.waverider.garrettwarddev.com/api/CurrentSurfReport/" + beachId
                return $http.get(url)
            }
        },
        "getReportByUserCoords": {
            value: function (userLat, userLon) {
                let latString = userLat.toString()
                let lonString = userLon.toString()
                
                let url = "https://api.waverider.garrettwarddev.com/api/CurrentSurfReport/" + latString + "/" + lonString
                return $http.get(url)
            }
        },
        "getReportsByCoordsAndCount": {
            value: function (userLat, userLon, reportCount) {
                let url = "https://api.waverider.garrettwarddev.com/api/CurrentSurfReport/" + userLat + "/" + userLon +"/" + reportCount

                return $http.get(url)
            }
        },
        "get45DayReportBySpotId": {
            value: function (spotId) {
                let url = "https://api.waverider.garrettwarddev.com/api/FullSurfReport/" + spotId

                return $http.get(url)
            }
        }
    })
})
