import { EgretLoadable } from "egret";
import ConstantList from "../../../appConfig";
import { useTranslation, withTranslation, Trans } from "react-i18next";
const approvedEmployee = EgretLoadable({
  loader: () => import("./approvedEmployee"),
});
const ViewComponent = withTranslation()(approvedEmployee);

const approvedEmployeeRoutes = [
  {
    path: ConstantList.ROOT_PATH + "approved_employee",
    exact: true,
    component: ViewComponent,
  },
];

export default approvedEmployeeRoutes;
