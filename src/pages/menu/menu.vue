<template>
  <div>
    <el-button type="primary" @click="add">添加</el-button>
    <v-add :info="info" ref="one"></v-add>
    <v-list @edit="edit($event)"></v-list>
  </div>
</template>
<script>
import vAdd from "./components/add";
import vList from "./components/list";
export default {
  components: {
    vAdd,
    vList,
  },
  data() {
    return {
      info: {
        isshow: false,
        isAdd: true,
        title: "菜单添加",
      },
    };
  },
  methods: {
    add() {
      this.info.isshow = !this.info.isshow;
      this.info.isAdd = true;
      this.info.title = "菜单添加";
      this.$refs.one.chongzi();
    },
    edit(e) {
      // console.log(e);
      this.info.isshow = true;
      this.info.isAdd = false;
      this.info.title = "菜单编辑";
      // console.log(this.$refs.one);
      this.$refs.one.look(e);
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>