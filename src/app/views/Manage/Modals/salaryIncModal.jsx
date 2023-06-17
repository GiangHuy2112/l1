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

export default function SalaryIncModal({
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
            <Typography variant="h5" className="mt-20">
              {" "}
              <b>QUYẾT ĐỊNH</b>
            </Typography>
            <h5 className="mt-10">Về việc điều chỉnh tăng lương cho Nhân viên</h5>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            - Căn cứ tại quy chế, điều lệ của Công ty OceanTech
            <br />
            <br />
            - Căn cứ vào hợp đồng lao động với người lao động
            <br />
            <br />
            - Xét những đóng góp của người lao động và đề nghị của trưởng phòng nhân sự
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item lg={12} md={12} sm={12} xs={12} className={classes.flex} style={{justifyContent: "center"}}>
            <Typography variant="h5" className="mt-20 mb-20"  >
              <b style={{textAlign: "center"}}>GIÁM ĐỐC CÔNG TY QUYẾT ĐỊNH</b>
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
            <Grid item lg={6} md={6} sm={12} xs={12} className={classes.flex}>
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
          <Grid item lg={6} md={6} sm={12} xs={12} className={classes.flex}>
            <Typography style={{ minWidth: "max-content" }}>
              Số lương được tăng:
            </Typography>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <TextField
                className={classes.inputExps}
                disabled={readOnly}
                type="text"
                value={(rowDataModal.newSalary - rowDataModal.oldSalary) + " đ" || ""}
                InputProps={{
                  disableUnderline: true,
                  className: classes.input + " " + classes.disable,
                }}
              />
            </Grid>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12} className={classes.flex}>
            <Typography style={{ minWidth: "max-content" }}>
              Lý do tăng lương:
            </Typography>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <TextField
                className={classes.inputExps}
                disabled={readOnly}
                type="text"
                value={rowDataModal.reason || ""}
                InputProps={{
                  disableUnderline: true,
                  className: classes.input + " " + classes.disable,
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <p className="mt-20" style={{ padding: "0 10px" }}>
            Căn cứ vào bộ luật lao động năm 2019, hợp đồng lao động số HĐLĐ001, thỏa ước lao động và tình hình thực tế của công ty, đề xuất ban hành chính
            sách thi hành để đảm bảo công bằng cũng như là lời động viên, tạo ra động lực để tôi làm việc tốt hơn.
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
