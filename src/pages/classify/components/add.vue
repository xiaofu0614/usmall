<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow">
      <el-form :model="form">
        <el-form-item label="上级分类" :label-width="width">
          <el-select
            v-model="form.pid"
            placeholder="--请选择--"
          >
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
            <!--  -->
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" :label-width="width">
          <el-input v-model="form.catename" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 图片 -->
        <el-form-item  label="图片" :label-width="width">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeimg"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <!--  -->
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
import { reqcateAdd,reqcateOne,reqcateEdit } from "../../../util/request";
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      list: "classify/list",
    }),
  },
  props: ["info"],
  components: {},
  data() {
    return {
      width: "160px",
      imageUrl: "",
      form: {
        pid: "",
        catename: "",
        img: null,
        status: 1,
      },
    };
  },
  methods: {
    changeimg(e) {
      // console.log(e);
      var file = e.raw;
      this.imageUrl = URL.createObjectURL(file);
      this.form.img = file;
    },
    hide() {
      this.info.isshow = false;
    },
    // 重置
    chongzi(){
      this.form= {
        pid: "",
        catename: "",
        img: null,
        status: 1,
      }
      this.imageUrl=''
    },
    ...mapActions({
      getcateList: "classify/getcateList",
    }),
    // 添加
    add() {
      reqcateAdd(this.form).then((res) => {
        this.hide();
          this.getcateList();
          this.chongzi()
      });
    },
    // 获取一条数据
    look(id) {
        reqcateOne({ id: id }).then((res) => {
          this.form = res.data.list;
          this.form.id = id;
          this.imageUrl = this.$preImg+res.data.list.img
        });
    },
    // 修改
    updata() {
        reqcateEdit(this.form).then((res) => {
          this.hide();
          this.getcateList();
        });
    },
  },
  mounted() {
    this.getcateList();
  },
};
</script>
<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  border: 2px solid #999;
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

</style>