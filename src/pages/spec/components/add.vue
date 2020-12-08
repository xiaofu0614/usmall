<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow">
      <el-form :model="form">
        <el-form-item label="规格名称" :label-width="width">
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="规格属性"
          :label-width="width"
          v-for="(item, index) in arr"
          :key="index"
        >
          <el-row>
            <el-col :span="18">
              <el-input v-model="item.value" autocomplete="off"></el-input>
            </el-col>
            <el-col :span="6">
              <el-button type="primary" v-if="index == 0" @click="xinzeng"
                >新增规格属性</el-button
              >
              <el-button type="danger" v-else @click="del(index)"
                >删除</el-button
              >
            </el-col>
          </el-row>
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
import { reqspescAdd, reqspescOne,reqspescEdit } from "../../../util/request";
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
      arr: [
        {
          value: "",
        },
      ],
      form: {
        specsname: "",
        attrs: "",
        status: 1,
      },
    };
  },
  methods: {
    //   新增属性规格
    xinzeng() {
      this.arr.push({ value: "" });
    },
    //   删除新增属性
    del(index) {
      this.arr.splice(index, 1);
    },
    hide() {
      this.info.isshow = false;
    },
    // 重置
    chongzi() {
    
      this.form = {
        specsname: "",
        attrs:'',
        status: 1,
      }      
      this.arr=[{value:''}]
    },
    ...mapActions({
      getspecList: "spec/getspecList",
    }),
    // 添加
    add() {
      this.form.attrs = JSON.stringify(
        this.arr.map((item) => {
          return item.value;
        })
      );
      reqspescAdd(this.form).then((res) => {
        this.hide();
        this.chongzi();
        this.getspecList();
        
      });
    },
    // 获取一条数据
    look(id) {
      reqspescOne({ id: id }).then((res) => {
        this.form = res.data.list[0];
        this.form.id = id;
        this.arr = JSON.parse(this.form.attrs).map((item) => {
          return { value: item };
        });
      });
    },
    // 修改
    updata() {
      this.form.attrs = JSON.stringify(
        this.arr.map((item) => {
          return item.value;
        })
      );
      reqspescEdit(this.form).then((res) => {
        this.hide();
        this.getspecList();
      });
    },
  },
  mounted() {
      this.getspecList();
  },
};
</script>
<style scoped>
</style>