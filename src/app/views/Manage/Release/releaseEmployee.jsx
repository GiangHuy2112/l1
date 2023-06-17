import React from "react";
import { Box, Grid, Icon, IconButton } from "@material-ui/core";
import { Breadcrumb } from "egret";
import "react-toastify/dist/ReactToastify.css";

import dataEmployee, { STATUS_PENDING_APPROVAL } from "app/constants/dataEmployeeContant";
import { getCertificatesByEmployee, getEmployeeById, getFamilyByEmployee, getListEmployee } from "app/views/Manage/AddEmployee/addEmployeeService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import TableComp from "app/views/Component/TableComp/TableComp";
import ProfileInforDialog from "app/views/Manage/AddEmployee/profileInforDialog";
import ModalUpdateHappenings from "app/views/Manage/Modals/modal";


function ApprovalEmployee({t, i18n }) {
  const [listEmployee, setListEmployee] = useState([]);
  const [showDialogProfile, setShowDialogProfile] = useState(false);
  const [rowData, setRowData] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [listCertificateEmployee, setListCertEmployee] = useState([]);
  const [listFamilyEmployee, setListFarmEmployee] = useState([]);
  const [showDialogEndProfile, setShowDialogEndProfile] = useState(false);

  const getAllEmployee = async () => {
    try {
      const res = await getListEmployee(page + 1, rowsPerPage, "", "7")
      if(res?.data?.data) {
        setTotalItems(res.data.totalElements)
        setListEmployee(res.data.data);
      }
    } catch (error) {
      toast.error("Có lỗi!!!")
    }
  };

  const getListCertAndFam = async (rowData) => {
        try {
            const resCert = await getCertificatesByEmployee(rowData.id);
            const resFam = await getFamilyByEmployee(rowData.id);
            if(resCert?.data?.data) {
                setListCertEmployee(resCert.data.data)
            }
            if(resFam?.data?.data) {
                setListFarmEmployee(resFam.data.data)
            }
        } catch (error) {
            toast.error("Có lỗi!!!")
        }
    } 

  useEffect( () => {
     getAllEmployee();
  }, [page, rowsPerPage]);


  const handleViewEmployee = (rowData) => { 
      if(rowData.submitProfileStatus === 2) {
        setShowDialogProfile(true)
      }
      else {
        setShowDialogEndProfile(true)
      }
      setRowData(rowData);
      getListCertAndFam(rowData)

  }

  const handleCloseDialogEndProfile = () => {
    setShowDialogEndProfile(false);
    setRowData({});
  }

  const handleCloseDialogProfile = () => {
    setShowDialogProfile(false);
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
            {(+rowData?.submitProfileStatus === 7) &&
              <IconButton
                size="small"
                onClick={() => handleViewEmployee(rowData)}
              >
                <Icon color="primary">visibility</Icon>
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
  };


  return (
    <div className="m-sm-30">
      <Box mb={2}>
        <Breadcrumb
          routeSegments={[
            { name: t("Quản lý") },
            { name: t('Kết thúc')  },
          ]}
        />
      </Box>

      <Grid container spacing={2} justify="space-between">
        <Grid item xs={12}>
          <TableComp
            listData={listEmployee} 
            columns={columns} page={page} 
            handleChangePage={handleChangePage} 
            totalItems={totalItems} 
            rowsPerPage={rowsPerPage} 
            handleChangeRowsPerPage={handleChangeRowsPerPage} 
          />

          {showDialogProfile && (
            <ProfileInforDialog
              rowData={rowData}
              setRowData={setRowData}
              showDialogProfile={showDialogProfile}
              handleCloseDialogProfile={handleCloseDialogProfile}
              listCertificateEmployee={listCertificateEmployee}
              listFamilyEmployee={listFamilyEmployee}
              readOnly= {true}
              getAllEmployee={getAllEmployee}
              waitHandle={+rowData.submitProfileStatus === STATUS_PENDING_APPROVAL ? true : false }
            />
          )}
        </Grid>
      </Grid>
      {
        showDialogEndProfile &&
        <ModalUpdateHappenings 
          label={"Đơn xin nghỉ việc"}
          rowData={rowData}
          setListDataModal={setListEmployee}
          setRowData={setRowData}
          handleCloseModal={handleCloseDialogEndProfile}
          showModal={showDialogEndProfile}
        />
      }
    </div>
  );
}

export default ApprovalEmployee;
