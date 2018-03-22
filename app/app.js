const app = angular.module("WaveRiderApp", ["ngRoute", "angular-loading-bar"] )

angular.module("WaveRiderApp").config(function ($routeProvider) {
    /**
     * Configure all Angular application routes here
     */
    $routeProvider.
        when("/landingPage", {
            templateUrl: "app/surfReports/partials/landingPage.html",
            controller: "LandingPageCtrl"
        })
        .when("/autoFindSpot", {
            templateUrl: "app/surfReports/partials/autoFindSpot.html",
            controller: "AutoFindSpotCtrl"
        })
        .otherwise("/landingPage")

})
