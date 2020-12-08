<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow">
      <el-form :model="form">
        <el-form-item label="角色名称" :label-width="width">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" :label-width="width">
          <el-tree
            :data="menulist"
            show-checkbox
            node-key="id"
            ref="tree"
            :default-expanded-keys="[2, 3]"
            :default-checked-keys="[5]"
            :props="{ children: 'children', label: 'title' }"
          >
          </el-tree>
        </el-form-item>
        <el-form-item label="状态" :label-width="width">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2">
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
import { mapActions, mapGetters } from "vuex";
import {reqroleAdd,reqroleOne,reqroleEdit} from '../../../util/request'
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      menulist: "menu/list",
    }),
  },
  components: {},
  data() {
    return {
      width: "160px",
      form: {
        rolename: "",
        menus: [],
        status: 1,
      },
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  methods: {
    //  隐藏弹框
    hide(){
        this.info.isshow = false
    },
    // 重置
    chongzi(){
        this.form={
        rolename: "",
        menus: [],
        status: 1,
      }
      this.form.menus = this.$refs.tree.setCheckedKeys([])
    },
    //   添加
    add() {
        // console.log(this.$refs.tree.getCheckedKeys());
        this.form.menus=JSON.stringify(this.$refs.tree.getCheckedKeys())
        reqroleAdd(this.form).then(res=>{
            this.chongzi()
            this.hide()
        })
    }, 
    ...mapActions({
      getmenuList: "menu/getmenuList",
      getroleList:'role/getroleList'
    }),
    // 获取一条数据
    look(id){
        reqroleOne({id:id}).then(res=>{
            this.form = res.data.list
            this.form.menus=this.$refs.tree.setCheckedKeys(JSON.parse(res.data.list.menus))
            this.form.id = id
        })
    },
    // 修改
    updata() {
        this.form.menus=JSON.stringify(this.$refs.tree.getCheckedKeys())
        reqroleEdit(this.form).then(res=>{
            this.getroleList()
            this.hide()
        })
    },
    
  },
  mounted() {
    // 如果menulist为空  发送请求
    if (this.menulist.length == 0) {
      this.getmenuList();
    }
  },
};
</script>
<style scoped>
</style>