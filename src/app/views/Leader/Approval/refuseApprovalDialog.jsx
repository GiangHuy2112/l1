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

import { STATUS_ACCEPTED, STATUS_ADDITIONAL_REQUEST, STATUS_REFUSE } from "app/constants/dataEmployeeContant";
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
    overflow: "unset",
  }
});

export default function RefuseApprovalDialog(props) {
  const classes = useStyles();
  const { 
    showRefuseDialog, 
    handleCloseDialogRefuse = () => {}, 
    handleCloseDialogProfile  = () => {}, 
    rowData, 
    setRowData, 
    getAllEmployee=() => {},
    rowDataModal={},
    setRowDataModal,
    listDataModal,
    setListDataModal,
    handleCloseModal=()=>{}
  } = props;
    
  const handleChangeInput = (e) => {
    if(Object.keys(rowDataModal).length > 0) {
      setRowDataModal({ ...rowDataModal, [e.target.name]: e.target.value });
    }
    else {  
      setRowData({ ...rowData, [e.target.name]: e.target.value });
    }
  };

  const updateDataModal = (data) => {
      const listDataModalNew = listDataModal.map(item => {
      if(item.id === data.id) {
        return data
      }
      return item
    })
    toast.success("Từ chối thành công thành công")
    handleCloseDialogRefuse()
    handleCloseModal()
    getAllEmployee()
    setListDataModal(listDataModalNew)
  }
  console.log(rowDataModal);
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
     if(Object.keys(rowDataModal).length > 0) {
        if(rowDataModal.proposalStatus) {
              const rowDataModalUpdate = {
                ...rowDataModal,
                proposalStatus: STATUS_REFUSE,
                leaderId: rowData.leaderId
              }
              const resUpdateModal = await editProposalEmployee(rowDataModalUpdate)
              if(resUpdateModal?.data?.data) {
                updateDataModal(resUpdateModal.data.data)
              }
            }
            if(rowDataModal.processStatus) {
              const rowDataModalUpdate = {
                ...rowDataModal,
                processStatus: STATUS_REFUSE,
                leaderId: rowData.leaderId
                
              }
              const resUpdateModal = await editPromoteEmployee(rowDataModalUpdate)
              if(resUpdateModal?.data?.data) {
                updateDataModal(resUpdateModal.data.data)
              }
            }
            if(rowDataModal.salaryIncreaseStatus) {
              const rowDataModalUpdate = {
                ...rowDataModal,
                salaryIncreaseStatus: STATUS_REFUSE,
                leaderId: rowData.leaderId
              }
              const resUpdateModal = await editSalaryIncEmployee(rowDataModalUpdate)
              if(resUpdateModal?.data?.data) {
                updateDataModal(resUpdateModal.data.data)
              }
            }    
      }
      else {
        const employeeUpdate = {
            ...rowData,
            submitProfileStatus: STATUS_REFUSE
        }
        const res = await editEmployee(employeeUpdate)
        if(res?.data?.data) {
            toast.success("Từ chối thành công")
            handleCloseDialogRefuse()
            handleCloseDialogProfile()
            getAllEmployee()
        }
      else {
        toast.warning(res?.data?.message)
      }
      }
    
    } catch (error) {
        toast.error("Có lỗi");
      }
  };

  return (
    <Dialog maxWidth="xs" fullWidth={true} open={showRefuseDialog} onClose={handleCloseDialogRefuse}>
      <DialogTitle className={classes.dialogTitle}>
        <span className={classes.titleDialog}>{"Từ chối phê duyệt"}</span>
        <IconButton className={classes.iconClose} onClick={() => handleCloseDialogRefuse()}>
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
                    Thời gian
                </span>
                }
                type="date"  
                value={Object.keys(rowDataModal).length > 0 
                  ? rowDataModal.rejectionDate ? moment(rowDataModal?.rejectionDate).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD')
                  : rowData.rejectionDate ? moment(rowData?.rejectionDate).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD')}           
                name="rejectionDate"
                size="small"
                InputLabelProps={{
                shrink: true,
                }}
                onChange={handleChangeInput}
            />
            </Grid>
                 <Grid item lg={12} md={12} sm={12} xs={12}>
            <TextValidator
                multiline={true}
                rows={4}
                className="w-100"
                variant="outlined"
                label={
                <span className="font">
                    <span style={{ color: "red" }}> * </span>
                    Lý do
                </span>
                }
                type="text"
                value={Object.keys(rowDataModal).length > 0 ? rowDataModal.reasonForRefusal : rowData.reasonForRejection || ""}
                name={Object.keys(rowDataModal).length > 0 ? "reasonForRefusal" : "reasonForRejection"}
                size="small"
                validators={["required"]}
                errorMessages={[
                "Trường này không được để trống"
                ]}
                onChange={handleChangeInput}
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
                  handleCloseDialogRefuse()
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
