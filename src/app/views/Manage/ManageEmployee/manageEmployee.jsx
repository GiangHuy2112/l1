import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Icon, IconButton } from "@material-ui/core";
import { Breadcrumb, } from "egret";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dataEmployee, { STATUS_ACCEPTED, STATUS_ADDITIONAL_REQUEST_END_PROFILE, STATUS_PENDING_APPROVAL, STATUS_PENDING_TERMINATION, STATUS_REFUSE_REQUEST_END_PROFILE } from "app/constants/dataEmployeeContant";
import TableComp from "app/views/Component/TableComp/TableComp";
import UpdateHappeningsDialog from "./updateHappeningsDialog";
import { getCertificatesByEmployee, getFamilyByEmployee, getListEmployee } from "../AddEmployee/addEmployeeService";
import ProfileInforDialog from "../AddEmployee/profileInforDialog";


function ManageEmployee({t, i18n }) {
  const [listEmployee, setListEmployee] = useState([]);
  const [showDialogUpdateHappening, setShowDialogUpdateHappening] = useState(false);
  const [rowData, setRowData] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [listCertificateEmployee, setListCertEmployee] = useState([]);
  const [listFamilyEmployee, setListFarmEmployee] = useState([]);
  const [showDialogProfile, setShowDialogProfile] = useState(false);

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
  const getAllEmployee = async () => {
    try {
      const res = await getListEmployee(page+1, rowsPerPage, "", "3,6,8,9")
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
  }, [page, rowsPerPage]);


  const handleViewEmployee = (rowData) => {
    console.log(rowData);
    if(+rowData.submitProfileStatus !== STATUS_PENDING_APPROVAL) {
      setRowData(rowData);
      setShowDialogUpdateHappening(true)
    } 
    else {
      setRowData(rowData);
      getListCertAndFam(rowData)
      setShowDialogProfile(true)
    }
  }

  const handleCloseDialogUpdateHappening = () => {
    setShowDialogUpdateHappening(false);
    setRowData({});
  }
  console.log(listEmployee);
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
            {(+rowData?.submitProfileStatus === STATUS_ACCEPTED || 
            +rowData?.submitProfileStatus === STATUS_PENDING_TERMINATION || 
            +rowData?.submitProfileStatus === STATUS_ADDITIONAL_REQUEST_END_PROFILE || 
            +rowData?.submitProfileStatus === STATUS_REFUSE_REQUEST_END_PROFILE) 
            &&
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

  const handleCloseDialogProfile = () => {
    setShowDialogProfile(false);
    setRowData({});
  }
  
  return (
    <div className="m-sm-30">
      <Box mb={2}>
        <Breadcrumb
          routeSegments={[
            { name: t("Quản lý") },
            { name: t('Quản lý nhân viên')  },
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

          {showDialogUpdateHappening && (
            <UpdateHappeningsDialog
              rowData={rowData}
              setRowData={setRowData}
              showDialogUpdateHappening={showDialogUpdateHappening}
              handleCloseDialogUpdateHappening={handleCloseDialogUpdateHappening}
              readOnly= {true}
              getAllEmployee={getAllEmployee}
            />
          )}

          {showDialogProfile && (
            <ProfileInforDialog
              rowData={rowData}
              showDialogProfile={showDialogProfile}
              handleCloseDialogProfile={handleCloseDialogProfile}
              listCertificateEmployee={listCertificateEmployee}
              listFamilyEmployee={listFamilyEmployee}
              readOnly= {true}
            />
          )}
        </Grid>
      </Grid>
    </div>
  );
}

export default ManageEmployee;
