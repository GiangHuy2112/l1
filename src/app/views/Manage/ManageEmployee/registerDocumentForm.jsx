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
import { addRegisterDocEmployee, deleteRegisterDocEmployee, editRegisterDocEmployee } from "./manageEmployeeService";

const useStyles = makeStyles({
  btnCustom: {
    backgroundColor: "red",
    color: "white",
    "&:hover": {
      backgroundColor: "#ba1414"
    }
  },
  formContainer: {
    padding: "20px !important",
    height: "410px"
  },
  tableContainer: {
    height: "280px",
    overflowY: "auto",
    marginTop: "20px"
  }
});



export default function RegisterDocumentForm({rowData, setRowData, listRegisterDocEmployee, setListRegisterDocEmployee}) {
    const classes = useStyles();  
    const [rowDataRegisterDoc, setRowDataRegisterDoc] = useState({})
    const [showDialogDelete, setShowDialogDelete] = useState(false);
    const [idRegisterDoc, setIdRegisterDoc] = useState()
    console.log(listRegisterDocEmployee);
    const handleChangeInputRegisterDoc = (e) => {
      setRowDataRegisterDoc({ ...rowDataRegisterDoc, [e.target.name]: e.target.value });
    };


    const handleSave = async (e) => {
      e.preventDefault()
      try {
        if(rowDataRegisterDoc.id) {
          const res = await editRegisterDocEmployee(rowDataRegisterDoc)
          if(res?.data?.data) {
            toast.success("Sửa hồ sơ thành công")
            const listRegisterDoc = listRegisterDocEmployee.map(item => {
              if(item.id === res?.data?.data.id) {
                return res.data.data
              }
              return item
            })
            setRowDataRegisterDoc({})
            setListRegisterDocEmployee(listRegisterDoc)
          }
          else {
            toast.warning(res?.data?.message)
          }
        }
        else {
          const res = await addRegisterDocEmployee(rowData.id, rowDataRegisterDoc);
          if(res?.data?.data) {
           console.log(res.data.data);
           setListRegisterDocEmployee(res.data?.data)
           toast.success("Thêm mới hồ sơ thành công")
           setRowDataRegisterDoc({})
          }
          else {
           toast.warning(res?.data?.message)
          }
        }
      } catch (error) {
        toast.error("Có lỗi")
      }
    }
    
    const handleCancel = () => {
        setRowDataRegisterDoc({});
    };

    const handleFillInputToEdit = (rowDataRegisterDoc) => {
      setRowDataRegisterDoc(rowDataRegisterDoc)
    }

    const handleOpenDialogDelete = (idRegistDoc) => {
      setShowDialogDelete(true);
      setIdRegisterDoc(idRegistDoc)
    }

    const handleDeleteRegisterDoc = async () => {
      try {
        const res = await deleteRegisterDocEmployee(idRegisterDoc);
        if(res?.data?.code === STATUS_CODE_SUCCESS) {
          toast.success("Xóa hồ sơ thành công");
          const listRegistDocUpdate = listRegisterDocEmployee.filter(item => item.id !== idRegisterDoc)
          setListRegisterDocEmployee(listRegistDocUpdate)
          setShowDialogDelete(false);
          if(rowDataRegisterDoc.id === idRegisterDoc) {
            setRowDataRegisterDoc({})
          }
        }
        else {
          toast.warning(res?.data?.message)
        }
      } catch (error) {
        toast.error("Có lỗi")
      }
    }

    const columns = [
    { 
      title: "STT",
      render: (rowDataRegisterDoc) => rowDataRegisterDoc?.tableData?.id + 1,
    },
    {
      title: "Thao tác",
      field: "action",
      render: (rowDataRegisterDoc) => {
        return (
          <div className="none_wrap">
              <IconButton
                size="small"
                onClick={() => handleFillInputToEdit(rowDataRegisterDoc)}
              >
                <Icon color="primary">edit</Icon>
              </IconButton>
            
              <IconButton
                size="small"
                onClick={() => handleOpenDialogDelete(rowDataRegisterDoc.id)}
              >
                <Icon style={{ color: "red", margin: "0px 0px 0px 10px" }}>
                  delete
                </Icon>
              </IconButton>
          </div>
        );
      },
    },
    
    { title: ("Hồ sơ"), field: "typesOfRecords" },
    { title: ("Nội dung"), field: "content" },
    { title: ("Ngày"), field: "registerDate", render: (rowDataRegisterDoc) => moment(rowDataRegisterDoc.registerDate).format('DD-MM-YYYY')  },
    { title: ("Ghi chú"), field: "note" },
    { title: ("Trạng thái"), field: "documentStatus" },
  ];
  return (
    <div className={classes.formContainer}>
      <ValidatorForm onSubmit={handleSave}>
        <Grid className="" container spacing={2}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextValidator
              className="w-100"
              variant="outlined"
              label={
                <span className="font">
                  <span style={{ color: "red" }}> * </span>
                  Ngày đăng ký
                </span>
              }
              type="date"
              value={rowDataRegisterDoc?.registerDate ? moment(rowDataRegisterDoc.registerDate).format('YYYY-MM-DD')  : ""}   
              name="registerDate"
              size="small"
              placeholder=""
              validators={["required"]}
              errorMessages={[
                "Trường này không được để trống",
              ]}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleChangeInputRegisterDoc}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextValidator
              className="w-100"
              variant="outlined"
              label={
                <span className="font">
                  <span style={{ color: "red" }}> * </span>
                  Hồ sơ
                </span>
              }
              type="text"
              value={rowDataRegisterDoc.typesOfRecords || ""}
              name="typesOfRecords"
              size="small"
              validators={["required"]}
              errorMessages={[
                "Trường này không được để trống",
              ]}
              onChange={handleChangeInputRegisterDoc}
            />
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <TextValidator
              className="w-100"
              variant="outlined"
              label={
                <span className="font">
                  <span style={{ color: "red" }}> * </span>
                  Nội dung
                </span>
              }
              type="text"
              value={rowDataRegisterDoc.content || ""}
              name="content"
              size="small"
              validators={["required"]}
              errorMessages={[
                "Trường này không được để trống"
              ]}
              onChange={handleChangeInputRegisterDoc}
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
              value={rowDataRegisterDoc.note || ""}
              name="note"
              size="small"
              validators={["required"]}
              errorMessages={[
                "Trường này không được để trống"
              ]}
              onChange={handleChangeInputRegisterDoc}
            />
          </Grid>
          <Grid item lg={2} md={2} sm={12} xs={12}>
          <div className="flex flex-space-center flex-middle mb-5" >
            <Button
              type="submit"
              variant="contained"
              className="mr-12"
              color="secondary"
            >
              {rowDataRegisterDoc.id ? "SỬA" : "LƯU"}
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
          listData={listRegisterDocEmployee} 
          columns={columns} 
          onlyTable={true}
        /> 
        {showDialogDelete && (
            <ConfirmationDialog
              title={"Xác nhận xóa hồ sơ"}
              open={showDialogDelete}
              onConfirmDialogClose={() => setShowDialogDelete(false)}
              onYesClick={handleDeleteRegisterDoc}
              text={"Thao tác này sẽ xóa hồ sơ"}
              Yes={"Xóa"}
              No={"Hủy bỏ"}
            />
          )}
      </div>
    </div>
  );
}
