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
                let dailyReports = [] 

                array.forEach(br => {    
                
                    let dailyData = []

                    
                    let makeDailySurfReportObj = function () {
                        return {
                            "beachName": false,
                            "day": false,
                            "month": false,
                            "averageWavePeriod": false,
                            "averageSignificantWaveHeight": false,
                            "averageSteepness": false,
                            "averageSwellDirection": false,
                            "averageSwellHeight": false,
                            "averageSwellPeriod": false,
                            "averageWaveDirection": false,
                            "averageWindWaveDirection": false,
                            "averageWindWaveHeight": false,
                            "averageWindWavePeriod": false,
                        }
                    }
                    
                    let wavePeriods = []
                    let significantWaveHeights = []
                    let steepnessReadings = []
                    let swellDirections = []
                    let swellHeights = []
                    let swellPeriods = []
                    let waveDirections = []
                    let windWaveDirections = []
                    let windWaveHeights = []
                    let windWavePeriods = []
                    
                    let currentDay = ""
                    let currentMonth = ""


                    if (br.report.spectralReports !== null) {
                        br.report.spectralReports.forEach(s => {
                            
                            if (currentDay === "") {
                                currentDay = s.day
                            }
                            
                            if (currentDay === s.day) {
                                
                                dailyData.push(s)
                                
                            } else if (currentDay !== s.day) {
                                
                                dailyData.forEach(d => { 
                                    
                                    if (d.averageWavePeriod !== "MM") {
                                        wavePeriods.push(parseFloat(d.averageWavePeriod))
                                    }
                                    
                                    if (d.significantWaveHeight !== "MM") {
                                        significantWaveHeights.push(parseFloat(d.significantWaveHeight))
                                    }

                                    if (d.steepness !== "MM") {
                                        steepnessReadings.push(d.steepness)
                                    }

                                    if (d.swellDirection !== "MM") {
                                        swellDirections.push(d.swellDirection)
                                    }

                                    if (d.swellHeight !== "MM") {
                                        swellHeights.push(parseFloat(d.swellHeight))
                                    }

                                    if (d.swellPeriod !== "MM") {
                                        swellPeriods.push(parseFloat(d.swellPeriod))
                                    }

                                    if (d.waveDirection !== "MM") {
                                        waveDirections.push(parseFloat(d.waveDirection))
                                    }

                                    if (d.windWaveDirection !== "MM") {
                                        windWaveDirections.push(d.windWaveDirection)
                                    }

                                    if (d.windWaveHeight !== "MM") {
                                        windWaveHeights.push(parseFloat(d.windWaveHeight))
                                    }

                                    if (d.windWavePeriod !== "MM") {
                                        windWavePeriods.push(parseFloat(d.windWavePeriod))
                                    }
                                })

                                let dailyR = makeDailySurfReportObj()

                                if (wavePeriods.length > 1) {
                                    dailyR.averageWavePeriod = this.getAverage(wavePeriods)
                                } else {
                                    dailyR.averageWavePeriod = wavePeriods[0]
                                }

                                if (significantWaveHeights.length > 1) {
                                    dailyR.averageSignificantWaveHeight = this.getAverage(significantWaveHeights)
                                } else {
                                    dailyR.significantWaveHeight = significantWaveHeights[0]
                                }

                                if (steepnessReadings.length > 1) {
                                    dailyR.averageSteepness = this.getAverageSteepness(steepnessReadings)
                                } else {
                                    dailyR.averageSteepness = steepnessReadings[0]
                                }

                                if (swellDirections.length > 1) {
                                    dailyR.averageSwellDirection = this.getAverageDirection(swellDirections)
                                } else {
                                    dailyR.averageSwellDirection = swellDirections[0]
                                }

                                if (swellHeights.length > 1) {
                                    dailyR.averageSwellHeight = this.getAverage(swellHeights)
                                } else {
                                    dailyR.averageSwellHeight = swellHeights[0]
                                }

                                if (swellPeriods.length > 1) {
                                    dailyR.averageSwellPeriod = this.getAverage(swellPeriods)
                                } else {
                                    dailyR.averageSwellPeriod = swellPeriods[0]
                                }

                                if (waveDirections.length > 1) {

                                    let degToCompass = function (num) {
                                        let val = Math.floor((num / 22.5) + 0.5);
                                        let arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
                                        return arr[(val % 16)];
                                    }

                                    let avgDirectionInt = this.getAverage(waveDirections)

                                    dailyR.averageWaveDirection = degToCompass(avgDirectionInt)

                                } else {

                                    let degToCompass = function (num) {
                                        let val = Math.floor((num / 22.5) + 0.5);
                                        let arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
                                        return arr[(val % 16)];
                                    }

                                    dailyR.averageWaveDirection = degToCompass(waveDirections[0])
                                }

                                if (windWaveDirections.length > 1) {
                                    dailyR.averageWindWaveDirection = this.getAverageDirection(windWaveDirections)
                                } else {
                                    dailyR.averageWindWaveDirection = windWaveDirections[0]
                                }

                                if (windWaveHeights.length > 1) {
                                    dailyR.averageWindWaveHeight = this.getAverage(windWaveHeights)
                                } else {
                                    dailyR.averageWindWaveHeight = windWaveHeights[0]
                                }

                                if (windWavePeriods.length > 1) {
                                    dailyR.averageWindWavePeriod = this.getAverage(windWavePeriods)
                                } else {
                                    dailyR.averageWindWavePeriod = windWavePeriods[0]
                                }

                                dailyR.day = currentDay
                                dailyR.month = currentMonth
                                dailyR.beachName = br.beach.beachName

                                dailyReports.push(dailyR)

                                wavePeriods = []
                                significantWaveHeights = []
                                steepnessReadings = []
                                swellDirections = []
                                swellHeights = []
                                swellPeriods = []
                                waveDirections = []
                                windWaveDirections = []
                                windWaveHeights = []
                                windWavePeriods = []

                                currentDay = s.day
                            }
                            
                            if (s.month !== currentMonth) {
                                currentMonth = s.month                            
                            }

                        })
                    }
                })

                return dailyReports
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
        },
        "getAverageDirection": {
            value: function (array) {

                let directionString = ""

                array.forEach(x => {
                    directionString += x + ","
                })
                let directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"]

                let highcount = 0
                let direction = ""
                directions.forEach(d => {
                let x = (directionString.split(d).length - 1)       
                    if (x > highcount) {
                        highcount = x
                        direction = d
                    }
                })
                
                return direction
                
            }
        },
        "getAverageSteepness": {
            value: function (array) {

                let steepnessString = ""

                array.forEach(x => {
                    steepnessString += x + ","
                })

                let steepnessReadings = ["VERY_STEEP", "STEEP", "AVERAGE", "SWELL", "VERY STEEP"]

                let highcount = 0
                let steepnessReading = ""
                steepnessReadings.forEach(sr => {
                let x = (steepnessString.split(sr).length - 1)       
                    if (x > highcount) {
                        highcount = x
                        steepnessReading = sr
                    }
                })

                if (steepnessReading === "VERY_STEEP") {
                    let words = steepnessReading.split("_")
                    steepnessReading = words[0] + " " + words[1]
                }

                return steepnessReading
            }
        }
    })
})