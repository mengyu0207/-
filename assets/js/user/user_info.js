$(function () {
  const form = layui.form;
  form.verify({
    nickname: function (value) {
      if (value.length > 6) return "昵称长度不能超过6位";
    },
  });
  //获取用户信息
  const initUserInfo = () => {
    $.ajax({
      type: "get",
      url: "/my/userinfo",
      success: function (res) {
        if (res.status !== 0) return layer.msg("获取信息失败");
        layer.msg("获取信息成功！");
        form.val("formUserInfo", res.data);
      },
    });
  };
  initUserInfo();
  //重置表单
  $(".btnReset").click(function (e) {
    e.preventDefault();
    initUserInfo();
  });
  //提交表单
  $(".layui-form").submit(function (e) {
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "/my/userinfo",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) return layer.msg("修改失败!!!!");
        //通知父页面更新信息
        window.parent.getUserInfo();
      },
    });
  });
});
