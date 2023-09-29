import * as echarts from "echarts";
import moment from "moment";
import request from "@/api/request";

export default {
    namespaced: true,
    state: {
        datas: [

        ],
        // charts: [
        //     {
        //         title: 'numberOne',
        //         unit: 'Kbps',
        //         names: ['出口', '入口'],
        //         lineX: ['2018-11-11 17:01', '2018-11-11 17:02', '2018-11-11 17:03', '2018-11-11 17:04', '2018-11-11 17:05', '2018-11-11 17:06', '2018-11-11 17:07', '2018-11-11 17:08', '2018-11-11 17:09', '2018-11-11 17:10', '2018-11-11 17:11', '2018-11-11 17:12', '2018-11-11 17:13', '2018-11-11 17:14', '2018-11-11 17:15', '2018-11-11 17:16', '2018-11-11 17:17', '2018-11-11 17:18', '2018-11-11 17:19', '2018-11-11 17:20'],
        //         value: [
        //             [451, 240, 303, 534, 95, 236, 217, 328, 159, 151, 231, 192, 453, 524, 165, 236, 527, 328, 129, 530],
        //             [360, 545, 80, 192, 330, 580, 192, 80, 250, 453, 352, 28, 625, 345, 65, 325, 468, 108, 253, 98]
        //         ]
        //     },
        // ],
        charts: [
            {
                title: '湿度',
                names: ['湿度'],
                lineX: [],
                value: [
                    [],
                ]
            },
            {
                title: 'pm2.5',
                names: ['pm2.5'],
                lineX: [],
                value: [
                    [],
                ]
            },
            {
                title: '总固体含量',
                names: ['总固体含量'],
                lineX: [],
                value: [
                    [],
                ]
            },
            {
                title: '温度',
                names: ['温度'],
                lineX: [],
                value: [
                    [],
                ]
            },
            {
                title: '浊度',
                names: ['浊度'],
                lineX: [],
                value: [
                    [],
                ]
            },
            {
                title: '二氧化碳',
                names: ['二氧化碳'],
                lineX: [],
                value: [
                    [451, 240, 303, 534, 95],
                ]
            },
        ],
        // charts: [{
        //     title: 'CO2',
        //     unit: 'Kbps',
        //     names: ['CO2'],
        //     lineX: ['2018-11-11 17:01', '2018-11-11 17:02', '2018-11-11 17:03', '2018-11-11 17:04', '2018-11-11 17:05', '2018-11-11 17:06', '2018-11-11 17:07', '2018-11-11 17:08', '2018-11-11 17:09', '2018-11-11 17:10', '2018-11-11 17:11', '2018-11-11 17:12', '2018-11-11 17:13', '2018-11-11 17:14', '2018-11-11 17:15', '2018-11-11 17:16', '2018-11-11 17:17', '2018-11-11 17:18', '2018-11-11 17:19', '2018-11-11 17:20'],
        //     value: [
        //         [451, 240, 303, 534, 95, 236, 217, 328, 159, 151, 231, 192, 453, 524, 165, 236, 527, 328, 129, 530],
        //         [360, 545, 80, 192, 330, 580, 192, 80, 250, 453, 352, 28, 625, 345, 65, 325, 468, 108, 253, 98]
        //     ]
        // },
        // {
        //     title: 'pm2.5',
        //     unit: 'Kbps',
        //     names: ['pm2.5'],
        //     lineX: ['2018-11-11 17:01', '2018-11-11 17:02', '2018-11-11 17:03', '2018-11-11 17:04', '2018-11-11 17:05', '2018-11-11 17:06', '2018-11-11 17:07', '2018-11-11 17:08', '2018-11-11 17:09', '2018-11-11 17:10', '2018-11-11 17:11', '2018-11-11 17:12', '2018-11-11 17:13', '2018-11-11 17:14', '2018-11-11 17:15', '2018-11-11 17:16', '2018-11-11 17:17', '2018-11-11 17:18', '2018-11-11 17:19', '2018-11-11 17:20'],
        //     value: [
        //         [451, 352, 303, 534, 195, 236, 217, 328, 159, 151, 231, 192, 453, 524, 165, 236, 527, 328, 129, 530],
        //     ]
        // },
        // {
        //     title: '湿度',
        //     unit: 'Kbps',
        //     names: ['湿度'],
        //     lineX: ['2018-11-11 17:01', '2018-11-11 17:02', '2018-11-11 17:03', '2018-11-11 17:04', '2018-11-11 17:05', '2018-11-11 17:06', '2018-11-11 17:07', '2018-11-11 17:08', '2018-11-11 17:09', '2018-11-11 17:10', '2018-11-11 17:11', '2018-11-11 17:12', '2018-11-11 17:13', '2018-11-11 17:14', '2018-11-11 17:15', '2018-11-11 17:16', '2018-11-11 17:17', '2018-11-11 17:18', '2018-11-11 17:19', '2018-11-11 17:20'],
        //     value: [
        //         [451, 352, 303, 534, 95, 236, 217, 328, 159, 151, 231, 192, 453, 524, 165, 236, 527, 328, 129, 530],
        //     ]
        // },
        // {
        //     title: '总固体含量',
        //     unit: 'Kbps',
        //     names: ['出口'],
        //     lineX: ['2018-11-11 17:01', '2018-11-11 17:02', '2018-11-11 17:03', '2018-11-11 17:04', '2018-11-11 17:05', '2018-11-11 17:06', '2018-11-11 17:07', '2018-11-11 17:08', '2018-11-11 17:09', '2018-11-11 17:10', '2018-11-11 17:11', '2018-11-11 17:12', '2018-11-11 17:13', '2018-11-11 17:14', '2018-11-11 17:15', '2018-11-11 17:16', '2018-11-11 17:17', '2018-11-11 17:18', '2018-11-11 17:19', '2018-11-11 17:20'],
        //     value: [
        //         [451, 352, 303, 534, 95, 236, 217, 328, 159, 151, 231, 192, 453, 524, 165, 236, 527, 328, 129, 530],
        //     ]
        // },
        // {
        //     title: '温度',
        //     unit: 'Kbps',
        //     names: ['温度'],
        //     lineX: ['2018-11-11 17:01', '2018-11-11 17:02', '2018-11-11 17:03', '2018-11-11 17:04', '2018-11-11 17:05', '2018-11-11 17:06', '2018-11-11 17:07', '2018-11-11 17:08', '2018-11-11 17:09', '2018-11-11 17:10', '2018-11-11 17:11', '2018-11-11 17:12', '2018-11-11 17:13', '2018-11-11 17:14', '2018-11-11 17:15', '2018-11-11 17:16', '2018-11-11 17:17', '2018-11-11 17:18', '2018-11-11 17:19', '2018-11-11 17:20'],
        //     value: [
        //         [451, 352, 303, 534, 95, 236, 217, 328, 159, 151, 231, 192, 453, 524, 165, 236, 527, 328, 129, 530],
        //     ]
        // },
        // {
        //     title: '浊度',
        //     unit: 'Kbps',
        //     names: ['浊度'],
        //     lineX: ['2018-11-11 17:01', '2018-11-11 17:02', '2018-11-11 17:03', '2018-11-11 17:04', '2018-11-11 17:05', '2018-11-11 17:06', '2018-11-11 17:07', '2018-11-11 17:08', '2018-11-11 17:09', '2018-11-11 17:10', '2018-11-11 17:11', '2018-11-11 17:12', '2018-11-11 17:13', '2018-11-11 17:14', '2018-11-11 17:15', '2018-11-11 17:16', '2018-11-11 17:17', '2018-11-11 17:18', '2018-11-11 17:19', '2018-11-11 17:20'],
        //     value: [
        //         [451, 352, 303, 534, 95, 236, 217, 328, 159, 151, 231, 192, 453, 524, 165, 236, 527, 328, 129, 530],
        //     ]
        // },
        // ],
        color: ['rgb(0, 201, 157', 'rgb(255, 242, 0', 'rgb(255, 77, 77']
    },
    actions: {
        async getDatas(state, datas) {
            console.log(datas.that);
            const that = datas.that
            await request({
                method: 'get',
                url: datas.url
            }).then(({ data }) => {
                if (data.code !== "00000") {
                    that.$notify({
                        title: "错误",
                        message: data.message + "\n" + "将于2秒后回到登录页面",
                        type: "error",
                        duration: 2000,
                        onClose: () => {
                            localStorage.clear("token");
                            that.$router.replace("/");
                        },
                    });
                    return;
                }
                const res = data.data.data
                state.commit('setCharts', res)
            }, (err) => {
                that.status = false;
                that.$notify({
                    title: "请求失败",
                    type: "error",
                    message: err.message + " 请稍后刷新重试",
                });
            })
        }
    },
    mutations: {
        setCharts(state, res) {
            console.log('@mutation', res);
            state.datas = res
            state.charts.map(item => {
                item.lineX = []
                if (item.title === '二氧化碳') return
                item.value[0] = []
            })
            state.datas.map(item => {
                const time = moment(item.time).format("YYYY-MM-DD hh:mm:ss")
                state.charts[0].lineX.push(time)
                state.charts[0].value[0].push(item.humidity)
                state.charts[1].lineX.push(time)
                state.charts[1].value[0].push(item.pm)
                state.charts[2].lineX.push(time)
                state.charts[2].value[0].push(item.tds)
                state.charts[3].lineX.push(time)
                state.charts[3].value[0].push(item.temperature)
                state.charts[4].lineX.push(time)
                state.charts[4].value[0].push(item.turbidity)
                state.charts[5].lineX.push(time)
            })
        },

    },
    getters: {
        datas(state) {
            let arr = state.charts.map(item => {
                let lineY = []
                let color = state.color;
                for (let i = 0; i < item.names.length; i++) {
                    let x = i
                    if (x > color.length - 1) {
                        x = color.length - 1
                    }
                    let data = {
                        name: item.names[i],
                        type: 'line',
                        color: color[x] + ')',
                        // smooth: true,
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: color[x] + ', 0.3)'
                                }, {
                                    offset: 0.8,
                                    color: color[x] + ', 0)'
                                }], false),
                                shadowColor: 'rgba(0, 0, 0, 0.1)',
                                shadowBlur: 10
                            }
                        },
                        symbol: 'circle',
                        symbolSize: 5,
                        data: item.value[i],
                        // markPoint: {
                        //     data: [{ type: 'max', name: 'Max' }, { type: 'min', name: 'Min' }]
                        // }
                    }
                    lineY.push(data)
                }

                return {
                    title: {
                        text: item.title,
                        textStyle: {
                            color: '#fff'
                        },
                        show: false
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: item.names,
                        textStyle: {
                            fontSize: 12,
                            color: 'rgb(0,253,255,0.6)'
                        },
                        // right: '4%'
                        top: '9.5%'
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {},
                            dataZoom: {
                                yAxisIndex: 'none'
                            },
                        },
                        right: '2%',
                        iconStyle: {

                        }
                    },
                    dataZoom: [
                        {
                            type: 'inside',
                            throttle: 20
                        }
                    ],
                    grid: {
                        left: '5%',
                        right: '5%',
                        bottom: '1%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: item.lineX,
                        axisLabel: {
                            textStyle: {
                                color: 'rgb(0,253,255,0.6)'
                            },
                            // formatter: function (params) {
                            //     return params.split(' ')[0] + '\n' + params.split(' ')[1]
                            // }
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: 'rgb(0,253,255,0.6)',
                                width: 2
                            }
                        }
                    },
                    yAxis: {
                        name: item.unit,
                        type: 'value',
                        axisLabel: {
                            formatter: '{value}',
                            textStyle: {
                                color: 'rgb(0,253,255,0.6)'
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: 'rgb(23,255,243,0.3)'
                            }
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: 'rgb(0,253,255,0.6)',
                                width: 2
                            }
                        }
                    },
                    series: lineY
                }
            })
            return arr;
        }
    }
}