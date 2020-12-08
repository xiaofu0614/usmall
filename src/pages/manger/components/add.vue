<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow">
      <el-form :model="form">
        <el-form-item label="所属角色" :label-width="width">
          <el-select v-model="form.roleid" placeholder="--请选择--">
            <el-option label="--请选择--" :value="0" disabled></el-option>
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
            <!-- {{form.roleid}} -->
          </el-select>
        </el-form-item>
        <el-form-item label="用户名" :label-width="width">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="width">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="width">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="info.isshow = false">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd == true"
          >添 加</el-button
        >
        <el-button type="primary" @click="updata" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { requserAdd, requserOne, requserEdit } from "../../../util/request";
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      roleList: "role/list",
    }),
  },
  props: ["info"],
  components: {},
  data() {
    return {
      width: "160px",
      form: {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      },
    };
  },
  methods: {
    hide() {
      this.info.isshow = false;
    },
    // 重置
    chongzi(){
      this.form={
        roleid: "",
        username: "",
        password: "",
        status: 1,
      }
    },
    ...mapActions({
      getroleList: "role/getroleList",
      getmangerList:'manger/getmangerList',
      getmangerCount:'manger/getmangerCount'
    }),
    // 添加
    add() {
      requserAdd(this.form).then((res) => {
        this.chongzi()
        this.getmangerCount()
        this.getmangerList()
        this.hide();
        
        
      }); 
    },
    // 获取一条数据
    look(id) {
      requserOne({ uid: id }).then((res) => {
        this.form = res.data.list;
        this.form.password = "";
        this.form.uid = id;
      });
    },
    // 修改
    updata() {
      requserEdit(this.form).then((res) => {
        this.hide();
        this.getmangerList()
      });
    },
  },
  mounted() {
    if (this.roleList.length == 0) {
      this.getroleList();
    }
  },
};
</script>
<style scoped>
</style>