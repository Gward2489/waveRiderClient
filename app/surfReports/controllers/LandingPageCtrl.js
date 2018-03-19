angular
.module("WaveRiderApp")
.controller("LandingPageCtrl", function($scope, $location, SurfFactory) {


    $scope.beachArray = []
    if (SurfFactory.beachCache === null)
    {
        SurfFactory.getAllSpots()
        .then(results => {
            console.log(SurfFactory.beachCache)
            $scope.beachArray = SurfFactory.beachCache
        })
    }

    

})