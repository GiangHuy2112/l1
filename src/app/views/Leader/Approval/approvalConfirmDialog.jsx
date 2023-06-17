import React, { useEffect } from "react";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  Icon,
  IconButton,
  MenuItem,
  Paper,
  Tab,
  Tabs,
} from "@material-ui/core";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { makeStyles } from '@material-ui/core/styles';
import { useState } from "react";
import moment from "moment";

import { STATUS_ACCEPTED, STATUS_ACCEPT_END_PROFILE, STATUS_PENDING_APPROVAL, STATUS_PENDING_TERMINATION } from "app/constants/dataEmployeeContant";
import { editEmployee } from "app/views/Manage/AddEmployee/addEmployeeService";
import { editPromoteEmployee, editProposalEmployee, editSalaryIncEmployee } from "app/views/Manage/ManageEmployee/manageEmployeeService";

const useStyles = makeStyles({
  dialogTitle: {
    paddingTop: 5,
    paddingBottom: 5,
    borderBottom: "1px solid #eee"   
  },
  titleDialog: {
    fontSize: "25px",
    fontWeight: "500",
    color: "#409b3e",
  },
  dialogContent: {
    height: "410px",
    overflow: "auto",
    paddingTop: "20px !important",
    paddingBottom: "20px !important",
    borderBottom: "1px solid #eee",
  },
  iconClose: {
    position: "absolute", 
    right: "10px",
    top: "4px" 
  },
  btnCustom: {
    backgroundColor: "red",
    color: "white",
    "&:hover": {
      backgroundColor: "#ba1414"
    }
  },
  formContainer: {
    overflowY: "unset",
  }
});

export default function ApprovalConfirmDialog(props) {
  const classes = useStyles();
  const { 
    showApprovalDialog, 
    handleCloseDialogApproval = () => {}, 
    handleCloseDialogProfile = () => {}, 
    rowData, 
    rowDataModal={}, 
    listDataModal,
    setRowDataModal=() => {},
    setListDataModal = () => {},
    setRowData, 
    getAllEmployee=() => {}, 
    handleCloseModal=() => {}, 

  } = props;
    const [checked, setChecked] = useState(false)
    
  const handleChangeInput = (e) => {
      if((Object.keys(rowDataModal).length > 0)) {
        setRowDataModal({ ...rowDataModal, [e.target.name]: e.target.value });
      }
      else {
        setRowData({ ...rowData, [e.target.name]: e.target.value });
      }  
  };
  useEffect(() => {
    setRowData({
        ...rowData,
        appointmentDate: moment().format('YYYY-MM-DD')
    })
    setRowDataModal({
        ...rowDataModal,
        acceptanceDate: moment().format('YYYY-MM-DD')
    })
  },[])


  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if(!checked) {
        toast.warning("Bạn chưa chọn đủ điều kiện phê duyệt")
        console.log(rowData);
        return;
    }
    try {
    if(!rowDataModal.proposalStatus && !rowDataModal.processStatus  && !rowDataModal.salaryIncreaseStatus) {
      let employeeUpdate = {}
      if(+rowData.submitProfileStatus === STATUS_PENDING_TERMINATION) {
          employeeUpdate = {
            ...rowData,
          submitProfileStatus: STATUS_ACCEPT_END_PROFILE
        }
      }
      else {
         employeeUpdate = {
            ...rowData,
            submitProfileStatus: STATUS_ACCEPTED
        }
      }
      
        const res = await editEmployee(employeeUpdate)
        if(res?.data?.data) {
            toast.success("Phê duyệt thành công")
            handleCloseDialogApproval()
            handleCloseDialogProfile()
            getAllEmployee()
            handleCloseModal()
        }
      else {
        toast.warning(res?.data?.message)
      }
    } 
    else {
      if(rowDataModal.proposalStatus) {
        const rowDataModalUpdate = {
          ...rowDataModal,
          proposalStatus: STATUS_ACCEPTED,
          leaderId: rowData.leaderId
        }
        const res = await editProposalEmployee(rowDataModalUpdate)
          if(res?.data?.data) {
              toast.success("Phê duyệt đề xuất tham mưu thành công")
              const listDataModalUpdate = listDataModal.map(item => {
                if(item.id === res.data?.data.id) {
                  return res.data?.data
                }
                return item
              })
              setListDataModal(listDataModalUpdate)
              handleCloseDialogApproval()
              handleCloseModal()
          }
      }
      if(rowDataModal.processStatus) {
        const rowDataModalUpdate = {
          ...rowDataModal,
          processStatus: STATUS_ACCEPTED,
          leaderId: rowData.leaderId
        }
        const res = await editPromoteEmployee(rowDataModalUpdate)
          if(res?.data?.data) {
              toast.success("Phê duyệt thăng chức thành công")
              const listDataModalUpdate = listDataModal.map(item => {
                if(item.id === res.data?.data.id) {
                  return res.data?.data
                }
                return item
              })
              setListDataModal(listDataModalUpdate)
              handleCloseDialogApproval()
              handleCloseModal()
          }
      }
      if(rowDataModal.salaryIncreaseStatus) {
        const rowDataModalUpdate = {
          ...rowDataModal,
          salaryIncreaseStatus: STATUS_ACCEPTED,
          leaderId: rowData.leaderId
        }
        const res = await editSalaryIncEmployee(rowDataModalUpdate)
          if(res?.data?.data) {
              toast.success("Phê duyệt tăng lương thành công")
              const listDataModalUpdate = listDataModal.map(item => {
                if(item.id === res.data?.data.id) {
                  return res.data?.data
                }
                return item
              })
              setListDataModal(listDataModalUpdate)
              handleCloseDialogApproval()
              handleCloseModal()
          }
      }
    }
  } catch (error) {
      toast.error("Có lỗi");
    }
 
    
  };

  const handleCheck = () => {
    setChecked(!checked)
  }


  return (
    <Dialog maxWidth="xs" fullWidth={true} open={showApprovalDialog} onClose={handleCloseDialogApproval}>
      <DialogTitle className={classes.dialogTitle}>
        <span className={classes.titleDialog}>{"Xác nhận phê duyệt"}</span>
        <IconButton className={classes.iconClose} onClick={() => handleCloseDialogApproval()}>
          <Icon color="error"
              title={"close"}>
              close
          </Icon>
        </IconButton>
      </DialogTitle>
      
      
      <ValidatorForm onSubmit={handleOnSubmit}>

        <DialogContent className={classes.formContainer}>
            <Grid  container spacing={3}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
            <TextValidator
                className="w-100"
                variant="outlined"
                label={
                <span className="font">
                    Ngày hẹn
                </span>
                }
                type="date"  
                value={Object.keys(rowDataModal).length > 0 
                  ? rowDataModal.acceptanceDate ? moment(rowDataModal?.acceptanceDate).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD')
                  : rowData.appointmentDate ? moment(rowData?.appointmentDate).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD')} 

                name={(Object.keys(rowDataModal).length > 0) ? "acceptanceDate" : "appointmentDate" }
                size="small"
                InputLabelProps={{
                shrink: true,
                }}
                onChange={handleChangeInput}
            />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
            <FormControlLabel
                control={
                <Checkbox
                    checked={checked}
                    onChange={handleCheck}
                    name="eligible"
                    color="primary"
                />
                }
                label="Đã đủ điều kiện phê duyệt"
            />
            </Grid>
            </Grid> 
      </DialogContent>
        <DialogActions style={{ justifyContent: 'center', textAlign: 'center' }}>
            <div className="flex flex-space-between flex-middle mb-5" >
              <Button
                type="submit"
                variant="contained"
                className="mr-12"
                color="secondary"
              >
                XÁC NHẬN
              </Button>
              <Button
                variant="contained"
                className={`mr-12 ${classes.btnCustom}`}
                color="default"
                onClick={() => {
                  handleCloseDialogApproval()
                }}
              >
                HỦY
              </Button>
              
            </div>
        </DialogActions>
      </ValidatorForm>
    </Dialog>
  );
}
