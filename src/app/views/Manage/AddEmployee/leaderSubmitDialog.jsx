import React, { useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  Icon,
  IconButton,
  MenuItem,
  Paper,
  Tab,
  Tabs,
} from "@material-ui/core";
import {
  SelectValidator,
  TextValidator,
  ValidatorForm,
} from "react-material-ui-form-validator";
import {
  addEmployee,
  editEmployee,
  getCertificatesByEmployee,
  getFamilyByEmployee,
  getImageEmployee,
  getLeaders,
} from "./addEmployeeService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { STATUS_CODE_SUCCESS } from "../../../constants/statusContant";
import { makeStyles } from "@material-ui/core/styles";
import FormAddEmployee from "./formAddEmloyee";
import FormAddCertificates from "./formAddCertificates";
import FormAddEmployeeFamily from "./formAddEmployeeFamily";
import { countObjectKeys } from "utils";
import { useState } from "react";
import ProfileInforDialog from "./profileInforDialog";
import moment from "moment";
import dataEmployee, {
  DECLARE_STATUS_NEW,
  STATUS_PENDING_APPROVAL,
  STATUS_PENDING_SUBMIT_MODAL,
  STATUS_PENDING_TERMINATION,
} from "app/constants/dataEmployeeContant";
import {
  editPromoteEmployee,
  editProposalEmployee,
  editSalaryIncEmployee,
} from "../ManageEmployee/manageEmployeeService";

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
    top: "4px",
  },
  btnCustom: {
    backgroundColor: "red",
    color: "white",
    "&:hover": {
      backgroundColor: "#ba1414",
    },
  },
});

export default function LeaderSubmitDialog(props) {
  const classes = useStyles();
  const {
    handleCloseAlertDialog = () => {},
    listDataModal,
    setListDataModal = () => {},
    rowDataModal = {},
    type,
    showLeaderSubmitDialog,
    handleCloseDialogSubmitLeader = () => {},
    handleCloseDialog = () => {},
    handleCloseDialogProfile = () => {},
    handleCloseModal = () => {},
    rowData,
    setRowData,
    getAllEmployee = () => {},
  } = props;
  const [listLeader, setListLeader] = useState([]);
  const getListLeader = async () => {
    try {
      const res = await getLeaders();
      if (res?.data?.data) {
        setListLeader(res.data.data);
      }
    } catch (error) {
      toast.error("Có lỗi");
    }
  };
  useEffect(() => {
    getListLeader();
    if (rowData.submitProfileStatus === DECLARE_STATUS_NEW) {
      setRowData({
        ...rowData,
        submitDay: moment().format("YYYY-MM-DD"),
      });
    } else {
      setRowData({
        ...rowData,
        endDay: moment().format("YYYY-MM-DD"),
      });
    }
  }, []);
  const handleChangeInput = (e) => {
    if (e.target.name === "leaderId") {
      const leaderPosition = listLeader.find(
        (item) => item.id === e.target.value
      ).leaderPosition;
      setRowData({
        ...rowData,
        [e.target.name]: e.target.value,
        leaderPosition: leaderPosition,
      });
    } else {
      setRowData({ ...rowData, [e.target.name]: e.target.value });
    }
  };

  console.log(rowData);

  const updateDataModal = (data) => {
    console.log(data);
    const listDataModalNew = listDataModal.map((item) => {
      if (+item.id === +data.id) {
        return data;
      }
      return item;
    });
    toast.success("Trình lãnh đạo thành công");
    setListDataModal(listDataModalNew);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      if (Object.keys(rowDataModal).length > 0) {
        // Khi trình lãnh đạo thì cập nhật status của rowDataModal thành đang chwof xử lý
        if (rowDataModal.proposalStatus) {
          const rowDataModalUpdate = {
            ...rowDataModal,
            proposalStatus: STATUS_PENDING_APPROVAL,
            leaderId: rowData.leaderId,
          };
          const resUpdateModal = await editProposalEmployee(rowDataModalUpdate);
          if (resUpdateModal?.data?.data) {
            updateDataModal(resUpdateModal.data.data);
          }
        }
        if (rowDataModal.processStatus) {
          const rowDataModalUpdate = {
            ...rowDataModal,
            processStatus: STATUS_PENDING_APPROVAL,
            leaderId: rowData.leaderId,
          };
          const resUpdateModal = await editPromoteEmployee(rowDataModalUpdate);
          if (resUpdateModal?.data?.data) {
            updateDataModal(resUpdateModal.data.data);
          }
        }
        if (rowDataModal.salaryIncreaseStatus) {
          const rowDataModalUpdate = {
            ...rowDataModal,
            salaryIncreaseStatus: STATUS_PENDING_APPROVAL,
            leaderId: rowData.leaderId,
          };
          const resUpdateModal = await editSalaryIncEmployee(
            rowDataModalUpdate
          );
          if (resUpdateModal?.data?.data) {
            updateDataModal(resUpdateModal.data.data);
          }
        } 
        handleCloseAlertDialog();
        getAllEmployee();
        handleCloseDialogSubmitLeader();
        handleCloseDialogProfile();
        handleCloseDialog();
        handleCloseModal();
      }
      else {
          let employeeUpdate = { ...rowData };
          console.log(employeeUpdate);
          if (type === "approval") {
            employeeUpdate = {
              ...rowData,
              submitProfileStatus: STATUS_PENDING_APPROVAL,
            };
          }
          if (type === "end_profile") {
            employeeUpdate = {
              ...rowData,
              submitProfileStatus: STATUS_PENDING_TERMINATION,
            };
          }
          const res = await editEmployee(employeeUpdate);
          if (res?.data?.code) {
            handleCloseAlertDialog();
            getAllEmployee();
            handleCloseDialogSubmitLeader();
            handleCloseDialogProfile();
            handleCloseDialog();
            handleCloseModal();
            toast.success("Trình lãnh đạo thành công")
          } else {
            toast.warning(res?.data?.message);
          }
        }
    } catch (error) {
      toast.error("Có lỗi");
    }
  };

  return (
    <Dialog
      maxWidth="md"
      fullWidth={true}
      open={showLeaderSubmitDialog}
      onClose={handleCloseDialogSubmitLeader}
    >
      <DialogTitle className={classes.dialogTitle}>
        <span className={classes.titleDialog}>{"Trình lãnh đạo"}</span>
        <IconButton
          className={classes.iconClose}
          onClick={() => handleCloseDialogSubmitLeader()}
        >
          <Icon color="error" title={"close"}>
            close
          </Icon>
        </IconButton>
      </DialogTitle>

      <ValidatorForm onSubmit={handleOnSubmit}>
        <DialogContent>
          <Grid className={classes.formContainer} container spacing={3}>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <TextValidator
                className="w-100"
                variant="outlined"
                label={<span className="font">Ngày gửi</span>}
                type="date"
                value={
                  rowData.submitProfileStatus === DECLARE_STATUS_NEW
                    ? rowData.submitDay
                      ? moment(rowData.submitDay).format("YYYY-MM-DD")
                      : moment().format("YYYY-MM-DD")
                    : rowData.endDay
                    ? moment(rowData.endDay).format("YYYY-MM-DD")
                    : moment().format("YYYY-MM-DD")
                }
                name={
                  rowData.submitProfileStatus === DECLARE_STATUS_NEW
                    ? "submitDay"
                    : "endDay"
                }
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleChangeInput}
              />
            </Grid>

            <Grid item lg={4} md={4} sm={12} xs={12}>
              <FormControl
                fullWidth
                variant="standard"
                sx={{ m: 1, minWidth: 120 }}
              >
                <SelectValidator
                  className="w-100"
                  variant="outlined"
                  size="small"
                  label={
                    <span className="font">
                      <span style={{ color: "red" }}> * </span>
                      Tên lãnh đạo
                    </span>
                  }
                  value={rowData.leaderId || ""}
                  name="leaderId"
                  onChange={handleChangeInput}
                  validators={["required"]}
                  errorMessages={["Trường này không được bỏ trống"]}
                >
                  {listLeader &&
                    listLeader.map((item) => {
                      return (
                        <MenuItem key={item.id} value={item.id}>
                          {item.leaderName}
                        </MenuItem>
                      );
                    })}
                </SelectValidator>
              </FormControl>
            </Grid>

            <Grid item lg={4} md={4} sm={12} xs={12}>
              <TextValidator
                className="w-100"
                variant="outlined"
                label={<span className="font">Chức vụ</span>}
                value={
                  dataEmployee.position.find(
                    (item) => item.id === rowData?.leaderPosition
                  )?.name || ""
                }
                size="small"
              />
            </Grid>

            <Grid item lg={12} md={12} sm={12} xs={12}>
              <TextValidator
                className="w-100"
                variant="outlined"
                placeholder="Nội dung"
                multiline
                rows={4}
                value={rowData.submitContent || ""}
                name="submitContent"
                size="small"
                validators={["required"]}
                errorMessages={["Trường này không được để trống"]}
                onChange={handleChangeInput}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions
          style={{ justifyContent: "center", textAlign: "center" }}
        >
          <div className="flex flex-space-between flex-middle mb-5">
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
                handleCloseDialogSubmitLeader();
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
