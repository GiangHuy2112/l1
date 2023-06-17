import React from "react";
import {
  Button,
  Grid,
  Icon,
  IconButton,
} from "@material-ui/core";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import "react-toastify/dist/ReactToastify.css";
import { makeStyles } from '@material-ui/core/styles';
import moment from "moment";
import TableComp from "app/views/Component/TableComp/TableComp";
import { useState } from "react";
import { useEffect } from "react"
import { toast } from "react-toastify";
import { ConfirmationDialog } from "egret";
import { STATUS_CODE_SUCCESS } from "app/constants/statusContant";
import { addSalaryIncEmployee, deleteSalaryIncEmployee, editSalaryIncEmployee } from "./manageEmployeeService";
import ModalUpdateHappenings from "../Modals/modal";
import dataEmployee, { DECLARE_STATUS_NEW, STATUS_ADDITIONAL_REQUEST, STATUS_REFUSE } from "app/constants/dataEmployeeContant";
import AlertDialog from "../AddEmployee/alertDialog";

const useStyles = makeStyles({
  btnCustom: {
    backgroundColor: "red",
    color: "white",
    "&:hover": {
      backgroundColor: "#ba1414"
    }
  },
  formContainer: {
    padding: "20px",
    height: "410px"
  },
  tableContainer: {
    height: "280px",
    overflowY: "auto",
    marginTop: "20px"
  }
});



export default function SalaryIncreaseForm({rowData, setRowData, listSalaryIncreaseEmployee, setListSalaryIncreaseEmployee, getAllEmployee}) {
    const classes = useStyles();  
    const [rowDataSalaryIncrease, setRowDataSalaryIncrease] = useState({})
    const [showDialogDelete, setShowDialogDelete] = useState(false);
    const [idSalaryIncrease, setIdSalaryIncrease] = useState()
    const [showDialogAlert, setShowDialogAlert] = useState(false);
    const [rowDataSalaryIncOld, setRowDataSalaryIncOld] = useState({})

    const [showModalSalaryInc, setShowModalSalaryInc] = useState(false);

    console.log(listSalaryIncreaseEmployee);
    const handleChangeInputSalaryIncrease = (e) => {
      setRowDataSalaryIncrease({ ...rowDataSalaryIncrease, [e.target.name]: e.target.value });
    };


    const handleSave = async (e) => {
      e.preventDefault()
      
      try {
        if(rowDataSalaryIncrease.id) {
          if(rowDataSalaryIncrease.salaryIncreaseStatus === STATUS_ADDITIONAL_REQUEST || rowDataSalaryIncrease.salaryIncreaseStatus === STATUS_REFUSE) {
            rowDataSalaryIncrease.salaryIncreaseStatus = DECLARE_STATUS_NEW
          }
          const res = await editSalaryIncEmployee(rowDataSalaryIncrease)
          if(res?.data?.data) {
            toast.success("Sửa tăng lương thành công")
            const listSalaryInc = listSalaryIncreaseEmployee.map(item => {
              if(item.id === res?.data?.data.id) {
                setRowDataSalaryIncrease(res.data.data)
                return res.data.data
              }
              return item
            })
            setListSalaryIncreaseEmployee(listSalaryInc)
          }
          else {
            toast.warning(res?.data?.message)
          }
        }
        else {
          const res = await addSalaryIncEmployee(rowData.id, rowDataSalaryIncrease);
          if(res?.data?.data) {
           setRowDataSalaryIncrease(res.data.data[0])
           setListSalaryIncreaseEmployee(res.data?.data)
           toast.success("Thêm mới tăng lương thành công")
          }
          else {
           toast.warning(res?.data?.message)
          }
        }
        handleOpenModalSalaryInc()
      } catch (error) {
        toast.error("Có lỗi")
      }
    }
    
    const handleCancel = () => {
        setRowDataSalaryIncrease({});
    };

    const handleFillInputToEdit = (rowDataSalaryIncrease) => {
      setRowDataSalaryIncrease(rowDataSalaryIncrease)
    }

    const handleOpenDialogDelete = (idSalaryInc) => {
      
      setShowDialogDelete(true);
      setIdSalaryIncrease(idSalaryInc)
    }

    const handleDeleteSalaryIncrease = async () => {
      try {
        const res = await deleteSalaryIncEmployee(idSalaryIncrease);
        if(res?.data?.code === STATUS_CODE_SUCCESS) {
          toast.success("Xóa tăng lương thành công");
          const listSalaryIncUpdate = listSalaryIncreaseEmployee.filter(item => item.id !== idSalaryIncrease)
          setListSalaryIncreaseEmployee(listSalaryIncUpdate)
          setShowDialogDelete(false);
          if(rowDataSalaryIncrease.id === idSalaryIncrease) {
            setRowDataSalaryIncrease({})
          }
        }
        else {
          toast.warning(res?.data?.message)
        }
      } catch (error) {
        toast.error("Có lỗi")
      }
    }

      const handleOpenModalSalaryInc = () => {
        setShowModalSalaryInc(true)
      }
      const handleCloseModalSalaryInc = () => {
        setRowDataSalaryIncrease({})
        setShowModalSalaryInc(false)
      }

      const handleViewEmployee = (rowDataSalaryIncrease) => {
        if(+rowDataSalaryIncrease.salaryIncreaseStatus === STATUS_ADDITIONAL_REQUEST || +rowDataSalaryIncrease.salaryIncreaseStatus === STATUS_REFUSE ) {
          setShowDialogAlert(true)
          setRowDataSalaryIncOld(rowDataSalaryIncrease)
        }
        else {
          setRowDataSalaryIncrease(rowDataSalaryIncrease);
          handleOpenModalSalaryInc(true)
        }
          
        }
         const handleCloseAlertDialog = () => {
            setShowDialogAlert(false);
            setRowDataSalaryIncOld({})
          }
    const columns = [
    { 
      title: "STT",
      render: (rowDataSalaryIncrease) => rowDataSalaryIncrease?.tableData?.id + 1,
    },
    {
      title: "Thao tác",
      field: "action",
      render: (rowDataSalaryIncrease) => {
        return (
          <div className="none_wrap">
           {(+rowDataSalaryIncrease?.salaryIncreaseStatus === 2 || +rowDataSalaryIncrease?.salaryIncreaseStatus === 3 || +rowDataSalaryIncrease?.salaryIncreaseStatus === 5 || +rowDataSalaryIncrease?.salaryIncreaseStatus === 4 ) &&
              <IconButton
                size="small"
                onClick={() => handleViewEmployee(rowDataSalaryIncrease)}
              >
                <Icon color="primary">visibility</Icon>
              </IconButton>
            }
            {(+rowDataSalaryIncrease?.salaryIncreaseStatus === 1) &&
              <IconButton
                size="small"
                onClick={() => handleFillInputToEdit(rowDataSalaryIncrease)}
              >
                <Icon color="primary">edit</Icon>
              </IconButton>
            }

            {+rowDataSalaryIncrease?.salaryIncreaseStatus === 1 && 
              <IconButton
                size="small"
                onClick={() => handleOpenDialogDelete(rowDataSalaryIncrease.id)}
              >
                <Icon style={{ color: "red", margin: "0px 0px 0px 10px" }}>
                  delete
                </Icon>
              </IconButton>
            }
          </div>
        );
      },
    },
    
    { title: ("Lương cũ"), field: "oldSalary" },
    { title: ("Lương mới"), field: "newSalary" },
    { title: ("Ngày"), field: "startDate", render: (rowDataSalaryIncrease) => moment(rowDataSalaryIncrease.startDate).format('DD-MM-YYYY')  },
    { title: ("Lý do"), field: "reason" },
    { title: ("Ghi chú"), field: "note" },
    { title: ("Trạng thái"), field: "salaryIncreaseStatus", render:(rowDataSalaryIncrease) =>dataEmployee.status.find(status=>+rowDataSalaryIncrease.salaryIncreaseStatus===status.id)?.name}
  ];
  return (
    <div className={classes.formContainer} >
      <ValidatorForm onSubmit={handleSave}>
        <Grid className="" container spacing={2}>
          <Grid item lg={4} md={6} sm={12} xs={12}>
            <TextValidator
              className="w-100"
              variant="outlined"
              label={
                <span className="font">
                  <span style={{ color: "red" }}> * </span>
                  Ngày tăng lương
                </span>
              }
              type="date"
              value={rowDataSalaryIncrease?.startDate ? moment(rowDataSalaryIncrease.startDate).format('YYYY-MM-DD')  : ""}   
              name="startDate"
              size="small"
              placeholder=""
              validators={["required"]}
              errorMessages={[
                "Trường này không được để trống",
              ]}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleChangeInputSalaryIncrease}
            />
          </Grid>
          <Grid item lg={4} md={6} sm={12} xs={12}>
            <TextValidator
              className="w-100"
              variant="outlined"
              label={
                <span className="font">
                  <span style={{ color: "red" }}> * </span>
                  Lương cũ
                </span>
              }
              type="text"
              value={rowDataSalaryIncrease.oldSalary || ""}
              name="oldSalary"
              size="small"
              validators={["required", "isNumber"]}
              errorMessages={[
                "Trường này không được để trống",
                "Lương là 1 số"
              ]}
              onChange={handleChangeInputSalaryIncrease}
            />
          </Grid>
          <Grid item lg={4} md={6} sm={12} xs={12}>
            <TextValidator
              className="w-100"
              variant="outlined"
              label={
                <span className="font">
                  <span style={{ color: "red" }}> * </span>
                  Lương mới
                </span>
              }
              type="text"
              value={rowDataSalaryIncrease.newSalary || ""}
              name="newSalary"
              size="small"
              validators={["required", "isNumber"]}
              errorMessages={[
                "Trường này không được để trống",
                "Lương là 1 số"
              ]}
              onChange={handleChangeInputSalaryIncrease}
            />
          </Grid>
          <Grid item lg={4} md={6} sm={12} xs={12}>
            <TextValidator
              className="w-100"
              variant="outlined"
              label={
                <span className="font">
                  <span style={{ color: "red" }}> * </span>
                  Lý do
                </span>
              }
              type="text"
              value={rowDataSalaryIncrease.reason || ""}
              name="reason"
              size="small"
              validators={["required"]}
              errorMessages={[
                "Trường này không được để trống"
              ]}
              onChange={handleChangeInputSalaryIncrease}
            />
          </Grid>
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <TextValidator
              className="w-100"
              variant="outlined"
              label={
                <span className="font">
                  <span style={{ color: "red" }}> * </span>
                  Ghi chú
                </span>
              }
              type="text"
              value={rowDataSalaryIncrease.note || ""}
              name="note"
              size="small"
              validators={["required"]}
              errorMessages={[
                "Trường này không được để trống"
              ]}
              onChange={handleChangeInputSalaryIncrease}
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
              {rowDataSalaryIncrease.id ? "SỬA" : "LƯU"}
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
          listData={listSalaryIncreaseEmployee} 
          columns={columns} 
          onlyTable={true}
        /> 
        {showDialogDelete && (
            <ConfirmationDialog
              title={"Xác nhận hồ sơ"}
              open={showDialogDelete}
              onConfirmDialogClose={() => setShowDialogDelete(false)}
              onYesClick={handleDeleteSalaryIncrease}
              text={"Thao tác này sẽ xóa hồ sơ"}
              Yes={"Xóa"}
              No={"Hủy bỏ"}
            />
          )}
          {
            showModalSalaryInc &&
            <ModalUpdateHappenings 
              label="Tăng lương"
              rowData={rowData}
              setRowData={setRowData}
              rowDataModal={rowDataSalaryIncrease}
              handleCloseModal={handleCloseModalSalaryInc}
              getAllEmployee={getAllEmployee}
              showModal={showModalSalaryInc}
              listDataModal={listSalaryIncreaseEmployee}
              setListDataModal={setListSalaryIncreaseEmployee}
              readOnly={true}
            />
          }
          {
            showDialogAlert &&
            <AlertDialog
              rowData={rowDataSalaryIncOld}
              setRowData={setRowDataSalaryIncrease}
              getAllEmployee={getAllEmployee}
              showDialogAlert={showDialogAlert}
              handleCloseAlertDialog={handleCloseAlertDialog}
            />
          }
      </div>
    </div>
  );
}
