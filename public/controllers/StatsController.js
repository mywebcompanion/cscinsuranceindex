/**
 * Created by ARUN on 11/1/2016.
 */
InsuranceIndex.controller('StatsController', function($scope,UIMaster,ChartConfig, $rootScope,$state, $stateParams, loadStats, $location, $anchorScroll ) {
    UIMaster.menuVisibility = true;
    UIMaster.insuranceHeading = true;
    $scope.percent = 70;
    $scope.categJSON = loadStats.data;
    console.log(JSON.stringify(loadStats.data));
   /* $scope.categJSON = {
        "singapore" : {
            "AIA" : {
                "Analytics & Conversion" : {
                    "Score" : 43,
                    "Recommendations" : [
                        "User events are not captured",
                        "Country Ranking can be improved"
                    ],
                    "ValueMetric" : [
                        {
                            "name" : "Monthly pageviews",
                            "value" : 76432,
                            "benchmarkvalue" : 200000,
                            "rank" : "high"
                        },
                        {
                            "name" : "Page Rank",
                            "value" : 3,
                            "Country Ranking" : 97,
                            "rank" : "high"
                        }
                    ],
                    "BooleanMetric" : [
                        {
                            "name" : "Google Analytics Integration",
                            "value" : "true"
                        },
                        {
                            "name" : "Event Tracking Integration",
                            "value" : "false"
                        }
                    ],
                    "RatingMetric" : [
                        {
                            "name" : "Analytics Rating",
                            "value" : 3
                        },
                        {
                            "name" : "Forum Rating",
                            "value" : 4
                        }
                    ]
                },
                "Social Strategy" :{
                    "Score" :73,
                    "Recommendations" : [
                        "No twitter presence",
                        "Average response time in social media is more than 6 days"
                    ],
                    "ValueMetric" : [
                        {
                            "name" : "Facebook Followers",
                            "value" : 76432,
                            "benchmarkvalue" : 200000,
                            "rank" : "high"
                        },
                        {
                            "name" : "No of interactions",
                            "value" : 21323,
                            "Country Ranking" : 91227,
                            "rank" : "high"
                        }
                    ],
                    "BooleanMetric" : [
                        {
                            "name" : "Facebook Page",
                            "value" : "true"
                        },
                        {
                            "name" : "Twitter Handle",
                            "value" : "false"
                        },
                        {
                            "name" : "Youtube channel",
                            "value" : "false"
                        }
                    ],
                    "RatingMetric" : [
                        {
                            "name" : "Resolution Rate",
                            "value" : 3
                        },
                        {
                            "name" : "Social Content",
                            "value" : 4
                        }
                    ]
                },
                "Email & chat" :{
                    "Score" : 59,
                    "Recommendations" : [
                        "No twitter presence"
                    ],
                    "ValueMetric" : [
                        {
                            "name" : "avg chat time",
                            "value" : 323,
                            "benchmarkvalue" : 320,
                            "rank" : "high"
                        },
                        {
                            "name" : "avg forum reply time",
                            "value" : 3,
                            "Country Ranking" : 97,
                            "rank" : "high"
                        }
                    ],
                    "BooleanMetric" : [
                        {
                            "name" : "Google Analytics Integration",
                            "value" : "true"
                        },
                        {
                            "name" : "Event Tracking Integration",
                            "value" : "false"
                        }
                    ],
                    "RatingMetric" : [
                        {
                            "name" : "Analytics Rating",
                            "value" : 3
                        }
                    ]
                },
                "Mobile & UX" :{
                    "Score" :55,
                    "Recommendations" : [
                        "No twitter presence",
                        "Average response time in social media is more than 6 days"
                    ],
                    "ValueMetric" : [
                        {
                            "name" : "Monthly pageviews",
                            "value" : 76432,
                            "benchmarkvalue" : 200000,
                            "rank" : "high"
                        },
                        {
                            "name" : "Page Rank",
                            "value" : 3,
                            "Country Ranking" : 97,
                            "rank" : "high"
                        }
                    ],
                    "BooleanMetric" : [
                        {
                            "name" : "Google Analytics Integration",
                            "value" : "true"
                        },
                        {
                            "name" : "Event Tracking Integration",
                            "value" : "false"
                        }
                    ],
                    "RatingMetric" : [
                        {
                            "name" : "Analytics Rating",
                            "value" : 3
                        }
                    ]
                },
                "SEO & ads" :{
                    "Score" :80,
                    "Recommendations" : [
                        "No twitter presence",
                        "Average response time in social media is more than 6 days"
                    ],
                    "ValueMetric" : [
                        {
                            "name" : "Monthly pageviews",
                            "value" : 76432,
                            "benchmarkvalue" : 200000,
                            "rank" : "high"
                        },
                        {
                            "name" : "Page Rank",
                            "value" : 3,
                            "Country Ranking" : 97,
                            "rank" : "high"
                        }
                    ],
                    "BooleanMetric" : [
                        {
                            "name" : "Google Analytics Integration",
                            "value" : "true"
                        },
                        {
                            "name" : "Event Tracking Integration",
                            "value" : "false"
                        }
                    ],
                    "RatingMetric" : [
                        {
                            "name" : "Analytics Rating",
                            "value" : 3
                        }
                    ]
                },
                "CMS" :{
                    "Score" :73,
                    "Recommendations" : [
                        "No twitter presence",
                        "Average response time in social media is more than 6 days"
                    ],
                    "ValueMetric" : [
                        {
                            "name" : "Monthly pageviews",
                            "value" : 76432,
                            "benchmarkvalue" : 200000,
                            "rank" : "high"
                        },
                        {
                            "name" : "Page Rank",
                            "value" : 3,
                            "Country Ranking" : 97,
                            "rank" : "high"
                        }
                    ],
                    "BooleanMetric" : [
                        {
                            "name" : "Google Analytics Integration",
                            "value" : "true"
                        },
                        {
                            "name" : "Event Tracking Integration",
                            "value" : "false"
                        }
                    ],
                    "RatingMetric" : [
                        {
                            "name" : "Analytics Rating",
                            "value" : 3
                        }
                    ]
                }
            }
        }
    };
*/
    $location.hash('stats-area');
    $scope.market = $stateParams.market;
    $scope.company = $stateParams.company;
    $anchorScroll();

        $scope.prepareConfig = function(metric1, metric2){
            var config1 = new ChartConfig.getGaugeConfig();
            var config2 = new ChartConfig.getGaugeConfig();
            config1.series[0] = {
                name : metric1.name,
                data : [metric1.value]
            };
            config2.series[0] = {
                name : metric2.name,
                data : [metric2.value]
            };

            config1.yAxis = {
                max : metric1.benchmarkvalue,
                title : {
                    text: metric1.name
                }
            };
            config2.yAxis = {
                max : metric2.benchmarkvalue,
                title : {
                    text: metric2.name
                }
            };
            $scope.config1 = new ChartConfig.testGauge();
            $scope.config2 = new ChartConfig.testGauge();
          /*  $scope.config1 = config1;
            $scope.config2 = config2;*/
        };

    $scope.easypieoptions = {
        animate:{
            duration:2000,
            enabled:true
        },
        barColor:'#fff600',
        scaleColor:false,
        border: 0,
        lineWidth:3,
        lineCap:'circle'
    };

});
