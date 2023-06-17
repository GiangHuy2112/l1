import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Icon, IconButton, Paper, makeStyles } from "@material-ui/core";
import { Breadcrumb, ConfirmationDialog } from "egret";
import { toast } from "react-toastify";
import EmployeeDialogSubmit from "./addEmployeeDialogSubmit";
import { deleteEmployee, getCertificatesByEmployee, getFamilyByEmployee, getListEmployee } from "./addEmployeeService";
import "react-toastify/dist/ReactToastify.css";
import { STATUS_CODE_SUCCESS } from "app/constants/statusContant";
import dataEmployee, { STATUS_ADDITIONAL_REQUEST, STATUS_REFUSE } from "app/constants/dataEmployeeContant";
import TablePaginationComp from '../../Component/TablePagination/TablePagination';
import TableComp from "app/views/Component/TableComp/TableComp";
import ProfileInforDialog from "./profileInforDialog";

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
    height: "72px",
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
  }
});

function AlertDialog({showDialogAlert ,rowData, setRowData, getAllEmployee, handleCloseAlertDialog, handleFillInputToEdit=() => {}}) {
    const classes = useStyles();

    const [showDialogSubmit, setShowDialogSubmit] = useState(false);
    console.log(rowData);
    const handleChangeInfor = () => {
      
      if(rowData.submitProfileStatus) {
        setShowDialogSubmit(true);
      }
      else {
        handleCloseAlertDialog()
        setRowData(rowData);
      }
    }
    const handleCloseDialogSubmit = () => {
        setShowDialogSubmit(false);
        
    }
  return (
     <Dialog maxWidth="xs" fullWidth={true} open={showDialogAlert} onClose={handleCloseAlertDialog}>
      <DialogTitle className={classes.dialogTitle}>
        <span className={classes.titleDialog}>{
           +rowData.submitProfileStatus === STATUS_ADDITIONAL_REQUEST 
        || +rowData.proposalStatus === STATUS_ADDITIONAL_REQUEST
        || +rowData.processStatus === STATUS_ADDITIONAL_REQUEST 
        || +rowData.salaryIncreaseStatus === STATUS_ADDITIONAL_REQUEST 
         ? "Yêu cầu bổ sung" : "Từ chối"}</span>
        <IconButton className={classes.iconClose} onClick={() => handleCloseAlertDialog()}>
          <Icon color="error"
              title={"close"}>
              close
          </Icon>
        </IconButton>
      </DialogTitle>
     
          <DialogContent className={classes.dialogContent}>
            <Grid item lg={12} md={12} sm={12} xs={12} >
                <p>{
                +rowData.submitProfileStatus === STATUS_ADDITIONAL_REQUEST 
                || +rowData.proposalStatus === STATUS_ADDITIONAL_REQUEST
                || +rowData.processStatus === STATUS_ADDITIONAL_REQUEST 
                || +rowData.salaryIncreaseStatus === STATUS_ADDITIONAL_REQUEST 
                ? "Nội dung yêu cầu:" : "Lý do từ chối: "} {+rowData.submitProfileStatus === STATUS_ADDITIONAL_REQUEST 
                                                          || +rowData.proposalStatus === STATUS_ADDITIONAL_REQUEST
                                                          || +rowData.processStatus === STATUS_ADDITIONAL_REQUEST 
                                                          || +rowData.salaryIncreaseStatus === STATUS_ADDITIONAL_REQUEST  
                                                          ? rowData.additionalRequest : rowData.reasonForRejection || rowData.reasonForRefusal }
                </p>
            </Grid>
          </DialogContent> 
        
        <DialogActions style={{ justifyContent: 'center', textAlign: 'center' }}>
            <div className="flex flex-space-between flex-middle mb-5" >
              <Button
                variant="contained"
                className="mr-12"
                color="primary"
                onClick={handleChangeInfor}
              >
                CHỈNH SỬA THÔNG TIN
              </Button>
              <Button
                variant="contained"
                className={`mr-12 ${classes.btnCustom}`}
                color="default"
                onClick={() => {
                  handleCloseAlertDialog();
                }}
              >
                HỦY
              </Button>
            </div>
        </DialogActions>
        {showDialogSubmit && (
            <EmployeeDialogSubmit
              getAllEmployee={getAllEmployee}
              rowData={rowData}
              setRowData={setRowData}
              showDialogSubmit={showDialogSubmit}
              handleCloseDialog={handleCloseDialogSubmit}
              handleCloseAlertDialog={handleCloseAlertDialog}
            />
          )}
    </Dialog>
  );
}

export default AlertDialog;
