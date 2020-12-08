<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow">
      <el-form :model="form">
        <el-form-item label="菜单名称" :label-width="width">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" :label-width="width">
          <el-select
            v-model="form.pid"
            placeholder="--请选择--"
            @change="change"
          >
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in menuList"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            ></el-option>
            <!--  -->
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" :label-width="width">
          <template>
            <el-radio v-model="form.type" :label="1" disabled>目录</el-radio>
            <el-radio v-model="form.type" :label="2" disabled>菜单</el-radio>
          </template>
        </el-form-item>
        <el-form-item
          label="菜单图标"
          :label-width="width"
          v-if="form.type == 1"
        >
          <el-select v-model="form.icon" placeholder="--请选择--">
            <el-option label="星星" value="el-icon-star-on">
              <i class="el-icon-star-on"></i>
            </el-option>
            <el-option label="相机" value="el-icon-camera-solid">
              <i class="el-icon-camera-solid"></i>
            </el-option>
            <el-option label="飞机" value="el-icon-s-promotion">
              <i class="el-icon-s-promotion"></i>
            </el-option>
            <el-option label="铃铛" value="el-icon-message-solid">
              <i class="el-icon-message-solid"></i>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单地址" :label-width="width" v-else>
          <el-select v-model="form.url" placeholder="请选择活动区域">
            <el-option
              v-for="item in indexRouters"
              :key="item.path"
              :label="'/' + item.path"
              :value="item.name"
            ></el-option>
          </el-select>
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
        <el-button type="primary" @click="add" v-if="info.isAdd == true">添 加</el-button>
        <el-button type="primary" @click="updata" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { indexRouters } from "../../../router/index";
import { reqmenuAdd, reqmenuOne, reqmenuEdit } from "../../../util/request";
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      menuList: "menu/list",
    }),
  },
  props: ["info"],
  components: {},
  data() {
    return {
      width: "160px",
      form: {
        pid: "",
        title: "",
        type: 1,
        icon: "",
        url: "",
        status: 1,
      },
      indexRouters,
    };
  },
  methods: {
    hide() {
      this.info.isshow = false;
    },
    // 重置
    chongzi(){
      this.form={
        pid: "",
        title: "",
        type: 1,
        icon: "",
        url: "",
        status: 1,
      }
    },
    ...mapActions({
      getmenuList: "menu/getmenuList",
    }),
    // 添加
    add() {
      reqmenuAdd(this.form).then((res) => {
        this.hide();
        this.getmenuList();
        this.chongzi()
      });
    },
    change() {
      console.log(this.form.pid);
      this.form.type = this.form.pid == 0 ? 1 : 2;
    },
    // 获取一条数据
    look(id) {
      reqmenuOne({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
      });
    },
    // 修改
    updata() {
      reqmenuEdit(this.form).then((res) => {
        this.hide();
        this.getmenuList();
      });
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>