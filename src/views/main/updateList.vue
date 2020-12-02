<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="订单号">
        <el-input v-model="formInline.orderNo" placeholder="订单号"></el-input>
      </el-form-item>
      <el-form-item label="收货人">
        <el-input v-model="formInline.user" placeholder="收货人"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="formInline.phone" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item label="订单状态">
        <el-select v-model="formInline.region" placeholder="订单状态">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
          <el-option label="全部" value="全部"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <!-- 选择时间 -->
    <div class="block">
      <span class="demonstration" style="padding-right:10px;font-size:14px;color:#606266;">选择时间</span>
      <el-date-picker
        v-model="value1"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
      <el-button
        type="primary"
        icon="el-icon-search"
        style="margin-left:10px;"
        @click="clickSearch"
      >搜索</el-button>
    </div>

    <!-- echarts -->
    <div style="width:1000px;height:500px;margin-top:10px;" id="fitstEcharts"></div>
  </div>
</template>

<script>
import { getChinaTime } from "@/utlis/utlis.js";
import echarts from "echarts";
export default {
  data() {
    return {
      formInline: {}, //客户信息
      sizeForm: {}, //选择时间
      value1: []
    };
  },
  methods: {
    clickSearch() {
      let params = {};
      if (this.value1) {
        if (this.value1.length > 0) {
          let timeArr = [
            getChinaTime(this.value1[0]),
            getChinaTime(this.value1[1])
          ];
          params.date = JSON.stringify(timeArr);
        }
      }
      //表单的额外搜索
      let { orderNo, user, phone, region } = this.formInline;

      if (orderNo) params.orderNo = orderNo;
      if (user) params.user = user;
      if (phone) params.phone = phone;
      if (region && region != "全部") params.region = region;

      //没有输入的数据就不要，输入的才要
      console.log(params);
    }
  },
  mounted() {
    //初始化echarts
    var myEcharts = echarts.init(document.getElementById("fitstEcharts"));
    //创建配置对象
    let option = {
      title: {
        text: "数据统计"
      },
      tooltip: {
        trigger: "axis"
      },
      legend: {
        data: ["金额","销量"]
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: ["1月1日", "2月1日", "3月1日", "4月1日", "5月1日", "6月1日", "7月1日"]
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          name: "金额",
          type: "line",
          stack: "总量",
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: "销量",
          type: "line",
          stack: "总量",
          data: [220, 182, 191, 234, 290, 330, 310]
        },
      ]
    };
    // //将echarts实例对象与配置对象相连接
    myEcharts.setOption(option);

    /* 
      echarts使用步骤
      1、下载引入
        npm i echarts -D
        import echarts from "echarts"
      2、初始化echarts， 创建echarts容器
        let myEcharts =   echart.init(dom)
      3、发送请求获取配置数据
        创建配置对象
        let option = {}
      4、将echarts实例对象和配置对象联动
        myEcharts.setOption(option)


      封装api
      export var login = (params)=>axios.post("url",params)
      import login from "api.js"
      login(acc,pwd).then((res)=>{})
      export var login = (params)=>axios.get(url,{params})

    */

  }
};
</script>

<style lang="less" scoped>
.el-button {
  padding: 12px 40px;
}
</style>