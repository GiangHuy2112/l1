import moment from "moment";

export const DECLARE_STATUS_NEW = 1; // tạo mới
export const STATUS_PENDING_APPROVAL = 2; // gửi LĐao
export const STATUS_ACCEPTED = 3; // Đã đc chấp nhận
export const STATUS_ADDITIONAL_REQUEST = 4; // YC bổ xung
export const STATUS_REFUSE = 5; // từ chối
export const STATUS_PENDING_TERMINATION = 6; // YC chấm dứt hồ sơ
export const STATUS_ACCEPT_END_PROFILE = 7; //chấp nhận yc kết thúc hồ sơ
export const STATUS_ADDITIONAL_REQUEST_END_PROFILE = 8; // yc bổ sung yc kthuc hồ sơ
export const STATUS_REFUSE_REQUEST_END_PROFILE = 9; // Từ chối yêu cầu kết thúc hồ sơ
export const STATUS_SUBMIT_STORE = 0; // Nộp lưu hồ sơ
const dataEmployee = {
  status: [
    { id: 1, name: "Tạo mới" },
    { id: 2, name: "Chờ xử lý" },
    { id: 3, name: "Đã được chấp nhận" },
    { id: 4, name: "Yêu cầu bổ sung" },
    { id: 5, name: "Từ chối" },
    { id: 6, name: "Yêu cầu kết thúc hồ sơ" },
    { id: 7, name: "Kết thúc hồ sơ" },
    { id: 8, name: "Yêu cầu bổ xung yêu cầu kết thúc hồ sơ" },
    { id: 9, name: "Từ chối yêu cầu kết thúc hồ sơ" },
    { id: 0, name: "Nộp lưu hồ sơ" },
  ],
  gender: [
    { id: 1, name: "Nam" },
    { id: 2, name: "Nữ" },
    { id: 3, name: "Khác" },
  ],
  team: [
    { id: 1, name: "Front End" },
    { id: 2, name: "Back End" },
    { id: 3, name: "Full Stack" },
  ],
  relationship: [
    { id: 1, name: "Bố" },
    { id: 2, name: "Mẹ" },
    { id: 3, name: "Anh" },
    { id: 4, name: "Chị" },
    { id: 5, name: "Em" },
    { id: 6, name: "Cậu" },
    { id: 7, name: "Mợ" },
  ],
  position: [
    { id: 1, name: "Nhân viên" },
    { id: 2, name: "Giám Đốc" },
    { id: 3, name: "Quản Lý" },
    { id: 4, name: "Trưởng Phòng" },
  ],
  columnsCert: [
    {
      title: "STT",
      render: (rowDataCertificate) => rowDataCertificate?.tableData?.id + 1,
    },
    { title: "Tên văn bằng", field: "certificateName" },
    {
      title: "Ngày cấp",
      field: "issueDate",
      render: (rowDataCertificate) =>
        moment(rowDataCertificate.issueDate).format("YYYY-MM-DD"),
    },
    { title: "Lĩnh vực", field: "field" },
  ],
  columnsFam: [
    {
      title: "STT",
      render: (rowDataFamily) => rowDataFamily?.tableData?.id + 1,
    },
    { title: "Họ tên", field: "name" },
    {
      title: "Ngày sinh",
      field: "dateOfBirth",
      render: (rowDataFamily) =>
        moment(rowDataFamily.dateOfBirth).format("YYYY-MM-DD"),
    },
    { title: "Địa chỉ", field: "address" },
    {
      title: "Quan hệ",
      field: "relationShip",
      render: (rowDataFamily) =>
        dataEmployee.relationship.find(
          (item) => rowDataFamily.relationShip === item.id
        )?.name,
    },
  ],
};

export default dataEmployee;
