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
import { useEffect } from "react"
import { toast } from "react-toastify";
import { ConfirmationDialog } from "egret";
import { STATUS_CODE_SUCCESS } from "app/constants/statusContant";
import { addPromoteEmployee, deletePromoteEmployee, editPromoteEmployee } from "./manageEmployeeService";
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



export default function PromoteForm({rowData, setRowData, listPromoteEmployee, setListPromoteEmployee, getAllEmployee}) {
    const classes = useStyles();  
    const [rowDataPromote, setRowDataPromote] = useState({})
    const [showDialogDelete, setShowDialogDelete] = useState(false);
    const [idPromote, setIdPromote] = useState()
    const [showDialogAlert, setShowDialogAlert] = useState(false);
    const [rowDataPromoteOld, setRowDataPromoteOld] = useState({})

    const [showModalPromote, setShowModalPromote] = useState(false);
    const handleChangeInputPromote = (e) => {
      if(e.target.name === "newPosition") {
        if(e.target.value <= rowData.currentPosition) {
          toast.warning("Phải chọn chức vụ cao hơn chức vụ hiện tại")
          return
        }
      }
      setRowDataPromote({ ...rowDataPromote, [e.target.name]: e.target.value });
    };


    const handleSave = async (e) => {
      e.preventDefault()
      try {
        if(rowDataPromote.id) {
          if(rowDataPromote.processStatus === STATUS_ADDITIONAL_REQUEST || rowDataPromote.processStatus === STATUS_REFUSE) {
            rowDataPromote.processStatus = DECLARE_STATUS_NEW
          }
          const res = await editPromoteEmployee(rowDataPromote)
          if(res?.data?.data) {
            toast.success("Sửa thăng chức thành công")
            const listPromote = listPromoteEmployee.map(item => {
              if(item.id === res?.data?.data.id) {
                 setRowDataPromote(res.data.data)
                return res.data.data
              }
              return item
            })
            setListPromoteEmployee(listPromote)
          }
          else {
            toast.warning(res?.data?.message)
          }
        }
        else {
          const res = await addPromoteEmployee(rowData.id, rowDataPromote);
          if(res?.data?.data) {
            setRowDataPromote(res.data.data[0])
           setListPromoteEmployee(res.data.data)
           toast.success("Thêm mới thăng chức thành công")
          }
          else {
           toast.warning(res?.data?.message)
          }
        }
        handleOpenModalPromote()
      } catch (error) {
        toast.error("Có lỗi")
      }
    }
    
    const handleCancel = () => {
        setRowDataPromote({});
    };

    const handleFillInputToEdit = (rowDataPromote) => {
      setRowDataPromote(rowDataPromote)
    }

    const handleOpenDialogDelete = (idPromote) => {
      setShowDialogDelete(true);
      setIdPromote(idPromote)
    }

    const handleDeletePromote = async () => {
      try {
        const res = await deletePromoteEmployee(idPromote);
        if(res?.data?.code === STATUS_CODE_SUCCESS) {
          toast.success("Xóa thăng chức thành công");
          const listPromoteUpdate = listPromoteEmployee.filter(item => item.id !== idPromote)
          setListPromoteEmployee(listPromoteUpdate)
          setShowDialogDelete(false);
          if(rowDataPromote.id === idPromote) {
            setRowDataPromote({})
          }
        }
        else {
          toast.warning(res?.data?.message)
        }
      } catch (error) {
        toast.error("Có lỗi")
      }
    }

    const handleOpenModalPromote = () => {
      setShowModalPromote(true)
    }

    const handleCloseModalPromote = () => {
      setShowModalPromote(false)
      setRowDataPromote({})
    }

      const handleViewEmployee = (rowDataPromote) => {
        if(+rowDataPromote.processStatus === STATUS_ADDITIONAL_REQUEST || +rowDataPromote.processStatus === STATUS_REFUSE ) {
          setShowDialogAlert(true)
          setRowDataPromoteOld(rowDataPromote)
        }
        else {
          setRowDataPromote(rowDataPromote);
          handleOpenModalPromote(true)
        }
          
        }

        const handleCloseAlertDialog = () => {
            setShowDialogAlert(false);
            setRowDataPromoteOld({})
          }

    const columns = [
    { 
      title: "STT",
      render: (rowDataPromote) => rowDataPromote?.tableData?.id + 1,
    },
    {
      title: "Thao tác",
      field: "action",
      render: (rowDataPromote) => {
        return (
          <div className="none_wrap">
            {(+rowDataPromote?.processStatus === 2 || +rowDataPromote?.processStatus === 3 || +rowDataPromote?.processStatus === 5 || +rowDataPromote?.processStatus === 4 ) &&
              <IconButton
                size="small"
                onClick={() => handleViewEmployee(rowDataPromote)}
              >
                <Icon color="primary">visibility</Icon>
              </IconButton>
            }
            {(+rowDataPromote?.processStatus === 1) &&
              <IconButton
                size="small"
                onClick={() => handleFillInputToEdit(rowDataPromote)}
              >
                <Icon color="primary">edit</Icon>
              </IconButton>
            }

            {+rowDataPromote?.processStatus === 1 && 
              <IconButton
                size="small"
                onClick={() => handleOpenDialogDelete(rowDataPromote.id)}
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
    
    { title: ("Ngày tăng chức"), field: "promotionDay", render: (rowDataPromote) => moment(rowDataPromote.promotionDay).format('DD-MM-YYYY')  },
    { title: ("Vị trí hiện tại"), field: "currentPosition", render:(rowDataPromote) =>dataEmployee.position.find(position=>+rowDataPromote.currentPosition===position.id)?.name },
    { title: ("Vị trí mới"), field: "newPosition", render:(rowDataPromote) =>dataEmployee.position.find(position=>+rowDataPromote.newPosition===position.id)?.name },
    { title: ("Ghi chú"), field: "note" },
    { title: ("Trạng thái"), field: "processStatus", render:(rowDataPromote) =>dataEmployee.status.find(status=>+rowDataPromote.processStatus===status.id)?.name}
  ];

  console.log(rowDataPromote);
  return (
    <div className={classes.formContainer} >
      <ValidatorForm onSubmit={handleSave}>
        <Grid className="" container spacing={2}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextValidator
              className="w-100"
              variant="outlined"
              label={
                <span className="font">
                  <span style={{ color: "red" }}> * </span>
                  Ngày thăng chức
                </span>
              }
              type="date"
              value={rowDataPromote?.promotionDay ? moment(rowDataPromote.promotionDay).format('YYYY-MM-DD')  : ""}   
              name="promotionDay"
              size="small"
              placeholder=""
              validators={["required"]}
              errorMessages={[
                "Trường này không được để trống",
              ]}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleChangeInputPromote}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            {/* <TextValidator
              className="w-100"
              variant="outlined"
              label={
                <span className="font">
                  <span style={{ color: "red" }}> * </span>
                  Vị trí mới
                </span>
              }
              type="text"
              value={rowDataPromote.newPosition || ""}
              name="newPosition"
              size="small"
              validators={["required"]}
              errorMessages={[
                "Trường này không được để trống"
              ]}
              onChange={handleChangeInputPromote}
            /> */}
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
                    Vị trí mới
                    </span>
                }
                value={rowDataPromote.newPosition || ""}
                name="newPosition"
                onChange={handleChangeInputPromote}
                validators={["required"]}
                errorMessages={["Trường này không được bỏ trống"]}
                >
                {dataEmployee.position &&
                    dataEmployee.position.map((item) => {
                    return (
                        <MenuItem key={item.id} value={item.id}>
                        {item.name}
                        </MenuItem>
                    );
                    })}
                </SelectValidator>
            </FormControl>
          </Grid>
          <Grid item lg={8} md={8} sm={12} xs={12}>
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
              value={rowDataPromote.note || ""}
              name="note"
              size="small"
              validators={["required"]}
              errorMessages={[
                "Trường này không được để trống"
              ]}
              onChange={handleChangeInputPromote}
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
              {rowDataPromote.id ? "SỬA" : "LƯU"}
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
          listData={listPromoteEmployee} 
          columns={columns} 
          onlyTable={true}
        /> 
        {showDialogDelete && (
            <ConfirmationDialog
              title={"Xác nhận xóa thăng chức"}
              open={showDialogDelete}
              onConfirmDialogClose={() => setShowDialogDelete(false)}
              onYesClick={handleDeletePromote}
              text={"Thao tác này sẽ xóa thăng chức vĩnh viễn"}
              Yes={"Xóa"}
              No={"Hủy bỏ"}
            />
          )}
          {
            showModalPromote && 
            <ModalUpdateHappenings 
              label="Thăng chức"
              rowData={rowData}
              setRowData={setRowData}
              rowDataModal={rowDataPromote}
              handleCloseModal={handleCloseModalPromote}
              getAllEmployee={getAllEmployee}
              showModal={showModalPromote}
              listDataModal={listPromoteEmployee}
              setListDataModal={setListPromoteEmployee}
              readOnly={true}
            />
          }
          {
            showDialogAlert &&
            <AlertDialog
              rowData={rowDataPromoteOld}
              setRowData={setRowDataPromote}
              getAllEmployee={getAllEmployee}
              showDialogAlert={showDialogAlert}
              handleCloseAlertDialog={handleCloseAlertDialog}
            />
          }
      </div>
    </div>
  );
}
