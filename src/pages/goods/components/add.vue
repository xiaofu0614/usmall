<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow" @opened='changeWang'>
      <el-form :model="form">

        <el-form-item label="一级分类" :label-width="width">
          <el-select
            v-model="form.first_cateid"
            placeholder="--请选择--" @change="changes">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.catename"
              :value="item.id">
              </el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="二级分类" :label-width="width">
          <el-select
            v-model="form.second_cateid"
            placeholder="--请选择--">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in erjifenlei"
              :key="item.id"
              :label="item.catename"
              :value="item.id">
              </el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="商品名称" :label-width="width">
          <el-input v-model="form.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="width">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" :label-width="width">
          <el-input v-model="form.market_price" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 图片 -->
        <el-form-item  label="图片" :label-width="width">
          <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeimg">
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <!--  -->
        <el-form-item label="商品规格" :label-width="width">
          <el-select
            v-model="form.specsid"
            placeholder="--请选择--" @change="changess">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in lists"
              :key="item.id"
              :label="item.catename"
              :value="item.id">
              </el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="规格属性" :label-width="width">
          <el-select
            v-model="form.specsattr"
            placeholder="--请选择--" multiple>
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in guigeshuxin"
              :key="item"
              :label="item"
              :value="item">
              </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否新品" :label-width="width">
          <template>
            <el-radio v-model="form.isnew" :label="1" >是</el-radio>
            <el-radio v-model="form.isnew" :label="2" >否</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="是否热卖" :label-width="width">
          <template>
            <el-radio v-model="form.ishot" :label="1" >是</el-radio>
            <el-radio v-model="form.ishot" :label="2" >否</el-radio>
          </template>
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
        <el-form-item label="商品描述" :label-width="width">
          <!-- <textarea name="" id="" cols="30" rows="10" v-model="form.description"></textarea> -->
          <div id="div1" v-if="info.isshow"></div>
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
import E from 'wangeditor'
import { reqgoodsAdd,reqgoodsOne,reqgoodsEdit} from "../../../util/request";
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      list: "classify/list",
      lists:'spec/list',
      listss:'goods/list'
    }),
  },
  props: ["info"],
  components: {},
  data() {
    return {
      erjifenlei:[],
      guigeshuxin:[],
      width: "160px",
      imageUrl: "",
      form: {
        first_cateid: 0,
        second_cateid: 0,
        goodsname: "",
        price: 0,
        market_price: 0,
        img: null,
        description: "",
        specsid: 0,
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      },
    };
  },
  methods: {
      changes(){
          this.erjifenlei = this.list.find((item) => {return item.id == this.form.first_cateid;}).children;
      },
      changeWang(){
          this.editor = new E('#div1')
          this.editor.create()
          this.editor.txt.html(this.form.description);
      },
      changess(){
          this.form.specsattr=''
          this.guigeshuxin = this.lists.find((item) => {return item.id == this.form.specsid;}).attrs;
      },
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
        first_cateid:0,
        second_cateid:0,
        goodsname:'',
        price:0,
        market_price:0,
        img:null,
        description:'',
        specsid:0,
        specsattr:[],
        isnew:1,
        ishot:1,
        status: 1,
      }
      this.imageUrl=''
    },
    ...mapActions({
      getcateList: "classify/getcateList",
      getspecList:'spec/getspecList',
      getgoodList:'goods/getgoodList'
    }),
    // 添加
    add() {
        this.form.description=this.editor.txt.html();
      reqgoodsAdd(this.form).then((res) => {
        this.hide();
        this.getgoodList();
      });
    },
    // 获取一条数据
    look(id) {
        reqgoodsOne({ id: id }).then((res) => {
          this.form = res.data.list;
          this.form.id = id;
          this.imageUrl = this.$preImg+res.data.list.img
          this.form.specsattr = this.form.specsattr.split(',')
          
        });
    },
    // 修改
    updata() {
        this.form.description=this.editor.txt.html();
        reqgoodsEdit(this.form).then((res) => {
          this.hide();
          this.getgoodList();
        });
    },
  },
  mounted() {
      this.getcateList()
      this.getspecList()
      this.getgoodList();
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