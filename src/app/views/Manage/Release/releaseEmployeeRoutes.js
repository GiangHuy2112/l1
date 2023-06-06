import { EgretLoadable } from "egret";
import ConstantList from "../../../appConfig";
import { useTranslation, withTranslation, Trans } from "react-i18next";
const releaseEmployee = EgretLoadable({
  loader: () => import("./releaseEmployee"),
});
const ViewComponent = withTranslation()(releaseEmployee);

const releaseEmployeeRoutes = [
  {
    path: ConstantList.ROOT_PATH + "release_employee",
    exact: true,
    component: ViewComponent,
  },
];

export default releaseEmployeeRoutes;
