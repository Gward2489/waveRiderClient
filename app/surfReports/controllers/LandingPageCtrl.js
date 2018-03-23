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

    if (SurfFactory.beachCache === null) {
        SurfFactory.getAllSpots()
        .then(results => {
            console.log(SurfFactory.beachCache)
            $scope.beachArray = SurfFactory.beachCache
        })
    } else if (SurfFactory.beachCache !== null) {
        $scope.beachArray = SurfFactory.beachCache
    }
    

    $scope.filterBeachSearch = function (searchInput) {
        $scope.filteredBeaches = []
        if (searchInput.length > 2) {
                $scope.beachArray.forEach(b => {
                if ((b.beachName.toLowerCase()).includes((searchInput.toLowerCase()))) {
                    $scope.filteredBeaches.push(b)
                } else if ((b.state.toLowerCase()).includes((searchInput.toLowerCase()))) {
                    $scope.filteredBeaches.push(b)
                }
            })
        }
    }

    $scope.currentBeachReport = []
    $scope.getBeachReport = function (beachId) {
        $scope.currentBeachReport = []
        SurfFactory.getReportByBeachId(beachId).then(results => {
            console.log(results)
            $scope.searchedSpotId = beachId
            let report = ReportFactory.composeCurrentReport(results.data)
            console.log(report)
            $scope.currentBeachReport.push(report)
            $scope.graphData = []
            $scope.valuesArray = []
            $scope.filteredBeaches = []
            $scope.hideReportCard = false;
        })
    }

    $scope.graphInts = function (propToGraph) {
        $scope.graphData = []
        $scope.valuesArray = []
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

    $scope.visualizeWaveData = function () {

        SurfFactory.get45DayReportBySpotId($scope.searchedSpotId).then(results => {
            console.log(results)
            $scope.report = ReportFactory.compose45DayReport(results.data)
            console.log($scope.report)
            
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