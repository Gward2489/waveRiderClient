angular
.module("WaveRiderApp")
.controller("LandingPageCtrl", function($scope, $location, SurfFactory, ReportFactory) {

    $scope.hideGraphs = true
    $scope.hideReportCard = true
    $scope.graphData = []
    $scope.filteredBeaches = []
    $scope.beachArray = []
    $scope.searchedSpotId = ""
    $scope.valuesArray = []

    // get beaches from server if they are not already present,
    // and populate the beach array being watched by angular with 
    // the data.
    if (SurfFactory.beachCache === null) {
        SurfFactory.getAllSpots()
        .then(results => {
            console.log(SurfFactory.beachCache)
            $scope.beachArray = SurfFactory.beachCache
        })
    } else if (SurfFactory.beachCache !== null) {
        $scope.beachArray = SurfFactory.beachCache
    }
    
    // function used to search for beaches. executes everytime the user enters
    // more than three characters in the search bar
    $scope.filterBeachSearch = function (searchInput) {
        // always clear the array to show the most relevant results and not leftovers
        $scope.filteredBeaches = []
        if (searchInput.length > 2) {
                // itterate through the beach array and check the name and state name
                // for every object. Push the matches to the filtered beaches array
                $scope.beachArray.forEach(b => {
                if ((b.beachName.toLowerCase()).includes((searchInput.toLowerCase()))) {
                    $scope.filteredBeaches.push(b)
                } else if ((b.state.toLowerCase()).includes((searchInput.toLowerCase()))) {
                    $scope.filteredBeaches.push(b)
                }
            })
        }
    }

    // array watched by angular to hold current beach report
    $scope.currentBeachReport = []
    // function to populate currentBeachReport array
    $scope.getBeachReport = function (beachId) {
        // clear the report array of any previous data
        $scope.currentBeachReport = []
        // get the beach data, compose the results to a report object,
        // push the object to the currentBeachReport array,
        // then clear any data being watched by angular that is not relevant 
        // to the current view
        SurfFactory.getReportByBeachId(beachId).then(results => {
            $scope.searchedSpotId = beachId
            let report = ReportFactory.composeCurrentReport(results.data)
            $scope.currentBeachReport.push(report)
            $scope.graphData = []
            $scope.valuesArray = []
            $scope.filteredBeaches = []
            $scope.hideReportCard = false
            $scope.hideGraphs = true
            
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
    $scope.visualizeWaveData = function () {
        // request repoert data from waveRider server
        SurfFactory.get45DayReportBySpotId($scope.searchedSpotId).then(results => {
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
            // hide graphs and reports
            $scope.hideReportCard = true
            $scope.hideGraphs = false
        })
    }
})