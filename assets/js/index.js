function getUserInfo() {
  $.ajax({
    type: "GET",
    url: "/my/userinfo",
    /* headers: {
      Authorization: localStorage.getItem("token"),
    }, */
    success: function (res) {
      if (res.status !== 0) return layer.msg(res.message);
      layer.msg("获取信息成功！");
      renderAvatar(res.data);
    },
    /* complete: function (res) {
      if (
        res.responseJSON.status === 1 &&
        res.responseJSON.message === "身份认证失败！"
      ) {
        //清空token
        localStorage.removeItem("token");
        //跳出index
        location.href = "/login.html";
      }
    }, */
  });
}
getUserInfo();

const renderAvatar = (user) => {
  const uname = user.nickname || user.username;
  $("#welcome").html(`欢迎，${uname}！`);
  if (user.user_pic !== null) {
    $(".layui-nav-img").attr("src", user.user_pic);
    $(".text-avatar").hide();
  } else {
    $(".layui-nav-img").hide();
    $(".text-avatar").html(uname[0].toUpperCase()).show();
  }
};

//退出登录
$(".btnOut").click(() => {
  layui.layer.confirm(
    "是否需要登录？",
    { icon: 3, title: "" },
    function (index) {
      localStorage.removeItem("token");
      location.href = "/login.html";
    }
  );
});
