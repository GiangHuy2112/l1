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
import { useEffect } from "react";
import { addCertificateEmployee, deleteCertificateEmployee, editCertificateEmployee } from "./addEmployeeService";
import { toast } from "react-toastify";
import { ConfirmationDialog } from "egret";
import { STATUS_CODE_SUCCESS } from "app/constants/statusContant";

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
    maxHeight: "300px",
    overflow: "auto",
    marginTop: "20px"
  }
});



export default function FormAddCertificates({rowData, setRowData, listCertificateEmployee, setListCertificateEmployee}) {
    const classes = useStyles();  
    
    const [rowDataCertificate, setRowDataCertificate] = useState({})
    const [showDialogDelete, setShowDialogDelete] = useState(false);
    const [idCertificate, setIdCertificate] = useState()
    

    useEffect(() => {
      setRowData({...rowData, certificatesDto: listCertificateEmployee});
    }, []);

    const handleChangeInputCertificate = (e) => {
      setRowDataCertificate({ ...rowDataCertificate, [e.target.name]: e.target.value });
    };

    const updateListCertificates = (action, cert, message) => {
      let listCertEmployee = []
      if(action === "add") {
        listCertEmployee = Array.isArray(cert) ? cert : [...listCertificateEmployee, cert]
      }
      else if(action === "edit") {
        listCertEmployee = listCertificateEmployee.map(item => {
          if((item.id === cert.id && item.id) || (item.idCert === cert.idCert && item.idCert)) {
            return cert
          }
          return item
        })
      }
      else {
        console.log(idCertificate);
        console.log(listCertificateEmployee);
         listCertEmployee = listCertificateEmployee.filter(item => {
            return (item.id !== idCertificate && item.id) || (item.idCert !== idCertificate && item.idCert)
          })
          setShowDialogDelete(false);
      }
      console.log(listCertEmployee);
      
      setListCertificateEmployee(listCertEmployee)  
      toast.success(message)
      
    }

    const handleSave = async (e) => {
      e.preventDefault()
      if(rowData.id) {
        try {
          if(rowDataCertificate.id) {
            const res = await editCertificateEmployee(rowDataCertificate)
            if (res?.data && res?.data?.code === STATUS_CODE_SUCCESS) {
              updateListCertificates("edit", res?.data?.data, "Sửa văn bằng thành công")

            } else {
              toast.warning(res?.data?.message);
            }       
          }
        // Add
          else {
            const res = await addCertificateEmployee(rowData.id, [rowDataCertificate])
            if (res?.data && res?.data.code === STATUS_CODE_SUCCESS) {
              updateListCertificates("add", res?.data?.data, "Thêm văn bằng thành công")
            } else {
              toast.warning(res?.data?.message);
            }   
            
          }
        } catch (error) {
          toast.warning("Có lỗi");
        }
        
      }
      else {
        // Edit
        if(rowDataCertificate.idCert) {
            updateListCertificates("edit", rowDataCertificate, "Sửa văn bằng thành công")
        }
        // Add
        else {
            const rowDataCertAdd = {
              idCert: moment().valueOf(),
              ...rowDataCertificate
            }
            
          
          updateListCertificates("add", rowDataCertAdd, "Thêm văn bằng thành công")
        }
      }
      setRowDataCertificate({})
    }
    
    const handleCancel = () => {
        setRowDataCertificate({});
    };

    const handleFillInputToEdit = (rowDataCertificate) => {
      console.log(rowDataCertificate);
      setRowDataCertificate(rowDataCertificate)
    }

    const handleOpenDialogDelete = (idCert) => {
      setShowDialogDelete(true);
      setIdCertificate(idCert)
    }

    const handleDeleteCertificate = async () => {
     if(rowData.id) {
      try {
        const res = await deleteCertificateEmployee(idCertificate)    
        if(res?.data && res?.data?.code === STATUS_CODE_SUCCESS) {
          if(idCertificate === rowDataCertificate.id) {
            setRowDataCertificate({})
          }
          updateListCertificates("delete", null, "Xóa văn bằng thành công")
        }
        else {
          toast.error(res?.data?.message);   
        }
      } catch (error) {     
        toast.error("Có lỗi!!!");
      }
     }
     else {
          if(idCertificate === rowDataCertificate.idCert) {
            setRowDataCertificate({})
          }
          updateListCertificates("delete", null, "Xóa văn bằng thành công")
    }
    }

    const columns = [
    { 
      title: "STT",
      render: (rowDataCertificate) => rowDataCertificate?.tableData?.id + 1,
    },
    {
      title: "Thao tác",
      field: "action",
      render: (rowDataCertificate) => {
        return (
          <div className="none_wrap">
              <IconButton
                size="small"
                onClick={() => handleFillInputToEdit(rowDataCertificate)}
              >
                <Icon color="primary">edit</Icon>
              </IconButton>
            
              <IconButton
                size="small"
                onClick={() => handleOpenDialogDelete(rowDataCertificate.idCert ? rowDataCertificate.idCert : rowDataCertificate.id)}
              >
                <Icon style={{ color: "red", margin: "0px 0px 0px 10px" }}>
                  delete
                </Icon>
              </IconButton>
          </div>
        );
      },
    },
    
    { title: ("Tên văn bằng"), field: "certificateName" },
    { title: ("Ngày cấp"), field: "issueDate", render: (rowDataCertificate) => moment(rowDataCertificate.issueDate).format('YYYY-MM-DD')  },
    { title: ("Lĩnh vực"), field: "field" },
    { title: ("Nội dung"), field: "content" },
  ];
  return (
    <div className={classes.formContainer}>
      <ValidatorForm onSubmit={handleSave}>
        <Grid className="" container spacing={2}>
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <TextValidator
              className="w-100"
              variant="outlined"
              label={
                <span className="font">
                  <span style={{ color: "red" }}> * </span>
                  Tên văn bằng, chứng chỉ
                </span>
              }
              type="text"
              value={rowDataCertificate.certificateName || ""}
              name="certificateName"
              size="small"
              validators={["required", "isNameValid"]}
              errorMessages={[
                "Trường này không được để trống",
                "Tên văn bằng, chứng chỉ không chứa số, các ký tự đặc biệt và khoảng trắng ở đầu và cuối",
              ]}
              onChange={handleChangeInputCertificate}
            />
          </Grid>

          <Grid item lg={4} md={4} sm={12} xs={12}>
            <TextValidator
              className="w-100"
              variant="outlined"
              label={
                <span className="font">
                  <span style={{ color: "red" }}> * </span>
                  Ngày cấp
                </span>
              }
              type="date"
              value={rowDataCertificate?.issueDate ? moment(rowDataCertificate.issueDate).format('YYYY-MM-DD')  : ""}   
              name="issueDate"
              size="small"
              placeholder=""
              validators={["required"]}
              errorMessages={[
                "Trường này không được để trống",
              ]}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleChangeInputCertificate}
            />
          </Grid>
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <TextValidator
              className="w-100"
              variant="outlined"
              label={
                <span className="font">
                  <span style={{ color: "red" }}> * </span>
                  Lĩnh vực
                </span>
              }
              type="text"
              value={rowDataCertificate.field || ""}
              name="field"
              size="small"
              validators={["required"]}
              errorMessages={[
                "Trường này không được để trống",
              ]}
              onChange={handleChangeInputCertificate}
            />
          </Grid>
          <Grid item lg={8} md={8} sm={12} xs={12}>
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
              value={rowDataCertificate.content || ""}
              name="content"
              size="small"
              validators={["required"]}
              errorMessages={[
                "Trường này không được để trống"
              ]}
              onChange={handleChangeInputCertificate}
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
              {rowDataCertificate.idCert || rowDataCertificate.id ? "SỬA" : "LƯU VĂN BẰNG"}
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
          listData={listCertificateEmployee} 
          columns={columns} 
          onlyTable={true}
          // page={page} 
          // handleChangePage={handleChangePage} 
          // totalItems={totalItems} 
          // rowsPerPage={rowsPerPage} 
          // handleChangeRowsPerPage={handleChangeRowsPerPage} 
        /> 
        {showDialogDelete && (
            <ConfirmationDialog
              title={"Xác nhận xóa chứng chỉ"}
              open={showDialogDelete}
              onConfirmDialogClose={() => setShowDialogDelete(false)}
              onYesClick={handleDeleteCertificate}
              text={"Thao tác này sẽ xóa chứng chỉ"}
              Yes={"Xóa"}
              No={"Hủy bỏ"}
            />
          )}
      </div>
    </div>
  );
}
