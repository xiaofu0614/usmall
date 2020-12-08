<template>
<div>
    <el-button type='primary' @click='add'>添加</el-button>
    <v-add :info='info' ref="one"></v-add>
    <v-list @edit='edit($event)'></v-list>
</div>
</template>
<script>
import vAdd from './components/add'
import vList from './components/list'
export default {
components:{
    vAdd,
    vList
 },
data () {
 return {
     info:{
         isshow:false,
         title:'商品添加',
         isAdd:true
     }
 }
},
methods:{
    add(){
        this.info.isshow = !this.info.isshow
        this.info.title='商品添加'
        this.info.isAdd=true
        this.$refs.one.chongzi()
    },
    // 编辑
    edit(id){
        this.info.isshow=true  
        this.info.title='商品编辑'
        this.info.isAdd=false
        this.$refs.one.look(id)
    }
},
mounted(){
}
}
</script>
<style scoped>
</style>