import { EgretLoadable } from "egret";
import ConstantList from "../../../appConfig";
import { useTranslation, withTranslation, Trans } from "react-i18next";
const ManageEmployee = EgretLoadable({
  loader: () => import("./manageEmployee"),
});
const ViewComponent = withTranslation()(ManageEmployee);

const manageEmployeeRoutes = [
  {
    path: ConstantList.ROOT_PATH + "manage_employee",
    exact: true,
    component: ViewComponent,
  },
];

export default manageEmployeeRoutes;
