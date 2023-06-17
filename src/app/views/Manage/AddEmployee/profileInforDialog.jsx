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
  List,
  ListSubheader,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import {
  addEmployee,
  addExpByEmployee,
  deleteExpByEmployee,
  editEmployee,
  editExpByEmployee,
  getCertificatesByEmployee,
  getFamilyByEmployee,
  getLinkAvatarEmployee,
  getListExpsByEmployee,
} from "./addEmployeeService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { STATUS_CODE_SUCCESS } from "../../../constants/statusContant";
import { makeStyles } from "@material-ui/core/styles";
import FormAddEmployee from "./formAddEmloyee";
import FormAddCertificates from "./formAddCertificates";
import FormAddEmployeeFamily from "./formAddEmployeeFamily";
import { countObjectKeys, isBase64Image } from "utils";
import { useState } from "react";
import avatarDefault from "../../../public/assets/avatarDefault.jpg";
import moment from "moment";
import dataEmployee from "app/constants/dataEmployeeContant";
import TableComp from "app/views/Component/TableComp/TableComp";
import {
  AlternateEmail,
  Build,
  BusinessCenter,
  Cake,
  CardMembership,
  Create,
  Delete,
  Email,
  LocationOn,
  Phone,
  PlayArrow,
  SportsEsports,
  Wc,
  Work,
} from "@material-ui/icons";
import { ConfirmationDialog } from "egret";
import LeaderSubmitDialog from "./leaderSubmitDialog";
import ApprovalConfirmDialog from "app/views/Leader/Approval/approvalConfirmDialog";
import AdditionalReqDialog from "app/views/Leader/Approval/additionalRequestDialog";
import RefuseApprovalDialog from "app/views/Leader/Approval/refuseApprovalDialog";

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
    padding: "8px 12px 0px 12px",
    overflow: "hidden",
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
  }
});

export default function ProfileInforDialog({
  rowData,
  setRowData,
  showDialogProfile,
  handleCloseDialogProfile,
  handleCloseDialog,
  getAllEmployee,
  listFamilyEmployee = [],
  listCertificateEmployee = [],
  readOnly=false,
  waitHandle=false,
  handleCloseAlertDialog=() => {}
}) {
  const classes = useStyles();
console.log(rowData);
  const [valueDialog, setValueDialog] = React.useState(0);
  const [rowDataExp, setRowDataExp] = React.useState({});
  const [listExps, setListExps] = React.useState([]);
  const [showFormExps, setShowFormExps] = React.useState(true);
  const [openModalDelete, setOpenModalDelete] = React.useState(false);
  const [idExp, setIdExp] = React.useState();
  const [showLeaderSubmitDialog, setShowLeaderSubmitDialog] =
    React.useState(false);
  const [showApprovalDialog, setShowApprovalDialog] = useState(false);
  const [showAdditionalReqDialog, setShowAdditionalReqDialog] = useState(false);
  const [showRefuseDialog, setShowRefuseDialog] = useState(false);
  const getListExps = async () => {
    try {
      if (rowData?.id) {
        const res = await getListExpsByEmployee(rowData.id);
        if (res?.data?.data) {
          setListExps(res.data.data);
        }
      }
    } catch (error) {
      toast.error("Có lỗi!!!");
    }
  };

  useEffect(() => {
    getListExps();
  }, []);

  const handleChange = (event, newValue) => {
    setValueDialog(newValue);
  };

  const handleCancelExps = () => {
    setRowDataExp({});
  };

  const handleChangeInputProfile = (e) => {
    setRowData({ ...rowData, [e.target.name]: e.target.value });
  };

  const handleChangeInputExps = (e) => {
    if (e.target.name === "startDate" || e.target.name === "endDate") {
      const date = moment(e.target.value, "YYYY-MM-DD").local().valueOf();
      setRowDataExp({ ...rowDataExp, [e.target.name]: date });
      return;
    }
    setRowDataExp({ ...rowDataExp, [e.target.name]: e.target.value });
  };

  const handleFillInput = (exp) => {
    setRowDataExp(exp);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const exp = {
      ...rowDataExp,
      companyAddress: "address",
    };
    try {
      if (rowDataExp.id) {
        // Sửa
        const res = await editExpByEmployee(exp);
        if (res?.data?.code === STATUS_CODE_SUCCESS) {
          const listExpsNew = listExps.map((item) => {
            if (item.id === res.data.data.id) {
              return res.data.data;
            }

            return item;
          });
          setListExps(listExpsNew);
          toast.success("Sửa kinh nghiệm thành công");
          setRowDataExp({});
        } else {
          toast.warning(res?.data?.message);
        }
      } else {
        // Add
        const res = await addExpByEmployee(rowData.id, exp);
        console.log(res);
        if (res?.data && res?.data?.code === STATUS_CODE_SUCCESS) {
          setListExps(res.data.data);
          toast.success("Thêm kinh nghiệm thành công");
          setRowDataExp({});
        } else {
          toast.warning(res?.data?.message);
        }
      }
    } catch (error) {
      toast.error("Có lỗi");
    }
  };

  const handleOpenModalDelete = (idExp) => {
    setOpenModalDelete(true);
    setIdExp(idExp);
  };

  const handleDeleteExp = async () => {
    try {
      const res = await deleteExpByEmployee(idExp);
      if (res?.data?.code === STATUS_CODE_SUCCESS) {
        setOpenModalDelete(false);
        toast.success("Xóa kinh nghiệm thành công");
        const listExpsNew = listExps.filter((item) => {
          return item.id !== idExp;
        });
        setListExps(listExpsNew);
        if (rowDataExp.id === idExp) {
          setRowDataExp({});
        }
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      toast.error("Có lỗi");
    }
  };

  const handleSaveProfile = async () => {
    try {
      const res = await editEmployee(rowData);
      if (res?.data?.data) {
        toast.success("Sửa thông tin nhân viên thành công");
        getAllEmployee();
      } else {
        toast.warning(res?.data?.message);
      }
    } catch (error) {
      toast.error("Có lỗi");
    }
  };

  const handleOpenDialogSubmitLeader = () => {
    setShowLeaderSubmitDialog(true);
  }
  const handleCloseDialogSubmitLeader = () => {
    setShowLeaderSubmitDialog(false);
  }


  const renderProfile = () => {
    return (
      <>
        <Grid
          item
          lg={3}
          md={3}
          sm={12}
          xs={12}
          className={classes.contentLeft}
        >
          <Avatar
            className={classes.large}
            alt="Remy Sharp"
            src={getLinkAvatarEmployee(rowData.image)}
          />
          <ListItem>
            <ListItemIcon style={{ minWidth: "38px" }}>
              <Email />
            </ListItemIcon>
            <ListItemText primary={"emailOCT@gmail.com"} />
          </ListItem>
          <ListItem>
            <ListItemIcon style={{ minWidth: "38px" }}>
              <Phone />
            </ListItemIcon>
            <ListItemText primary={rowData.phone} />
          </ListItem>
          <ListItem>
            <ListItemIcon style={{ minWidth: "38px" }}>
              <Build fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="h6">KỸ NĂNG</Typography>}
            />
          </ListItem>
          <TextField
            fullWidth
            disabled={readOnly}
            value={rowData.skill || ""}
            name="skill"
            InputProps={{
              disableUnderline: true,
              className: !readOnly ? classes.input : classes.disable,
            }}
            onChange={!readOnly ? handleChangeInputProfile : () => {}}
          />
          <ListItem>
            <ListItemIcon style={{ minWidth: "38px" }}>
              <SportsEsports fontSize="large" />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="h6">HOẠT ĐỘNG</Typography>}
            />
          </ListItem>
          <TextField
            fullWidth
            disabled={readOnly}
            value={rowData.activity || ""}
            name="activity"
            InputProps={{
              disableUnderline: true,
              className: !readOnly ? classes.input : classes.disable,
            }}
            onChange={!readOnly ? handleChangeInputProfile : () => {}}
          />
        </Grid>
        <Grid
          item
          lg={9}
          md={9}
          sm={12}
          xs={12}
          className={classes.contentRight}
        >
          <div className={classes.borderLeft + " " + classes.padding}>
            <Typography variant="h5">{rowData.name}</Typography>
            <Typography variant="h6">
              {dataEmployee.team &&
                dataEmployee.team.find((item) => {
                  return item.id === rowData.team;
                })?.name}
            </Typography>
          </div>

          <div className={classes.positionLeft}>
            <ListItem>
              <ListItemIcon style={{ minWidth: "38px" }}>
                <Wc />
              </ListItemIcon>
              <ListItemText
                primary={
                  dataEmployee.gender &&
                  dataEmployee.gender.find((item) => {
                    return item.id === rowData.gender;
                  })?.name
                }
              />
            </ListItem>
            <ListItem>
              <ListItemIcon style={{ minWidth: "38px" }}>
                <Cake />
              </ListItemIcon>
              <ListItemText
                primary={moment(rowData.dateOfBirth).format("DD-MM-YYYY")}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon style={{ minWidth: "38px" }}>
                <LocationOn />
              </ListItemIcon>
              <ListItemText primary={rowData.address} />
            </ListItem>
          </div>
          <div
            className={classes.borderLeft + " " + classes.padding + " mb-10"}
          >
            <ListItem>
              <ListItemIcon style={{ minWidth: "38px" }}>
                <Work fontSize="large" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="h6">MỤC TIÊU NGHỀ NGHIỆP</Typography>
                }
              />
            </ListItem>
            <TextField
              fullWidth
              disabled={readOnly}
              value={rowData.knowledge || ""}
              InputProps={{
                disableUnderline: true,
                className: !readOnly ? classes.input : classes.disable,
              }}
              name="knowledge"
              onChange={!readOnly ? handleChangeInputProfile : () => {}}
            />
          </div>
          <div
            className={classes.borderLeft + " " + classes.padding + " mt-10"}
          >
            <ListItem>
              <ListItemIcon style={{ minWidth: "38px" }}>
                <BusinessCenter fontSize="large" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="h6">KINH NGHIỆM LÀM VIỆC</Typography>
                }
              />
              {
                !readOnly && 
                <IconButton
                  aria-label="delete"
                  className={classes.margin}
                  onClick={() => setShowFormExps(!showFormExps)}
                >
                  <PlayArrow
                    className={!showFormExps ? classes.btnAdd : classes.btnClose}
                  />
                </IconButton>
              }
            </ListItem>
            {showFormExps && !readOnly && (
              <ValidatorForm
                className={classes.formContainer}
                onSubmit={handleSubmit}
                
              >
                <Grid container spacing={3}>
                  <Grid
                    item
                    lg={6}
                    md={6}
                    sm={12}
                    xs={12}
                    className={classes.flex}
                  >
                    <Typography style={{ minWidth: "max-content" }}>
                      Ngày bắt đầu:
                    </Typography>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <TextValidator
                        className="w-100"
                        type="date"
                        value={
                          rowDataExp.startDate
                            ? moment(rowDataExp.startDate).format("YYYY-MM-DD")
                            : ""
                        }
                        name="startDate"
                        validators={["required"]}
                        errorMessages={["Bắt buộc nhập"]}
                        InputProps={{
                          disableUnderline: true,
                          className: !readOnly ? classes.input : classes.disable,
                        }}
                        onChange={!readOnly ? handleChangeInputExps : () => {}}
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    lg={6}
                    md={6}
                    sm={12}
                    xs={12}
                    className={classes.flex}
                  >
                    <Typography style={{ minWidth: "max-content" }}>
                      Ngày kết thúc:
                    </Typography>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <TextValidator
                        className="w-100"
                        type="date"
                        value={
                          rowDataExp.endDate
                            ? moment(rowDataExp.endDate).format("YYYY-MM-DD")
                            : ""
                        }
                        name="endDate"
                        validators={["required"]}
                        errorMessages={["Bắt buộc nhập"]}
                        InputProps={{
                          disableUnderline: true,
                          className: !readOnly ? classes.input : classes.disable,
                        }}
                        onChange={!readOnly ? handleChangeInputExps : () => {}}
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                    className={classes.flex}
                  >
                    <Typography style={{ minWidth: "max-content" }}>
                      Tên công ty:
                    </Typography>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <TextValidator
                        className={classes.inputExps}
disabled={readOnly}
                        type="text"
                        value={rowDataExp.companyName || ""}
                        name="companyName"
                        validators={["required"]}
                        errorMessages={["Bắt buộc nhập"]}
                        InputProps={{
                          disableUnderline: true,
                          className: !readOnly ? classes.input : classes.disable,
                        }}
                        onChange={!readOnly ? handleChangeInputExps : () => {}}
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                    className={classes.flex}
                  >
                    <Typography style={{ minWidth: "max-content" }}>
                      Vị trí:
                    </Typography>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <TextValidator
                        className="w-100"
                        type="text"
                        value={rowDataExp.leavingReason || ""}
                        name="leavingReason"
                        validators={["required"]}
                        errorMessages={["Bắt buộc nhập"]}
                        InputProps={{
                          disableUnderline: true,
                          className: !readOnly ? classes.input : classes.disable,
                        }}
                        onChange={!readOnly ? handleChangeInputExps : () => {}}
                      />
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    lg={12}
                    md={12}
                    sm={12}
                    xs={12}
                    className={classes.flex}
                  >
                    <Typography style={{ minWidth: "max-content" }}>
                      Mô tả công việc:
                    </Typography>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <TextValidator
                        className="w-100"
                        type="text"
                        value={rowDataExp.jobDescription || ""}
                        name="jobDescription"
                        validators={["required"]}
                        errorMessages={["Bắt buộc nhập"]}
                        InputProps={{
                          disableUnderline: true,
                          className: !readOnly ? classes.input : classes.disable,
                        }}
                        onChange={!readOnly ? handleChangeInputExps : () => {}}
                      />
                    </Grid>
                  </Grid>

                  <div className={classes.btnContainer}>
                    <Button
                      type="submit"
                      variant="contained"
                      className="mr-12"
                      color="secondary"
                    >
                      {rowDataExp.id ? "SỬA" : "LƯU"}
                    </Button>

                    <Button
                      variant="contained"
                      className={`mr-12 ${classes.btnCustom}`}
                      color="default"
                      onClick={() => {
                        handleCancelExps();
                      }}
                    >
                      HỦY
                    </Button>
                  </div>
                </Grid>
              </ValidatorForm>
            )}
            <div className={classes.listExps}>
              {listExps &&
                listExps.length > 0 &&
                listExps.map((item, index) => {
                  return (
                    <Grid
                      key={index}
                      container
                      spacing={3}
                      className={classes.itemExps}
                    >
                      <Grid item lg={11} md={11} sm={12} xs={12}>
                        <p>
                          <strong>
                            {moment(item.startDate).format("YYYY-MM-DD") +
                              " - " +
                              moment(item.endDate).format("YYYY-MM-DD") +
                              " - " +
                              item.companyName}
                          </strong>
                        </p>

                        <p>
                          <strong>{item.leavingReason}</strong>
                        </p>
                        <p>{item.jobDescription}</p>
                      </Grid>
                      {
                        !readOnly && 
                        <Grid item lg={1} md={1} sm={12} xs={12}>
                        <IconButton
                          aria-label="edit"
                          onClick={() => {
                            handleFillInput(item);
                          }}
                        >
                          <Create />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          onClick={() => handleOpenModalDelete(item.id)}
                        >
                          <Delete />
                        </IconButton>
                      </Grid>
                      }
                    </Grid>
                  );
                })}
            </div>
          </div>
          <div
            className={classes.borderLeft + " " + classes.padding + " mt-10"}
          >
            <ListItem>
              <ListItemIcon style={{ minWidth: "38px" }}>
                <CardMembership fontSize="large" />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="h6">CHỨNG CHỈ</Typography>}
              />
            </ListItem>
            <ul className="mt-10">
              {listCertificateEmployee &&
                listCertificateEmployee.length > 0 &&
                listCertificateEmployee.map((item, index) => {
                  return (
                    <li key={index}>
                      {moment(item.issueDate).format("DD-MM-YYYY")}:{" "}
                      {item.certificateName}
                    </li>
                  );
                })}
            </ul>
          </div>
        </Grid>
      </>
    );
  };

  const renderCurriculumVitae = () => {
    return (
      <div className={classes.contentCV}>
        <Grid container spacing={3}>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <Avatar
              className={classes.large}
              variant="square"
              src={getLinkAvatarEmployee(rowData.image)}
            />
          </Grid>
          <Grid item lg={9} md={9} sm={12} xs={12} className={classes.headerCV}>
            <Typography variant="h6">
              <strong>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</strong>
            </Typography>
            <Typography variant="h6">
              <b>Độc lập - Tự do - Hạnh phúc</b>
            </Typography>
            <Typography variant="h6">
              <b>-------------------------</b>
            </Typography>
            <Typography variant="h5" className="mt-20">
              {" "}
              <b>SƠ YẾU LÝ LỊCH</b>
            </Typography>
            <h5 className="mt-10">TỰ THUẬT</h5>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item lg={12} md={12} sm={12} xs={12} className={classes.flex}>
            <Typography variant="h6">I. BẢN THÂN</Typography>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12} className={classes.flex}>
            <Typography style={{ minWidth: "max-content" }}>
              Họ và tên:
            </Typography>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <TextField
                className={classes.inputExps}
disabled={readOnly}
                type="text"
                value={rowData.name || ""}
                InputProps={{
                  disableUnderline: true,
                  className: !readOnly ? classes.input : classes.disable,
                }}
              />
            </Grid>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12} className={classes.flex}>
            <Typography style={{ minWidth: "max-content" }}>
              Giới tính:
            </Typography>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <TextField
                className={classes.inputExps}
                disabled={readOnly}
                type="text"
                value={ rowData.gender ?
                  dataEmployee.gender.find((item) => {
                    return item.id === rowData.gender;
                  })?.name : ""
                }
                InputProps={{
                  disableUnderline: true,
                  className: !readOnly ? classes.input : classes.disable,
                }}
              />
            </Grid>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12} className={classes.flex}>
            <Typography style={{ minWidth: "max-content" }}>
              Điện thoại:
            </Typography>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <TextField
                className={classes.inputExps}
disabled={readOnly}
                type="text"
                value={rowData.phone || ""}
                InputProps={{
                  disableUnderline: true,
                  className: !readOnly ? classes.input : classes.disable,
                }}
              />
            </Grid>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12} className={classes.flex}>
            <Typography style={{ minWidth: "max-content" }}>
              Sinh ngày:
            </Typography>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <TextField
                className={classes.inputExps}
                disabled={readOnly}
                type="text"
                value={rowData.dateOfBirth ? moment(rowData.dateOfBirth).format("DD-MM-YYYY") : ""}
                InputProps={{
                  disableUnderline: true,
                  className: !readOnly ? classes.input : classes.disable,
                }}
              />
            </Grid>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12} className={classes.flex}>
            <Typography style={{ minWidth: "max-content" }}>
              Chỗ ở hiện nay:
            </Typography>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <TextField
                className={classes.inputExps}
                disabled={readOnly}
                type="text"
                value={rowData.address || ""}
                InputProps={{
                  disableUnderline: true,
                  className: !readOnly ? classes.input : classes.disable,
                }}
              />
            </Grid>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12} className={classes.flex}>
            <Typography style={{ minWidth: "max-content" }}>
              Dân tộc:
            </Typography>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <TextField
                className={classes.inputExps}
disabled={readOnly}
                type="text"
                value={rowData.ethnic || ""}
                InputProps={{
                  disableUnderline: true,
                  className: !readOnly ? classes.input : classes.disable,
                }}
              />
            </Grid>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12} className={classes.flex}>
            <Typography style={{ minWidth: "max-content" }}>
              Tôn giáo:
            </Typography>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <TextField
                className={classes.inputExps}
disabled={readOnly}
                type="text"
                value={rowData.religion || ""}
                InputProps={{
                  disableUnderline: true,
                  className: !readOnly ? classes.input : classes.disable,
                }}
              />
            </Grid>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12} className={classes.flex}>
            <Typography style={{ minWidth: "max-content" }}>
              Số CCCD/CMT:
            </Typography>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <TextField
                className={classes.inputExps}
                disabled={readOnly}
                type="text"
                value={rowData.citizenIdentificationNumber || ""}
                InputProps={{
                  disableUnderline: true,
                  className: !readOnly ? classes.input : classes.disable,
                }}
              />
            </Grid>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12} className={classes.flex}>
            <Typography style={{ minWidth: "max-content" }}>
              Cấp ngày:
            </Typography>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <TextField
                className={classes.inputExps}
                disabled={readOnly}
                type="text"
                value={rowData.dateOfIssuanceCard ? moment(rowData.dateOfIssuanceCard).format("DD-MM-YYYY") : ""}
                InputProps={{
                  disableUnderline: true,
                  className: !readOnly ? classes.input : classes.disable,
                }}
              />
            </Grid>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12} className={classes.flex}>
            <Typography style={{ minWidth: "max-content" }}>
              Nơi cấp:
            </Typography>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <TextField
                className={classes.inputExps}
disabled={readOnly}
                type="text"
                value={rowData.placeOfIssueCard || ""}
                InputProps={{
                  disableUnderline: true,
                  className: !readOnly ? classes.input : classes.disable,
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item lg={12} md={12} sm={12} xs={12} className={classes.flex}>
            <Typography variant="h6" className="mt-10">
              I. QUAN HỆ GIA ĐÌNH
            </Typography>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12} className={classes.flex}>
            <p style={{ fontStyle: "italic" }}>
              Ghi rõ họ tên, năm sinh, nghề nghiệp, nơi công tác của bố mẹ đẻ,
              anh chị em ruột, vợ(hoặc chồng), con
            </p>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12} className={classes.flex}>
            <TableComp
              columns={dataEmployee.columnsFam}
              listData={listFamilyEmployee}
              onlyTable={true}
              transparent={true}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Typography variant="h6" className={classes.bottomCV + " mt-10"}>
              <b>LỜI CAM ĐOAN</b>
            </Typography>
          </Grid>
          <p style={{ padding: "0 10px" }}>
            Tôi xin cam đoan bản khai sơ yếu lý lịch trên đúng sự thật, nếu có
            điều gì không đúng tôi chịu trách nhiệm trước pháp luật về lời khai
            của mình.
          </p>

          <Grid item lg={7} md={7} sm={12} xs={12}></Grid>
          <Grid item lg={5} md={5} sm={12} xs={12} className={classes.bottomCV}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <p style={{ fontStyle: "italic" }}>
                Hà Nội, ngày {moment().date()} tháng {moment().month() + 1} năm{" "}
                {moment().year()}
              </p>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <h5>
                <b>NGƯỜI KHAI</b>
              </h5>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <p>(Ký rõ họ tên)</p>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <p>{rowData.name}</p>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <p>{rowData.name}</p>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  };

  const renderCert = () => {
    return <Grid item lg={12} md={12} sm={12} xs={12} className={classes.flex}>
            <TableComp
              columns={dataEmployee.columnsCert}
              listData={listCertificateEmployee}
              onlyTable={true}
              transparent={true}
            />
          </Grid>
  }

  const handleOpenDialogApproval = () => {
    setShowApprovalDialog(true)
  }
  const handleCloseDialogApproval = () => {
    setShowApprovalDialog(false)
  }

  const handleOpenDialogAdditionalReq = () => {
    setShowAdditionalReqDialog(true)
  }

  const handleCloseDialogAdditionalReq = () => {
    setShowAdditionalReqDialog(false)
  }
  const handleOpenDialogRefuse = () => {
    setShowRefuseDialog(true)
  }
  const handleCloseDialogRefuse = () => {
    setShowRefuseDialog(false)
  }

  return (
    <Dialog
      maxWidth="lg"
      fullWidth={true}
      open={showDialogProfile}
      onClose={handleCloseDialogProfile}
    >
      <DialogTitle className={classes.dialogTitle}>
        <span className={classes.titleDialog}>{"Thông tin hồ sơ"}</span>
        <IconButton
          className={classes.iconClose}
          onClick={() => handleCloseDialogProfile()}
        >
          <Icon color="error" title={"close"}>
            close
          </Icon>
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Grid item lg={2} md={2} sm={12} xs={12} className={classes.sidebar}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={valueDialog}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            className={classes.tabs}
          >
            <Tab className={classes.tab} label="Hồ sơ" />
            <Tab className={classes.tab} label="Sơ yếu lý lịch" />
            <Tab className={classes.tab} label="Danh sách văn bằng" />
          </Tabs>
        </Grid>
        <Grid className={classes.contentContainer} container spacing={3}>
          {valueDialog === 0 && renderProfile()}
          {valueDialog === 1 && renderCurriculumVitae()}
          {valueDialog === 2 && renderCert()}
        </Grid>
      </DialogContent>
      {
        showLeaderSubmitDialog &&
        <LeaderSubmitDialog 
          rowData={rowData}
          setRowData={setRowData}
          showLeaderSubmitDialog={showLeaderSubmitDialog}
          getAllEmployee={getAllEmployee}
          handleCloseDialogSubmitLeader={handleCloseDialogSubmitLeader}
          handleCloseDialog={handleCloseDialog}
          handleCloseDialogProfile={handleCloseDialogProfile}
          type="approval"
          handleCloseAlertDialog={handleCloseAlertDialog}
        />
      }
      <DialogActions style={{ justifyContent: "center", textAlign: "center" }}>
        <div className="flex flex-space-between flex-middle mb-5">
          {
            !readOnly &&
            <>
              <Button
              variant="contained"
              className="mr-12"
              color="secondary"
              onClick={handleSaveProfile}
            >
              LƯU
            </Button>
            <Button
              variant="contained"
              className="mr-12"
              color="primary"
              onClick={handleOpenDialogSubmitLeader}
            >
              Trình lãnh đạo
            </Button>
            </>
          }
          {
            waitHandle &&
            <>
              <Button
              variant="contained"
              className={classes.btnSuccess + " mr-12"}
              onClick={handleOpenDialogApproval}
            >
              DUYỆT
            </Button>
            <Button
              variant="contained"
              className="mr-12"
              color="primary"
              onClick={handleOpenDialogAdditionalReq}
            >
              YÊU CẦU BỔ SUNG
            </Button>
            <Button
              variant="contained"
              className="mr-12"
              color="secondary"
              onClick={handleOpenDialogRefuse}
            >
              TỪ CHỐI
            </Button>
            </>
          }
          <Button
            variant="contained"
            className={`mr-12 ${classes.btnCustom}`}
            color="default"
            onClick={() => {
              handleCloseDialogProfile();
            }}
          >
            HỦY
          </Button>
        </div>
      </DialogActions>
      {openModalDelete && (
        <ConfirmationDialog
          title={"Xác nhận xóa kinh nghiệm"}
          open={openModalDelete}
          onConfirmDialogClose={() => setOpenModalDelete(false)}
          onYesClick={handleDeleteExp}
          text={"Thao tác này sẽ xóa kinh nghiệm vĩnh viễn"}
          Yes={"Xóa"}
          No={"Hủy bỏ"}
        />
      )}

      {
        showApprovalDialog && 
        <ApprovalConfirmDialog 
          showApprovalDialog={showApprovalDialog}
          handleCloseDialogApproval={handleCloseDialogApproval}
          handleCloseDialogProfile={handleCloseDialogProfile}
          rowData={rowData}
          setRowData={setRowData}
          getAllEmployee={getAllEmployee}
        />
      }

      {
        showAdditionalReqDialog &&
        <AdditionalReqDialog 
          showAdditionalReqDialog={showAdditionalReqDialog}
          rowData={rowData}
          setRowData={setRowData}
          getAllEmployee={getAllEmployee}
          handleCloseDialogAdditionalReq={handleCloseDialogAdditionalReq}
          handleCloseDialogProfile={handleCloseDialogProfile}
        />
      }

      {
        showRefuseDialog &&
        <RefuseApprovalDialog 
          showRefuseDialog={showRefuseDialog}
          rowData={rowData}
          setRowData={setRowData}
          getAllEmployee={getAllEmployee}
          handleCloseDialogRefuse={handleCloseDialogRefuse}
          handleCloseDialogProfile={handleCloseDialogProfile}
        />
      }
    </Dialog>
  );
}
