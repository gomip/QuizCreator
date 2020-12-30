import * as React from 'react'
import '../style/Exam.css'
import {Button, Form, Modal} from "react-bootstrap"
import {useHistory} from 'react-router-dom'
import {ErrorModal} from "./ErrorModal";

/**
 *  2020.12.26 | gomip | created
 */

const {useState} = React
export interface TestProps {
    showName: boolean
}

interface StudentInfo {
    studentId: string,
    studentName: string,
}

interface ExamFile {
    file: Blob,
}

export const Exam: React.FC<TestProps> = (props) => {
    // State -----------------------------------------------------------------------------------------------------------
    const {showName} = props
    const [student, setStudent] = useState<StudentInfo>({
        studentId: '',
        studentName: '',
    })
    const [exam, setExam] = useState<ExamFile>({
        file: new Blob()
    })

    const [show, setShow] = useState(false)
    const [category, setCategory] = useState('')

    const history = useHistory()
    // Function --------------------------------------------------------------------------------------------------------
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {                                           // 우측 필터 값 변경
        const {name, value} = e.currentTarget
        student[name as keyof StudentInfo] = value
        setStudent({...student})
        console.log('name', name, 'value', value)
    }

    const handleRedirect = () => {
        if (student.studentId === '') {                                                                                 // 학생 아이디가 입력되지 않았다면
            handleOpen()
            setCategory('학생 ID')
        } else if (student.studentName === ''){                                                                         // 학생 이름이 입력되지 않았다면
            handleOpen()
            setCategory('학생 이름')
        // } else if (student.filePath === '') {                                                                        // 파일이 선택되지 않았다면
        //     handleOpen()
        //     setCategory('시험지')
        } else {
            return history.push({
                pathname: '/solve',
                state:{student: student}
            })
        }
    }

    const handleOpen = () => setShow(true)
    const handleClose = () => setShow(false)

    // Dom -------------------------------------------------------------------------------------------------------------
    return (
        <div className={showName ? 'body-pd exam-info' : 'exam-info'}>
            {/* 로그인 정보 시작 */}
                <Form className='login-form'>
                    <div className='login-card-title'>
                        <span>정보 입력</span>
                    </div>
                    {/* 아이디 입력 시작 */}
                    <div className='login-info mt-2'>
                        <Form.Group>
                            <Form.Label>학생 ID</Form.Label>
                            <Form.Control type='text' placeholder='학생 아이디를 입력해주세요' onChange={handleChange} name='studentId' />
                        </Form.Group>
                        {/* 아이디 입력 끝 */}

                        {/* 이름 입력 시작 */}
                        <Form.Group>
                            <Form.Label>이름</Form.Label>
                            <Form.Control type='text' placeholder='이름을 입력해주세요' onChange={handleChange} name='studentName'/>
                        </Form.Group>
                        {/* 이름 입력 끝 */}

                        {/* 파일 선택 시작 */}
                        {/*<Form.Group>*/}
                        {/*    <Form.File label='시험지를 선택해주세요' name='filePath' onChange={handleChange}/>*/}
                        {/*</Form.Group>*/}
                        {/* 파일 선택 끝 */}
                        
                        {/* 로그인 버튼 시작 */}
                        <Button style={{width: '100%', marginTop: '20px'}} onClick={handleRedirect}>
                            다음
                        </Button>
                        {/* 로그인 버튼 끝 */}
                    </div>
                </Form>
            {/* 로그인 정보 끝 */}
            <ErrorModal category={category} show={show} handleClose={handleClose}/>
        </div>
    )
}