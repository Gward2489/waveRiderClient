angular
.module("WaveRiderApp")
.factory("ReportFactory", function () {

    return Object.create(null, {
        "composeCurrentReport": {
            value: function (resultsArray) {
                resultsArray.foreach(br => {
                    
                })
            }
        }
    })

})