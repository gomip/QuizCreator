import * as React from 'react'
import {useLocation} from 'react-router-dom'
import {Button, Col, Container, Row} from 'react-bootstrap'
import {Document, Page, pdfjs} from 'react-pdf'
import {Answer} from './Answer'
import * as GrIcons from 'react-icons/gr'

/**
 *  2021.12.27 | gomip | created
 */

const {useState, useEffect} = React

interface Student {
    studentId: string,
    studentName: string,
}

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${
    pdfjs.version
}/pdf.worker.js`

export const Solve: React.FC = () => {
    // State -----------------------------------------------------------------------------------------------------------
    const location: any = useLocation()
    const [student,setStudent] = useState<Student>({
        studentId: '',
        studentName: '',
    })
    const [filePath, setFilePath] = useState('')
    const [totalPage, setTotalPage] = useState(1)
    const [pageNumber, setPageNumber] = useState(1)

    pdfjs.GlobalWorkerOptions.workerSrc = require('pdfjs-dist/build/pdf.worker.entry')
    // LifeCycle -------------------------------------------------------------------------------------------------------
    useEffect(() => {
        setStudent({
            studentId: location.state.student.studentId,
            studentName: location.state.student.studentName,
        })
    }, [])

    // Function --------------------------------------------------------------------------------------------------------
    const handlePdfFile = (e: React.SyntheticEvent<HTMLInputElement>) => {
        const {name, value} = e.currentTarget
        setFilePath(value)
    }

    const handleDocumentLoadSuccess = (numPages: number) => {
        setTotalPage(numPages)
    }

    // Dom -------------------------------------------------------------------------------------------------------------
    console.log('student', student)
    console.log('loc', location.state.student)
    return (
        <div>
            {/* 카드 : 파일선택 시작 */}
            <div className='card-base file-select-card'>
                {/* 필터 : 파일 불러오기 시작 */}
                <input
                    className='file-select-input'
                    id='get-file'
                    type='file'
                    accept='.pdf'
                    name='pdf'
                    onChange={handlePdfFile}
                />
                {/* 필터 : 파일 불러오기 끝 */}
            </div>
            {/* 카드 : 파일선택 끝 */}

            <div className='mt-3'>
                <Container style={{padding: 0}}>
                    <Row>
                        <Button onClick={() => setPageNumber(prevPage => prevPage - 1)} style={{background: 'white', border: 'none'}}><GrIcons.GrPrevious /></Button>
                        {/* pdf viewer 시작 */}
                        <Col style={{height: '70vh', width: '100%'}}>
                            <Document
                                file='./samplePdf.pdf'                                                                  // 지금은 pdf 경로를 지정해둬서 웹상으로는 확인이 가능하다. 하지만 추후 변경이 필요해보임
                                onLoadError={(error) => {
                                    console.log('error', error)
                                }}
                                onLoadSuccess={handleDocumentLoadSuccess}
                            >
                                <Page pageNumber={pageNumber}/>
                            </Document>
                        </Col>
                        <Button onClick={() => setPageNumber(prevPage => prevPage + 1)} style={{background: 'white', border: 'none'}}><GrIcons.GrNext /></Button>
                        {/* pdf viewer 끝 */}

                        {/* 정답지 tab 시작 */}
                        <Col style={{height: '85vh', width: '100%'}}>
                            <Answer
                                studentId={student.studentId}
                                studentName={student.studentName}
                            />
                        </Col>
                        {/* 정답지 tab 끝끝 */}
                    </Row>
                </Container>
            </div>
        </div>
    )
}