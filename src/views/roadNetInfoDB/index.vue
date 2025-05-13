<template>
  <div class="roadNetWorkInfoDB">
    <div class="left-panel">
      <div class="head-title">
        <span>空间管理</span>
      </div>
      <div class="search-box">
        <el-input
          size="small"
          placeholder="请输入内容"
          suffix-icon="el-icon-search"
          v-model="searchText"
        >
        </el-input>
      </div>
      <div class="tree-box">
        <el-tree
          :data="treeList"
          :props="defaultProps"
          node-key="id"
          default-expand-all
          @node-click="handleNodeClick"
        >
          <template #default="{ node, data }">
            <span>
              <i :class="data.icon" style="margin-right: 5px"></i>
              {{ node.label }}
            </span>
          </template>
        </el-tree>
      </div>
    </div>
    <div class="right-panel">
      <Head></Head>
      <div class="form-box">
        <el-form
          ref="form1Ref"
          :model="form1"
          :rules="rules"
          label-width="180px"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="类别">
                <el-select
                  v-model="selectedType"
                  style="width: 100%"
                  size="small"
                  placeholder=""
                >
                  <el-option
                    v-for="item in typeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="中心桩号 K">
                <el-col :span="10">
                  <el-input
                    v-model="form1.centerK1"
                    size="small"
                    placeholder="请输入"
                  />
                </el-col>
                <el-col :span="2" style="text-align: center"> + </el-col>
                <el-col :span="10">
                  <el-input
                    v-model="form1.centerK2"
                    size="small"
                    placeholder="请输入"
                  />
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="代码" prop="code">
                <el-input
                  v-model="form1.code"
                  size="small"
                  placeholder="请输入"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="起点桩号 K">
                <el-col :span="10">
                  <el-input
                    v-model="form1.startK1"
                    size="small"
                    placeholder="请输入"
                  />
                </el-col>
                <el-col :span="2" style="text-align: center"> + </el-col>
                <el-col :span="10">
                  <el-input
                    v-model="form1.startK2"
                    size="small"
                    placeholder="请输入"
                  />
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="简称" prop="jc">
                <el-input
                  v-model="form1.jc"
                  size="small"
                  placeholder="请输入"
                />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="终点桩号 K">
                <el-col :span="10">
                  <el-input
                    v-model="form1.endK1"
                    size="small"
                    placeholder="请输入"
                  />
                </el-col>
                <el-col :span="2" style="text-align: center"> + </el-col>
                <el-col :span="10">
                  <el-input
                    v-model="form1.endK2"
                    size="small"
                    placeholder="请输入"
                  />
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="里程（Km）" prop="distance">
                <el-input
                  v-model="form1.distance"
                  size="small"
                  placeholder="请输入"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="管理单位">
                <el-select
                  v-model="selectedUnit"
                  style="width: 100%"
                  size="small"
                >
                  <el-option
                    v-for="item in unitOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="养护单位（土建）" prop="manageUnit">
                <el-input
                  v-model="form1.manageUnit"
                  size="small"
                  placeholder="请输入"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="养护单位" prop="manageUnit">
                <el-input
                  v-model="form1.manageUnit"
                  size="small"
                  placeholder="请输入"
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="附图" prop="imgs">
                <el-upload action="#"
                  ><el-button ref="upBtn" size="mini"
                    >点击上传</el-button
                  ></el-upload
                >
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="排序" prop="sortIndex">
                <el-input-number
                  v-model="form1.sortIndex"
                  size="small"
                  placeholder="请输入"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import Head from "./head.vue";
export default {
  components: { Head },
  data() {
    return {
      searchText: "",
      defaultProps: {
        children: "children",
        label: "label"
      },
      treeList: [
        {
          id: "1",
          label: "衢江区",
          children: [
            {
              id: "1-1",
              label: "信安中路",
              children: [
                {
                  id: "1-1-1",
                  label: "路口",
                  children: [
                    {
                      id: "1-1-1-1",
                      label: "信安中路与江滨西路交叉口",
                      icon: "el-icon-s-order"
                    },
                    {
                      id: "1-1-1-2",
                      label: "信安中路与通江路交叉口",
                      icon: "el-icon-s-order"
                    }
                  ]
                },
                {
                  id: "1-1-2",
                  label: "路段",
                  children: [
                    {
                      id: "1-1-2-1",
                      label: "江滨西路与通江路路段",
                      children: [
                        {
                          id: "1-1-2-1-1",
                          label: "江滨西路至通江路方向",
                          icon: "el-icon-s-order"
                        },
                        {
                          id: "1-1-2-1-2",
                          label: "通江路至江滨西路方向",
                          icon: "el-icon-s-order"
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              id: "1-2",
              label: "振兴中路",
              children: [
                {
                  id: "1-2-1",
                  label: "路口"
                },
                {
                  id: "1-2-2",
                  label: "路段"
                }
              ]
            }
          ]
        },
        {
          id: "2",
          label: "柯城区",
          children: [
            {
              id: "2-1",
              label: "路口"
            },
            {
              id: "2-2",
              label: "路段"
            }
          ]
        },

        {
          id: "3",
          label: "集聚区",
          children: [
            {
              id: "3-1",
              label: "路口"
            },
            {
              id: "3-2",
              label: "路段"
            }
          ]
        }
      ],
      form1: {
        type: "",
        centerK1: "",
        centerK2: "",
        code: "",
        startK1: "",
        startK2: "",
        jc: "",
        endK1: "",
        endK1: "",
        distance: "",
        manageUnit: "",
        imgs: [],
        sortIndex: 0
      },
      rules: {
        code: [{ required: true, message: "不能为空", trigger: "blur" }],
        jc: [{ required: true, message: "不能为空", trigger: "blur" }]
      },
      selectedType: "",
      typeOptions: [
        {
          label: "",
          value: ""
        },
        {
          label: "线路",
          value: "线路"
        },
        {
          label: "路段",
          value: "路段"
        },
        {
          label: "路口",
          value: "路口"
        },
        {
          label: "道路路段",
          value: "道路路段"
        }
      ],
      selectedUnit: "单位1",
      unitOptions: [
        {
          label: "单位1",
          value: "单位1"
        },
        {
          label: "单位2",
          value: "单位2"
        },
        {
          label: "单位3",
          value: "单位3"
        }
      ]
    };
  },
  methods: {
    handleNodeClick(data) {
      console.log("handleNodeClick ...", data);
    }
  }
};
</script>

<style lang="scss" scoped>
.roadNetWorkInfoDB {
  display: flex;
  width: 100%;
  height: 100%;
  gap: 10px;
}
.left-panel {
  border: 1px solid red;
  width: 320px;

  .head-title {
    padding: 10px 20px;
    border-bottom: 1px solid #dcdee0;
  }

  .search-box {
    padding: 4px 10px;
  }

  .tree-box {
    padding: 20px 10px;
  }
}
.right-panel {
  border: 1px solid green;
  flex: 1;
}

.form-box {
  padding: 20px;
}
</style>