angular
.module("WaveRiderApp")
.controller("AutoFindSpotCtrl", function($scope, $location, SurfFactory, ReportFactory) {
    
    $scope.valuesArray = []
    $scope.hideGraphs = true
    $scope.hideReportCard = true
    $scope.graphData = []
    $scope.spotCountOptions = [1, 2, 3, 4]
    $scope.singleClosest = []
    $scope.multipleClosest = []
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
            $scope.singleClosest.push(ReportFactory.composeCurrentReport(results.data))
        })
      }

      $scope.getClosestReports = function (reportCount) {
        SurfFactory.getReportsByCoordsAndCount($scope.userLat, $scope.userLon, reportCount).then(results => {
          
          let beachIds = new Set ()
          let closestReports = []
          results.data.forEach(br => {
            beachIds.add(br.beach.beachId)
          })

          beachIds.forEach(bId => {
            closestReports.push(results.data.filter(br => br.beach.beachId === bId))
          })

          closestReports.forEach(r => {
            $scope.multipleClosest.push(ReportFactory.composeCurrentReport(r))
          })

          console.log($scope.multipleClosest)
        })
      }

      $scope.graphInts = function (propToGraph) {
        $scope.graphData = []
        $scope.report.forEach(r => {
            let intObj = {
                "average": false,
                "day": false,
                "month": false
            } 
            for (p in r) {
                if (p === propToGraph) {
                    intObj.average = parseFloat(r[p])
                    $scope.valuesArray.push(parseFloat(r[p]))
                }
                if (p === "day") {
                    intObj.day = r[p]
                }
                if (p === "month") {
                    intObj.month = r[p]
                }
            }
            $scope.graphData.push(intObj)
        })
    }

      $scope.visualizeWaveData = function (beachName) {
        SurfFactory.beachCache.forEach(b => {
          if (b.beachName === beachName) {
            $scope.beachToSearch = b
          }
        })

        SurfFactory.get45DayReportBySpotId($scope.beachName).then(results => {
          $scope.report = ReportFactory.compose45DayReport(results.data)
          
          $scope.graphingOptions = []
          for (prop in $scope.report[0]) {

              
              if ($scope.report[0][prop] !== "NaN" && prop !== "beachName" && prop !== "day" && prop !== "month" && prop !== "averageSteepness" && prop !== "averageSwellDirection" && prop !== "averageWaveDirection" && prop !== "averageWindWaveDirection") {
                  $scope.graphingOptions.push(prop)
              }
          }

          $scope.graphInts("averageSignificantWaveHeight")
          $scope.hideReportCard = true
          $scope.hideGraphs = false
          console.log($scope.graphingOptions)

        })

      }
})
