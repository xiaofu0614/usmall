<template>
  <div class="box">
    <div class="con">
      <h2>登录</h2>
      <div><input type="text" v-model="user.username"></div>
      <div><input type="text" v-model="user.password"></div>
      <div><button @click="login">登录</button></div>
    </div>
  </div>
</template>
<script>
import {requserLogin} from '../../util/request'
import {mapGetters,mapActions} from 'vuex'
export default {
  components: {},
  data() {
    return {
      user:{
        username:'',
        password:''
      }
    };
  },
  methods: {
    ...mapActions({
        requestuserList:'user/requestuserList'
    }),
    login(){
      requserLogin(this.user).then(res=>{
        if(res.data.code==200){
          this.requestuserList(res.data.list);
          this.$router.push('/index/home')
        }else{
          alert(res.data.msg)
        }
      })
    }
  },
  mounted() {},
};
</script>
<style scoped>
.box {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, #563443, #303d60);
}
.con {
  width: 350px;
  height: 250px;
  background-color: #fff;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  text-align: center;
}
input{
    width: 70%;
    height: 30px;
    display: block;
    margin: 25px auto;
    padding-left: 5px;
}
button{
    width: 70%;
    height: 30px;
    background: rgb(57, 57, 219);
    outline: none;
    border: none;
    border-radius: 5px;
    color: #fff;
}
</style>