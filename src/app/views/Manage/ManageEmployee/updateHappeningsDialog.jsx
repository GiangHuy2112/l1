import React, { useEffect } from "react";
import {
    Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Icon,
  IconButton,
  TextField,
  Typography,
  
} from "@material-ui/core";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { makeStyles } from "@material-ui/core/styles";
import { countObjectKeys, isBase64Image } from "utils";
import { useState } from "react";
import { getLinkAvatarEmployee } from "../AddEmployee/addEmployeeService";
import moment from "moment";
import dataEmployee, { STATUS_PENDING_TERMINATION } from "app/constants/dataEmployeeContant";
import { ExpandMore } from "@material-ui/icons";
import { getListPromoteEmployee, getListProposalEmployee, getListRegisterDocEmployee, getListSalaryIncEmployee } from "./manageEmployeeService";
import { STATUS_CODE_SUCCESS } from "app/constants/statusContant";
import RegisterDocumentForm from "./registerDocumentForm";
import SalaryIncreaseForm from "./salaryIncreaseForm";
import PromoteForm from "./promoteForm";
import ProposalForm from "./proposalForm";
import ModalUpdateHappenings from "../Modals/modal";


const useStyles = makeStyles({
  dialogTitle: {
    paddingTop: 5,
    paddingBottom: 5,
    borderBottom: "1px solid #eee",
  },
  titleDialog: {
    fontSize: "25px",
    fontWeight: "500",
    color: "#409b3e",
  },
  iconClose: {
    position: "absolute",
    right: "10px",
    top: "4px",
  },
  sidebar: {
    padding: "0px !important",
    height: "100% !important",
    borderRight: `1px solid #eee`,
  },
  tabs: {},
  tab: {
    justifyContent: "flex-start",
    textAlign: "left",
  },
  dialogContent: {
    height: "800px",
    display: "flex",
    padding: "20px 20px",
    overflow: "auto",
  },
  large: {
    width: "200px",
    height: "200px",
    marginBottom: 10,
  },
  contentContainer: {
    padding: "15px 40px",
  },
  contentLeft: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  textWhite: {
    color: "#fff !important",
  },
  listBasicInfor: {
    marginTop: 10,
  },
  contentRight: {
    height: "100%",
    overflow: "auto",
  },
  input: {
    borderBottom: "1px dotted #000",
    lineHeight: "1.6rem",
    fontSize: "16px",
    marginTop: "0",
    marginBottom: "10px",
  },
  btnAdd: {
    transform: "rotate(90deg)",
  },
  btnClose: {
    transform: "rotate(270deg)",
  },
  formContainer: {
    width: "100% !important",
    padding: "10px 28px",
    marginBottom: "20px",
  },
  flex: {
    display: "flex",
    alignItems: "start",
    gap: "20px",
    fontSize: "16px",
    padding: "0 10px !important",
    margin: "5px 0",
  },
  btnCustom: {
    backgroundColor: "red",
    color: "white",
    "&:hover": {
      backgroundColor: "#ba1414",
    },
  },
  btnContainer: {
    marginTop: "10px",
    padding: "0 10px",
  },
  inputExps: {
    width: "100%",
  },
  listExps: {
    padding: "0 16px",
  },
  itemExps: {
    borderBottom: "1px solid #eee",
    fontSize: "15px",
    marginBottom: "10px",
  },
  headerCV: {
    textAlign: "center",
  },
  borderLeft: {
    borderLeft: "1px solid #000",
  },
  padding: {
    padding: "0 20px",
  },
  positionLeft: {
    position: "relative",
    left: "-30px",
  },
  contentCV: {
    padding: "0 20px",
    height: "100%",
    overflowY: "auto",
  },
  bottomCV: {
    textAlign: "center",
  },
  disable: {
    color: "#000 !important",
  },
  btnSuccess: {
    backgroundColor: "#2e7d32",
    color: "#fff",
    "&:hover": {
      textDecoration: "none",
      backgroundColor: "rgb(27, 94, 32)",
      boxShadow: "rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px",
    } 
  },
  avatarContainer: {
    display:"flex",
    flexDirection: "column",
    alignItems: "center"
  },
heading: {
  backgroundColor: "#409b3e",
  height: "50px !important",
  overflow: "hidden",
  borderRadius: "5px",
  minHeight: "unset !important",
}
});

export default function UpdateHappeningsDialog({
  rowData,
  setRowData,
  showDialogUpdateHappening,
  handleCloseDialogUpdateHappening,
  getAllEmployee,
  readOnly=false,
}) {
  const classes = useStyles();
  const [listRegisterDocEmployee, setListRegisterDocEmployee] = useState([]);
  const [listSalaryIncreaseEmployee, setListSalaryIncreaseEmployee] = useState([]);
   const [listPromoteEmployee, setListPromoteEmployee] = useState([]);
  const [listProposalEmployee, setListProposalEmployee] = useState([]);
const [showModalResignation, setShowModalResignation] = useState(false);
  


  const getListHappenings = async () => {
    try {
      const registerDoc = await getListRegisterDocEmployee(rowData.id);
      const resSalaryInc = await getListSalaryIncEmployee(rowData.id)
      const resPromote = await getListPromoteEmployee(rowData.id)
      const resProposal= await getListProposalEmployee(rowData.id)
      if(registerDoc?.data?.code === STATUS_CODE_SUCCESS) {
        setListRegisterDocEmployee(registerDoc.data.data)
      }
      if(resSalaryInc?.data?.code === STATUS_CODE_SUCCESS) {
        setListSalaryIncreaseEmployee(resSalaryInc.data.data)
      }
      if(resPromote?.data?.code === STATUS_CODE_SUCCESS) {
        setListPromoteEmployee(resPromote.data.data)
      }if(resProposal?.data?.code === STATUS_CODE_SUCCESS) {
        setListProposalEmployee(resProposal.data.data)
      }
    } catch (error) {
      toast.error("Có lỗi")
    }
  }
  useEffect(() => {
    getListHappenings()
  }, [])

  console.log(rowData);
  const handleOpenModalResignation = () => {
    setShowModalResignation(true)
  }

  const handleCloseModalResignation = () => {
    setShowModalResignation(false)
  }
console.log(rowData);
  return (
    <Dialog
      maxWidth="lg"
      fullWidth={true}
      open={showDialogUpdateHappening}
      onClose={handleCloseDialogUpdateHappening}
    >
      <DialogTitle className={classes.dialogTitle}>
        <span className={classes.titleDialog}>{"Cập nhật diễn biến"}</span>
        <IconButton
          className={classes.iconClose}
          onClick={() => handleCloseDialogUpdateHappening()}
        >
          <Icon color="error" title={"close"}>
            close
          </Icon>
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
                <Grid container spacing={2} style={{height: "max-content"}}>
                    <Grid item lg={3} md={3} sm={12} xs={12} className={classes.avatarContainer}>
                        <Avatar
                            className={classes.large}
                            variant="square"
                            src={getLinkAvatarEmployee(rowData.image)}
                        />
                        <Typography variant="h5" className={"mt-10"}>{rowData.name.toUpperCase()}</Typography>
                        <p style={{fontSize: "18px"}} className={"mt-10"}>{dataEmployee.team.find((item) => {
                            return (
                                item.id === rowData.team
                            )
                        })?.name}</p>
                    </Grid>
                    <Grid item lg={9} md={9} sm={12} xs={12}>        
                            <Grid container spacing={2}>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextField
                                fullWidth
                                InputProps={{
                                    readOnly: true,
                                }}
                                size="small"
                                label={"Họ tên"}
                                defaultValue={rowData.name}
                                variant="outlined"
                            />
                            </Grid>
                            
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                            <TextField
                            fullWidth
                            InputProps={{
                                readOnly: true,
                            }}
                            size="small"
                            label="Mã"
                            defaultValue={rowData.code}
                            variant="outlined"
                            
                            />
                            </Grid>

                            <Grid item lg={6} md={6} sm={12} xs={12}>
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

                            <Grid item lg={6} md={6} sm={12} xs={12}>
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

                            <Grid item lg={6} md={6} sm={12} xs={12}>
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

                            <Grid item lg={6} md={6} sm={12} xs={12}>
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
                    </Grid>
                  </Grid>
                 <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Accordion >
                    <AccordionSummary
                      className={classes.heading}
                      expandIcon={<ExpandMore className={classes.textWhite}/>}
                    >
                      <Typography variant="h6" className={classes.textWhite}>ĐĂNG KÝ HỒ SƠ</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <RegisterDocumentForm 
                        rowData={rowData}
                        setRowData={setRowData}
                        listRegisterDocEmployee={listRegisterDocEmployee}
                        setListRegisterDocEmployee={setListRegisterDocEmployee}
                      />
                    </AccordionDetails>
                  </Accordion>
                </Grid>   
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Accordion >
                    <AccordionSummary
                      className={classes.heading}
                      expandIcon={<ExpandMore className={classes.textWhite}/>}
                    >
                      <Typography variant="h6" className={classes.textWhite}>TĂNG LƯƠNG</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <SalaryIncreaseForm 
                       rowData={rowData}
                        setRowData={setRowData}
                        listSalaryIncreaseEmployee={listSalaryIncreaseEmployee}
                        setListSalaryIncreaseEmployee={setListSalaryIncreaseEmployee}
                        getAllEmployee={getAllEmployee}
                      />
                    </AccordionDetails>
                  </Accordion>
                </Grid> 
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Accordion >
                    <AccordionSummary
                      className={classes.heading}
                      expandIcon={<ExpandMore className={classes.textWhite}/>}
                    >
                      <Typography variant="h6" className={classes.textWhite}>THĂNG CHỨC</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <PromoteForm 
                        rowData={rowData}
                        setRowData={setRowData}
                        listPromoteEmployee={listPromoteEmployee}
                        setListPromoteEmployee={setListPromoteEmployee}
                        getAllEmployee={getAllEmployee}
                      />
                    </AccordionDetails>
                  </Accordion>
                </Grid> 
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Accordion >
                    <AccordionSummary
                      className={classes.heading}
                      expandIcon={<ExpandMore className={classes.textWhite}/>}
                    >
                      <Typography variant="h6" className={classes.textWhite}>ĐỀ XUẤT THAM MƯU</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <ProposalForm 
                      rowData={rowData}
                      setRowData={setRowData}
                      listProposalEmployee={listProposalEmployee}
                      setListProposalEmployee={setListProposalEmployee}
                      getAllEmployee={getAllEmployee}
                      />
                    </AccordionDetails>
                  </Accordion>
                </Grid>         
            </Grid>
      </DialogContent>
      
      <DialogActions style={{ justifyContent: "center", textAlign: "center" }}>
        <div className="flex flex-space-between flex-middle mb-5">
          {+rowData.submitProfileStatus !== STATUS_PENDING_TERMINATION &&
              <Button
              variant="contained"
              className="mr-12"
              color="secondary"
              onClick={handleOpenModalResignation}
            >
              KẾT THÚC
            </Button>
          }
          <Button
            variant="contained"
            className={`mr-12 ${classes.btnCustom}`}
            color="default"
            onClick={() => {
              handleCloseDialogUpdateHappening();
            }}
          >
            HỦY
          </Button>
        </div>
      </DialogActions>
      {
            showModalResignation &&
            <ModalUpdateHappenings
              label={"Đơn xin nghỉ việc"}
              showModal={showModalResignation}
              getAllEmployee={getAllEmployee}
              rowData={rowData}
              setRowData={setRowData}
              handleCloseModal={handleCloseModalResignation}
            />
          }
    </Dialog>
  );
}
