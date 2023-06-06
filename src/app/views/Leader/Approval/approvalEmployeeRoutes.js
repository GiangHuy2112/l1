import { EgretLoadable } from "egret";
import ConstantList from "../../../appConfig";
import { useTranslation, withTranslation, Trans } from "react-i18next";
const approvalEmployee = EgretLoadable({
  loader: () => import("./approvalEmployee"),
});
const ViewComponent = withTranslation()(approvalEmployee);

const approvalEmployeeRoutes = [
  {
    path: ConstantList.ROOT_PATH + "approval_employee",
    exact: true,
    component: ViewComponent,
  },
];

export default approvalEmployeeRoutes;
