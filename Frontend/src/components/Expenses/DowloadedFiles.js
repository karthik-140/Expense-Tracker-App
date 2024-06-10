import { Table, TableHead, TableBody, TableCell, TableRow, TableContainer, Typography, Link } from "@mui/material"
import { format } from 'date-fns'

import CustomPaper from "../../customComponents/CustomPaper"
import { useGetDownloadedFilesQuery } from "../../api/ExpenseAPI"

const headers = [
  { label: 'S.no', field: 's.no' },
  { label: 'Expense File', field: 'fileUrl' },
  { label: 'Downloaded Date', field: 'createdAt' },
]

const DowloadedFiles = () => {
  const { data: downloadedFiles = [] } = useGetDownloadedFilesQuery()

  if (downloadedFiles.length === 0) {
    return
  }

  const downloadedFileRows = downloadedFiles.map((row, index) => (
    <TableRow key={`row-${index}`}>
      <TableCell align="center" >{index + 1}</TableCell>
      <TableCell align="center" ><Link href={`${row.fileUrl}`} >Download File</Link></TableCell>
      <TableCell align="center" >{format(row.createdAt, 'dd-MM-yyyy')}</TableCell>
    </TableRow>
  ))

  return (
    <CustomPaper className='flex flex-col gap-6'>
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: { xs: 15, sm: 15, md: 20, lg: 20 },
        }}
        variant="h6"
        color='blue'
      >
        Downloaded Files Table
      </Typography>
      <TableContainer>
        <Table>
          <TableHead className="uppercase">
            <TableRow>
              {headers.map((header, idx) => (
                <TableCell
                  key={`header-${idx}`}
                  align="center"
                  style={{ backgroundColor: 'blue', color: 'white', fontWeight: 'bold' }}
                >
                  {header.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {downloadedFileRows}
          </TableBody>
        </Table>
      </TableContainer>
    </CustomPaper>
  )
}

export default DowloadedFiles