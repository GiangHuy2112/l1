import React, { useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Icon,
  IconButton,
  Paper,
  Tab,
  Tabs,
} from "@material-ui/core";
import { ValidatorForm } from "react-material-ui-form-validator";
import {
  addEmployee,
  editEmployee,
} from "./addEmployeeService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { STATUS_CODE_SUCCESS} from "../../../constants/statusContant"
import { makeStyles } from '@material-ui/core/styles';
import FormAddEmployee from "./formAddEmloyee";
import FormAddCertificates from "./formAddCertificates";
import FormAddEmployeeFamily from "./formAddEmployeeFamily";
import { countObjectKeys } from "utils";
import { useState } from "react";

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
    minHeight: "390px",
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

export default function EmployeeDialogSubmit(props) {
  const classes = useStyles();
  const { showDialogSubmit, handleCloseDialog, rowData, setRowData, getAllEmployee } = props;
  const [isDisableRegisterBtn, setIsDisableRegisterBtn] = useState(true)
  const [valueDialog, setValueDialog] = React.useState(0);

  useEffect(() => {
    if(!rowData.id) {
      setRowData({
        certificatesDto: [],
        employeeFamilyDtos: []
      })
    }
  }, [])

  const handleChange = (event, newValue) => {
    setValueDialog(newValue);
  };

  const handleChangeInput = (e) => {
      setRowData({ ...rowData, [e.target.name]: e.target.value });
  };


  const submitEmployeeSuccessed = (message) => {
    getAllEmployee();
    toast.success(message);
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const excludedKeys = ["id", "certificatesDto", "employeeFamilyDtos", "ethnic", "religion"];
    if(countObjectKeys(rowData, excludedKeys) < 10 && valueDialog !== 0) {
      toast.warning("Hãy nhập đầy đủ thông tin của nhân viên")
      return
    }
    try {
      if (rowData?.id) {
          const res = await editEmployee(rowData)
          if (res?.data && res?.data.code === STATUS_CODE_SUCCESS) {
            submitEmployeeSuccessed("Sửa nhân viên thành công")
          } else {
            toast.warning(res?.data?.message);
          }
        } 
      else {
          const res = await addEmployee(rowData)
          if (res?.data && res?.data?.code === STATUS_CODE_SUCCESS) {
            submitEmployeeSuccessed("Thêm nhân viên thành công")
            setIsDisableRegisterBtn(false);
          } else {
            toast.warning(res?.data?.message);
          }   
        }
    } catch (error) {
        toast.error("Có lỗi");
      }
  };
  console.log(rowData);

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
      <Paper className="tabs-container">
        <Tabs
          value={valueDialog}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Thông tin nhân viên" />
          <Tab label="Thông tin văn bằng" />
          <Tab label="Quan hệ gia đình" />
        </Tabs>
      </Paper>
      {
        valueDialog === 1 && <FormAddCertificates rowData={rowData} handleChangeInput={handleChangeInput} setRowData={setRowData}/>
      }
      {
        valueDialog === 2 && <FormAddEmployeeFamily rowData={rowData} handleChangeInput={handleChangeInput} setRowData={setRowData}/>
      }
      <ValidatorForm onSubmit={handleOnSubmit}>
        { valueDialog === 0 &&
          <DialogContent className={classes.dialogContent}>
            <FormAddEmployee rowData={rowData} handleChangeInput={handleChangeInput} setRowData={setRowData}/>
          </DialogContent> 
        }
        <DialogActions style={{ justifyContent: 'center', textAlign: 'center' }}>
            <div className="flex flex-space-between flex-middle mb-5" >
              <Button
                type="submit"
                variant="contained"
                className="mr-12"
                color="secondary"
                disabled={!isDisableRegisterBtn}
              >
                LƯU
              </Button>
              <Button
                variant="contained"
                className="mr-12"
                color="primary"
                disabled={isDisableRegisterBtn}
              >
                ĐĂNG KÝ
              </Button>
              <Button
                variant="contained"
                className={`mr-12 ${classes.btnCustom}`}
                color="default"
                onClick={() => {
                  handleCloseDialog();
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
