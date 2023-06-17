import axios from "axios";
import ConstantList from "../../../appConfig";

// Register Document
const API_PATH_REGISTER_DOC = ConstantList.API_ENPOINT + "/document-registered";
export const getListRegisterDocEmployee = (employeeId) => {
  return axios.get(API_PATH_REGISTER_DOC + `?employeeId=${employeeId}`);
};

export const addRegisterDocEmployee = (employeeId, registerDoc) => {
  return axios.post(API_PATH_REGISTER_DOC + `?employeeId=${employeeId}`, [
    registerDoc,
  ]);
};
export const editRegisterDocEmployee = (registerDoc) => {
  return axios.put(API_PATH_REGISTER_DOC + `/${registerDoc.id}`, registerDoc);
};

export const deleteRegisterDocEmployee = (registerDocId) => {
  return axios.delete(API_PATH_REGISTER_DOC + `/${registerDocId}`);
};

// Salary Inc
const API_PATH_SALARY_INC = ConstantList.API_ENPOINT + "/salary-increase";
export const getListSalaryIncEmployee = (employeeId) => {
  return axios.get(API_PATH_SALARY_INC + `?employeeId=${employeeId}`);
};

export const addSalaryIncEmployee = (employeeId, salaryInc) => {
  return axios.post(API_PATH_SALARY_INC + `?employeeId=${employeeId}`, [
    salaryInc,
  ]);
};
export const editSalaryIncEmployee = (salaryInc) => {
  return axios.put(API_PATH_SALARY_INC + `/${salaryInc.id}`, salaryInc);
};

export const deleteSalaryIncEmployee = (salaryIncId) => {
  return axios.delete(API_PATH_SALARY_INC + `/${salaryIncId}`);
};

export const getListSalaryIncByCurrentLeader = () => {
  return axios.get(API_PATH_SALARY_INC + "/current-leader");
};

// Promote
const API_PATH_PROMOTE = ConstantList.API_ENPOINT + "/process";
export const getListPromoteEmployee = (employeeId) => {
  return axios.get(API_PATH_PROMOTE + `?employeeId=${employeeId}`);
};

export const addPromoteEmployee = (employeeId, promote) => {
  return axios.post(API_PATH_PROMOTE + `?employeeId=${employeeId}`, [promote]);
};
export const editPromoteEmployee = (promote) => {
  return axios.put(API_PATH_PROMOTE + `/${promote.id}`, promote);
};

export const deletePromoteEmployee = (promoteId) => {
  return axios.delete(API_PATH_PROMOTE + `/${promoteId}`);
};

export const getListPromoteByCurrentLeader = () => {
  return axios.get(API_PATH_PROMOTE + "/current-leader");
};

// Proposal
const API_PATH_PROPOSAL = ConstantList.API_ENPOINT + "/proposal";
export const getListProposalEmployee = (employeeId) => {
  return axios.get(API_PATH_PROPOSAL + `?employeeId=${employeeId}`);
};
export const addProposalEmployee = (employeeId, proposal) => {
  return axios.post(API_PATH_PROPOSAL + `?employeeId=${employeeId}`, [
    proposal,
  ]);
};
export const editProposalEmployee = (proposal) => {
  return axios.put(API_PATH_PROPOSAL + `/${proposal.id}`, proposal);
};

export const deleteProposalEmployee = (proposalId) => {
  return axios.delete(API_PATH_PROPOSAL + `/${proposalId}`);
};

export const getListProposalByCurrentLeader = () => {
  return axios.get(API_PATH_PROPOSAL + "/current-leader");
};
