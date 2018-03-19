const app = angular.module("WaveRiderApp", ["ngRoute"] )

angular.module("WaveRiderApp").config(function ($routeProvider) {
    /**
     * Configure all Angular application routes here
     */
    $routeProvider.
        when("/landingPage", {
            templateUrl: "app/surfReports/partials/landingPage.html",
            controller: "LandingPageCtrl"
        })
        .otherwise("/landingPage")

})
