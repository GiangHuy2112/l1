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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { makeStyles } from "@material-ui/core/styles";
import { countObjectKeys, isBase64Image } from "utils";
import { useState } from "react";
import moment from "moment";
import dataEmployee from "app/constants/dataEmployeeContant";
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
import LeaderSubmitDialog from "../AddEmployee/leaderSubmitDialog";

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
    padding: "40px 50px !important",
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
    paddingTop: "40px !important;"
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
    backgroundColor: "#eee",
    "&::-webkit-scrollbar": {
      display: "none",
    },
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

export default function ProposalModal({
  rowData,
  rowDataModal,
  readOnly=false,
}) {
  const classes = useStyles();

  return (
    <div className={classes.contentCV}>
        <Grid container spacing={3}>
          <Grid item lg={12} md={12} sm={12} xs={12} className={classes.headerCV}>
            <Typography variant="h6">
              <strong style={{wordSpacing: "4px"}}>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</strong>
            </Typography>
            <Typography variant="h6">
              <b>Độc lập - Tự do - Hạnh phúc</b>
            </Typography>
            <Typography variant="h6">
              <b>-------------------------</b>
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item lg={12} md={12} sm={12} xs={12} className={classes.flex} style={{justifyContent: "center"}}>
            <Typography variant="h5" className="mt-20 mb-20"  >
              <b style={{textAlign: "center"}}>ĐƠN ĐỀ XUẤT Ý KIẾN THAM MƯU</b>
            </Typography>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12} className={classes.flex}>
            <Typography style={{ minWidth: "max-content" }}>
              Ông (Bà):
            </Typography>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <TextField
                className={classes.inputExps}
                disabled={readOnly}
                type="text"
                value={rowData.name || ""}
                InputProps={{
                  disableUnderline: true,
                  className: classes.input + " " + classes.disable ,
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
                  className: classes.input + " " + classes.disable,
                }}
              />
            </Grid>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12} className={classes.flex}>
            <Typography style={{ minWidth: "max-content" }}>
             Địa chỉ:
            </Typography>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <TextField
                className={classes.inputExps}
                disabled={readOnly}
                type="text"
                value={rowData.address || ""}
                InputProps={{
                  disableUnderline: true,
                  className: classes.input + " " + classes.disable,
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
                  className: classes.input + " " + classes.disable,
                }}
              />
            </Grid>
          </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12} className={classes.flex}>
            <Typography style={{ minWidth: "max-content" }}>
              Chức vụ hiện tại:
            </Typography>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <TextField
                className={classes.inputExps}
                disabled={readOnly}
                type="text"
                value={rowData.currentPosition || ""}
                InputProps={{
                  disableUnderline: true,
                  className: classes.input + " " + classes.disable,
                }}
              />
            </Grid>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12} className={classes.flex}>
            <Typography style={{ minWidth: "max-content" }}>
              Tôi viết đơn này đề nghị công ty xem xét và giải quyết vấn đề loại:
            </Typography>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <TextField
                className={classes.inputExps}
                disabled={readOnly}
                type="text"
                value={rowDataModal.type || ""}
                InputProps={{
                  disableUnderline: true,
                  className: classes.input + " " + classes.disable,
                }}
              />
            </Grid>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12} className={classes.flex}>
            <Typography style={{ minWidth: "max-content" }}>
                Nội dung vấn đề cần xem xét và giải quyết vấn đề:
            </Typography>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <TextField
                className={classes.inputExps}
                disabled={readOnly}
                type="text"
                value={rowDataModal.content || ""}
                InputProps={{
                  disableUnderline: true,
                  className: classes.input + " " + classes.disable,
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <p className="mt-10">
             Kính mong công ty/cá nhân có thẩm quyền xem xét đơn đề nghị và giải quyết vấn đề mà tôi đã nêu ở trên. Tôi xin cam đoan những thông tin trên hoàn toàn đúng sự thật. Nếu có gì sai sót, tôi xin chịu trách nhiệm trước công ty và trước pháp luật.
            </p>
            <p className="mt-10">
                Tôi xin chân thành cảm ơn!
            </p>
          </Grid>
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
                <b>NGƯỜI LÀM ĐƠN</b>
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
}
