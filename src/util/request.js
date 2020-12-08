import axios from "axios";
import qs from "qs";
axios.interceptors.response.use(res => {
  console.log("=======请求的路径:" + res.config.url + "========");
  console.log(res);
  return res;
});

/////////////////////////////////////菜单管理////////////////////////////////
// 菜单的添加
const base = "/api";
export const reqmenuAdd = data => {
  return axios({
    url: base + "/api/menuadd",
    method: "post",
    data: data
  });
};
// 菜单列表
export const reqmenuList = data => {
  return axios({
    url: base + "/api/menulist",
    method: "get",
    params: data
  });
};
//获取菜单一条数据
export const reqmenuOne = data => {
  return axios({
    url: base + "/api/menuinfo",
    method: "get",
    params: data
  });
};
//菜单编辑
export const reqmenuEdit = data => {
  return axios({
    url: base + "/api/menuedit",
    method: "post",
    data: data
  });
};
// 菜单删除
export const reqmenuDel = data => {
  return axios({
    url: base + "/api/menudelete",
    method: "post",
    data: data
  });
};
/////////////////////////////////角色管理/////////////////////////////////////////
// 角色添加
export const reqroleAdd = data => {
  return axios({
    url: base + "/api/roleadd",
    method: "post",
    data: data
  });
};
// 角色列表
export const reqroleList = data => {
  return axios({
    url: base + "/api/rolelist",
    method: "get"
  });
};
// 获取角色一条数据
export const reqroleOne = id => {
  return axios({
    url: base + "/api/roleinfo",
    method: "get",
    params: id
  });
};
// 角色编辑
export const reqroleEdit = id => {
  return axios({
    url: base + "/api/roleedit",
    method: "post",
    data: id
  });
};
// 角色删除
export const reqroleDel = id => {
  return axios({
    url: base + "/api/roledelete",
    method: "post",
    data: id
  });
};
/////////////////////////////////管理员管理/////////////////////////////////////////
// 管理员管理
export const requserAdd = data => {
  return axios({
    url: base + "/api/useradd",
    method: "post",
    data: data
  });
};
// 管理员列表
export const requserList = params => {
  return axios({
    url: base + "/api/userlist",
    method: "get",
    params: params
  });
};
// 获取管理员一条数据
export const requserOne = id => {
  return axios({
    url: base + "/api/userinfo",
    method: "get",
    params: id
  });
};
// 管理员修改
export const requserEdit = id => {
  return axios({
    url: base + "/api/useredit",
    method: "post",
    data: id
  });
};
// 管理员删除
export const requserDel = id => {
  return axios({
    url: base + "/api/userdelete",
    method: "post",
    data: id
  });
};
// 管理员总数
export const requserCount = () => {
  return axios({
    url: base + "/api/usercount",
    method: "get"
  });
};
// 管理员登录
export const requserLogin = (data) => {
  return axios({
    url: base + "/api/userlogin",
    method: "post",
    data:data
  });
};
/////////////////////////////////商品分类/////////////////////////////////////////
// 商品添加
export const reqcateAdd = data => {
  var form = new FormData();
  for (var i in data) {
    form.append(i, data[i]);
  }
  return axios({
    url: base + "/api/cateadd",
    method: "post",
    data: form
  });
};
// 商品列表
export const reqcateList = data => {
  return axios({
    url: base + "/api/catelist",
    method: "get",
    params: data
  });
};
//获取商品一条数据
export const reqcateOne = id => {
  return axios({
    url: base + "/api/cateinfo",
    method: "get",
    params: id
  });
};
//商品编辑
export const reqcateEdit = data => {
  var form = new FormData();
  for (var i in data) {
    form.append(i, data[i]);
  }
  return axios({
    url: base + "/api/cateedit",
    method: "post",
    data: form
  });
};
// 商品删除
export const reqcateDel = id => {
  return axios({
    url: base + "/api/catedelete",
    method: "post",
    data: id
  });
};
/////////////////////////////////商品规格/////////////////////////////////////////
// 商品规格添加
export const reqspescAdd = data => {
  return axios({
    url: base + "/api/specsadd",
    method: "post",
    data: data
  });
};
// 商品规格列表
export const reqspescList = params => {
  return axios({
    url: base + "/api/specslist",
    method: "get",
    params: params
  });
};
// 商品规格获取一条数据
export const reqspescOne = id => {
  return axios({
    url: base + "/api/specsinfo",
    method: "get",
    params: id
  });
};
// 商品规格修改 
export const reqspescEdit = data => {
  return axios({
    url: base + "/api/specsedit",
    method: "post",
    data: data
  });
};
// 商品规格删除
export const reqspescDel = id => {
  return axios({
    url: base + "/api/specsdelete",
    method: "post",
    data: id
  });
};
