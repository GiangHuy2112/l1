import { EgretLoadable } from "egret";
import ConstantList from "../../../appConfig";
import { useTranslation, withTranslation, Trans } from "react-i18next";
const addEmployee = EgretLoadable({
  loader: () => import("./addEmployee"),
});
const ViewComponent = withTranslation()(addEmployee);

const addEmployeeRoutes = [
  {
    path: ConstantList.ROOT_PATH + "addnew_employee",
    exact: true,
    component: ViewComponent,
  },
];

export default addEmployeeRoutes;
