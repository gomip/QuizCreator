import React from 'react'
import {Col, Container, Row} from 'react-bootstrap'
import '../COM/style/Home.css'
import 'bootstrap/dist/css/bootstrap.min.css'

/**
 * 2020.12.07 | gomip | created
 * @constructor
 */

export interface HomeProps {
  showName: boolean
}

export const Home: React.FC<HomeProps> = (props) => {
  // State -------------------------------------------------------------------------------------------------------------
  const {showName} = props
  // Function ----------------------------------------------------------------------------------------------------------

  // Dom ---------------------------------------------------------------------------------------------------------------
  return (
    <div className={showName ? 'body-pd' : ''}>
      {/* 필터 영역 시작 */}
      <div className="search-filter">
        <p>test</p>
      </div>
      {/* 필터 영역 끝 */}
      {/* 데이터 영역 시작 */}
      <Container>
        <Row>
          {/* 문제 리스트 시작 */}
          <Col>
            col1
          </Col>
          {/* 문제 리스트 끝 */}
          {/* 실제 보이는 화면 시작 */}
          <Col>
            col2
          </Col>
          {/* 실제 보이는 화면 끝 */}
        </Row>
      </Container>
      {/* 데이터 영역 끝 */}
    </div>
  )
}
