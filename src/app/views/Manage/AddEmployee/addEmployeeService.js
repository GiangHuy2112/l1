import axios from "axios";
import ConstantList from "../../../appConfig";

// const API_PATH_L3 = "https://em-dev.oceantech.com.vn/em/employees";
const API_PATH = ConstantList.API_ENPOINT + "/employees";

export const getEmployeesByStatus = (page, size) => {
  return axios.get(API_PATH + `?statuses=1,3,4,6&page=${page}&size=${size}`);
};

export const addEmployee = (employee) => {
  return axios.post(API_PATH + "/employees");
};

export const editEmployee = (employee) => {
  return axios.put(API_PATH + `/employees/${employee.id}`, employee);
};

export const deleteEmployee = (id) => {
  return axios.delete(API_PATH + "/employees/" + id);
};
