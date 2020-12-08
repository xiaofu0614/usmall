<template>
  <div class="box">
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="用户编号" sortable width="180">
      </el-table-column>
      <el-table-column prop="username" label="用户名称" sortable width="180">
      </el-table-column>
      <el-table-column prop="rolename" label="所属角色" sortable width="180">
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1"
            >启用</el-button
          >
          <el-button type="danger" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)"
            >编辑</el-button
          >
          <el-button type="danger" @click="del(scope.row.uid)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      class="aa"
      :page-size="2"
      layout="prev, pager, next"
      :total="total"
      @current-change="changes"
    >
    </el-pagination>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { requserDel } from "../../../util/request";
export default {
  computed: {
    ...mapGetters({
      list: "manger/list",
      total: "manger/total",
    }),
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    // 编辑
    edit(id) {
      this.$emit("edit", id);
    },
    // 删除
    del(id) {
      requserDel({ uid: id }).then((res) => {
        this.getmangerPages(1);
        this.getmangerList();
        this.getmangerCount()
      });
    },
    ...mapActions({
      getmangerList: "manger/getmangerList",
      getmangerCount: "manger/getmangerCount",
      getmangerPages: "manger/getmangerPages",
    }),
    changes(a) {
      // console.log(a);  点击哪个是哪个页数
      this.getmangerPages(a);
      this.getmangerList();
    },
  },
  mounted() {
    this.getmangerList();
    this.getmangerCount();
  },
};
</script>
<style scoped>
.box {
  margin-top: 20px;
}
.aa {
  float: right;
}
</style>