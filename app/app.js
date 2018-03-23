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

angular.module("WaveRiderApp")
    .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
        cfpLoadingBarProvider.parentSelector = ".loading-bar-container";
        cfpLoadingBarProvider.spinnerTemplate = "<div><span class='fa fa-spinner'><center>Preparing your report...</center></div>";
      }])
