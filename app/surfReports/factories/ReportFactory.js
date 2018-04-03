// This factory contains methods to take the data delivered by the waveRider Api
// and convert it into objects of data that are easy to consume with angularJS

angular
.module("WaveRiderApp")
.factory("ReportFactory", function () {

    return Object.create(null, {
        "composeCurrentReport": {
            value: function (resultsArray) {

                // define an object that will be used to hold all the data needed
                // for a surf report
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

                // define arrays that we can put surf data into and perform array methods on
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
                
                // itterate through the beach reports
                resultsArray.forEach(br => {

                    // since every beach report is will have the same beach title, set
                    // the beachname
                    currentSurfReport.beachName = br.beach.beachName

                    // check if report contains spectral data.
                    // NOAA buoys insert 'MM' if no data is present for a given property
                    // check to see if data is present for each property, and if so,
                    // add it to the corresponding array
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

                    // perform the same logic for the standard reports
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

                // check if the arrays were pushed any data, if so, average the data and
                // add the average value to the report object
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
                    // **need to refactor to use average steepness calculator
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

                    // nugget from stack overflow to convert compass degree reding to direction    
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

        // compose 45 day report follows same logic as compose current report

        "compose45DayReport": {
            value: function (array) {
                let dailyReports = [] 

                let makeDailySurfReportObj = function () {
                    return {
                        "beachName": false,
                        "day": false,
                        "month": false,
                        "averageSignificantWaveHeight": false,
                        "averageWavePeriod": false,
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

                array.forEach(br => {    
                
                    let dailyData = []
                    
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

                    // since the spectral reports will contains hundreds of entries,
                    // itterate through them.
                    // we also must complile reports by day, so that we may graph the 45
                    // day data by day.
                    if (br.report.spectralReports !== null) {
                        br.report.spectralReports.forEach(s => {
                            // set day to current day in report
                            if (currentDay === "") {
                                currentDay = s.day
                            }
                            // push report to daily dat array
                            if (currentDay === s.day) {
                                
                                dailyData.push(s)

                            // when the day changes, itterate through the daily data
                            // array, crunch the numbers, and then clear the daily data array
                            // along with the value arrays to make room the new days data  
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
                                    dailyR.averageSignificantWaveHeight = parseFloat(this.getAverage(significantWaveHeights))
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
                                // set day month and name for daily report
                                dailyR.day = currentDay
                                dailyR.month = currentMonth
                                dailyR.beachName = br.beach.beachName
                                // add daily report to array
                                dailyReports.push(dailyR)
                                // clear values from arrays
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
                                dailyData = []
                                // set current day variable to new day
                                currentDay = s.day
                            }
                            // check if the month has changed
                            if (s.month !== currentMonth) {
                                // change it if so
                                currentMonth = s.month                            
                            }

                        })
                    }
                })

                // at this point we have 45 report objects for every buoy queried, 
                // all stored in a single array. We need to make a new array holding
                // only 45 objects containing the average values from the buoys queried.

                let refinedDailyReports = []

                monthCount = 0
                currentMonth = ""

                // the purpose of this forEach method is to populate
                // the refinedDailyReports array with one surf report object
                // for each day in the report. The averaged data will be added after this 
                // itteration
                dailyReports.forEach(dr => {

                    // track the month, and count for changes in month
                    if (currentMonth !== dr.month) {
                        currentMonth = dr.month
                        monthCount ++
                    }
                    
                    // until the month changes for a third time, create objects
                    // and add them to the refined reports array
                    if (monthCount < 3) {
                        
                        let dailyR = makeDailySurfReportObj()
                        
                        dailyR.day = dr.day
                        dailyR.month = dr.month
                        dailyR.beachName = dr.beachName
                        refinedDailyReports.push(dailyR)
                    }
                    
                })

                // itterate through the array of 45 report objects 
                refinedDailyReports.forEach(rdr => {

                    // create arrays that will be used to calculate average values
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

                    // itterate through the larger collection of daily reports look for matches
                    // of month/day against the current refined report object. Add the values
                    // from the matches to the values array
                    dailyReports.forEach(dr => {
                        if (rdr.day === dr.day && rdr.month === rdr.month) {
                            wavePeriods.push(dr.averageWavePeriod)
                            significantWaveHeights.push(dr.averageSignificantWaveHeight)
                            steepnessReadings.push(dr.averageSteepness)
                            swellDirections.push(dr.averageSwellDirection)
                            swellHeights.push(dr.averageSwellHeight)
                            swellPeriods.push(dr.averageSwellPeriod)
                            waveDirections.push(dr.averageWaveDirection)
                            windWaveDirections.push(dr.averageWindWaveDirection)
                            windWaveHeights.push(dr.averageWindWaveHeight)
                            windWavePeriods.push(dr.averageWindWavePeriod)
                        }
                    })
                    // get averages, and add them to the current refined report
                    rdr.averageWavePeriod = this.getAverage(wavePeriods)
                    rdr.averageSignificantWaveHeight = this.getAverage(significantWaveHeights)
                    rdr.averageSteepness = this.getAverageSteepness(steepnessReadings)
                    rdr.averageSwellDirection = this.getAverageDirection(swellDirections)
                    rdr.averageSwellHeight = this.getAverage(swellHeights)
                    rdr.averageSwellPeriod = this.getAverage(swellPeriods)
                    rdr.averageWaveDirection = this.getAverageDirection(waveDirections)
                    rdr.averageWindWaveDirection = this.getAverageDirection(windWaveDirections)
                    rdr.averageWindWaveHeight = this.getAverage(windWaveHeights)
                    rdr.averageWindWavePeriod = this.getAverage(windWavePeriods)
                })
                // return the array if refined report objects
                return refinedDailyReports
            }
        },
        // vanilla javascript function to get average values of an array
        "getAverage": {
            value: function (arrayOfNumbers) {

                let array = arrayOfNumbers.map(a => parseFloat(a))
                let divisor = array.length
                
                let dividend = array.reduce(function (accumulator, currentValue) {
                    return accumulator + currentValue
                })

                return (dividend/divisor).toFixed(2)
            }
        },
        // given an array of strings of compass directions ex: N or SSW, this function will
        // return the most comman direction in the array

        "getAverageDirection": {
            value: function (array) {
                // make a single string of directions seperated by commas
                let directionString = ""
                array.forEach(x => {
                    directionString += x + ","
                })
                // define an array of directions
                let directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"]

                // itterate over the array of directions. For each direction, use split
                // to see how many occurances of the direction exist in the direction string.
                // set the high count and common direction everytime a new highcount is set
                let highcount = 0
                let direction = ""
                directions.forEach(d => {
                let x = (directionString.split(d).length - 1)       
                    if (x > highcount) {
                        highcount = x
                        direction = d
                    }
                })

                // return average direction
                return direction
            }
        },
        // same logic as get average direction but for steepness readings from NOAA
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

                // remove underscore from if steepness reading is VERY_STEEP
                if (steepnessReading === "VERY_STEEP") {
                    let words = steepnessReading.split("_")
                    steepnessReading = words[0] + " " + words[1]
                }

                return steepnessReading
            }
        }
    })
})