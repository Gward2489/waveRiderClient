angular
.module("WaveRiderApp")
.controller("NavCtrl", function($scope, $location, SurfFactory, ReportFactory) {

    $scope.routeToAutoFind = function () {
        $location.url("/surfReports/autoFindSpot")
    }

    $scope.routeToSearch = function () {
        console.log("hey")
        $location.url("/surfReports/landingPage")
    }

})