export class AxiosTransform {
  /**
   * @description: 请求之前处理配置
   * @description: Process configuration before request
   */
  beforeRequestHook;
  /**
   * @description: 请求成功处理
   */
  transformRequestData;
  /**
   * @description: 请求失败处理
   */
  requestCatch;
  /**
   * @description: 请求之前的拦截器
   */
  requestInterceptors;
  /**
   * @description: 请求之后的拦截器
   */
  responseInterceptors;
  /**
   * @description: 请求之前的拦截器错误处理
   */
  requestInterceptorsCatch;
  /**
   * @description: 请求之后的拦截器错误处理
   */
  responseInterceptorsCatch;
}
