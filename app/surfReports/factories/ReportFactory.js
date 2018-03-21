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
                let windWaveHeights = []
                let windWavePeriods = []
                let dewPointTemps = []
                let gustSpeeds = []
                let seaSurfaceTemps = []
                let windSpeeds = []
                
                resultsArray.forEach(br => {

                    currentSurfReport.beachName = br.beach.beachName

                    if (br.report.currentSpecReport !== null) {
                        
                        if (br.report.currentSpecReport.averageWavePeriod !== "MM") {
                            wavePeriods.push(br.report.currentSpecReport.averageWavePeriod)
                        }

                        if (br.report.currentSpecReport.significantWaveHeight !== "MM") {
                            significantWaveHeights.push(br.report.currentSpecReport.significantWaveHeight)
                        }

                        if (br.report.currentSpecReport.steepness !== "MM") {
                            steepnessReadings.push(br.report.currentSpecReport.steepness)
                        }

                        if (br.report.currentSpecReport.swellDirection !== "MM") {
                            swellDirections.push(br.report.currentSpecReport.swellDirection)
                        }

                        if (br.report.currentSpecReport.swellHeight !== "MM") {
                            swellHeights.push(br.report.currentSpecReport.swellHeight)
                        }

                        if (br.report.currentSpecReport.swellPeriod !== "MM") {
                            swellPeriods.push(br.report.currentSpecReport.swellPeriod)
                        }

                        if (br.report.currentSpecReport.waveDirection !== "MM") {
                            waveDirections.push(br.report.currentSpecReport.waveDirection)
                        }

                        if (br.report.currentSpecReport.windWaveDirection !== "MM") {
                            windWaveDirections.push(br.report.currentSpecReport.windWaveDirection)
                        }

                        if (br.report.currentSpecReport.swellHeight !== "MM") {
                            swellHeights.push(br.report.currentSpecReport.swellHeight)
                        }

                        if (br.report.currentSpecReport.windWavePeriod !== "MM") {
                            windWavePeriods.push(br.report.currentSpecReport.windWavePeriod)
                        }

                        if (br.report.currentSpecReport.windWaveHeight !== "MM") {
                            windWaveHeights.push(br.report.currentSpecReport.windWaveHeight)
                        }

                    }

                    if (br.report.currentStandardReport !== null) {

                        if (br.report.currentStandardReport.dominantWavePeriod !== "MM") {
                            dominantWavePeriods.push(br.report.currentStandardReport.dominantWavePeriod)
                        }

                        if (br.report.currentStandardReport.seaSurfaceTemperature !== "MM") {
                            seaSurfaceTemps.push(br.report.currentStandardReport.seaSurfaceTemperature)
                        }

                        if (br.report.currentStandardReport.gustSpeed !== "MM") {
                            gustSpeeds.push(br.report.currentStandardReport.gustSpeed)
                        }

                        if (br.report.currentStandardReport.dewPointTemperature !== "MM") {
                            dewPointTemps.push(br.report.currentStandardReport.dewPointTemperature)
                        }

                        if (br.report.currentStandardReport.windSpeed !== "MM") {
                            windSpeeds.push(br.report.currentStandardReport.windSpeed)
                        }


                    }
                

                })

                if (wavePeriods.length > 0) {
                    currentSurfReport.averageWavePeriod = this.getAverage(wavePeriods.map(wp => parseFloat(wp)))
                }

                if (dominantWavePeriods.length > 0) {
                    currentSurfReport.averageDominantWavePeriod = this.getAverage(dominantWavePeriods.map(dp => parseFloat(dp)))
                }

                if (significantWaveHeights.length > 0) {
                    currentSurfReport.averageSignificantWaveHeight = this.getAverage(significantWaveHeights.map(swh => parseFloat(swh)))
                }
                
                if (steepnessReadings.length > 0)
                {
                    if (steepnessReadings[0].search("_") === -1) {
                        currentSurfReport.averageSteepness = steepnessReadings[0]
                    } else {
                        let words = steepnessReadings[0].split("_")
                        let steepness = words[0] + " " + words[1]
                        currentSurfReport.averageSteepness = steepness
                    }
                }

                if (swellDirections.length > 0)
                {
                    currentSurfReport.averageSwellDirection = swellDirections[0]
                }

                if (swellHeights.length > 0) {
                    currentSurfReport.averageSwellHeight = this.getAverage(swellHeights.map(sh => parseFloat(sh)))
                }
                
                if (swellPeriods.length > 0) {
                    currentSurfReport.averageSwellPeriod = this.getAverage(swellPeriods.map(sp => parseFloat(sp)))
                }

                if (waveDirections.length > 0) {
                    
                   let waveDirectionAvg = this.getAverage(waveDirections.map(wd => parseFloat(wd)))

                   let degToCompass = function (num) {
                        let val = Math.floor((num / 22.5) + 0.5);
                        let arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
                        return arr[(val % 16)];
                    }

                    currentSurfReport.averageWaveDirection = degToCompass(waveDirectionAvg)
                }

                if (windWaveDirections.length > 0) {
                    currentSurfReport.averageWindWaveDirection = windWaveDirections[0]
                }

                if (windWaveHeights.length > 0) {
                    currentSurfReport.averageWindWaveHeight = this.getAverage(windWaveHeights.map(wwh => parseFloat(wwh)))
                }

                if (windWavePeriods.length > 0) {
                    currentSurfReport.averageWindWavePeriod = this.getAverage(windWavePeriods.map(wwp => parseFloat(wwp)))
                }

                if (dewPointTemps.length > 0) {
                    currentSurfReport.averageDewPointTemp = this.getAverage(dewPointTemps.map(dpt => parseFloat(dpt)))
                }

                if (gustSpeeds.length > 0) {
                    currentSurfReport.averageGustSpeed = this.getAverage(gustSpeeds.map(gs => parseFloat(gs)))
                }

                if (seaSurfaceTemps.length > 0) {
                    currentSurfReport.averageSeaSurfaceTemperature = this.getAverage(seaSurfaceTemps.map(sst => parseFloat(sst)))
                }

                if (windSpeeds.length > 0) {
                    currentSurfReport.averageWindSpeed = this.getAverage(windSpeeds.map(aws => parseFloat(aws)))
                }

                return currentSurfReport
            }
        },
        "compose45DayReport": {
            value: function (array) {

                for (let i = 0; array.length > i; i++)
                {
                    let dailyReports = []
                    let dailyData = []

                    let currentDay = ""
                    let currentMonth = ""

                    [i].report.spectralReports.forEach(s => {

                        if (currentDay = "") {
                            currentDay = s.day
                        }

                        if (currentDay === s.day) {
                            
                        }

                    })
                }
            }
        },
        "getAverage": {
            value: function (array) {
                let divisor = array.length
                
                let dividend = array.reduce(function (accumulator, currentValue) {
                    return accumulator + currentValue
                })

                return (dividend/divisor).toFixed(2)
            }
        }
    })
})