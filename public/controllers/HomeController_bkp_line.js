/**
 * Created by ARUN on 10/12/2015.
 */
/**
 * Created by ARUN on 9/12/2015.
 */

InsuranceIndex.controller('HomeController', function($scope){
    console.log("Entering Home Controller");


    $scope.chartConfig = {
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
            }
        },
        options: {
            chart: {
                type: 'column',
                backgroundColor: '#fff',
                className : 'cscindexchart',
                height:530,
                width:900
            }
        },
        series: [{
            name : "CSC Insurance Index",
            data: [['AIA',8], ['NTUS',7.7], ['AXA',9.6], ['Aviva',8.7],['Great Eastern',4.2], ['Tokio Marine',6.8], ['Swiss Life',9.1], ['Allizanz',5.5]],
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

        },{
            name : "Social Media",
            data : [9, 5.2, 9.2, 8.4,3.2, 7.8, 9.8, 5.4],
            color : "#000",
            type: 'line'
        },
            {
                name : "Support",
                data : [7, 6.2, 4.2, 6.4,8.2, 6.8, 7.8, 4.4],
                color : "#00F",
                type: 'line'
            },
            {
                name : "Marketing",
                data : [8.2, 3.2, 4.2, 4.4,5.2, 7.6, 9.8, 5.4],
                color : "#0F0",
                type: 'line'
            },
            {
                name : "Analytics",
                data : [8.8, 5.7, 8.1, 8.4,3.2, 3.8, 5.8, 3.4],
                color : "#BBB",
                type: 'line'
            },
            {
                name : "Mobility",
                data : [5.2, 5.9, 7.7, 8.4,3.9, 4.8, 3.8, 6.4],
                color : "#B49",
                type: 'line'
            }
        ],

        title: {
            text: 'CSC Insurance Index'
        },

        loading: false
    }
});