angular
.module("WaveRiderApp")
.factory("ReportFactory", function () {

    return Object.create(null, {
        "composeCurrentReport": {
            value: function (resultsArray) {
                let currentSurfReport = {
                    "beachName": false,
                    "averageWavePeriod": false,
                    "averageDominantWavePeriod": false,
                    "averageSignificantWaveHeight": false,
                    "averageSteepness": false,
                    "averageSwellDirection": false,
                    "averageSwellHeight": false,
                    "averageSwellPeriod": false,
                    "averageWaveDirection": false,
                    "averageWindWaveDirection": false,
                    "averageWindWaveHeight": false,
                    "averageWindWavePeriod": false,
                    "averageDewPointTemp": false,
                    "averageGustSpeed": false,
                    "averageSeaSurfaceTemperature": false,
                    "averageWindSpeed": false
                }

                let wavePeriods = []
                let dominantWavePeriods = []
                let significantWaveHeights = []
                let steepnessReadings = []
                let swellDirections = []
                let swellHeights = []
                let swellPeriods = []
                let waveDirections = []
                let windWaveDirections = []
                let windWavePeriods = []
                let dewPointTemps = []
                let gustSpeeds = []
                let seaSurfaceTemps = []
                let windSpeeds = []
                
                resultsArray.foreach(br => {



                })
            }
        }
    })
})