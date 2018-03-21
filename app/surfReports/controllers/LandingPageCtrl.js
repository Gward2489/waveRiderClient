angular
.module("WaveRiderApp")
.controller("LandingPageCtrl", function($scope, $location, SurfFactory, ReportFactory) {

    $scope.filteredBeaches = []
    $scope.beachArray = []
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

            let report = ReportFactory.composeCurrentReport(results.data)
            console.log(report)
            $scope.currentBeachReport.push(report)
        })
    }

    $scope.graphData = [4, 8, 9 ,11, 12, 15]
    $scope.visualizeWaveData = function () {
        $scope.graphData.push(5)
        $scope.graphData.push(8)
        $scope.graphData.push(11)
        $scope.graphData.push(13)
        $scope.graphData.push(19) 
    }


})