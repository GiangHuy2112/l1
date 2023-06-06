import ConstantList from "./appConfig";
export const navigations = [
  {
    name: "Lãnh đạo",
    isVisible: true,
    icon: "collections_bookmark",
    children: [
      {
        name: "Chờ duyệt",
        isVisible: true,
        path: ConstantList.ROOT_PATH + "approval_employee",
        icon: "cached",
      },
      {
        name: "Đã duyệt",
        isVisible: true,
        path: ConstantList.ROOT_PATH + "approved_employee",
        icon: "published_with_changes",
      },
    ],
  },
  {
    name: "Quản lý",
    isVisible: true,
    icon: "people_alt",
    children: [
      {
        name: "Thêm mới nhân viên",
        isVisible: true,
        path: ConstantList.ROOT_PATH + "addnew_employee",
        icon: "person_add",
      },
      {
        name: "Quản lý nhân viên",
        isVisible: true,
        path: ConstantList.ROOT_PATH + "manage_employee",
        icon: "engineering",
      },
      {
        name: "Kết thúc",
        isVisible: true,
        path: ConstantList.ROOT_PATH + "release_employee",
        icon: "person_off",
      },
    ],
  },
];
