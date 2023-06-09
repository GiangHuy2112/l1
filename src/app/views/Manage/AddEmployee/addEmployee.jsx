import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { Box, Button, Grid, Icon, IconButton } from "@material-ui/core";
import { Breadcrumb, ConfirmationDialog } from "egret";
import { toast } from "react-toastify";
import EmployeeDialogSubmit from "./addEmployeeDialogSubmit";
import { deleteEmployee, getListEmployee } from "./addEmployeeService";
import "react-toastify/dist/ReactToastify.css";
import { STATUS_CODE_SUCCESS } from "app/constants/statusContant";
import dataEmployee from "app/constants/dataEmployeeContant";
import TablePaginationComp from '../../Component/TablePagination/TablePagination';
import TableComp from "app/views/Component/TableComp/TableComp";
import EmployeeInforsDialog from "./employeeInformationDialog";

function AddEmployee({t, i18n }) {
  const [listEmployee, setListEmployee] = useState([]);
  const [showDialogSubmit, setShowDialogSubmit] = useState(false);
  const [showDialogViewInfor, setShowDialogViewInfor] = useState(false);
  const [showDialogDelete, setShowDialogDelete] = useState(false);
  const [idEmployee, setIdEmployee] = useState();
  const [rowData, setRowData] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

  const getAllEmployee = async () => {
    try {
      const res = await getListEmployee(page+1, 10, "")
      if(res?.data?.data) {
        setTotalItems(res.data.totalElements)
        setListEmployee(res.data.data);
      }
    } catch (error) {
      toast.error("Có lỗi!!!")
    }
  };


  useEffect(() => {
    getAllEmployee();
  }, [page]);


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

  const handleViewEmployee = (rowData) => {
    setRowData(rowData);
    setShowDialogViewInfor(true)
  }

  const handleCloseDialogSubmit = () => {
    setShowDialogSubmit(false);
    setRowData({});
  };

  const handleCloseDialogViewInfor = () => {
    setShowDialogViewInfor(false);
    setRowData({});
  }

  const columns = [
    { 
      title: "STT",
      render: (rowData) => rowData?.tableData?.id + 1,
    },
    {
      title: "Thao tác",
      field: "action",
      render: (rowData) => {
        return (
          <div className="none_wrap">
            {(+rowData?.submitProfileStatus === 2 || +rowData?.submitProfileStatus === 3 || +rowData?.submitProfileStatus === 5 || +rowData?.submitProfileStatus === 6 || +rowData?.submitProfileStatus === 4 ) &&
              <IconButton
                size="small"
                onClick={() => handleViewEmployee(rowData)}
              >
                <Icon color="primary">visibility</Icon>
              </IconButton>
            }
            {(+rowData?.submitProfileStatus === 1 || +rowData?.submitProfileStatus === 4 || +rowData?.submitProfileStatus === 5) &&
              <IconButton
                size="small"
                onClick={() => handleEditEmployee(rowData)}
              >
                <Icon color="primary">edit</Icon>
              </IconButton>
            }

            {+rowData?.submitProfileStatus === 1 && 
              <IconButton
                size="small"
                onClick={() => handleOpenDialogDelete(rowData.id)}
              >
                <Icon style={{ color: "red", margin: "0px 0px 0px 10px" }}>
                  delete
                </Icon>
              </IconButton>
            }
            
          </div>
        );
      },
    },
    { title: t("Mã nhân viên"), field: "code"},
    { title: t("Họ và tên"), field: "name" },
    { title: t("Địa chỉ"), field: "address" },
    { title: t("Số điện thoại"), field: "phone" },
    { title: t("Trạng thái"), field: "submitProfileStatus", render:(rowData) =>dataEmployee.status.find(status=>+rowData.submitProfileStatus===status.id)?.name }
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  

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

          <TableComp 
            listData={listEmployee} 
            columns={columns} page={page} 
            handleChangePage={handleChangePage} 
            totalItems={totalItems} 
            rowsPerPage={rowsPerPage} 
            handleChangeRowsPerPage={handleChangeRowsPerPage} 
          />

          {showDialogSubmit && (
            <EmployeeDialogSubmit
              getAllEmployee={getAllEmployee}
              rowData={rowData}
              setRowData={setRowData}
              showDialogSubmit={showDialogSubmit}
              handleCloseDialog={handleCloseDialogSubmit}
            />
          )}

          {showDialogViewInfor && (
            <EmployeeInforsDialog
              rowData={rowData}
              showDialogViewInfor={showDialogViewInfor}
              handleCloseDialog={handleCloseDialogViewInfor}
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

export default AddEmployee;
