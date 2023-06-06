import React, { useState, useEffect } from "react";
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
} from "@material-ui/core";
import { SelectValidator, TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import {
  addEmployee,
  editEmployee,
  getProvinces,
  getDistrictsByProvinceId,
  getWardsByDistrictId,
} from "./addEmployeeService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { STATUS_CODE_SUCCESS} from "../../../constants/statusContant"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  dialogTitle: {
    paddingBottom: 0,
    borderBottom: "1px solid #eee"   
  },
  titleDialog: {
    fontSize: "25px",
    fontWeight: "500",
    color: "#409b3e",
  },
  dialogContent: {
    paddingTop: "20px !important",
    paddingBottom: "20px !important",
    borderBottom: "1px solid #eee"   
  },
  iconClose: {
    position: "absolute", 
    right: "10px",
    top: "10px" 
  }

});

export default function EmployeeDialogSubmit(props) {
  const classes = useStyles();
  const { showDialogSubmit, handleCloseDialog, rowData, setRowData, getAllEmployee } = props;


  const handleChangeInput = (e) => {
    setRowData({ ...rowData, [e.target.name]: e.target.value });
  };


  const submitEmployeeSuccessed = (message) => {
    getAllEmployee();
    toast.success(message);
    handleCloseDialog();
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      if (rowData?.id) {
          const res = await editEmployee(rowData)
          if (res?.data && res?.data.code === STATUS_CODE_SUCCESS) {
            submitEmployeeSuccessed("Sửa nhân viên thành công")
          } else {
            toast.warning(res.data.message);
          }
        } 
      else {
          const res = await addEmployee(rowData)
          if (res?.data && res?.data?.code === STATUS_CODE_SUCCESS) {
            submitEmployeeSuccessed("Thêm nhân viên thành công")
          } else {
            toast.warning(res.data.message);
          }   
        }
    } catch (error) {
        toast.error("Có lỗi");
      }
  };

  return (
    <Dialog maxWidth="md" fullWidth={true} open={showDialogSubmit} onClose={handleCloseDialog}>
      <DialogTitle className={classes.dialogTitle}>
        <span className={classes.titleDialog}>{rowData.id ? "Sửa nhân viên" : "Thêm nhân viên"}</span>
        <IconButton className={classes.iconClose} onClick={() => handleCloseDialog()}>
          <Icon color="error"
              title={"close"}>
              close
          </Icon>
      </IconButton>
      </DialogTitle>
      <ValidatorForm onSubmit={handleOnSubmit}>
        <DialogContent className={classes.dialogContent}>
          <Grid className="" container spacing={2}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextValidator
                className="w-100"
                variant="outlined"
                label={
                  <span className="font">
                    <span style={{ color: "red" }}> * </span>
                    Tên
                  </span>
                }
                type="text"
                value={rowData.name || ""}
                name="name"
                size="small"
                validators={["required","isNameValid"]}
                errorMessages={[
                  "Trường này không được để trống",
                  "Tên không chứa số, các ký tự đặc biệt và khoảng trắng ở đầu và cuối tên",
                ]}
                onChange={handleChangeInput}
              />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextValidator
                className="w-100"
                variant="outlined"
                label={
                  <span className="font">
                    <span style={{ color: "red" }}> * </span>
                    Code
                  </span>
                }
                type="text"
                value={rowData.code || ""}
                name="code"
                size="small"
                validators={["required", "isCodeValid"]}
                errorMessages={[
                  "Trường này không được để trống",
                  "Mã sai định dạng (không có khoảng trắng và độ dài 6-10 ký tự)",
                ]}
                onChange={handleChangeInput}
              />
            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextValidator
                className="w-100"
                variant="outlined"
                label={
                  <span className="font">
                    <span style={{ color: "red" }}> * </span>
                    Tuổi
                  </span>
                }
                type="text"
                value={rowData.age || ""}
                name="age"
                size="small"
                validators={[
                  "required",
                  "isNumber",
                  "minNumber:1",
                  "maxNumber:100",
                ]}
                errorMessages={[
                  "Trường này không được để trống",
                  "Tuổi phải là 1 số",
                  "Tuổi phải lớn hơn 0!!!",
                  "Tuổi phải nhỏ hơn 100!!!",
                ]}
                onChange={handleChangeInput}
              />
            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextValidator
                className="w-100"
                variant="outlined"
                label={
                  <span className="font">
                    <span style={{ color: "red" }}> * </span>
                    Email
                  </span>
                }
                type="text"
                value={rowData.email || ""}
                name="email"
                size="small"
                validators={["required", "isEmail"]}
                errorMessages={[
                  "Trường này không được để trống",
                  "Email sai định dạng!!!",
                ]}
                onChange={handleChangeInput}
              />
            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12}>
              <TextValidator
                className="w-100"
                variant="outlined"
                label={
                  <span className="font">
                    <span style={{ color: "red" }}> * </span>
                    Số điện thoại
                  </span>
                }
                
                value={rowData.phone || ""}
                name="phone"
                size="small"
                validators={["required", "isPhoneNumberValid"]}
                errorMessages={[
                  "Trường này không được để trống",
                  "Số điện thoại có độ dài 11 chữ số",
                ]}
                onChange={handleChangeInput}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <div className="flex flex-space-between flex-middle mt-10">
            <Button
              variant="contained"
              className="mr-12"
              color="secondary"
              onClick={() => {
                handleCloseDialog();
              }}
            >
              Hủy
            </Button>
            <Button
              type="submit"
              variant="contained"
              className="mr-12"
              color="primary"
            >
              Lưu
            </Button>
          </div>
        </DialogActions>
      </ValidatorForm>
    </Dialog>
  );
}
