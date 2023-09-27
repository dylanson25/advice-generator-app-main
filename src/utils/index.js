import axios from "axios";
const API_END_POINT = "https://api.adviceslip.com/";

class ApiClass {
  constructor() {
    this.requests = [];
    this._axios = axios.create({
      baseURL: API_END_POINT,
    });
    this._interceptors();
  }
  _interceptors() {
    this._interceptorsResponse();
  }
  abortSignal(timeoutMs, reason = "Avoid multiple request") {
    const abortController = new AbortController();
    setTimeout(() => abortController.abort(reason), timeoutMs || 0);

    return abortController.signal;
  }
  _interceptorsResponse() {
    this._axios.interceptors.response.use(
      (response) => {
        if (String(response.status).match(/20[0-9]/g)) {
          return response?.data?.slip;
        } else {
          console.warn("❗️ Request", { response });
        }
        return response;
      },
      (err) => {
        const { response, message } = err || {};
        const aborted = axios.isCancel(err);
        if (aborted)
          return Promise.reject({
            error: err.code,
            message: err.config?.signal?.reason || err.message,
            aborted,
          });
        const { status } = response || {};
        return Promise.reject({ status, error: message, aborted });
      }
    );
  }
  makeRequest(request) {
    const { method, url, axiosRequest = {} } = request;
    const R = { url: `${method}:${url}` };
    R.axios = this._axios[method](`${url}`, axiosRequest);
    this.requests.push(R);
    return R.axios;
  }
  get(url, axiosRequest = {}) {
    return this.makeRequest({ method: "get", url, axiosRequest });
  }
}
export const Api = new ApiClass();
