import MaterialTable from 'material-table'
import React from 'react'
import TablePaginationComp from '../TablePagination/TablePagination'
import { makeStyles } from '@material-ui/core/styles';


function TableComp({listData , columns, page, handleChangePage, totalItems, rowsPerPage, handleChangeRowsPerPage, onlyTable=false}) {

  return (
    <>
 
            <MaterialTable
                title={""}
                data={listData}
                columns={columns}
                page={page}
                onChangePage={handleChangePage}
                localization={
                  {
                    body: {
                      emptyDataSourceMessage: "Không có dữ liệu",
                    },
                    toolbar: {
                      searchPlaceholder: 'Tìm kiếm',
                    },
                  }
                }
                options={{
                  exportButton: true,
                  exportAllData: true,
                  paging: false,
                  toolbar: !onlyTable,
                  tableLayout: "fixed",
                  headerStyle: {
                    backgroundColor: "#358600",
                    color: "#FFF",
                    
                  },
                }}
              />

          {!onlyTable &&
          <TablePaginationComp
            totalItems={totalItems} 
            rowsPerPage={rowsPerPage} 
            page={page} 
            handleChangePage={handleChangePage} 
            handleChangeRowsPerPage={handleChangeRowsPerPage} 
          />
          }
    </>
  )
}

export default TableComp