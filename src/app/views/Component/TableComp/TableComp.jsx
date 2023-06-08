import MaterialTable from 'material-table'
import React from 'react'
import TablePaginationComp from '../TablePagination/TablePagination'
import { makeStyles } from '@material-ui/core/styles';


function TableComp({listData , columns, page, handleChangePage, totalItems, rowsPerPage, handleChangeRowsPerPage}) {

  return (
    <>
 
            <MaterialTable
                title={false}
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
                  headerStyle: {
                    backgroundColor: "#358600",
                    color: "#FFF",
                    
                  },
                }}
              />
   
          <TablePaginationComp
            totalItems={totalItems} 
            rowsPerPage={rowsPerPage} 
            page={page} 
            handleChangePage={handleChangePage} 
            handleChangeRowsPerPage={handleChangeRowsPerPage} 
          />
    </>
  )
}

export default TableComp