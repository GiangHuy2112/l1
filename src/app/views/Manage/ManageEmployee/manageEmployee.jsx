import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { Box, Button, Grid, Icon, IconButton } from "@material-ui/core";
import { Breadcrumb, ConfirmationDialog } from "egret";
import { toast } from "react-toastify";
import EmployeeDialogSubmit from "./manageEmployeeDialogSubmit";
import { deleteEmployee, getEmployees } from "./manageEmployeeService";
import "react-toastify/dist/ReactToastify.css";
import { STATUS_CODE_SUCCESS } from "app/constants/statusContant";

function ManageEmployee({t, i18n }) {
  const [listEmployee, setListEmployee] = useState([]);
  const [showDialogSubmit, setShowDialogSubmit] = useState(false);
  const [showDialogDelete, setShowDialogDelete] = useState(false);
  const [idEmployee, setIdEmployee] = useState();
  const [rowData, setRowData] = useState({});

  const getAllEmployee = async () => {
    try {
      const res = await getEmployees()
      if(res?.data?.data) {
        setListEmployee(res.data.data);
      }
    } catch (error) {
      toast.error("Có lỗi!!!")
    }
  };

  useEffect(() => {
    getAllEmployee();
  }, []);

  const handleOpenDialogDelete = (id) => {
    setIdEmployee(id);
    setShowDialogDelete(true);
  };

  const handleDeleteEmployee = async () => {
    try {
      const res = await deleteEmployee(idEmployee)    
      if(res?.data && res?.data?.code === STATUS_CODE_SUCCESS) {
        getAllEmployee();
        toast.success("Xóa nhân viên thành công!");    
        setShowDialogDelete(false);
      }
      else {
        toast.error("Xóa nhân viên không thành công!");   
      }
    } catch (error) {     
      toast.error("Có lỗi!!!");
    }
  };

  const handleEditEmployee = (rowData) => {
    setRowData(rowData);
    setShowDialogSubmit(true);
  };

  const handleCloseDialog = () => {
    setShowDialogSubmit(false);
    setRowData({});
  };

  const columns = [
    {
      title: "Thao tác",
      field: "action",
      render: (rowData) => {
        return (
          <div className="none_wrap">
            <IconButton
              size="small"
              onClick={() => handleEditEmployee(rowData)}
            >
              <Icon color="primary">edit</Icon>
            </IconButton>

            <IconButton
              size="small"
              onClick={() => handleOpenDialogDelete(rowData.id)}
            >
              <Icon style={{ color: "red", margin: "0px 0px 0px 10px" }}>
                delete
              </Icon>
            </IconButton>
          </div>
        );
      },
    },
    { title: t("employee.name"), field: "name" },
    { title: t("employee.age"), field: "age" },
    { title: t("employee.email"), field: "email" },
    { title: t("employee.phone"), field: "phone" },
  ];

  return (
    <div className="m-sm-30">
      <Box mb={2}>
        <Breadcrumb
          routeSegments={[
            { name: t("Dashboard.manage") },
            { name: t('Thêm mới nhân viên')  },
          ]}
        />
      </Box>

      <Grid container spacing={2} justify="space-between">
        <Grid item xs={12}>
          <Box position="absolute" top={80} left={50} zIndex={1}>
            <Button
                variant="contained"
                color="primary"
                style={{ top: "5px" }}
                onClick={() => setShowDialogSubmit(true)}
              >
              Thêm nhân viên
            </Button>
          </Box>
          <MaterialTable
            title={false}
            data={listEmployee}
            columns={columns}
            localization={
              {
                toolbar: {
                  searchPlaceholder: 'Tìm kiếm',
                },
                pagination: {
                  labelDisplayedRows: "{from}-{to} của {count}",
                  labelRowsPerPage: "Số bản ghi mỗi trang:",
                  firstTooltip: "Trang đầu",
                  previousTooltip: "Trang trước",
                  nextTooltip: "Trang tiếp",
                  lastTooltip: "Trang cuối",
                  labelRowsSelect: "bản ghi/trang",
                },
              }
            }
            options={{
              exportButton: true,
              exportAllData: true,
              pageSize: 8,
              pageSizeOptions: [5, 8, 10, 20],
              headerStyle: {
                backgroundColor: "#358600",
                color: "#FFF",
              },
            }}
          />

          {showDialogSubmit && (
            <EmployeeDialogSubmit
              getAllEmployee={getAllEmployee}
              rowData={rowData}
              setRowData={setRowData}
              showDialogSubmit={showDialogSubmit}
              handleCloseDialog={handleCloseDialog}
            />
          )}

          {showDialogDelete && (
            <ConfirmationDialog 
              title={"Xác nhận xóa nhân viên"}
              open={showDialogDelete}
              onConfirmDialogClose={() => setShowDialogDelete(false)}
              onYesClick={handleDeleteEmployee}
              text={"Thao tác này sẽ xóa nhân viên vĩnh viễn"}
              Yes={"Xóa"}
              No={"Hủy bỏ"}
            />
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default ManageEmployee;
