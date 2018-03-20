angular
.module("WaveRiderApp")
.controller("AutoFindSpotCtrl", function($scope, $location, SurfFactory, ReportFactory) {

    $scope.userLat = 0
    $scope.userLon = 0
    let options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
      
      function success(pos) {
        let crd = pos.coords

        console.log('Your current position is:')
        console.log(`Latitude : ${crd.latitude}`)
        console.log(`Longitude: ${crd.longitude}`)
        console.log(`More or less ${crd.accuracy} meters.`)

        $scope.userLat = crd.latitude
        $scope.userLon = crd.longitude

      }
      
      function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`)
      }

      navigator.geolocation.getCurrentPosition(success, error, options)

      $scope.getClosestReport = function () {
          console.log("hey")
        SurfFactory.getReportByUserCoords($scope.userLat, $scope.userLon).then(results => {
            console.log(results)
        })
      }
})
