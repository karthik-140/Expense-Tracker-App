import { Link } from "@mui/material"
import { format } from 'date-fns'

import { useGetDownloadedFilesQuery } from "../../api/ExpenseAPI"
import CustomTable from "../../customComponents/CustomTable"
import CustomLoading from "../../customComponents/CustomLoading"

const headers = [
  { label: 'S.no', field: 's.no' },
  { label: 'Expense File', field: 'fileUrl' },
  { label: 'Downloaded Date', field: 'createdAt' },
]

const DowloadedFiles = () => {
  const { data: downloadedFiles = [], isLoading } = useGetDownloadedFilesQuery()

  if (downloadedFiles.length === 0) {
    return
  }

  const renderCell = (row, header) => {
    switch (header.field) {
      case 'fileUrl':
        return <Link href={`${row.fileUrl}`} >Download File</Link>
      case 'createdAt':
        return format(row.createdAt, 'dd-MM-yyyy')
      default:
        return ''
    }
  }

  return (
    <>
      {isLoading && <CustomLoading />}
      <CustomTable
        tableLabel={'Downloaded Files Table'}
        headers={headers}
        rows={downloadedFiles}
        renderRows={renderCell}
      />
    </>
  )
}

export default DowloadedFiles
