import React from "react";
import {
    Avatar,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Typography,
} from "@material-ui/core";
import { SelectValidator, TextValidator } from "react-material-ui-form-validator";
import "react-toastify/dist/ReactToastify.css";
import dataEmployee from "app/constants/dataEmployeeContant";
import avatarDefault from "../../../public/assets/avatarDefault.jpg"
import { makeStyles } from '@material-ui/core/styles';
import moment from "moment";
import { isBase64Image } from "utils";
import { toast } from "react-toastify";
import { getLinkAvatarEmployee, uploadImageEmployee } from "./addEmployeeService";
import { STATUS_CODE_SUCCESS } from "app/constants/statusContant";
import { useState } from "react";
import { useEffect } from "react";
import ConstantList from "../../../appConfig";
const useStyles = makeStyles({
    formContainer: {
        height: "400px",
        display: 'flex',
        fontSize: "20px",
    },
  large: {
    width: "200px",
    height: "200px", 
  },
  avatarContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    alignItems: "center",
    marginTop: "30px"
  },
  hiddenInput: {
    display: "none !important",
  },
  uploadButton: {
    padding: "10px 20px",
    backgroundColor: "#6f8df9eb",
    borderRadius: "3px",
    cursor: "pointer",
    color: "#fff",
    "&:hover": {
        backgroundColor: "#5d7ef8eb",
    }
  }
});



export default function FormAddEmployee({rowData, setRowData, handleChangeInput}) {
    const classes = useStyles();  
    const [imagePreview, setImagePreview] = useState("")
    
   const uploadImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await uploadImageEmployee(formData)
    console.log(response);

    if (response?.status === STATUS_CODE_SUCCESS) {
      // Xử lý khi tải lên thành công

      setRowData({ ...rowData, image: response.data.name });
    } else {
      // Xử lý khi tải lên thất bại
      toast.error('Lỗi khi tải lên');
    }
  } catch (error) {
    toast.error('Lỗi khi tải lên', error);
  }
};

const handleImageChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    uploadImage(file);
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  }
};

console.log(rowData);

  return (
    
    <Grid className={classes.formContainer} container spacing={3}>
        <Grid className={classes.avatarContainer} item lg={3} md={3} sm={3} xs={3}>
            <Avatar className={classes.large} alt="Remy Sharp" src={isBase64Image(imagePreview) ? imagePreview : getLinkAvatarEmployee(rowData.image)} />  
            <input
                accept="image/*"
                hidden
                id="upload-image"
                type="file"
                onChange={handleImageChange}
                className={classes.hiddenInput}
            />
            <label htmlFor="upload-image" >
                <Typography
                    color="primary"
                    className={classes.uploadButton}
                >
                    Chọn ảnh
                </Typography>
            </label>    
        </Grid>
        <Grid item lg={9} md={9} sm={9} xs={9}>
            <Grid container spacing={3}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
        <TextValidator
            className="w-100"
            variant="outlined"
            label={
            <span className="font">
                <span style={{ color: "red" }}> * </span>
                Tên nhân viên
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
                    Mã nhân viên
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
                    Ngày sinh
                </span>
                }
                type="date"  
                value={rowData.dateOfBirth ? moment(rowData.dateOfBirth).format('YYYY-MM-DD') : ""}           
                name="dateOfBirth"
                size="small"
                placeholder=""
                validators={["required", "isDateOfBirthValid"]}
                errorMessages={[
                "Trường này không được để trống",
                "Tuổi phải nằm trong khoảng 18 - 60",
                ]}
                InputLabelProps={{
                shrink: true,
                }}
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
                    Giới tính
                    </span>
                }
                value={rowData.gender || ""}
                name="gender"
                onChange={handleChangeInput}
                validators={["required"]}
                errorMessages={["Trường này không được bỏ trống"]}
                >
                {dataEmployee.gender &&
                    dataEmployee.gender.map((item) => {
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
                    Nhóm
                    </span>
                }
                value={rowData.team || ""}
                name="team"
                onChange={handleChangeInput}
                validators={["required"]}
                errorMessages={["Trường này không được bỏ trống"]}
                >
                {dataEmployee.team &&
                    dataEmployee.team.map((item) => {
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
            <TextValidator
                className="w-100"
                variant="outlined"
                label={
                <span className="font">
                    <span style={{ color: "red" }}> * </span>
                    Số CCCD/CMT
                </span>
                }
                
                value={rowData.citizenIdentificationNumber || ""}
                name="citizenIdentificationNumber"
                size="small"
                validators={["required", "isCitizenIdNumberValid"]}
                errorMessages={[
                "Trường này không được để trống",
                "CCCD/CMT có độ dài 12 chữ số",
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
                    Ngày cấp thẻ
                </span>
                }
                type="date"  
                value={rowData.dateOfIssuanceCard ? moment(rowData.dateOfIssuanceCard).format('YYYY-MM-DD') : ""}           
                name="dateOfIssuanceCard"
                size="small"
                placeholder=""
                validators={["required"]}
                errorMessages={[
                "Trường này không được để trống",
                ]}
                InputLabelProps={{
                shrink: true,
                }}
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
                    Nơi cấp thẻ
                </span>
                }
                
                value={rowData.placeOfIssueCard || ""}
                name="placeOfIssueCard"
                size="small"
                validators={["required"]}
                errorMessages={[
                "Trường này không được để trống"
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
                    Địa chỉ cụ thể
                </span>
                }
                
                value={rowData.address || ""}
                name="address"
                size="small"
                validators={["required"]}
                errorMessages={[
                "Trường này không được để trống"
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
                    Dân tộc
                </span>
                }
                
                value={rowData.ethnic || ""}
                name="ethnic"
                size="small"
                onChange={handleChangeInput}
            />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextValidator
                className="w-100"
                variant="outlined"
                label={
                <span className="font">
                    Tôn giáo
                </span>
                }
                
                value={rowData.religion || ""}
                name="religion"
                size="small"
                onChange={handleChangeInput}
            />
            </Grid>
            </Grid>
        </Grid>
    </Grid>    
  );
}
