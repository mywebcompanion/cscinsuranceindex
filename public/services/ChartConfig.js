/**
 * Created by ARUN on 15/12/2015.
 */

InsuranceIndex.factory('CharConfig', function() {

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
                title:
                {
                    text: 'CSC Insurance Index'
                },
                stackLabels: {
                    enabled: true,
                        style:
                    {
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
                }
            },

            chart: {
                type: 'column',
                backgroundColor: '#fff',
                className: 'cscindexchart',
                height: 530,
                borderColor: "#ffffff"
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

            loading: false
        };
    };

    return {
        getDefaultConfig : getDefaultConfig
    };

});