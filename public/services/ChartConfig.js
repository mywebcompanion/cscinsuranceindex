/**
 * Created by ARUN on 15/12/2015.
 */

InsuranceIndex.factory('ChartConfig', function() {

    var getDefaultConfig = function () {
        return {
            xAxis: {
                type: 'category',
                labels: {
                    rotation: -45,
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            },
            yAxis: {

                min: 0,
                title: {
                    text: 'CSC Insurance Index'
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                    }
                }
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true,
                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                        style: {
                            textShadow: '0 0 3px black, 0 0 3px black'
                        }
                    }
                },
                series: {
                    animation: {
                        //duration: 1500
                    }
                }
            },

            chart: {
                type: 'column',
                backgroundColor: '#fff',
                className: 'cscindexchart',
                height: 530,
                borderColor: "#ffffff",
                events: {
                    load: function () {
                        this.options.yAxis[0].update({
                            stackLabels: {
                                enabled: true
                            }
                        });
                    }
                }
            },

            series: [
                {
                    name: "CSC Insurance Index",
                    dataLabels: {
                        enabled: true,
                        rotation: -90,
                        color: '#FFFFFF',
                        align: 'right',
                        format: '{point.y:.1f}', // one decimal
                        y: 10, // 10 pixels down from the top
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    },
                    color: '#EF2525'

                }
            ],

            title: {
                text: 'CSC Insurance Index'
            },

            loading: false,
            hideDuration: 1200,
            showDuration: 1200
        };
    };
    var getGaugeConfig = function() {

        return {

            chart: {
                type: 'solidgauge',
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
            },

            title: null,

            pane: {
                center: ['50%', '85%'],
                size: '140%',
                startAngle: -90,
                endAngle: 90,
                background: {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)' || (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
                    innerRadius: '60%',
                    outerRadius: '100%',
                    shape: 'arc'
                }
            },

            tooltip: {
                enabled: false
            },

            // the value axis
            yAxis: {
                stops: [
                    [0.1, '#55BF3B'], // green
                ],
                lineWidth: 0,
                minorTickInterval: null,
                tickPixelInterval: 400,
                tickWidth: 0,
                title: {
                    y: -70
                },
                labels: {
                    y: 16
                },
                min: 0
            },

            plotOptions: {
                solidgauge: {
                    dataLabels: {
                        y: 5,
                        borderWidth: 0,
                        useHTML: true
                    }
                }
            },
            series: [{

                dataLabels: {
                    format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                    ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
                    '<span style="font-size:12px;color:silver"></span></div>'
                }
            }],
            credits: {
                enabled: false
            }
        }};

        var testGauge = function(){

            return   {
                options: {
                    chart: {
                        type: 'solidgauge',
                        backgroundColor: null,
                        margin : [0,0,0,0]
                    },
                    pane: {
                        center: ['50%', '85%'],
                        size: '140%',
                        startAngle: -90,
                        endAngle: 90,
                        background: {
                            backgroundColor:'#EEE',
                            innerRadius: '60%',
                            outerRadius: '100%',
                            shape: 'arc'
                        }
                    },
                    solidgauge: {
                        dataLabels: {
                            y: -30,
                            borderWidth: 0,
                            borderColor:'#f00',
                            useHTML: true
                        }
                    }
                },
                series: [{
                    data: [16],
                    dataLabels: {
                        borderColor : '#f00',
                        format: '<div style="text-align:center"><span style="font-size:15px;color:#fff;border:0px">{y}</span><br/>'
                    }
                }],
                title: {
                    y: 50,
                    text: " "
                },
                yAxis: {
                    currentMin: 0,
                    currentMax: 20,
                    title: {
                        y: 140
                    },
                    stops: [
                        [0.1, '#DF5353'], // red
                        [0.5, '#DDDF0D'], // yellow
                        [0.9, '#55BF3B'] // green
                    ],
                    lineWidth: 0,
                    tickInterval: 20,
                    tickPixelInterval: 400,
                    tickWidth: 0,
                    labels: {
                        y: 15
                    }
                },
                loading: false
            };

        };


        return {
            getDefaultConfig: getDefaultConfig,
            getGaugeConfig : getGaugeConfig,
            testGauge : testGauge
        };

});