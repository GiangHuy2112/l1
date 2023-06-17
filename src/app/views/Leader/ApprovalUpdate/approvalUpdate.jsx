import React from "react";
import { Box, Grid, Icon, IconButton, Paper, Tab, Tabs } from "@material-ui/core";
import { Breadcrumb } from "egret";
import "react-toastify/dist/ReactToastify.css";

import dataEmployee, { STATUS_PENDING_APPROVAL } from "app/constants/dataEmployeeContant";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import TableComp from "app/views/Component/TableComp/TableComp";
import { getListPromoteByCurrentLeader, getListProposalByCurrentLeader, getListSalaryIncByCurrentLeader } from "app/views/Manage/ManageEmployee/manageEmployeeService";
import { makeStyles } from '@material-ui/core/styles';
import moment from "moment";
import ModalUpdateHappenings from "app/views/Manage/Modals/modal";
import { getEmployeeById } from "app/views/Manage/AddEmployee/addEmployeeService";
const useStyles = makeStyles({
    table: {
        height: "470px",
        overflow: "auto",
        marginTop: "20px"
    }
})
function ApprovalEmployee({t, i18n }) {
    const classes = useStyles();
    const [listProposal, setlistProposal] = useState([])
    const [listPromote, setlistPromote] = useState([])
    const [listIncSalary, setlistIncSalary] = useState([])
    const [rowDataModal, setRowDataModal] = useState({});
    const [rowData, setRowData] = useState({});
    const [valueDialog, setValueDialog] = React.useState(0);
    const [showModal, setShowModal] = useState(false);
    const getListApprovalCurrentLeader = async () => {
        try {
            const resProposal = await getListProposalByCurrentLeader()
            const resPromote = await getListPromoteByCurrentLeader()
            const resIncSalary= await getListSalaryIncByCurrentLeader()
            if(resProposal?.data?.data) {
                setlistProposal(resProposal.data.data)
            }
            if(resPromote?.data?.data) {
                setlistPromote(resPromote.data.data)
            }
            if(resIncSalary?.data?.data) {
                setlistIncSalary(resIncSalary.data.data)
            }
        } catch (error) {
            toast.error("Có lỗi")
        }
    }

  useEffect(() => {
    getListApprovalCurrentLeader()
  }, [])


  const handleViewEmployee = async (rowDataModal) => {
    try {
        const res = await getEmployeeById(rowDataModal.employeeId)
        if(res?.data?.data) {
            setRowData(res?.data?.data)
        }
    } catch (error) {
        toast.error("Có lỗi")
    }
      setRowDataModal(rowDataModal);
    setShowModal(true);

  }

  const handleCloseModal = () => {
    setShowModal(false);
    setRowDataModal({})
    setRowData({})
  }
   const handleChange = (event, newValue) => {
    setValueDialog(newValue);
  };

  const columnsProposal = [
    { 
      title: "STT",
      render: (rowDataModal) => rowDataModal?.tableData?.id + 1,
    },
    {
      title: "Thao tác",
      field: "action",
      render: (rowDataModal) => {
        return (
          <div className="none_wrap">
              <IconButton
                size="small"
                onClick={() => handleViewEmployee(rowDataModal)}
              >
                <Icon color="primary">visibility</Icon>
              </IconButton> 
          </div>
        );
      },
    },
    { title: t("Ngày"), field: "proposalDate", render: (rowDataModal) => moment(rowDataModal.proposalDate).format('DD-MM-YYYY')},
    { title: t("Nội dung"), field: "content" },
    { title: t("Ghi chú"), field: "note" },
    { title: t("Loại"), field: "type" },
    { title: t("Trạng thái"), field: "proposalStatus", render:(rowDataModal) =>dataEmployee.status.find(status=>+rowDataModal.proposalStatus===status.id)?.name }
  ];

  
const columnsIncSalary = [
    { 
      title: "STT",
      render: (rowDataModal) => rowDataModal?.tableData?.id + 1,
    },
    {
      title: "Thao tác",
      field: "action",
      render: (rowDataModal) => {
        return (
          <div className="none_wrap">
              <IconButton
                size="small"
                onClick={() => handleViewEmployee(rowDataModal)}
              >
                <Icon color="primary">visibility</Icon>
              </IconButton> 
          </div>
        );
      },
    },
    { title: t("Ngày"), field: "startDate", render: (rowDataModal) => moment(rowDataModal.startDate).format('DD-MM-YYYY')},
    { title: t("Lương cũ"), field: "oldSalary" },
    { title: t("Lương mới"), field: "newSalary" },
    { title: t("Lý do"), field: "reason" },
    { title: t("Trạng thái"), field: "salaryIncreaseStatus", render:(rowDataModal) =>dataEmployee.status.find(status=>+rowDataModal.salaryIncreaseStatus===status.id)?.name }
  ];

  const columnsPromote = [
    { 
      title: "STT",
      render: (rowDataModal) => rowDataModal?.tableData?.id + 1,
    },
    {
      title: "Thao tác",
      field: "action",
      render: (rowDataModal) => {
        return (
          <div className="none_wrap">
              <IconButton
                size="small"
                onClick={() => handleViewEmployee(rowDataModal)}
              >
                <Icon color="primary">visibility</Icon>
              </IconButton> 
          </div>
        );
      },
    },
    { title: t("Ngày"), field: "promotionDay", render: (rowDataModal) => moment(rowDataModal.promotionDay).format('DD-MM-YYYY')},
    { title: t("Vị trí mới"), field: "newPosition", render:(rowDataModal) =>dataEmployee.position.find(position=>+rowDataModal.newPosition===position.id)?.name },
    { title: t("Ghi chú"), field: "note" },
    { title: t("Trạng thái"), field: "processStatus", render:(rowDataModal) =>dataEmployee.status.find(status=>+rowDataModal.processStatus===status.id)?.name }
  ];
  
  return (
    <div className="m-sm-30">
      <Box mb={2}>
        <Breadcrumb
          routeSegments={[
            { name: t("Lãnh đạo") },
            { name: t('Chờ duyệt')  },
          ]}
        />
      </Box>

      <Grid container spacing={2} justify="space-between">
        <Grid item xs={12}>
            <Paper className="tabs-container">
        <Tabs
          value={valueDialog}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label={`Tăng lương (${listIncSalary.length})`} />
          <Tab label= {`Thăng chức (${listPromote.length})`} />
          <Tab label={`Đề xuất tham mưu (${listProposal.length})`} />
        </Tabs>
      </Paper>
          <div className={classes.table}>
            <TableComp
            listData={valueDialog === 0 ? listIncSalary : valueDialog === 1 ? listPromote : listProposal} 
            columns={valueDialog === 0 ? columnsIncSalary : valueDialog === 1 ? columnsPromote : columnsProposal}
            onlyTable={true}
          />
          </div>
        </Grid>
      </Grid>
      {
            showModal &&
            <ModalUpdateHappenings
              label={valueDialog === 0 ? "Tăng lương" : valueDialog === 1 ? "Thăng chức" : "Đề xuất tham mưu"}
              rowData={rowData}
              listDataModal={valueDialog === 0 ? listIncSalary : valueDialog === 1 ? listPromote : listProposal}
              setListDataModal={valueDialog === 0 ? setlistIncSalary : valueDialog === 1 ? setlistPromote : setlistProposal}
              setRowData={setRowData}
              rowDataModal={rowDataModal}
              setRowDataModal={setRowDataModal}
              handleCloseModal={handleCloseModal}
              showModal={showModal}
              isLeader={true}
            />
          }
    </div>
  );
}

export default ApprovalEmployee;
