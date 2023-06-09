import axios from "axios";
import ConstantList from "../../../appConfig";
import avatarDefault from "../../../public/assets/avatarDefault.jpg";

const API_PATH_EMPLOYEE = ConstantList.API_ENPOINT + "/employee";

export const getListEmployee = (
  page = 0,
  size = 10,
  keyword = "",
  listStatus = "1,2,3,4,5"
) => {
  return axios.get(
    API_PATH_EMPLOYEE +
      `/search?pageIndex=${page}&pageSize=${size}&keyword=${keyword}&listStatus=` +
      listStatus
  );
};

export const addEmployee = (employee) => {
  return axios.post(API_PATH_EMPLOYEE, employee);
};

export const editEmployee = (employee) => {
  return axios.put(API_PATH_EMPLOYEE + `/${employee.id}`, employee);
};

export const deleteEmployee = (id) => {
  return axios.delete(API_PATH_EMPLOYEE + `/${id}`);
};

export const uploadImageEmployee = (image) => {
  return axios.post(API_PATH_EMPLOYEE + "/upload-image", image);
};

export const getLinkAvatarEmployee = (image) => {
  if (image && image !== "") {
    return ConstantList.API_ENPOINT + `/public/image/${image}`;
  }
  return avatarDefault;
};

export const getEmployeeById = (id) => {
  return axios.get(API_PATH_EMPLOYEE + `/${id}`);
};

// certificate
const API_PATH_CERTIFICATE = ConstantList.API_ENPOINT + "/certificate";

export const getCertificatesByEmployee = (employeeId) => {
  return axios.get(API_PATH_CERTIFICATE + `?employeeId=${employeeId}`);
};

export const addCertificateEmployee = (employeeId, certificateArr) => {
  return axios.post(
    API_PATH_CERTIFICATE + `?employeeId=${employeeId}`,
    certificateArr
  );
};

export const editCertificateEmployee = (certificate) => {
  return axios.put(API_PATH_CERTIFICATE + `/${certificate.id}`, certificate);
};

export const deleteCertificateEmployee = (certificateId) => {
  return axios.delete(API_PATH_CERTIFICATE + `/${certificateId}`);
};

// Family
const API_PATH_FAMILY = ConstantList.API_ENPOINT + "/employee-family";

export const getFamilyByEmployee = (employeeId) => {
  return axios.get(API_PATH_FAMILY + `?employeeId=${employeeId}`);
};

export const addFamilyByEmployee = (employeeId, familyArr) => {
  return axios.post(API_PATH_FAMILY + `?employeeId=${employeeId}`, familyArr);
};

export const editFamilyByEmployee = (family) => {
  return axios.put(API_PATH_FAMILY + `/${family.id}`, family);
};

export const deleteFamilyByEmployee = (familyId) => {
  return axios.delete(API_PATH_FAMILY + `/${familyId}`);
};

// experience
const API_PATH_EXPS = ConstantList.API_ENPOINT + "/experience";
export const getListExpsByEmployee = (employeeId) => {
  return axios.get(API_PATH_EXPS + `?employeeId=${employeeId}`);
};

export const addExpByEmployee = (employeeId, exp) => {
  return axios.post(API_PATH_EXPS + `?employeeId=${employeeId}`, [exp]);
};

export const editExpByEmployee = (exp) => {
  return axios.put(API_PATH_EXPS + `/${exp.id}`, exp);
};

export const deleteExpByEmployee = (id) => {
  return axios.delete(API_PATH_EXPS + `/${id}`);
};

// leader
const API_PATH_LEADER = ConstantList.API_ENPOINT + "/leader";
export const getLeaders = () => {
  return axios.get(API_PATH_LEADER);
};
