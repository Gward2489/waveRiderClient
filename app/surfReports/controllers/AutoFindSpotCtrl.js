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

    if (SurfFactory.beachCache === null) {
      SurfFactory.getAllSpots()
      .then(results => {
          console.log(SurfFactory.beachCache)
          $scope.beachArray = SurfFactory.beachCache
      })
      } else if (SurfFactory.beachCache !== null) {
      $scope.beachArray = SurfFactory.beachCache
      }


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

    // get users geolocation
    navigator.geolocation.getCurrentPosition(success, error, options)

    // function to get surf report nearest to user
    $scope.getClosestReport = function () {
      // request report from server
      SurfFactory.getReportByUserCoords($scope.userLat, $scope.userLon).then(results => {
        // hide graphs and reveal report card
          $scope.hideGraphs = true
          $scope.hideReportCard = false
          // compose current report from request response and push to array watched by angular
          $scope.singleClosest.push(ReportFactory.composeCurrentReport(results.data))
      })
    }

    // function to get a given amount of geolocated reports
    $scope.getClosestReports = function (reportCount) {
      // request report data by user geolocation and reportCount
      SurfFactory.getReportsByCoordsAndCount($scope.userLat, $scope.userLon, reportCount).then(results => {
        
        // use as set to hold beach ids and prevent duplicates
        let beachIds = new Set ()
        let closestReports = []
        // itterate through results array. this array will hold beach report objects
        results.data.forEach(br => {
          // add the ids from the beaches to the set
          beachIds.add(br.beach.beachId)
        })

        // itterate through the array of beach ids 
        beachIds.forEach(bId => {
          // for each id, push an array of reports matching the current beach to closest reports
          closestReports.push(results.data.filter(br => br.beach.beachId === bId))
        })
        // itterate through the array of report arrays
        closestReports.forEach(r => {
          // for each report array, compose it into current report object and add
          // it to the multipleClosest array, which is being watched by angular, and will
          // render to the dom
          $scope.multipleClosest.push(ReportFactory.composeCurrentReport(r))
        })
        // hide graphs and reveal report card
        $scope.hideGraphs = true
        $scope.hideReportCard = false          
      })
    }

    // function to populate arrays watched by bars directive 
    $scope.graphInts = function (propToGraph) {
      // clear arrays of any previous value
      $scope.graphData = []
      $scope.valuesArray = []
      // itterate through reports and 
      // create objects to send to d3
      $scope.report.forEach(r => {
        // define objects with only datatype
          let intObj = {
              "average": false,
              "day": false,
              "month": false,
              "dataType": propToGraph
          } 
          // itterate through the properties in the report object
          for (p in r) {
            // look for matches of key names, and add corresponding data 
            // to the object
              if (p === propToGraph) {
                  intObj.average = parseFloat(r[p])
                  // populate the values array with the integer values
                  // for d3 scaling 
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
    // function to retreive 45 day report data, compose it, and render it with d3
    $scope.visualizeWaveData = function (beachName) {
      // get the id of the beach to query for
      SurfFactory.beachCache.forEach(b => {
        if (b.beachName === beachName) {
          $scope.beachToSearch = b.beachId
        }
      })

      // request repoert data from waveRider server
      SurfFactory.get45DayReportBySpotId($scope.beachToSearch).then(results => {
        // compose 45 day report from data for beach
        $scope.report = ReportFactory.compose45DayReport(results.data)
        // this scope is used to render buttons for whatever data categories are
        // available for graphing
        $scope.graphingOptions = []

        for (prop in $scope.report[0]) {
            // this if statement makes sure to only add graphing options
            // that we have written code to handle/makes sure nothing unrelated
            // makes its way in
            if ($scope.report[0][prop] !== "NaN" && prop !== "beachName" && prop !== "day" && prop !== "month" && prop !== "averageSteepness" && prop !== "averageSwellDirection" && prop !== "averageWaveDirection" && prop !== "averageWindWaveDirection") {
                $scope.graphingOptions.push(prop)
            }
        }

        // by default, graph significant wave height. This is the only
        // dataset guaranteed to be present on every request
        $scope.graphInts("averageSignificantWaveHeight")
        // hide report cards
        $scope.hideReportCard = true
        // show graphs
        $scope.hideGraphs = false
      })
    }
})
