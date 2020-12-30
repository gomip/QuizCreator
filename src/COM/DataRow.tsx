import * as React from 'react'
import {ExcelData} from '../pages/Create/Create'

/**
 * 2020.12.14 | gomip | created
 * @constructor
 */

export interface DataRowProps {
  data: ExcelData
  index: number
  mode: string
  handleToggleCheck: (e: React.SyntheticEvent<HTMLInputElement>) => void
  checked: boolean
}
export const DataRow: React.FC<DataRowProps> = (props) => {
  // State -------------------------------------------------------------------------------------------------------------
  const {data, index, mode, handleToggleCheck, checked} = props

  // Function ----------------------------------------------------------------------------------------------------------

  // Dom ---------------------------------------------------------------------------------------------------------------
  return (
    <>
      <tr>
        <td className="text-center">
          <input
              name="datarow"
            key={index}
            type="checkbox"
            value={mode+'-'+data.qus_number}
              checked={checked}
            onChange={handleToggleCheck}
          />
        </td>
        <td className="text-center"><span>{data.qus_number}</span></td>
        <td><span>{data.qus}</span></td>
      </tr>
    </>
  )
}
