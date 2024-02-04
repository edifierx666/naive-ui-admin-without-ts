export var PageEnum;
(function(PageEnum) {
  // 登录
  PageEnum['BASE_LOGIN'] = '/login';
  PageEnum['BASE_LOGIN_NAME'] = 'Login';
  //重定向
  PageEnum['REDIRECT'] = '/redirect';
  PageEnum['REDIRECT_NAME'] = 'Redirect';
  // 首页
  PageEnum['BASE_HOME'] = '/dashboard';
  //首页跳转默认路由
  PageEnum['BASE_HOME_REDIRECT'] = '/dashboard/console';
  // 错误
  PageEnum['ERROR_PAGE_NAME'] = 'ErrorPage';
})(PageEnum || (PageEnum = {}));
