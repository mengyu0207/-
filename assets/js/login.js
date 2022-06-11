$(function () {
  //点击注册账号隐藏注册框，显示登录框

  $("#link_reg").click(function () {
    $(".login-box").hide();
    $(".reg-box").show();
  });

  //点击登录框隐藏登录框，显示注册框

  $("#link_login").click(function () {
    $(".login-box").show();
    $(".reg-box").hide();
  });

  //表单验证
  const form = layui.form;

  form.verify({
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    repwd: (val) => {
      const pwd = $(".reg-box [name=password]").val();
      if (pwd !== val) return "两次密码不一致";
    },
  });

  //监听注册表单

  $("#form_reg").submit(function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/api/reguser",
      data: {
        username: $(".reg-box [name=username]").val(),
        password: $(".reg-box [name=password]").val(),
      },
      success: function (res) {
        if (res.status !== 0) return layer.msg(res.message);
        layer.msg(res.message);
        $("#link_login").click();
      },
    });
  });

  //监听登录表单

  $("#form_login").submit(function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/api/login",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) return layer.msg(res.message);
        layer.msg(res.message);
        localStorage.setItem("token", res.token);
        location.href = "/index.html";
      },
    });
  });
});
