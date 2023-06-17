import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  Icon,
  IconButton,
  MenuItem,
} from "@material-ui/core";
import { SelectValidator, TextValidator, ValidatorForm } from "react-material-ui-form-validator";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { STATUS_CODE_SUCCESS} from "../../../constants/statusContant"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  dialogTitle: {
    paddingBottom: 0,
    borderBottom: "1px solid #eee"   
  },
  titleDialog: {
    fontSize: "25px",
    fontWeight: "500",
    color: "#409b3e",
  },
  dialogContent: {
    paddingTop: "20px !important",
    paddingBottom: "20px !important",
    borderBottom: "1px solid #eee"   
  },
  iconClose: {
    position: "absolute", 
    right: "10px",
    top: "10px" 
  }

});

export default function EmployeeDialogSubmit(props) {
  
  return (
  <></>
  );
}
