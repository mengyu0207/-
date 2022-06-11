$.ajaxPrefilter(function (options) {
  options.url = "http://www.liulongbin.top:3007" + options.url;
  if (options.url.includes("/my")) {
    options.headers = {
      Authorization: localStorage.getItem("token"),
    };
  }

  options.complete = function (res) {
    if (
      res.responseJSON.status === 1 &&
      res.responseJSON.message === "身份认证失败！"
    ) {
      //清空token
      localStorage.removeItem("token");
      //跳出index
      location.href = "/login.html";
    }
  };
});
