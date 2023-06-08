import React from "react";
import {
  Button,
  FormControl,
  Grid,
  Icon,
  IconButton,
  MenuItem,
} from "@material-ui/core";
import { SelectValidator, TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import "react-toastify/dist/ReactToastify.css";
import { makeStyles } from '@material-ui/core/styles';
import moment from "moment";
import TableComp from "app/views/Component/TableComp/TableComp";
import { useState } from "react";
import { useEffect } from "react";
import { getFamilyByEmployee } from "./addEmployeeService";
import { toast } from "react-toastify";
import { ConfirmationDialog } from "egret";
import dataEmployee from "app/constants/dataEmployeeContant";

const useStyles = makeStyles({
  btnCustom: {
    backgroundColor: "red",
    color: "white",
    "&:hover": {
      backgroundColor: "#ba1414"
    }
  },
  formContainer: {
    padding: "20px"
  },
  tableContainer: {
    maxHeight: "390px",
    overflow: "auto"
  }
});



export default function FormAddEmployeeFamily({rowData, setRowData}) {
    const classes = useStyles();  
    
    const [listFamilyEmployee, setListFamilyEmployee] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [totalItems, setTotalItems] = useState(0);
    const [rowDataFamily, setRowDataFamily] = useState({})
    const [showDialogDelete, setShowDialogDelete] = useState(false);
    const [idFamily, setIdCertificate] = useState()
    const getListFamilyEmployee = async () => {
    try {
      if(rowData?.id) {
        const res = await getFamilyByEmployee(rowData.id)
        if(res?.data?.data) {
          setTotalItems(res.data.data.length)
          setListFamilyEmployee(res.data.data);
        }
      }
      else if(rowData?.employeeFamilyDtos?.length) {
        setListFamilyEmployee(rowData.employeeFamilyDtos)
      }
    } catch (error) {
      toast.error("Có lỗi!!!")
    }
  };

    useEffect(() => {
      getListFamilyEmployee();
    }, [page]);

    useEffect(() => {
      setRowData({...rowData, employeeFamilyDtos: listFamilyEmployee});
      setTotalItems(listFamilyEmployee.length)
    }, [listFamilyEmployee]);

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    const handleChangeInputFamily = (e) => {
      setRowDataFamily({ ...rowDataFamily, [e.target.name]: e.target.value });
    };

    const handleSave = (e) => {
      e.preventDefault()
      if(rowData.id) {
        
      }
      else {
        // Edit
        if(rowDataFamily.famId) {
          const listFamEmployee = listFamilyEmployee.map(item => {
            if(item.famId === rowDataFamily.famId) {
              return rowDataFamily
            }
            return item
          })

          setListFamilyEmployee(listFamEmployee)
          toast.success("Sửa quan hệ thành công")
        }
        // Add
        else {
          setListFamilyEmployee([
            ...listFamilyEmployee,
            {
              famId: moment().valueOf(),
              ...rowDataFamily
            }
          ])
          toast.success("Thêm mới quan hệ thành công")

        }
      }
      setRowDataFamily({})
    }
    
    const handleCancel = () => {
        setRowDataFamily({});
    };

    const handleFillInputToEdit = (rowDataFamily) => {
      setRowDataFamily(rowDataFamily)
    }

    const handleOpenDialogDelete = (id) => {
      setShowDialogDelete(true);
      setIdCertificate(id)
    }

    const handleDeleteFamily = () => {
     if(rowData.id) {

     }
     else {
      const listFamEmployee = listFamilyEmployee.filter(item => {
        return item.famId !== idFamily
      })
      setListFamilyEmployee(listFamEmployee)
        toast.success("Xóa quan hệ thành công")
     }
     setShowDialogDelete(false);
    }

    console.log(rowData);

    const columns = [
    { 
      title: "STT",
      render: (rowDataFamily) => rowDataFamily?.tableData?.id + 1,
    },
    {
      title: "Thao tác",
      field: "action",
      render: (rowDataFamily) => {
        return (
          <div className="none_wrap">
              <IconButton
                size="small"
                onClick={() => handleFillInputToEdit(rowDataFamily)}
              >
                <Icon color="primary">edit</Icon>
              </IconButton>
            
              <IconButton
                size="small"
                onClick={() => handleOpenDialogDelete(rowDataFamily.famId)}
              >
                <Icon style={{ color: "red", margin: "0px 0px 0px 10px" }}>
                  delete
                </Icon>
              </IconButton>
          </div>
        );
      },
    },
    
    { title: ("Họ và tên"), field: "name" },
    { title: ("Ngày sinh"), field: "dateOfBirth", render: (rowDataFamily) => moment(rowDataFamily.dateOfBirth).format('YYYY-MM-DD')  },
    { title: ("Địa chỉ"), field: "address" },
    { title: ("Quan hệ"), field: "relationShip", render:(rowDataFamily) =>dataEmployee.relationship.find(item=>rowDataFamily.relationShip===item.id)?.name },
    { title: ("Số CCCD/CMT"), field: "citizenIdentificationNumber" },
  ];
  return (
    <div className={classes.formContainer}>
      <ValidatorForm classes={classes.formContainer} onSubmit={handleSave}>
        <Grid className="" container spacing={2}>
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <TextValidator
              className="w-100"
              variant="outlined"
              label={
                <span className="font">
                  <span style={{ color: "red" }}> * </span>
                  Họ và tên
                </span>
              }
              type="text"
              value={rowDataFamily.name || ""}
              name="name"
              size="small"
              validators={["required", "isNameValid"]}
              errorMessages={[
                "Trường này không được để trống",
                "Tên người thân không chứa số, các ký tự đặc biệt và khoảng trắng ở đầu và cuối",
              ]}
              onChange={handleChangeInputFamily}
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
                    Giới tính
                    </span>
                }
                value={rowDataFamily.gender || ""}
                name="gender"
                onChange={handleChangeInputFamily}
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

        <Grid item lg={4} md={4} sm={12} xs={12}>
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
                value={rowDataFamily.dateOfBirth ? moment(rowDataFamily.dateOfBirth).format('YYYY-MM-DD') : ""}           
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
                onChange={handleChangeInputFamily}
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
                    Quan hệ gia đình
                    </span>
                }
                value={rowDataFamily.relationShip || ""}
                name="relationShip"
                onChange={handleChangeInputFamily}
                validators={["required"]}
                errorMessages={["Trường này không được bỏ trống"]}
                >
                {dataEmployee.relationship &&
                    dataEmployee.relationship.map((item) => {
                    return (
                        <MenuItem key={item.id} value={item.id}>
                        {item.name}
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
                label={
                <span className="font">
                    <span style={{ color: "red" }}> * </span>
                    Số CCCD/CMT
                </span>
                }
                
                value={rowDataFamily.citizenIdentificationNumber || ""}
                name="citizenIdentificationNumber"
                size="small"
                validators={["required", "isCitizenIdNumberValid"]}
                errorMessages={[
                "Trường này không được để trống",
                "CCCD/CMT có độ dài 12 chữ số",
                ]}
                onChange={handleChangeInputFamily}
            />
            </Grid>

        <Grid item lg={4} md={4} sm={12} xs={12}>
            <TextValidator
                className="w-100"
                variant="outlined"
                label={
                <span className="font">
                    <span style={{ color: "red" }}> * </span>
                    Địa chỉ cụ thể
                </span>
                }
                
                value={rowDataFamily.address || ""}
                name="address"
                size="small"
                validators={["required"]}
                errorMessages={[
                "Trường này không được để trống"
                ]}
                onChange={handleChangeInputFamily}
            />
            </Grid>
        <Grid item lg={4} md={4} sm={12} xs={12}>
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
                value={rowDataFamily.email || ""}
                name="email"
                size="small"
                validators={["required", "isEmail"]}
                errorMessages={[
                  "Trường này không được để trống",
                  "Email sai định dạng!!!",
                ]}
                onChange={handleChangeInputFamily}
              />
            </Grid>

            <Grid item lg={4} md={4} sm={12} xs={12}>
              <TextValidator
                className="w-100"
                variant="outlined"
                label={
                  <span className="font">
                    <span style={{ color: "red" }}> * </span>
                    Số điện thoại
                  </span>
                }
                type="text"
                value={rowDataFamily.phoneNumber || ""}
                name="phoneNumber"
                size="small"
                validators={["required", "isPhoneNumberValid"]}
                errorMessages={[
                  "Trường này không được để trống",
                  "Số điện thoại phải có 10 chữ số",
                ]}
                onChange={handleChangeInputFamily}
              />
            </Grid>
        
          <Grid item lg={4} md={4} sm={12} xs={12}>
          <div className="flex flex-space-center flex-middle mb-5" >
            <Button
              type="submit"
              variant="contained"
              className="mr-12"
              color="secondary"
              
            >
              {rowDataFamily.famId ? "SỬA" : "LƯU QUAN HỆ"}
            </Button>
            
            <Button
              variant="contained"
              className={`mr-12 ${classes.btnCustom}`}
              color="default"
              onClick={() => {
                handleCancel();
              }}
            >
              HỦY
            </Button>
            
          </div>
          </Grid>
        </Grid>  
      </ValidatorForm>
      <div className={classes.tableContainer}>
        <TableComp
          listData={listFamilyEmployee} 
          columns={columns} page={page} 
          handleChangePage={handleChangePage} 
          totalItems={totalItems} 
          rowsPerPage={rowsPerPage} 
          handleChangeRowsPerPage={handleChangeRowsPerPage} 
        /> 
        {showDialogDelete && (
            <ConfirmationDialog
              title={"Xác nhận xóa quan hệ"}
              open={showDialogDelete}
              onConfirmDialogClose={() => setShowDialogDelete(false)}
              onYesClick={handleDeleteFamily}
              text={"Thao tác này sẽ xóa quan hệ vĩnh viễn"}
              Yes={"Xóa"}
              No={"Hủy bỏ"}
            />
          )}
      </div>
    </div>
  );
}
