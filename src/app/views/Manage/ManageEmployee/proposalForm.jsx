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
import { addProposalEmployee, deleteProposalEmployee, editProposalEmployee } from "./manageEmployeeService";
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



export default function ProposalForm({rowData, setRowData, listProposalEmployee, setListProposalEmployee, getAllEmployee}) {
    const classes = useStyles();  
    const [rowDataProposal, setRowDataProposal] = useState({})
    const [showDialogDelete, setShowDialogDelete] = useState(false);
    const [idProposal, setIdProposal] = useState()
    const [showModalProposal, setShowModalProposal] = useState(false)
    const [showDialogAlert, setShowDialogAlert] = useState(false);
    const [rowDataProposalOld, setRowDataProposalOld] = useState({})
    console.log(listProposalEmployee);
    const handleChangeInputProposal = (e) => {
      setRowDataProposal({ ...rowDataProposal, [e.target.name]: e.target.value });
    };


    const handleSave = async (e) => {
      e.preventDefault()
      try {
        if(rowDataProposal.id) {
          if(rowDataProposal.proposalStatus === STATUS_ADDITIONAL_REQUEST || rowDataProposal.proposalStatus === STATUS_REFUSE) {
            rowDataProposal.proposalStatus = DECLARE_STATUS_NEW
          }
          const res = await editProposalEmployee(rowDataProposal)
          if(res?.data?.data) {
            toast.success("Sửa đề xuất thành công")
            const listProposal= listProposalEmployee.map(item => {
              if(item.id === res?.data?.data.id) {
                setRowDataProposal(res.data.data)
                return res.data.data
              }
              return item
            })
            setListProposalEmployee(listProposal)
          }
          else {
            toast.warning(res?.data?.message)
          }
        }
        else {
          const res = await addProposalEmployee(rowData.id, rowDataProposal);
          if(res?.data?.data) {
           console.log(res.data.data);
           setRowDataProposal(res.data.data[0])
           setListProposalEmployee(res.data?.data)
           toast.success("Thêm mới đề xuất thành công")
          }
          else {
           toast.warning(res?.data?.message)
          }
        }
        handleOpenModalProposal()
      } catch (error) {
        toast.error("Có lỗi")
      }
    }
    
    const handleCancel = () => {
        setRowDataProposal({});
    };

    const handleFillInputToEdit = (rowDataProposal) => {
      setRowDataProposal(rowDataProposal)
    }

    const handleOpenDialogDelete = (idProposal) => {
      setShowDialogDelete(true);
      setIdProposal(idProposal)
    }

    const handleDeleteProposal = async () => {
      try {
        const res = await deleteProposalEmployee(idProposal);
        if(res?.data?.code === STATUS_CODE_SUCCESS) {
          toast.success("Xóa đề xuất thành công");
          const listProposalUpdate = listProposalEmployee.filter(item => item.id !== idProposal)
          setListProposalEmployee(listProposalUpdate)
          setShowDialogDelete(false);
          if(rowDataProposal.id === idProposal) {
            setRowDataProposal({})
          }
        }
        else {
          toast.warning(res?.data?.message)
        }
      } catch (error) {
        toast.error("Có lỗi")
      }
    }

    const handleOpenModalProposal = () => {
      setShowModalProposal(true)
    }

    const handleCloseModalProposal = () => {
      setShowModalProposal(false)
      setRowDataProposal({})
    }

    const handleViewEmployee = (rowDataProposal) => {
      if(+rowDataProposal.proposalStatus === STATUS_ADDITIONAL_REQUEST || +rowDataProposal.proposalStatus === STATUS_REFUSE ) {
          setShowDialogAlert(true)
          setRowDataProposalOld(rowDataProposal)
        }
        else {
          handleOpenModalProposal()
          setRowDataProposal(rowDataProposal);
        }
    }

    const handleCloseAlertDialog = () => {
      setShowDialogAlert(false);
      setRowDataProposalOld({})
    }


    const columns = [
    { 
      title: "STT",
      render: (rowDataProposal) => rowDataProposal?.tableData?.id + 1,
    },
    {
      title: "Thao tác",
      field: "action",
      render: (rowDataProposal) => {
        return (
          <div className="none_wrap">
            {(+rowDataProposal?.proposalStatus === 2 || +rowDataProposal?.proposalStatus === 3 || +rowDataProposal?.proposalStatus === 5 || +rowDataProposal?.proposalStatus === 4 ) &&
              <IconButton
                size="small"
                onClick={() => handleViewEmployee(rowDataProposal)}
              >
                <Icon color="primary">visibility</Icon>
              </IconButton>
            }
            {(+rowDataProposal?.proposalStatus === 1) &&
              <IconButton
                size="small"
                onClick={() => handleFillInputToEdit(rowDataProposal)}
              >
                <Icon color="primary">edit</Icon>
              </IconButton>
            }

            {+rowDataProposal?.proposalStatus === 1 && 
              <IconButton
                size="small"
                onClick={() => handleOpenDialogDelete(rowDataProposal.id)}
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
    
    { title: ("Ngày đề xuất"), field: "proposalDate", render: (rowDataProposal) => moment(rowDataProposal.proposalDate).format('DD-MM-YYYY')  },
    { title: ("Nội dung"), field: "content" },
    { title: ("Ghi chú"), field: "note" },
    { title: ("Loại"), field: "type" },
    { title: ("Trạng thái"), field: "proposalStatus", render:(rowDataProposal) =>dataEmployee.status.find(status=>+rowDataProposal.proposalStatus===status.id)?.name}
  ];

  console.log(listProposalEmployee);
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
                  Ngày đăng ký
                </span>
              }
              type="date"
              value={rowDataProposal?.proposalDate ? moment(rowDataProposal.proposalDate).format('YYYY-MM-DD')  : ""}   
              name="proposalDate"
              size="small"
              placeholder=""
              validators={["required"]}
              errorMessages={[
                "Trường này không được để trống",
              ]}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleChangeInputProposal}
            />
          </Grid>
          <Grid item lg={4} md={6} sm={12} xs={12}>
            <TextValidator
              className="w-100"
              variant="outlined"
              label={
                <span className="font">
                  <span style={{ color: "red" }}> * </span>
                  Loại
                </span>
              }
              type="text"
              value={rowDataProposal.type || ""}
              name="type"
              size="small"
              validators={["required", "isNumber"]}
              errorMessages={[
                "Trường này không được để trống",
                "Loại phải là 1 số"
              ]}
              onChange={handleChangeInputProposal}
            />
          </Grid>
          <Grid item lg={4} md={6} sm={12} xs={12}>
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
              value={rowDataProposal.content || ""}
              name="content"
              size="small"
              validators={["required"]}
              errorMessages={[
                "Trường này không được để trống"
              ]}
              onChange={handleChangeInputProposal}
            />
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
              value={rowDataProposal.note || ""}
              name="note"
              size="small"
              validators={["required"]}
              errorMessages={[
                "Trường này không được để trống"
              ]}
              onChange={handleChangeInputProposal}
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
              {rowDataProposal.id ? "SỬA" : "LƯU"}
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
          listData={listProposalEmployee} 
          columns={columns} 
          onlyTable={true}
        /> 
        {showDialogDelete && (
            <ConfirmationDialog
              title={"Xác nhận xóa đề xuất"}
              open={showDialogDelete}
              onConfirmDialogClose={() => setShowDialogDelete(false)}
              onYesClick={handleDeleteProposal}
              text={"Thao tác này sẽ xóa đề xuất"}
              Yes={"Xóa"}
              No={"Hủy bỏ"}
            />
          )}

          {
            showModalProposal && 
            <ModalUpdateHappenings
              label="Đề xuất tham mưu"
              rowData={rowData}
              setRowData={setRowData}
              rowDataModal={rowDataProposal}
              handleCloseModal={handleCloseModalProposal}
              getAllEmployee={getAllEmployee}
              showModal={showModalProposal}
              listDataModal={listProposalEmployee}
              setListDataModal={setListProposalEmployee}
              readOnly={true}
            />
          }
          {
            showDialogAlert &&
            <AlertDialog
              rowData={rowDataProposalOld}
              setRowData={setRowDataProposal}
              getAllEmployee={getAllEmployee}
              showDialogAlert={showDialogAlert}
              handleCloseAlertDialog={handleCloseAlertDialog}
            />
          }
      </div>
    </div>
  );
}
