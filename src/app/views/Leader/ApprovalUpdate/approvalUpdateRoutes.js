import { EgretLoadable } from "egret";
import ConstantList from "../../../appConfig";
import { useTranslation, withTranslation, Trans } from "react-i18next";
const approvalUpdate = EgretLoadable({
  loader: () => import("./approvalUpdate"),
});
const ViewComponent = withTranslation()(approvalUpdate);

const approvalUpdateRoutes = [
  {
    path: ConstantList.ROOT_PATH + "approval_update",
    exact: true,
    component: ViewComponent,
  },
];

export default approvalUpdateRoutes;
