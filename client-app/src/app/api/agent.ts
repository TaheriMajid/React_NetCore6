import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../..";
import { Activity } from "../models/activity";
import { store } from "../stores/store";

axios.defaults.baseURL = "http://localhost:5000/api";

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

// axios.interceptors.response.use(async (response) => {
//   try {
//     await sleep(1000);
//     return response;
//   } catch (err) {
//     console.log(err);
//     return await Promise.reject(err);
//   }
// });

axios.interceptors.response.use(
  async (response) => {
    await sleep(1000);
    return response;
  },
  (error: AxiosError | any) => {
    const { data, status, config } = error.response!;
    switch (status) {
      case 400:
        // toast.error("Bad Request");
        if (typeof data === "string") {
          toast.error(data);
        }
        if (config.method === "get" && data.errors.hasOwnProperty("id")) {
          history.push("/not-found");
        }
        if (data.errors) {
          const modalStateErrors = [];
          for (const key in data.errors) {
            modalStateErrors.push(data.errors[key]);
          }
          throw modalStateErrors.flat();
        }
        // else {
        //   toast.error(data);
        // }
        break;
      case 401:
        toast.error("Unauthorized");
        break;
      case 404:
        // toast.error("Not Found");
        history.push("/not-found");
        break;
      case 500:
        // toast.error("Server Error");
        store.commonStore.setServerError(data);
        history.push("/server-error");
        break;
    }
  }
);

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Activities = {
  list: () => requests.get<Activity[]>("/activities"),
  details: (id: string) => requests.get<Activity>(`/activities/${id}`),
  create: (activity: Activity) => requests.post("/activities", activity),
  update: (activity: Activity) =>
    requests.put(`/activities/${activity.id}`, activity),
  delete: (id: string) => requests.delete(`/activities/${id}`),
};

const agent = {
  Activities,
};

export default agent;
