<template>
  <div class="content">
    <div class="container-fluid">
      <div
        class="row"
      >
      
        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-warning">
              <i class="fa fa-gift  "></i>
            </div>
            <div slot="content">
              <p class="card-category">Đơn đặt hàng</p>
              <h4 class="card-title">{{ statusOne}}</h4>
            </div>
            <div slot="footer"><i class="fa fa-refresh"></i>Updated now</div>
          </stats-card>
        </div>

        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-success">
              <i class="fa fa-shopping-bag"></i>
            </div>
            <div slot="content">
              <p class="card-category">Đang giao hàng</p>
              <h4 class="card-title">{{statusTwo }}</h4>
            </div>
            <div slot="footer"><i class="fa fa-calendar-o"></i>Updated now</div>
          </stats-card>
        </div>

        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="fa fa-cart-plus">
              <i aria-hidden="true"></i>
            </div>
            <div slot="content">
              <p class="card-category">Đã thanh toán</p>
              <h4 class="card-title">{{statusThree }}</h4>
            </div>
            <div slot="footer"><i></i>Recent orders</div>
          </stats-card>
        </div>

        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-info">
              <i class="fa fa-users"></i>
            </div>
            <div slot="content">
              <p class="card-category">Doanh thu</p>
              <h4 class="card-title">{{sum }}</h4>
            </div>
            <div slot="footer"><i class="fa fa-refresh"></i>Updated now</div>
          </stats-card>
        </div>
      </div>
      <div class="row">
        <div class="col-md-8">
          <chart-card
            :chart-data="lineChart.data"
            :chart-options="lineChart.options"
            :responsive-options="lineChart.responsiveOptions"
          >
            <template slot="header">
              <h4 class="card-title">Sales</h4>
              <p class="card-category">In 1 month</p>
            </template>
            <template slot="footer">
              <div class="legend">
                <i class="fa fa-circle text-info"></i> Open
                <i class="fa fa-circle text-danger"></i> Click
                <i class="fa fa-circle text-warning"></i> Click Second Time
              </div>
              <hr />
              <div class="stats">
                <i class="fa fa-history"></i> Updated 3 minutes ago
              </div>
            </template>
          </chart-card>
        </div>

        <div class="col-md-4">
          <chart-card :chart-data="pieChart.data" chart-type="Pie">
            <template slot="header">
              <h4 class="card-title">Selling item</h4>
            </template>
            <template slot="footer">
              <div class="legend">
                <i class="fa fa-circle text-info"></i> Sneaker
                <i class="fa fa-circle text-danger"></i> Boot
                <i class="fa fa-circle text-warning"></i> Brogue
              </div>
              <hr />
              <div class="stats">
                <i class="fa fa-clock-o"></i> Updated 2 days ago
              </div>
            </template>
          </chart-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ChartCard from "src/components/Cards/ChartCard.vue";
import StatsCard from "src/components/Cards/StatsCard.vue";
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import Swal from "sweetalert2";

export default {
  components: {
    ChartCard,
    StatsCard
  },
  created() {
    this.getItem();
  },
  methods: {
    getItem() {
      var self = this;
      Vue.axios
        .get("http://127.0.0.1:8000/api/statistical")
        .then(function(resp) {
          self.statusOne = resp.data.statusOne;
          self.statusTwo = resp.data.statusTwo;
          self.statusThree = resp.data.statusThree;
          self.sum = resp.data.sum;
          console.log("Data:", resp.data);
        })
        .catch(function(error) {
          console.log("Loi:", error);
        });
    }
  },
  data() {
    return {
      statusOne:null,
      statusTwo:null,
      statusThree:null,
      sum:null,
      statistical1: [],
      editTooltip: "Edit Task",
      deleteTooltip: "Remove",
      pieChart: {
        data: {
          labels: ["40%", "20%", "40%"],
          series: [40, 20, 40]
        }
      },
      lineChart: {
        data: {
          labels: [
            "9:00AM",
            "12:00AM",
            "3:00PM",
            "6:00PM",
            "9:00PM",
            "12:00PM",
            "3:00AM",
            "6:00AM"
          ],
          series: [
            [287, 385, 490, 492, 554, 586, 698, 695],
            [67, 152, 143, 240, 287, 335, 435, 437],
            [23, 113, 67, 108, 190, 239, 307, 308]
          ]
        },
        options: {
          low: 0,
          high: 800,
          showArea: false,
          height: "245px",
          axisX: {
            showGrid: false
          },
          lineSmooth: true,
          showLine: true,
          showPoint: true,
          fullWidth: true,
          chartPadding: {
            right: 50
          }
        },
        responsiveOptions: [
          [
            "screen and (max-width: 640px)",
            {
              axisX: {
                labelInterpolationFnc(value) {
                  return value[0];
                }
              }
            }
          ]
        ]
      },
      tableData: {
        data: [
          {
            title:
              'Sign contract for "What are conference organizers afraid of?"',
            checked: false
          },
          {
            title:
              "Lines From Great Russian Literature? Or E-mails From My Boss?",
            checked: true
          },
          {
            title:
              "Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit",
            checked: true
          },
          {
            title: "Create 4 Invisible User Experiences you Never Knew About",
            checked: false
          },
          { title: 'Read "Following makes Medium better"', checked: false },
          { title: "Unfollow 5 enemies from twitter", checked: false }
        ]
      }
    };
  }
};
</script>
<style></style>
