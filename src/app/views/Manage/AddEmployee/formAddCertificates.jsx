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
import { addCertificateEmployee, deleteCertificateEmployee, editCertificateEmployee, getCertificatesByEmployee } from "./addEmployeeService";
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
    padding: "20px"
  },
  tableContainer: {
    maxHeight: "390px",
    overflow: "auto"
  }
});



export default function FormAddCertificates({rowData, setRowData}) {
    const classes = useStyles();  
    
    const [listCertificateEmployee, setListCertificateEmployee] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [totalItems, setTotalItems] = useState(0);
    const [rowDataCertificate, setRowDataCertificate] = useState({})
    const [showDialogDelete, setShowDialogDelete] = useState(false);
    const [idCertificate, setIdCertificate] = useState()
    const getListCertificateEmployee = async () => {
    try {
      if(rowData?.id) {
        const res = await getCertificatesByEmployee(rowData.id)
        if(res?.data?.data) {
          setTotalItems(res.data.data.length)
          setListCertificateEmployee(res.data.data);
        }
      }
      else if(rowData?.certificatesDto?.length) {
        setListCertificateEmployee(rowData.certificatesDto)
      }
    } catch (error) {
      toast.error("Có lỗi!!!")
    }
  };

    useEffect(() => {
      getListCertificateEmployee();
    }, [page]);

    useEffect(() => {
      setRowData({...rowData, certificatesDto: listCertificateEmployee});
      setTotalItems(listCertificateEmployee.length)
    }, [listCertificateEmployee]);

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    const handleChangeInputCertificate = (e) => {
      setRowDataCertificate({ ...rowDataCertificate, [e.target.name]: e.target.value });
    };



    const handleSave = async (e) => {
      e.preventDefault()
      if(rowData.id) {
        try {
          if(rowDataCertificate.id) {
            const res = await editCertificateEmployee(rowDataCertificate)
            if (res?.data && res?.data.code === STATUS_CODE_SUCCESS) {
              toast.success("Sửa văn bằng thành công")
              getListCertificateEmployee()
            } else {
              toast.warning(res?.data?.message);
            }       
          }
        // Add
          else {
            const res = await addCertificateEmployee(rowData.id, [rowDataCertificate])
            if (res?.data && res?.data.code === STATUS_CODE_SUCCESS) {
              toast.success("Thêm văn bằng thành công")
              getListCertificateEmployee()
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
          const listCertEmployee = listCertificateEmployee.map(item => {
            if(item.idCert === rowDataCertificate.idCert) {
              return rowDataCertificate
            }
            return item
          })

          setListCertificateEmployee(listCertEmployee)
          toast.success("Sửa văn bằng thành công")
        }
        // Add
        else {
          setListCertificateEmployee([
            ...listCertificateEmployee,
            {
              idCert: moment().valueOf(),
              ...rowDataCertificate
            }
          ])
          toast.success("Thêm văn bằng thành công")
        }
      }
      setRowDataCertificate({})
    }
    
    const handleCancel = () => {
        setRowDataCertificate({});
    };

    const handleFillInputToEdit = (rowDataCertificate) => {
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
          getListCertificateEmployee();
          toast.success("Xóa văn bằng thành công!");    
          setShowDialogDelete(false);
        }
        else {
          toast.error(res?.data?.message);   
        }
      } catch (error) {     
        toast.error("Có lỗi!!!");
      }
     }
     else {
      const listCertEmployee = listCertificateEmployee.filter(item => {
        return item.idCert !== idCertificate
      })
      setListCertificateEmployee(listCertEmployee)
    }
     setShowDialogDelete(false);
    }


    console.log(rowData);

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
      <ValidatorForm classes={classes.formContainer} onSubmit={handleSave}>
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
                "Oh no",
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
          columns={columns} page={page} 
          handleChangePage={handleChangePage} 
          totalItems={totalItems} 
          rowsPerPage={rowsPerPage} 
          handleChangeRowsPerPage={handleChangeRowsPerPage} 
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
