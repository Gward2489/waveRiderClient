angular
.module("WaveRiderApp")
.controller("LandingPageCtrl", function($scope, $location, SurfFactory, ReportFactory) {

    $scope.filteredBeaches = []
    $scope.beachArray = []
    $scope.searchedSpotId = ""
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
        })
    }

    $scope.graphData = []
    $scope.visualizeWaveData = function () {
        $scope.graphData = []
        $scope.graphData.push(5)
        $scope.graphData.push(8)
        $scope.graphData.push(11)
        $scope.graphData.push(13)
        $scope.graphData.push(19) 

        SurfFactory.get45DayReportBySpotId($scope.searchedSpotId).then(results => {
            console.log(results)
            let report = ReportFactory.compose45DayReport(results.data)
            console.log(report)
            $scope.graphingOptions = []
            for (prop in report[0]) {

                
                if (report[0][prop] !== "NaN" && prop !== "beachName" && prop !== "day" && prop !== "month") {
                    $scope.graphingOptions.push(prop)
                }
            }
            console.log($scope.graphingOptions)



        })
    }


})