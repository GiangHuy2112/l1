const dataEmployee = {
  status: [
    { id: 1, name: "Lưu mới" },
    { id: 2, name: "Chờ xử lý" },
    { id: 3, name: "Chờ duyệt" },
    { id: 4, name: "Yêu cầu bổ sung" },
    { id: 5, name: "Đã duyệt" },
    { id: 6, name: "Đã từ chối" },
    { id: 8, name: "Chờ duyệt kết thúc" },
    { id: 9, name: "Yêu cầu bổ sung đối với kết thúc" },
    { id: 10, name: "Đã duyệt kết thúc" },
    { id: 11, name: "Đã từ chối kết thúc" },
    { id: 13, name: "Đã lưu hồ sơ" },
    { id: 14, name: "Đã xóa" },
  ],
  gender: [
    { id: 0, name: "Nam" },
    { id: 1, name: "Nữ" },
    { id: 2, name: "Khác" },
  ],
  teamId: [
    { id: 1, name: "Nhóm 1" },
    { id: 2, name: "Nhóm 2" },
  ],
  position: [{ id: 1, name: "Nhân viên" }],
  province: [
    {
      name: "Thành phố Hà Nội",
      code: 1,
      division_type: "thành phố trung ương",
      codename: "thanh_pho_ha_noi",
      phone_code: 24,
      districts: [],
    },
    {
      name: "Tỉnh Hà Giang",
      code: 2,
      division_type: "tỉnh",
      codename: "tinh_ha_giang",
      phone_code: 219,
      districts: [],
    },
  ],
};

export default dataEmployee;
