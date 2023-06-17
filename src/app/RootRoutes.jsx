import React from "react";
import { Redirect } from "react-router-dom";
import homeRoutes from "./views/home/HomeRoutes";
import sessionRoutes from "./views/sessions/SessionRoutes";
import dashboardRoutes from "./views/dashboard/DashboardRoutes";
import administrativeUnitRoutes from "./views/AdministrativeUnit/AdministrativeUnitRoutes"; 
import UserRoutes from "./views/User/UserRoutes";
import addEmployeeRoutes from "./views/Manage/AddEmployee/addEmployeeRoutes";
import departmentRoutes from "./views/Department/DepartmentRoutes"; 
import ConstantList from "./appConfig";
// import MenuRoutes from "./views/Menus/MenuRoutes";
import pageLayoutRoutes from "./views/page-layouts/PageLayoutRoutees";  
import MenuRoutes from "./views/Menus/MenuRoutes";
import ShiftWorkRouters from "./views/ShiftWork/ShiftWorkRouters"; 
import TimeSheetRoutes from "./views/TimeSheet/TimeSheetRoutes"; 
import ColorRoutes from "./views/Color/ColorRoutes"  
import CategoryRoutes from "./views/Category/CategoryRoutes" 
import manageEmployeeRoutes from "./views/Manage/ManageEmployee/manageEmployeeRoutes";
import releaseEmployeeRoutes from "./views/Manage/Release/releaseEmployeeRoutes";
import approvalEmployeeRoutes from "./views/Leader/Approval/approvalEmployeeRoutes";
import approvedEmployeeRoutes from "./views/Leader/Approved/approvedEmployeeRoutes";
import approvalUpdateRoutes from "./views/Leader/ApprovalUpdate/approvalUpdateRoutes";

const redirectRoute = [
  {
    path: ConstantList.ROOT_PATH,
    exact: true,
    component: () => <Redirect to={ConstantList.HOME_PAGE} /> //Luôn trỏ về HomePage được khai báo trong appConfig
  }
];

const errorRoute = [
  {
    component: () => <Redirect to={ConstantList.ROOT_PATH + "session/404"} />
  }
];

const routes = [
  ...homeRoutes,
  ...sessionRoutes,
  ...dashboardRoutes,
  ...TimeSheetRoutes,
  ...administrativeUnitRoutes,
  ...departmentRoutes,
  ...pageLayoutRoutes,  
  ...MenuRoutes,
  ...UserRoutes,
  ...addEmployeeRoutes,
  ...manageEmployeeRoutes,
  ...releaseEmployeeRoutes,
  ...approvalEmployeeRoutes,
  ...approvalUpdateRoutes,
  ...approvedEmployeeRoutes,
  ...ShiftWorkRouters, 
  ...ColorRoutes, 
  ...CategoryRoutes,
  ...errorRoute,

];

export default routes;
