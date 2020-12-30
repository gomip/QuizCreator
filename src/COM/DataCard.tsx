import * as React from 'react'
import {Button, Card, Col} from 'react-bootstrap'
import {Pagination} from "./Pagination";

/**
 * 2020.12.13 | gomip | created
 * 2020.12.22 | gomip | 페이징 처리
 * @constructor
 */

export interface DataCardProps{
  header: JSX.Element
  total: number                                                                                                         // 리스트 크기
  pageSize: number                                                                                                      // 보여주는 갯수
  pageNum: number                                                                                                       // 현재 위치
  isFooterUse?: boolean
  handlePageNum?: (num: number) => void
}

export const DataCard: React.FC<DataCardProps> = (props) => {
  // State -------------------------------------------------------------------------------------------------------------
  const {total, pageSize, pageNum, handlePageNum} = props
  let pageCount = 5
  const totalPage = Math.ceil(total / pageSize)                                                                       // 총 페이지 수
  const pageGroup = Math.ceil(pageNum / pageCount)                                                                    // 페이지 그룹

  let last = pageGroup * pageCount                                                                                      // 화면에 보여질 마지막 페이지 번호
  if (last > totalPage) {
      last = totalPage
  }
  let first = last - (pageCount -1)
  const next = last + 1
  const prev = first - 1

  if (totalPage < 1) {
      first = last
  }

  // Function ----------------------------------------------------------------------------------------------------------

  // Dom ---------------------------------------------------------------------------------------------------------------
  return (
    <Card className='height-100'>
      {/* 카드 : 헤더 시작 */}
      <Card.Header style={{height: '15%'}}>
        <Col>{props.header}</Col>
      </Card.Header>
      {/* 카드 : 헤더 끝 */}

      {/* 카드 : 바디 시작 */}
      <Card.Body style={{height: '30%'}}>
        {props.children}
      </Card.Body>
      {/* 카드 : 바디 끝 */}

      {/* 카드 : 푸터 시작 */}
        {props.isFooterUse ?
            (
                <Card.Footer style={{height: '50px'}} className='card-page'>
                    <Pagination
                        total={props.total}
                        pageSize={10}
                        pageNum={pageNum}
                        handlePageNum={handlePageNum!}
                    />
                </Card.Footer>
            ) : null
        }
    </Card>
  )
}
