import { Button, makeStyles } from '@material-ui/core';
import TablePagination from '@material-ui/core/TablePagination';
import React from 'react'
const useStyles = makeStyles({
  paginationContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: "16px",
  },
  paginationButtonContainer: {
    display: "flex",
    marginLeft: "10px"
  },
  paginationButton: {
    margin: "0 8px",
    minWidth: "40px",
    padding: "0 8px",
  },
});
function TablePaginationComp({totalItems = 0, rowsPerPage, page, handleChangePage, handleChangeRowsPerPage}) {
const classes = useStyles();
const renderPageButtons = () => {
    const numPages = Math.ceil(totalItems / rowsPerPage);
    const buttons = [];

    for (let i = 0; i < numPages; i++) {
      if (i === 0 || i === numPages - 1 || (i >= page - 1 && i <= page + 1)) {
        buttons.push(
          <Button
            key={i}
            variant={i === page ? "contained" : "outlined"}
            color="primary"
            onClick={() => handleChangePage(null, i)}
            className={classes.paginationButton}
          >
            {i + 1}
          </Button>
        );
      } else if (
        (i === page - 2 && page > 2) ||
        (i === page + 2 && page < numPages - 3)
      ) {
        buttons.push(
          <Button
            key={i}
            variant="outlined"
            disabled
            className={classes.paginationButton}
          >
            ...
          </Button>
        );
      }
    }

    return buttons;
  };
  return (
    <TablePagination
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={totalItems}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        ActionsComponent={() => <div className={classes.paginationButtonContainer}>{renderPageButtons()}</div>}
        className={classes.paginationContainer}
        labelRowsPerPage="Số hàng mỗi trang"
        labelDisplayedRows={({ from, to }) => `${from}-${to} trong tổng số ${totalItems}`}
    />
  )
}

export default TablePaginationComp