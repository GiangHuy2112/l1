import React, { useEffect } from "react";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Icon,
  IconButton,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
  List,
  ListSubheader,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { makeStyles } from "@material-ui/core/styles";
import { countObjectKeys, isBase64Image } from "utils";
import { useState } from "react";
import moment from "moment";
import dataEmployee, { DECLARE_STATUS_NEW, STATUS_ACCEPT_END_PROFILE, STATUS_ADDITIONAL_REQUEST, STATUS_PENDING_APPROVAL, STATUS_PENDING_TERMINATION, STATUS_REFUSE } from "app/constants/dataEmployeeContant";
import {
  AlternateEmail,
  Build,
  BusinessCenter,
  Cake,
  CardMembership,
  Create,
  Delete,
  Email,
  LocationOn,
  Phone,
  PlayArrow,
  SportsEsports,
  Wc,
  Work,
} from "@material-ui/icons";
import LeaderSubmitDialog from "../AddEmployee/leaderSubmitDialog";
import PromoteModal from "./promoteModal";
import SalaryIncModal from "./salaryIncModal";
import ProposalModal from "./proposalModal";
import ApprovalConfirmDialog from "app/views/Leader/Approval/approvalConfirmDialog";
import AdditionalReqDialog from "app/views/Leader/Approval/additionalRequestDialog";
import RefuseApprovalDialog from "app/views/Leader/Approval/refuseApprovalDialog";
import ResignationModal from "./resignationModal";

const useStyles = makeStyles({
  dialogTitle: {
    paddingTop: 5,
    paddingBottom: 5,
    borderBottom: "1px solid #eee",
  },
  titleDialog: {
    fontSize: "25px",
    fontWeight: "500",
    color: "#409b3e",
  },
  iconClose: {
    position: "absolute",
    right: "10px",
    top: "4px",
  },
  sidebar: {
    padding: "0px !important",
    height: "100% !important",
    borderRight: `1px solid #eee`,
  },
  tabs: {},
  tab: {
    justifyContent: "flex-start",
    textAlign: "left",
  },
  dialogContent: {
    height: "800px",
    display: "flex",
    padding: "8px 12px 0px 12px",
    overflow: "hidden",
  },
  large: {
    width: "200px",
    height: "200px",
    marginBottom: 10,
  },
  contentContainer: {
    padding: "40px 50px",
  },
  contentLeft: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  textWhite: {
    color: "#fff !important",
  },
  listBasicInfor: {
    marginTop: 10,
  },
  contentRight: {
    height: "100%",
    overflow: "auto",
  },
  input: {
    borderBottom: "1px dotted #000",
    lineHeight: "1.6rem",
    fontSize: "16px",
    marginTop: "0",
    marginBottom: "10px",
  },
  btnAdd: {
    transform: "rotate(90deg)",
  },
  btnClose: {
    transform: "rotate(270deg)",
  },
  formContainer: {
    width: "100% !important",
    padding: "10px 28px",
    marginBottom: "20px",
  },
  flex: {
    display: "flex",
    alignItems: "start",
    gap: "20px",
    fontSize: "16px",
    padding: "0 10px !important",
    margin: "5px 0",
  },
  btnCustom: {
    backgroundColor: "red",
    color: "white",
    "&:hover": {
      backgroundColor: "#ba1414",
    },
  },
  btnContainer: {
    marginTop: "10px",
    padding: "0 10px",
  },
  inputExps: {
    width: "100%",
  },
  listExps: {
    padding: "0 16px",
  },
  itemExps: {
    borderBottom: "1px solid #eee",
    fontSize: "15px",
    marginBottom: "10px",
  },
  headerCV: {
    textAlign: "center",
    paddingTop: "40px !important;"
  },
  borderLeft: {
    borderLeft: "1px solid #000",
  },
  padding: {
    padding: "0 20px",
  },
  positionLeft: {
    position: "relative",
    left: "-30px",
  },
  contentCV: {
    padding: "0 20px",
    height: "100%",
    overflowY: "auto",
    backgroundColor: "#eee"
  },
  bottomCV: {
    textAlign: "center",
  },
  disable: {
    color: "#000 !important",
  },
  btnSuccess: {
    backgroundColor: "#2e7d32",
    color: "#fff",
    "&:hover": {
      textDecoration: "none",
      backgroundColor: "rgb(27, 94, 32)",
      boxShadow: "rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px",
    } 
  }
});

export default function ModalUpdateHappenings({
  showModal,
  handleCloseModal=() => {},
  label,
  rowData={},
  setRowData=()=>{},
  rowDataModal={},
  getAllEmployee=()=>{},
  setRowDataModal=() => {},
  listDataModal=[],
  setListDataModal=() => {},
  readOnly=false,
  isLeader=false,
}) {
  const classes = useStyles();
  const [showLeaderSubmitDialog, setShowLeaderSubmitDialog] =
    React.useState(false);
  const [showApprovalDialog, setShowApprovalDialog] = useState(false);
  const [showAdditionalReqDialog, setShowAdditionalReqDialog] = useState(false);
  const [showRefuseDialog, setShowRefuseDialog] = useState(false);
  const handleOpenDialogSubmitLeader = () => {
    setShowLeaderSubmitDialog(true);
  }
  const handleCloseDialogSubmitLeader = () => {
    setShowLeaderSubmitDialog(false);
  }

  const handleOpenDialogApproval = () => {
    setShowApprovalDialog(true)
  }
  const handleCloseDialogApproval = () => {
    setShowApprovalDialog(false)
  }

  const handleOpenDialogAdditionalReq = () => {
    setShowAdditionalReqDialog(true)
  }
  const handleCloseDialogAdditionalReq = () => {
    setShowAdditionalReqDialog(false)
  }

  const handleOpenDialogRefuse = () => {
    setShowRefuseDialog(true)
  }
  const handleCloseDialogRefuse = () => {
    setShowRefuseDialog(false)
  }
console.log(rowDataModal);
  return (
    <Dialog
      maxWidth="lg"
      fullWidth={true}
      open={showModal}
      onClose={handleCloseModal}
    >
      <DialogTitle className={classes.dialogTitle}>
        <span className={classes.titleDialog}>{"Biểu mẫu"}</span>
        <IconButton
          className={classes.iconClose}
          onClick={() => handleCloseModal()}
        >
          <Icon color="error" title={"close"}>
            close
          </Icon>
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Grid item lg={2} md={2} sm={12} xs={12} className={classes.sidebar}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            aria-label="Vertical tabs example"
            className={classes.tabs}
            value={0}
          >
            <Tab className={classes.tab} label={label} />
          </Tabs>
        </Grid>
        <Grid className={classes.contentContainer} container spacing={3}>
          {label === "Tăng lương" && 
          <SalaryIncModal
              rowData={rowData}
              rowDataModal={rowDataModal}
              readOnly={true}
          />}
          {label === "Thăng chức" && 
          <PromoteModal 
              rowData={rowData}
              rowDataModal={rowDataModal}
              readOnly={true}
          />}
          {label === "Đề xuất tham mưu" && 
          <ProposalModal 
              rowData={rowData}
              rowDataModal={rowDataModal}
              readOnly={true}
          />}
          {
            label === "Đơn xin nghỉ việc" &&
            <ResignationModal 
              rowData={rowData}
              setRowData={setRowData}
              readOnly={true}
              isLeader={isLeader}
            />
          }
          
        </Grid>
      </DialogContent>
      {
        showLeaderSubmitDialog &&
        <LeaderSubmitDialog
          rowData={rowData}
          setRowData={setRowData}
          showLeaderSubmitDialog={showLeaderSubmitDialog}
          getAllEmployee={getAllEmployee}
          handleCloseModal={handleCloseModal}
          handleCloseDialogSubmitLeader={handleCloseDialogSubmitLeader}
          rowDataModal={rowDataModal}
          listDataModal={listDataModal}
          setListDataModal={setListDataModal}
          type="end_profile"
        />
      }
      <DialogActions style={{ justifyContent: "center", textAlign: "center" }}>
        <div className="flex flex-space-between flex-middle mb-5">
            {
              (+rowDataModal?.proposalStatus === DECLARE_STATUS_NEW || +rowDataModal?.processStatus === DECLARE_STATUS_NEW || +rowDataModal?.salaryIncreaseStatus === DECLARE_STATUS_NEW
                || +rowDataModal?.proposalStatus === STATUS_ADDITIONAL_REQUEST || +rowDataModal?.processStatus === STATUS_ADDITIONAL_REQUEST || +rowDataModal?.salaryIncreaseStatus === STATUS_ADDITIONAL_REQUEST
                || +rowDataModal?.proposalStatus === STATUS_REFUSE || +rowDataModal?.processStatus === STATUS_REFUSE || +rowDataModal?.salaryIncreaseStatus === STATUS_REFUSE
                || label==="Đơn xin nghỉ việc"
                )
              && !isLeader && +rowData.submitProfileStatus !== STATUS_ACCEPT_END_PROFILE &&
              <Button
              variant="contained"
              className="mr-12"
              color="primary"
              onClick={handleOpenDialogSubmitLeader}
            >
              TRÌNH LÃNH ĐẠO
            </Button>
            }
            {
              (+rowDataModal?.proposalStatus === STATUS_PENDING_APPROVAL || +rowDataModal?.processStatus === STATUS_PENDING_APPROVAL || +rowDataModal?.salaryIncreaseStatus === STATUS_PENDING_APPROVAL || +rowData.submitProfileStatus === STATUS_PENDING_TERMINATION) &&
               !readOnly &&
              <>
              <Button
              variant="contained"
              className={classes.btnSuccess + " mr-12"}
              onClick={handleOpenDialogApproval}
            >
              DUYỆT
            </Button>
            <Button
              variant="contained"
              className="mr-12"
              color="primary"
              onClick={handleOpenDialogAdditionalReq}
            >
              YÊU CẦU BỔ SUNG
            </Button>
            <Button
              variant="contained"
              className="mr-12"
              color="secondary"
              onClick={handleOpenDialogRefuse}
            >
              TỪ CHỐI
            </Button>
            </>
            }
          <Button
            variant="contained"
            className={`mr-12 ${classes.btnCustom}`}
            color="default"
            onClick={() => {
              handleCloseModal();
            }}
          >
            HỦY
          </Button>
        </div>
      </DialogActions>

        {
        showApprovalDialog && 
        <ApprovalConfirmDialog
          showApprovalDialog={showApprovalDialog}
          handleCloseDialogApproval={handleCloseDialogApproval}
          handleCloseModal={handleCloseModal}
          rowData={rowData}
          setRowData={setRowData}
          rowDataModal={rowDataModal}
          listDataModal={listDataModal}
          setRowDataModal={setRowDataModal}
          getAllEmployee={getAllEmployee}
          label={label}
          setListDataModal={setListDataModal}
          
        />
      }

      {
        showAdditionalReqDialog &&
        <AdditionalReqDialog
          showAdditionalReqDialog={showAdditionalReqDialog}
          rowData={rowData}
          setRowData={setRowData}
          rowDataModal={rowDataModal}
          setRowDataModal={setRowDataModal}
          listDataModal={listDataModal}
          setListDataModal={setListDataModal}
          getAllEmployee={getAllEmployee}
          handleCloseDialogAdditionalReq={handleCloseDialogAdditionalReq}
          handleCloseModal={handleCloseModal}
        />
      }
      {
        showRefuseDialog &&
        <RefuseApprovalDialog 
          showRefuseDialog={showRefuseDialog}
          rowData={rowData}
          setRowData={setRowData}
          rowDataModal={rowDataModal}
          setRowDataModal={setRowDataModal}
          listDataModal={listDataModal}
          setListDataModal={setListDataModal}
          getAllEmployee={getAllEmployee}
          handleCloseModal={handleCloseModal}
          handleCloseDialogRefuse={handleCloseDialogRefuse}
        />
      }
    </Dialog>
  );
}
