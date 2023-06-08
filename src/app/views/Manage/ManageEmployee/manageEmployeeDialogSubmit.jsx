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
} from "./manageEmployeeService";
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

  const [listProvince, setListProvince] = useState([]);
  const [listDistrict, setListDistrict] = useState([]);
  const [listWards, setListWards] = useState([]);

  useEffect( () => {
    try {
      const fetchData = async () => {
        const res = await getProvinces()  
        if(res?.data?.data) {
          setListProvince(res.data.data)
        }          
      }
      fetchData();
    } catch (error) {
      toast.error("Có lỗi!!!");
    }
  }, []);

  useEffect(() => {
    try {
      const fetchData = async () => {
        if (rowData.provinceId){
          const res = await getDistrictsByProvinceId(rowData.provinceId)
          if(res?.data?.data) {
            setListDistrict(res.data.data);
          }
        }
        if(rowData.districtId) {
          const res = await getWardsByDistrictId(rowData.districtId)
          if(res?.data?.data) {
            setListWards(res.data.data)
          }
        }     
      }
      fetchData();
    } catch (error) {
      toast.error("Có lỗi!!!")
    }
  }, [rowData.provinceId, rowData.districtId]);

  const handleChangeInput = (e) => {
    setRowData({ ...rowData, [e.target.name]: e.target.value });
  };

  const handleChangeAddress = (name, id) => {
    switch (name) {
      case "provinceId":
        setRowData({
          ...rowData,
          provinceId: id,
          districtId: "",
          wardsId: "",
        });
        setListWards([]);
        break;
      case "districtId":
        setRowData({ ...rowData, districtId: id, wardsId: "" });
        break;
      default:
        break;
    }
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
                  "Số điện thoại bắt đầu bằng 0 và có độ dài 10 chữ số.",
                ]}
                onChange={handleChangeInput}
              />
            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12}>
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
                      Tỉnh
                    </span>
                  }
                  value={rowData.provinceId || ""}
                  name="provinceId"
                  validators={["required"]}
                  errorMessages={["Trường này không được bỏ trống"]}
                  onChange={(e) =>
                    handleChangeAddress("provinceId", e.target.value)
                  }
                >
                  {listProvince &&
                    listProvince.map((item) => {
                      return (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name}
                        </MenuItem>
                      );
                    })}
                </SelectValidator>
              </FormControl>
            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12}>
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
                      Huyện
                    </span>
                  }
                  value={rowData.districtId || ""}
                  name="districtId"
                  validators={["required"]}
                  errorMessages={["Trường này không được bỏ trống"]}
                  onChange={(e) =>
                    handleChangeAddress("districtId", e.target.value)
                  }
                >
                  {listDistrict &&
                    listDistrict.map((item) => {
                      return (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name}
                        </MenuItem>
                      );
                    })}
                </SelectValidator>
              </FormControl>
            </Grid>

            <Grid item lg={6} md={6} sm={12} xs={12}>
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
                      Xã
                    </span>
                  }
                  value={rowData.wardsId || ""}
                  name="wardsId"
                  onChange={handleChangeInput}
                  validators={["required"]}
                  errorMessages={["Trường này không được bỏ trống"]}
                >
                  {listWards &&
                    listWards.map((item) => {
                      return (
                        <MenuItem key={item.id} value={item.id}>
                          {item.name}
                        </MenuItem>
                      );
                    })}
                </SelectValidator>
              </FormControl>
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
