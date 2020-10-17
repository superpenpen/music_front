<template>
<PageWrap>


  <div class="dashboard">
    <Card title="总览">
      <div class="item-list">
        <div class="item t0">
          <div class="bg"></div>
          <div class="num">16/32</div>
          <div class="text">已使用/服务器</div>
        </div>
        <div class="item t1">
          <div class="bg"></div>
          <div class="num">37/128</div>
          <div class="text">已使用/GPU数</div>
        </div>
        <div class="item t2">
          <div class="bg"></div>
          <div class="num">42</div>
          <div class="text">用户数</div>
        </div>
        <div class="item t3">
          <div class="bg"></div>
          <div class="num">12</div>
          <div class="text">模型数</div>
        </div>
      </div>
    </Card>
    <Card title="服务器列表">
      <div class="table-list">
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="ip" label="IP" width="180"></el-table-column>
          <el-table-column prop="time" label="运行时间"></el-table-column>
          <el-table-column prop="memory" label="内存"></el-table-column>
          <el-table-column prop="cpus" label="CPU核"></el-table-column>
          <el-table-column prop="irateCpu" label="CPU使用率">
            <template slot-scope="scope">
              <div
                class="tag-radius"
                :class="{
                  error: scope.row.id == 2
                }"
              >{{scope.row.irateCpu}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="irateMemory" label="内存使用率">
            <template slot-scope="scope">
              <div
                class="tag-radius"
                :class="{
                  warning: scope.row.id == 4
                }"
              >{{scope.row.irateMemory}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="fileSystemSize" label="分区使用率">
            <template slot-scope="scope">
              <div class="tag-radius">{{scope.row.fileSystemSize}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="DCGMDevGPUUtil" label="GPU使用率">
            <template slot-scope="scope">
              <div class="tag-radius">{{scope.row.DCGMDevGPUUtil}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="DCGMMemCopyUtil" label="GPU内存使用率">
            <template slot-scope="scope">
              <div class="tag-radius">{{scope.row.DCGMMemCopyUtil}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="DCGMPower" label="GPU功耗"></el-table-column>
          <el-table-column prop="DCGMTemp" label="GPU温度"></el-table-column>
          <el-table-column prop="diskRead" label="磁盘读取"></el-table-column>
          <el-table-column prop="diskWrite" label="磁盘写入"></el-table-column>
          <el-table-column prop="networkReceive" label="下载带宽"></el-table-column>
          <el-table-column prop="networkTransmit" label="上传带宽"></el-table-column>
        </el-table>
      </div>
    </Card>

    <div class="bottom-box">
      <div class="bottom-lt-box">
        <Card title="物理属性">
          <div class="chart-box">
            <div class="chart-box-item">
              <PictorialBar
                title="CPU"
                titleColor="#333"
                sub-title="使用率"
                :number="numirateCpu"
                subTitleColor="rgb(69, 73, 80)"
                :showNumber="false"
                :symbolSize="[4,32]"
                :colors="['#e2fbd8','#e2fbd8','#ffcece']"
                :region="[70,90]"
                :activeColors="['#29b125','#ffa800','#e32727']"
              />
              <RollLine
                color="#1cb3ff"
                style="height:116px;"
                :showxAxis="true"
                :chartData="cpuLineData"
              />
            </div>
            <div class="chart-box-item">
              <PictorialBar
                title="内存"
                titleColor="#333"
                sub-title="使用率"
                :number="numirateMem"
                subTitleColor="rgb(69, 73, 80)"
                :showNumber="false"
                :symbolSize="[4,32]"
                :colors="['#e2fbd8','#e2fbd8','#ffcece']"
                :region="[70,90]"
                :activeColors="['#29b125','#ffa800','#e32727']"
              />
              <RollLine
                color="#8d5afe"
                style="height:116px;"
                :showxAxis="true"
                :chartData="memoryLineData"
              />
            </div>
            <div class="chart-box-item">
              <PictorialBar
                title="硬盘"
                titleColor="#333"
                sub-title="使用率"
                :number="numirateFile"
                subTitleColor="rgb(69, 73, 80)"
                :showNumber="false"
                :symbolSize="[4,32]"
                :colors="['#e2fbd8','#e2fbd8','#ffcece']"
                :region="[70,90]"
                :activeColors="['#29b125','#ffa800','#e32727']"
              />
              <RollLine
                color="#faa005"
                style="height:116px;"
                :showxAxis="true"
                :chartData="diskListData"
              />
            </div>
          </div>
        </Card>
      </div>
      <div class="bottom-rt-box">
        <Card title="模型统计">
          <div class="alarm-content">
            <div class="itm-list">
              <div class="itm">
                <div class="num" style="color:#f45555;">01</div>
                <div class="text">服务器</div>
              </div>
              <div class="itm">
                <div class="num" style="color:#367aff;">12</div>
                <div class="text">报警</div>
              </div>
              <div class="itm">
                <div class="num" style="color:#68bd23;">08</div>
                <div class="text">模型数</div>
              </div>
              <div class="itm">
                <div class="num" style="color:#ef9c1a;">21</div>
                <div class="text">模型调用数</div>
              </div>
            </div>
            <ChartBar class="alarm-bar" />
          </div>
        </Card>
      </div>
    </div>
  </div>
  </PageWrap>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref, Watch } from "vue-property-decorator";
import Card from "./components/Card.vue";
import PictorialBar from "@/pages/DashBaord/components/PictorialBar.vue";
import RollLine from "@/pages/DashBaord/components/RollLine.vue";
import ChartBar from "./components/ChartBar.vue";
import { randomNumBoth, debounce } from "@/utils";
import dayjs from "dayjs";
import { serverList,getServerTrend } from "@/api/server";
import moment from "moment";

@Component({
  components: {
    Card,
    PictorialBar,
    RollLine,
    ChartBar,
  },
})
export default class Dashboard extends Vue {
  @Prop({ type: Number }) selTabName!: number;
  tableData: any[] = [] ;
  chartLineData: any[] = [];
  cpuLineData: any[] = [];
  memoryLineData: any[] = [];
  diskListData: any[] = [];
  numirateCpu : number = 0 ;
  numirateMem : number = 0; 
  numirateFile : number = 0;
  created() {
    this.getServerList();
    this.getTrends();
  }
  beforeDestroy() {}

  getServerList() {
    serverList().then((res) => {
      this.tableData = res.data
      this.numirateCpu =  Math.ceil( res.data[0].irateCpu.replace('%','') )
      this.numirateMem =  Math.ceil( res.data[0].irateMemory.replace('%',''))
      this.numirateFile = Math.ceil(res.data[0].fileSystemSize.replace('%',''))
    });
  }
  getTrends() {
    getServerTrend().then((res) => {
      const cuptime = dayjs();
      this.cpuLineData = res.data.cpu.map(item => {
        return {
          value: item[1],
          time:  moment(item[0] * 1000).format('HH:mm') ,
        };
      });
      this.memoryLineData = res.data.memory.map(item => {
        return {
          value: item[1],
          time:  moment(item[0] * 1000).format('HH:mm') ,
        };
      });
      this.diskListData = res.data.fileSystem.map(item => {
        return {
          value: item[1],
          time:  moment(item[0] * 1000).format('HH:mm') ,
        };
      });
      
    });
  }
}
</script>

<style scoped lang="scss">
.dashboard {
  .item-list {
    display: flex;
    justify-content: space-between;
    position: relative;
    z-index: 1;
  }
  .item {
    width: 412px;
    height: 200px;
    border-radius: 13px;
    overflow: hidden;
    position: relative;
    // z-index: 1;
    .bg {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      z-index: -1;
    }
    text-align: right;
    color: #fff;
    padding-right: 76px;
    padding-top: 48px;
    .num {
      font-size: 62px;
      color: #fff;
      line-height: 80px;
      font-weight: bold;
    }
    .text {
      font-size: 20px;
    }
    &.t0 {
      background: url(../../assets/home/itm1.png) no-repeat left bottom;
      .bg {
        background: linear-gradient(
          rgb(90, 195, 95) 0%,
          rgb(121, 238, 149) 100%
        );
      }
    }
    &.t1 {
      background: url(../../assets/home/itm2.png) no-repeat left bottom;
      .bg {
        background: linear-gradient(
          rgb(50, 177, 242) 0%,
          rgb(121, 210, 255) 100%
        );
      }
    }
    &.t2 {
      background: url(../../assets/home/itm3.png) no-repeat left bottom;
      .bg {
        background: linear-gradient(
          rgb(238, 154, 22) 0%,
          rgb(255, 199, 91) 100%
        );
      }
    }
    &.t3 {
      background: url(../../assets/home/itm4.png) no-repeat left bottom;
      .bg {
        background: linear-gradient(
          rgb(255, 71, 75) 0%,
          rgb(255, 130, 113) 100%
        );
      }
    }
  }
  .bottom-box {
    display: flex;
    justify-content: space-between;
    .bottom-lt-box {
      width: 60%;
      .chart-box {
        height: 356px;
        background: #fff;
        border-radius: 10px;
        padding: 20px;
        .chart-box-item + .chart-box-item {
          border-top: 1px solid #ddd;
        }
        .chart-box-item {
          display: flex;
          height: 108px;
          align-items: center;
          justify-content: space-between;
          .pictorial-bar {
            width: 26%;
          }
          .roll-line {
            width: 70%;
          }
        }
      }
    }
    .bottom-rt-box {
      width: 38%;
      .alarm-content {
        height: 356px;
        background: #fff;
        border-radius: 10px;
        padding: 26px;
        display: flex;
        flex-direction: column;
        .itm-list {
          display: flex;
          padding-bottom: 24px;
          padding-top: 24px;
          justify-content: space-around;
          border-bottom: 1px solid #ddd;
          .itm {
            text-align: center;
            .num {
              line-height: 50px;
              font-size: 22px;
              font-weight: bold;
            }
            .text {
              font-size: 14px;
            }
          }
        }
        .alarm-bar {
          flex: 1;
        }
      }
    }
  }
  .table-list {
    padding: 18px 0;
    border-radius: 10px;
    background: #fff;
  }
  .tag-radius {
    display: inline-block;
    padding: 0 10px;
    border-radius: 14px;
    height: 28px;
    line-height: 28px;
    background: #43ba40;
    color: #fff;
    &.warning {
      background: #ffb31f;
    }
    &.error {
      background: #f45555;
    }
  }
}
</style>
