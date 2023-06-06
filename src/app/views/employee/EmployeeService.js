import axios from "axios";
import ConstantList from "../../appConfig";

const API_PATH = ConstantList.API_ENPOINT + "/api";

export const searchByPage = (searchObject) => {
  return axios.post(API_PATH + "/search", searchObject);
};

export const getEmployees = () => {
  return axios.get(API_PATH + "/employees/all");
};

export const deleteEmployee = (id) => {
  return axios.delete(API_PATH + "/employees/" + id);
};

export const addEmployee = (item) => {
  return axios.post(API_PATH + "/employees", item);
};
export const editEmployee = (item) => {
  return axios.put(API_PATH + "/employees/" + item.id, item);
};

// Address

export const getProvinces = () => {
  return axios.get(API_PATH + "/provinces/all");
};

export const getDistrictsByProvinceId = (id) => {
  return axios.get(API_PATH + "/provinces/" + id + "/districts");
};

export const getWardsByDistrictId = (id) => {
  return axios.get(API_PATH + "/districts/" + id + "/wards");
};
