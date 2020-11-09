<template>
  <div>
	  <div class="tophader" @click="$router.back()">
	    <van-icon name="arrow-left" />
	    <p >BTCUSDT永续</p>
	  </div>
	  <div class="titme">
		  <div class="left">
			  <div class="top">₮12891.8</div>
			  <div class="buttom">
			  			  <div>+7.46%</div>
			  	<p>+894.9</p>		  
			  </div>
		  </div>
		  <div class="right">
			  <div class="one">
				  <p>标记价格</p>
				  <p>24h最高</p>
				  <p>24h最低</p>
				  <p>24h量</p>
			  </div>
			  <div class="two">
				  <p>12891.7</p>
				  <p>13891.7</p>
				  <p>11891.7</p>
				  <p>7629.894</p>
			  </div>
			</div>
	  </div>
	  <div class="body">
		  <div :class="{'active':isshow =='1分钟'}" @click="isshow = '1分钟'">1分钟</div>
		  <div :class="{'active':isshow =='15分钟'}" @click="isshow = '15分钟'">15分钟</div>
		  <div :class="{'active':isshow =='1小时'}" @click="isshow = '1小时'">1小时</div>
		  <div :class="{'active':isshow =='4小时'}" @click="isshow = '4小时'">4小时</div>
		  <div :class="{'active':isshow =='一天'}" @click="isshow = '一天'">一天</div>
	  </div>
    <!-- <h1>Echarts绘制k线图</h1> -->
	<div class="body-1">
		<span style="color: #adadad;">MA5: 12878.8</span>
		<span style="color: #d6a036;">MA10: 12878.8</span>
		<span style="color: rgb(145,88,158);">MA20: 12878.8</span>
		<span style="color: rgb(105,120,164);">MA60: 12878.8</span>
	</div>
    <div id="echartContainer" ref="echartContainer" style="width:100%; height:440px"></div>
	<div class="button">
		<button class="but-1" @click="$router.push('jyyym')">买入开多</button>
		<button class="but-2" @click="$router.push('jyyym')">卖出开多</button>
	</div>
	
  </div>
</template>

<script>
var echarts = require("echarts");
export default {
  data() {
    return {
		isshow:'1分钟',
      //数据模型 time0 open1 close2 min3 max4 vol5 tag6 macd7 dif8 dea9
      //['2019-10-18',18.56,18.25,18.19,18.56,55.00,0,-0.00,0.08,0.09]
      data: [
        ["2019-3-16", 18.4, 18.58, 18.33, 18.79, 67.0, 1, 0.04, 0.11, 0.09],
        ["2019-3-19", 18.56, 18.25, 18.19, 18.56, 55.0, 0, -0.0, 0.08, 0.09],
        ["2019-3-20", 18.3, 18.22, 18.05, 18.41, 37.0, 0, 0.01, 0.09, 0.09],
        ["2019-3-21", 18.18, 18.69, 18.02, 18.98, 89.0, 0, 0.03, 0.1, 0.08],
        ["2019-3-22", 18.42, 18.29, 18.22, 18.48, 43.0, 0, -0.06, 0.05, 0.08],
        ["2019-3-23", 18.26, 18.19, 18.08, 18.36, 46.0, 0, -0.1, 0.03, 0.09],
        ["2019-3-26", 18.33, 18.07, 17.98, 18.35, 65.0, 0, -0.15, 0.03, 0.1],
        ["2019-3-27", 18.08, 18.04, 17.88, 18.13, 37.0, 0, -0.19, 0.03, 0.12],
        ["2019-3-28", 17.96, 17.86, 17.82, 17.99, 35.0, 0, -0.24, 0.03, 0.15],
        ["2019-3-29", 17.85, 17.81, 17.8, 17.93, 27.0, 0, -0.24, 0.06, 0.18],
        ["2019-3-30", 17.79, 17.93, 17.78, 18.08, 43.0, 0, -0.22, 0.11, 0.22],
        ["2019-4-02", 17.78, 17.83, 17.78, 18.04, 27.0, 0, -0.2, 0.15, 0.25],
        ["2019-4-03", 17.84, 17.9, 17.84, 18.06, 34.0, 0, -0.12, 0.22, 0.28],
        ["2019-4-04", 17.97, 18.36, 17.85, 18.39, 62.0, 0, -0.0, 0.3, 0.3],
        ["2019-4-05", 18.3, 18.57, 18.18, 19.08, 177.0, 0, 0.07, 0.33, 0.3],
        ["2019-4-06", 18.53, 18.68, 18.3, 18.71, 95.0, 0, 0.12, 0.35, 0.29],
        ["2019-4-09", 18.75, 19.08, 18.75, 19.98, 202.0, 1, 0.16, 0.35, 0.27],
        ["2019-4-10", 18.85, 18.64, 18.56, 18.99, 85.0, 0, 0.09, 0.29, 0.25],
        ["2019-4-11", 18.64, 18.44, 18.31, 18.64, 50.0, 0, 0.06, 0.27, 0.23],
        ["2019-4-12", 18.55, 18.27, 18.17, 18.57, 43.0, 0, 0.05, 0.25, 0.23],
        ["2019-4-13", 18.13, 18.14, 18.09, 18.34, 35.0, 0, 0.05, 0.24, 0.22],
        ["2019-4-16", 18.01, 18.1, 17.93, 18.17, 34.0, 0, 0.07, 0.25, 0.21],
        ["2019-4-17", 18.2, 18.14, 18.08, 18.45, 58.0, 0, 0.11, 0.25, 0.2],
        ["2019-4-18", 18.23, 18.16, 18.0, 18.45, 47.0, 0, 0.13, 0.25, 0.19],
        ["2019-4-19", 18.08, 18.2, 18.05, 18.25, 32.0, 0, 0.15, 0.24, 0.17],
        ["2019-4-20", 18.15, 18.15, 18.11, 18.29, 36.0, 0, 0.13, 0.21, 0.15],
        ["2019-4-23", 18.16, 18.19, 18.12, 18.34, 47.0, 0, 0.11, 0.18, 0.13],
        ["2019-4-24", 18.23, 17.88, 17.7, 18.23, 62.0, 0, 0.03, 0.13, 0.11],
        ["2019-4-25", 17.85, 17.73, 17.56, 17.85, 66.0, 0, -0.03, 0.09, 0.11],
        ["2019-4-26", 17.79, 17.53, 17.5, 17.92, 63.0, 0, -0.1, 0.06, 0.11],
        ["2019-4-27", 17.51, 17.04, 16.9, 17.51, 67.0, 0, -0.16, 0.05, 0.13],
        ["2019-4-30", 17.07, 17.2, 16.98, 17.32, 55.0, 0, -0.12, 0.09, 0.15],
        ["2019-5-01", 17.28, 17.11, 16.91, 17.28, 39.0, 0, -0.09, 0.12, 0.16],
        ["2019-5-02", 17.13, 17.91, 17.05, 17.99, 102.0, 0, -0.01, 0.17, 0.18],
        ["2019-5-03", 17.8, 17.78, 17.61, 17.98, 71.0, 0, -0.09, 0.14, 0.18],
        ["2019-5-04", 17.6, 17.25, 17.13, 17.69, 51.0, 0, -0.18, 0.1, 0.19],
        ["2019-5-07", 17.2, 17.39, 17.15, 17.45, 43.0, 0, -0.19, 0.12, 0.22],
        ["2019-5-08", 17.3, 17.42, 17.18, 17.62, 45.0, 0, -0.23, 0.13, 0.24],
        ["2019-5-09", 17.33, 17.39, 17.32, 17.59, 44.0, 0, -0.29, 0.13, 0.28],
        ["2019-5-10", 17.39, 17.26, 17.21, 17.65, 44.0, 0, -0.37, 0.13, 0.32],
        ["2019-5-11", 17.23, 16.92, 16.66, 17.26, 114.0, 1, -0.44, 0.15, 0.37],
        ["2019-5-14", 16.75, 17.06, 16.5, 17.09, 94.0, 0, -0.44, 0.21, 0.44],
        ["2019-5-15", 17.03, 17.03, 16.9, 17.06, 46.0, 0, -0.44, 0.28, 0.5],
        ["2019-5-16", 17.08, 16.96, 16.87, 17.09, 30.0, 0, -0.4, 0.36, 0.56],
        ["2019-5-17", 17.0, 17.1, 16.95, 17.12, 50.0, 0, -0.3, 0.47, 0.62],
        ["2019-5-18", 17.09, 17.52, 17.04, 18.06, 156.0, 0, -0.14, 0.59, 0.66],
        ["2019-5-21", 17.43, 18.23, 17.35, 18.45, 152.0, 1, 0.02, 0.69, 0.68],
        ["2019-5-22", 18.14, 18.27, 18.06, 18.32, 94.0, 0, 0.08, 0.72, 0.68],
        ["2019-5-23", 18.28, 18.19, 18.17, 18.71, 108.0, 0, 0.13, 0.73, 0.67],
        ["2019-5-24", 18.18, 18.14, 18.01, 18.31, 37.0, 0, 0.19, 0.74, 0.65],
        ["2019-5-25", 18.22, 18.33, 18.2, 18.36, 48.0, 0, 0.26, 0.75, 0.62],
        ["2019-5-28", 18.35, 17.84, 17.8, 18.39, 48.0, 0, 0.27, 0.72, 0.59],
        ["2019-5-29", 17.83, 17.94, 17.71, 17.97, 36.0, 0, 0.36, 0.73, 0.55],
        ["2019-5-30", 17.9, 18.26, 17.55, 18.3, 71.0, 1, 0.43, 0.71, 0.5],
        ["2019-5-31", 18.12, 17.99, 17.91, 18.33, 72.0, 0, 0.4, 0.63, 0.43],
        ["2019-6-04", 17.91, 17.28, 17.16, 17.95, 37.0, 1, 0.34, 0.55, 0.38],
        ["2019-6-05", 17.17, 17.23, 17.0, 17.55, 51.0, 0, 0.37, 0.51, 0.33],
        ["2019-6-06", 17.2, 17.31, 17.06, 17.33, 31.0, 0, 0.37, 0.46, 0.28],
        ["2019-6-07", 17.15, 16.67, 16.51, 17.15, 19.0, 0, 0.3, 0.37, 0.22],
        ["2019-6-08", 16.8, 16.81, 16.61, 17.06, 60.0, 0, 0.29, 0.32, 0.18],
        ["2019-6-11", 16.68, 16.04, 16.0, 16.68, 65.0, 0, 0.2, 0.24, 0.14],
        ["2019-6-12", 16.03, 15.98, 15.88, 16.25, 46.0, 0, 0.2, 0.21, 0.11],
        ["2019-6-13", 16.21, 15.87, 15.78, 16.21, 57.0, 0, 0.2, 0.18, 0.08],
        ["2019-6-14", 15.55, 15.89, 15.52, 15.96, 42.0, 0, 0.2, 0.16, 0.05],
        ["2019-6-15", 15.87, 15.48, 15.45, 15.92, 34.0, 1, 0.17, 0.11, 0.02],
        ["2019-6-18", 15.39, 15.42, 15.36, 15.7, 26.0, 0, 0.21, 0.1, -0.0],
        ["2019-6-19", 15.58, 15.71, 15.35, 15.77, 38.0, 0, 0.25, 0.09, -0.03],
        ["2019-6-20", 15.56, 15.52, 15.24, 15.68, 38.0, 0, 0.23, 0.05, -0.07],
        ["2019-6-21", 15.41, 15.3, 15.28, 15.68, 35.0, 0, 0.21, 0.0, -0.1],
        ["2019-6-22", 15.48, 15.28, 15.13, 15.49, 30.0, 0, 0.21, -0.02, -0.13],
        ["2019-6-25", 15.29, 15.48, 15.2, 15.49, 21.0, 0, 0.2, -0.06, -0.16],
        ["2019-6-26", 15.33, 14.86, 14.78, 15.39, 30.0, 0, 0.12, -0.13, -0.19],
        ["2019-6-27", 14.96, 15.0, 14.84, 15.22, 51.0, 0, 0.13, -0.14, -0.2],
        ["2019-6-28", 14.96, 14.72, 14.62, 15.06, 25.0, 0, 0.1, -0.17, -0.22],
        ["2019-6-29", 14.75, 14.99, 14.62, 15.08, 36.0, 0, 0.13, -0.17, -0.24],
        ["2019-7-01", 14.98, 14.72, 14.48, 15.18, 27.0, 0, 0.1, -0.21, -0.26],
        ["2019-7-02", 14.65, 14.85, 14.65, 14.95, 18.0, 0, 0.11, -0.21, -0.27],
        ["2019-7-03", 14.72, 14.67, 14.55, 14.8, 23.0, 0, 0.1, -0.24, -0.29],
        ["2019-7-04", 14.79, 14.88, 14.69, 14.93, 22.0, 0, 0.13, -0.24, -0.3],
        ["2019-7-05", 14.9, 14.86, 14.78, 14.93, 16.0, 0, 0.12, -0.26, -0.32],
        ["2019-7-15", 14.5, 14.66, 14.47, 14.82, 19.0, 0, 0.11, -0.28, -0.34],
        ["2019-7-16", 14.77, 14.94, 14.72, 15.05, 26.0, 0, 0.14, -0.28, -0.35],
        ["2019-7-17", 14.95, 15.03, 14.88, 15.07, 38.0, 0, 0.12, -0.31, -0.37],
        ["2019-7-18", 14.95, 14.9, 14.87, 15.06, 28.0, 0, 0.07, -0.35, -0.39],
        ["2019-7-19", 14.9, 14.75, 14.68, 14.94, 22.0, 0, 0.03, -0.38, -0.4],
        ["2019-7-22", 14.88, 15.01, 14.79, 15.11, 38.0, 1, 0.01, -0.4, -0.4],
        ["2019-7-23", 15.01, 14.83, 14.72, 15.01, 24.0, 0, -0.09, -0.45, -0.4]
      ]
    };
  },
  mounted() {
    // 这里实现的是一个比较简单的，可以按照需求将函数移动到methods函数中
    var data0 = splitData(this.data);
    // macd计算
    function splitData(rawData) {
      var categoryData = [];
      var values = [];
      var macds = [];
      var difs = [];
      var deas = [];
      for (var i = 0; i < rawData.length; i++) {
        categoryData.push(rawData[i].splice(0, 1)[0]);
        values.push(rawData[i]);
        macds.push(rawData[i][6]);
        difs.push(rawData[i][7]);
        deas.push(rawData[i][8]);
      }
      return {
        categoryData: categoryData,
        values: values,
        macds: macds,
        difs: difs,
        deas: deas
      };
    }
    // ma均线函数
    function calculateMA(dayCount) {
      var result = [];
      for (var i = 0, len = data0.values.length; i < len; i++) {
        if (i < dayCount) {
          result.push("-");
          continue;
        }
        var sum = 0;
        for (var j = 0; j < dayCount; j++) {
          sum += data0.values[i - j][1];
        }
        result.push(sum / dayCount);
      }
      return result;
    }
    // k线配置项
    var option = {
      tooltip: {
        trigger: 'axis',           // 触发类型，默认数据触发，见下图，可选为：'item' ¦ 'axis'
      axisPointer:{
		  type : 'cross',
	  },
	  confine:true,
	  textStyle:{
		  fontSize:12
	  },
	  formatter(params) {
	        const item = params[0];
			// console.log(item)
			if(item.seriesType=='candlestick'){
				  return `
						 <p>时间：${item.axisValue}</p>
						  <p>开盘：${item.data[1]}</p>
									<p>最高：${item.data[2]}</p>
									<p>最低：${item.data[3]}</p>
									<p>收盘：${item.data[4]}</p>
									<p>涨幅：${item.data[5]}</p>
									<p>振幅：${item.data[6]}</p>
									<p>成交量：${item.data[7]}</p>
						 `;
			}else{
				return `
				<p>${item.seriesName}：${item.value}</p>
				`
			}
	     
	  }
	  },
      grid: [
        {
          left: "3%",
          top: "0",
          height: "75%"
        },
        {
          left: "3%",
          right: "10%",
          top: "80%",
          height: "10%"
        }
      ],
      xAxis: [
        {
          type: "category",
          data: data0.categoryData,
          scale: true,
          boundaryGap: false,
          axisLine: {
            onZero: false,
            lineStyle: {
              color: "#adadad"
            }
          },
          splitLine: {
            show: false
          },
          splitNumber: 20
        },
        {
          type: "category",
          gridIndex: 1,
          data: data0.categoryData,
          axisLabel: { show: false }
        }
      ],
      yAxis: [
        {
          scale: true,
          splitArea: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "#adadad"
            }
          },
          position: "right"
        },
        {
          gridIndex: 1,
          splitNumber: 3,
          axisLine: { onZero: false },
          axisTick: { show: false },
          splitLine: { show: false },
          axisLabel: { show: true },
          axisLine: {
            lineStyle: {
              color: "#adadad"
            }
          },
          position: "right"
        }
      ],
      dataZoom: [
        {
          type: "inside",
          start: 100,
          end: 80
        },
        // {
        //   show: true,
        //   type: "slider",
        //   y: "90%",
        //   start: 50,
        //   end: 100
        // },
        {
          show: false,
          xAxisIndex: [0, 1],
          type: "slider",
          start: 20,
          end: 100
        },
		
      ],
      series: [
        {
          // name: "555",
          type: "candlestick",
          data: data0.values,
		  itemStyle:{
			   color: '#ff3200',          // 阳线填充颜色
			   color0: '#00aa11',     // 阴线填充颜色
			   lineStyle: {
			          width: 1,
			    color: '#ff3200',   // 阳线边框颜色
			        color0: '#00aa11' ,// 阴线边框颜色
		           },
		  },
          markPoint: {
            data: [
              {
                name: "XX标点"
              }
            ]
          },
          markLine: {
            silent: true,
            data: [
              {
                yAxis: 2222
              }
            ]
          }
        },
        {
          name: "MA5",
          type: "line",
		  color:'#adadad',
          data: calculateMA(5),
          smooth: true,
          lineStyle: {
            normal: {
              opacity: 0.5,
			  width:1.5
            }
          },
		   symbolSize: 0,
        },
        {
          name: "MA10",
          type: "line",
		  color:'rgb(214, 160, 54)',
          data: calculateMA(10),
          smooth: true,
          lineStyle: {
            normal: {
              opacity: 0.5,
			  width:1.5
            }
          },
		  symbolSize: 0,
        },
        {
          name: "MA20",
          type: "line",
		  color:'rgb(145, 88, 158)',
          data: calculateMA(20),
          smooth: true,
          lineStyle: {
            normal: {
              opacity: 0.5,
			  width:1.5
            }
          },
		  symbolSize: 0,
        },
        {
          name: "MA60",
          type: "line",
		  color:'rgb(105, 120, 164)',
          data: calculateMA(30),
          smooth: true,
          lineStyle: {
            normal: {
              opacity: 0.5,
			  width:1.5
            }
          },
		  symbolSize: 0,
        },
        {
          name: "MACD",
          type: "bar",
          xAxisIndex: 1,
          yAxisIndex: 1,
          data: data0.macds,
          itemStyle: {
            normal: {
              color: function(params) {
                var colorList;
                if (params.data >= 0) {
                  colorList = "#ff3200";
                } else {
                  colorList = "#14b143";
                }
                return colorList;
              }
            }
          }
        },
        {
          name: "DIF",
          type: "line",
		  color:'rgb(105, 120, 164)',
          xAxisIndex: 1,
          yAxisIndex: 1,
		  symbolSize: 0,
		  lineStyle: {
		    normal: {
		      opacity: 0.5,
		  			  width:1
		    }
		  },
          data: data0.difs
        },
        {
          name: "DEA",
          type: "line",
		  color:'rgb(0,192,131)',
          xAxisIndex: 1,
          yAxisIndex: 1,
		  symbolSize: 0,
		  lineStyle: {
		    normal: {
		      opacity: 0.5,
		  			  width:1
		    }
		  },
          data: data0.deas
        }
      ]
    };
    // 进行初始化
    var charts = echarts.init(this.$refs.echartContainer);
    charts.setOption(option);
  }
};
</script>

<style scoped lang="less">
	.titme{
		display: flex;
		padding: 0 .28rem;
		.left{
			flex: 1;
			color: rgb(76,180,113);
			.top{
				font-size: 20px;
				line-height: 22px;
				font-weight: 550;
				margin-top: 9px;
			}
			.buttom{
				font-size: 12px;
				line-height: 20px;
				div{
					padding: 1px 1px;
					background-color: rgb(76,180,113);
					margin-right: 5px;
					color: #FFFFFF;
				}
			}
			div{
				display: flex;
			}
		}
		.right{
			display: flex;
			flex: 1;
			font-size: 14px;
			line-height: 18px;
			.one{
				font-size: 13px;
				color: #adadad;
			}
			.two{
				flex: 1;
				text-align: right;
				
			}
		}
	}
	.body{
		display: flex;
		// background-color: #23253a;
		width: 100%;
		padding-left: 15px;
		// margin-bottom: 4px;
		div{
			margin-right: 15px;
			// color: #ffffff;
			color: #adadad;
			line-height: 29px;
			font-size: 14px;
		}
		.active{
			color: #d6a036;
			
		}
	}
	.body-1{
		display: flex;
		width: 100%;
		margin-bottom: 4px;
		font-size: 12px;
		padding-left: 3px;
		span{
			margin-right: 6px;
		}
	}
	.button{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		display: flex;
		color: #FFFFFF;
		line-height: 36px;
		button{
			flex: 1;
		}
		.but-1{
			background-color: rgb(78, 183, 114);
		}
		.but-2{
			background-color:rgb(238,103,97);
			
		}
	}
</style>