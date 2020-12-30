import * as React from 'react'
import {Table} from 'react-bootstrap'
import './style/DataTable.css'
import {DataRow} from './DataRow'

/**
 * 2020.12.13 | gomip | created
 * @constructor
 */

const {useState, useEffect} = React

export interface DataTableProps{
  data: any[]
  mode: string
  checked: Map<string,boolean>
  handleToggleCheck: (e: React.SyntheticEvent<HTMLInputElement>) => void
}

export const DataTable: React.FC<DataTableProps> = (props) => {
  // State -------------------------------------------------------------------------------------------------------------
  const {mode,data,handleToggleCheck,checked} = props
  // Function ----------------------------------------------------------------------------------------------------------

  // LifeCycle ---------------------------------------------------------------------------------------------------------

  // Dom ---------------------------------------------------------------------------------------------------------------
  return (
    <Table className='table-bordered table-layout height-100'>
      <colgroup>
        <col style={{width: '60px'}}/>
        <col style={{width: '60px'}}/>
        <col/>
      </colgroup>
      <thead>
      <tr>
        <th style={{textAlign: 'center', padding: '5px'}}>선택</th>
        <th style={{textAlign: 'center', padding: '5px'}}>번호</th>
        <th style={{textAlign: 'center', padding: '5px'}}>문제</th>
      </tr>
      </thead>
      <tbody className='height-100'>
      {
        data ?
          data.map((item, idx) => (
            <DataRow
              key={item.qus_number}
              index={idx} data={item}
              mode={mode}
              checked={checked.get(mode+'-'+item.qus_number || '') || false}
              handleToggleCheck={handleToggleCheck}
            />
          ))
          : (
            <td colSpan={3} className='no-result'>
              파일을 선택하지 않았습니다.
            </td>
          )
      }
      </tbody>
    </Table>
  )
}
