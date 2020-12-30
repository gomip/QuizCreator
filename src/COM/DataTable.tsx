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
  // useEffect(() => {
  //   console.log('data', data.length)
  //   data.map(item => (
  //     console.log('item', item)
  //   ))
  // }, [data])
  // console.log('imhere')

  // Pagination --------------------------------------------------------------------------------------------------------
  // const pageSize = 10                                                                                                   // 테이블에는 최대 10개의 데이터만 조회되도록 해준다.
  // const [pageNum, setPageNum] = useState(1)                                                                    // 현재 페이지, 디폴트는 1
  // const [totalPage, setTotalPage] = useState(1)                                                                // 총 페이지 수
  //
  // const indexOfLast = pageSize * pageNum                                                                                // 한 페이지에서 보여주는 마지막 데이터의 인덱스 값
  // const indexOfFirst = indexOfLast - pageSize                                                                           // 한 페이지에서 보여주는 첫번째 데이터의 인덱스 값
  //
  // console.log(mode, 'dataList', data)
  // console.log('last', indexOfLast)
  // console.log('first', indexOfFirst)
  // const dataList = data.splice(indexOfFirst, indexOfLast)
  //
  // console.log(mode, 'data', dataList)

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
