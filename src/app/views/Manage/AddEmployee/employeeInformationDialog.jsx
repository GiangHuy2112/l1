import React, { useEffect } from "react";
import {
    Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Icon,
  IconButton,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@material-ui/core";
import { ValidatorForm } from "react-material-ui-form-validator";
import {
  addEmployee,
  editEmployee,
  getCertificatesByEmployee,
  getFamilyByEmployee,
} from "./addEmployeeService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { STATUS_CODE_SUCCESS} from "../../../constants/statusContant"
import { makeStyles } from '@material-ui/core/styles';
import FormAddEmployee from "./formAddEmloyee";
import FormAddCertificates from "./formAddCertificates";
import FormAddEmployeeFamily from "./formAddEmployeeFamily";
import { countObjectKeys, isBase64Image } from "utils";
import { useState } from "react";
import avatarDefault from "../../../public/assets/avatarDefault.jpg"
import moment from "moment";
import dataEmployee from "app/constants/dataEmployeeContant";
import TableComp from "app/views/Component/TableComp/TableComp";

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
  formContainerInforsEmployee: {
        display: 'flex',
        fontSize: "20px",
        padding: "20px 0"
    },
    formContainerCert: {
        borderTop: "1px solid #eee",
        padding: "10px 0"
    },
  large: {
    width: "150px",
    height: "150px", 
  },
  avatarContainer: {
    display: "flex",
    justifyContent: "center",
  },
  contentLeft: {
    borderRight: "1px solid #eee",
  },
  subTitle: {
    textAlign: "center",
    marginBottom: "10px",
    padding: "0",
},

    subTitleCertText: {
        color: "#4fa8ef",
    },
    subTitleFamText: {
        color: "#ef9f4f",
    },
    tableContainer: {
        maxHeight: "185px",
        overflow: "auto"
    }
});

export default function EmployeeInforsDialog({rowData, showDialogViewInfor, handleCloseDialog}) {
  const classes = useStyles();
  const [listCertEmployee, setListCertEmployee] = useState([]);
  const [listFamEmployee, setListFarmEmployee] = useState([]);
    console.log(listCertEmployee);
    console.log(listFamEmployee);
    const columnsCert = [
    { 
      title: "STT",
      render: (rowDataCertificate) => rowDataCertificate?.tableData?.id + 1,
    },  
    { title: ("Tên văn bằng"), field: "certificateName" },
    { title: ("Ngày cấp"), field: "issueDate", render: (rowDataCertificate) => moment(rowDataCertificate.issueDate).format('YYYY-MM-DD')  },
    { title: ("Lĩnh vực"), field: "field" },
  ];

    const columnsFam = [
        { 
            title: "STT",
            render: (rowDataFamily) => rowDataFamily?.tableData?.id + 1,
        },  
        { title: ("Họ tên"), field: "name" },
        { title: ("Ngày sinh"), field: "dateOfBirth", render: (rowDataFamily) => moment(rowDataFamily.dateOfBirth).format('YYYY-MM-DD')  },
        { title: ("Địa chỉ"), field: "address" },
        { title: ("Quan hệ"), field: "relationShip", render:(rowDataFamily) =>dataEmployee.relationship.find(item=>rowDataFamily.relationShip===item.id)?.name },
    ];
    const getListCertAndFam = async () => {
        try {
            const resCert = await getCertificatesByEmployee(rowData.id);
            const resFam = await getFamilyByEmployee(rowData.id);
            if(resCert?.data?.data) {
                setListCertEmployee(resCert.data.data)
            }
            if(resFam?.data?.data) {
                setListFarmEmployee(resFam.data.data)
            }
        } catch (error) {
            toast.error("Có lỗi!!!")
        }
    }
    useEffect(() => {
        getListCertAndFam()
    }, [])
    console.log(listFamEmployee);
  return (
    <Dialog maxWidth="lg"  fullWidth={true} open={showDialogViewInfor} onClose={handleCloseDialog}>
      <DialogTitle className={classes.dialogTitle}>
        <span className={classes.titleDialog}>{"Thông tin nhân viên"}</span>
        <IconButton className={classes.iconClose} onClick={() => handleCloseDialog()}>
          <Icon color="error"
              title={"close"}>
              close
          </Icon>
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Grid className={classes.formContainerInforsEmployee} container spacing={3}>
            <Grid className={classes.avatarContainer} item lg={3} md={3} sm={3} xs={3}>
                <Avatar className={classes.large} alt="Remy Sharp" src={isBase64Image(rowData.image) ? rowData.image : avatarDefault} />  
            </Grid>
            <Grid item lg={9} md={9} sm={9} xs={9}>
                <Grid container spacing={3}>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                <TextField
                    fullWidth
                    InputProps={{
                        readOnly: true,
                    }}
                    size="small"
                    label={"Tên nhân viên"}
                    defaultValue={rowData.name}
                    variant="outlined"
                />
                </Grid>
                
                
                <Grid item lg={3} md={3} sm={12} xs={12}>
                <TextField
                fullWidth
                InputProps={{
                    readOnly: true,
                }}
                size="small"
                label="Mã nhân viên"
                defaultValue={rowData.code}
                variant="outlined"
                
                />
                </Grid>

                <Grid item lg={3} md={3} sm={12} xs={12}>
                <TextField
                fullWidth
                InputProps={{
                    readOnly: true,
                }}
                size="small"
                label="Ngày sinh"
                defaultValue={moment(rowData.dateOfBirth).format('YYYY-MM-DD')}
                variant="outlined"
                />
                </Grid>

                <Grid item lg={3} md={3} sm={12} xs={12}>
                <TextField
                fullWidth
                InputProps={{
                    readOnly: true,
                }}
                size="small"
                label="Giới tính"
                defaultValue={dataEmployee.gender && 
                    dataEmployee.gender.find((item) => {
                        return (
                            item.id === rowData.gender
                        )
                    })?.name
                }
                variant="outlined"
                />
                </Grid>

                <Grid item lg={3} md={3} sm={12} xs={12}>
                <TextField
                fullWidth
                InputProps={{
                    readOnly: true,
                }}
                size="small"
                label="Số điện thoại"
                defaultValue={rowData.phone}
                variant="outlined"
                />
                </Grid>

                <Grid item lg={3} md={3} sm={12} xs={12}>
                <TextField
                fullWidth
                InputProps={{
                    readOnly: true,
                }}
                size="small"
                label="Nhóm"
                defaultValue={dataEmployee.team && 
                    dataEmployee.team.find((item) => {
                        return (
                            item.id === rowData.team
                        )
                    })?.name}
                variant="outlined"
                />
                </Grid>

                <Grid item lg={3} md={3} sm={12} xs={12}>
                <TextField
                fullWidth
                InputProps={{
                    readOnly: true,
                }}
                size="small"
                label="Số CCCD/CMT"
                defaultValue={rowData.citizenIdentificationNumber}
                variant="outlined"
                />
                </Grid>

                <Grid item lg={3} md={3} sm={12} xs={12}>
                <TextField
                fullWidth
                InputProps={{
                    readOnly: true,
                }}
                size="small"
                label="Ngày cấp thẻ"
                defaultValue={moment(rowData.dateOfIssuanceCard).format('YYYY-MM-DD')}
                variant="outlined"
                />
                </Grid>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                <TextField
                fullWidth
                InputProps={{
                    readOnly: true,
                }}
                size="small"
                label="Nơi cấp thẻ"
                defaultValue={rowData.placeOfIssueCard}
                variant="outlined"
                />
                </Grid>
                

                <Grid item lg={3} md={3} sm={12} xs={12}>
                <TextField
                fullWidth
                InputProps={{
                    readOnly: true,
                }}
                size="small"
                label="Địa chỉ"
                defaultValue={rowData.address}
                variant="outlined"
                />
                </Grid>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                <TextField
                fullWidth
                InputProps={{
                    readOnly: true,
                }}
                size="small"
                label="Dân tộc"
                defaultValue={rowData.ethnic}
                variant="outlined"
                />
                </Grid>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                <TextField
                fullWidth
                InputProps={{
                    readOnly: true,
                }}
                size="small"
                label="Tôn giáo"
                defaultValue={rowData.religion}
                variant="outlined"
                />
                </Grid>
                </Grid>
            </Grid>
        </Grid>  
        <Grid className={classes.formContainerCert} container spacing={3}>
            
            <Grid item lg={6} md={6} sm={9} xs={9} className={classes.contentLeft}>
                <DialogTitle className={classes.subTitle}>
                <span className={classes.subTitleCertText}>{"Thông tin văn bằng"}</span>
                </DialogTitle>
                <div className={classes.tableContainer}>
                    <TableComp
                        listData={listCertEmployee} 
                        columns={columnsCert} page={1} 
                        rowsPerPage={50} 
                        onlyTable={true}
                    /> 
                </div>
            </Grid>
            <Grid item lg={6} md={6} sm={9} xs={9} className={classes.contentRight}>
                <DialogTitle className={classes.subTitle}>
                <span className={classes.subTitleFamText}>{"Thông tin quan hệ"}</span>
                </DialogTitle>
                <div className={classes.tableContainer}>
                    <TableComp
                        listData={listFamEmployee} 
                        columns={columnsFam} page={1} 
                        rowsPerPage={50} 
                        onlyTable={true}
                    /> 
                </div>
            </Grid>
        </Grid>
           
      </DialogContent>
    </Dialog>
  );
}
