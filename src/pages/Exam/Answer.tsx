import * as React from 'react'
import {Button, Tab, Table, Tabs} from "react-bootstrap";
import {RadioBox} from "./RadioBox";
import '../style/Solve.css'
import {AnswerTable} from './AnswerTable'
import * as Xlsx from 'xlsx'
import {saveAs} from 'file-saver'

/**
 *  2021.12.27 | gomip | created
 */

const {useState, useEffect} = React

interface AnswerType {
    listen: [],
    read: [],
    write: []
}

export interface AnswerProps{
    studentId: string,
    studentName: string,
}
export const Answer: React.FC<AnswerProps> = (props) => {
    // State -----------------------------------------------------------------------------------------------------------
    const {studentId, studentName} = props
    const [curTab, setCurTab] = useState('listen')                                                             // 현재 선택된 탭 값
    const [read, setRead] = useState<Map<number, number>>(new Map())
    const [write, setWrite] = useState<Map<number, string>>(new Map())
    const [listen, setListen] = useState<Map<number,number>>(new Map())
    let i = 0

    const date = new Date()
    const getCurrentDate: string = date.getFullYear() + '.' + (date.getMonth() + 1) + '.' + date.getDate()
    // LifeCycle -------------------------------------------------------------------------------------------------------
    useEffect(() => {
        if (i === 0) {
            for (let j = 1; j <= 100 ; j ++) {
                read.set(j,0)
                write.set(j,'')
                listen.set(j,0)
            }
        }
        i ++
    }, [i])
    // Function --------------------------------------------------------------------------------------------------------
    const handleTabChange = (key?: any) => {                                                                            // 탭 변경
        setCurTab(key)
    }

    const handleRadioChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
        const {name, value} = e.currentTarget
        const modeReg = new RegExp("^.*?(?=-)")                                                                  // 정규식 : - 앞에 단어 가져오기
        let mode = name.match(modeReg)
        const qusReg = new RegExp("(?<=-)(\\d*)")                                                                // 정규식 : - 뒤에 숫자 가져오기
        let qusNum = name.match(qusReg)

        if (mode !== undefined && mode !== null && qusNum !== undefined && qusNum !== null) {
            if (mode[0] === 'listen') {
                listen.set(parseInt(qusNum[0]), parseInt(value))
            } else if (mode [0] === 'read') {
                read.set(parseInt(qusNum[0]), parseInt(value))
            } else if (mode [0] === 'write') {
                write.set(parseInt(qusNum[0]), value)
            }
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {                                           // 우측 필터 값 변경
        const {name, value} = e.currentTarget
        const modeReg = new RegExp("^.*?(?=-)")                                                                  // 정규식 : - 앞에 단어 가져오기
        let mode = name.match(modeReg)
        const qusReg = new RegExp("(?<=-)(\\d*)")                                                                // 정규식 : - 뒤에 숫자 가져오기
        let qusNum = name.match(qusReg)

        if (mode !== undefined && mode !== null && qusNum !== undefined && qusNum !== null) {
            if (mode [0] === 'write') {
                write.set(parseInt(qusNum[0]), value)
            }
        }
        console.log('write', write)
    }

    const convertFile = (item: any) => {
        const buf = new ArrayBuffer(item.length)
        const view = new Uint8Array(buf)
        for (let i =0 ; i<item.length; i++) {
            view[i] = item.charCodeAt(i) & 0xFF
        }
        return buf
    }

    const handleDownload = () => {                                                                                      // 엑셀 파일 생성
        const promise = new Promise((resolve, reject) => {
            const wb = Xlsx.utils.book_new()
            wb.Props = {
                Title: date.toString(),
                CreatedDate: date,
            }

            wb.SheetNames.push("듣기")                                                                                   // 듣기 페이지 생성
            let listen_ans: any[] = []
            listen.forEach((value, key,map) => {
                listen_ans.push([key, value])
            })
            console.log(listen_ans)
            wb.Sheets["듣기"] = Xlsx.utils.aoa_to_sheet(listen_ans)

            wb.SheetNames.push("읽기")                                                                                   // 읽기 페이지 생성
            let read_ans: any[] = []
            read.forEach((value, key,map) => {
                read_ans.push([key, value])
            })
            wb.Sheets["읽기"] = Xlsx.utils.aoa_to_sheet(read_ans)

            wb.SheetNames.push("쓰기")                                                                                   // 쓰기 페이지 생성
            let write_ans: any[] = []
            write.forEach((value, key,map) => {
                write_ans.push([key, value])
            })
            wb.Sheets["쓰기"] = Xlsx.utils.aoa_to_sheet(write_ans)

            const wbout = Xlsx.write(wb, {bookType:'xlsx', type: 'binary'})
            saveAs(new Blob([convertFile(wbout)], {type: "application/octet-stream"}), studentId+'-'+studentName+".xlsx")
        })
        promise.then((items) => {
            console.log('done')
        })
    }
    // Dom -------------------------------------------------------------------------------------------------------------
    return (
        <div>
            {/* 탭 레이아웃 시작 */}
            <Tabs
                id='answer-tab'
                activeKey={curTab}
                onSelect={(key) => handleTabChange(key)}
            >
                {/* 듣기 탭 시작 */}
                <Tab eventKey='listen' title='듣기' className='radio-box' style={{overflow: 'scroll'}}>
                    <AnswerTable
                        mode='listen'
                        handleRadioChange={handleRadioChange}
                    />
                </Tab>
                {/* 듣기 탭 끝 */}

                {/* 읽기 탭 시작 */}
                <Tab eventKey='read' title='읽기' className='radio-box' style={{overflow: 'scroll'}}>
                    <AnswerTable
                        mode='read'
                        handleRadioChange={handleRadioChange}
                    />
                </Tab>
                {/* 읽기 탭 끝 */}

                {/* 쓰기 탭 시작 */}
                <Tab eventKey='write' title='쓰기' className='radio-box' style={{overflow: 'scroll'}}>
                    <AnswerTable
                        mode='write'
                        handleRadioChange={handleRadioChange}
                        handleChange={handleChange}
                    />
                </Tab>
                {/* 쓰기 탭 끝끝 */}

                {/* 제출 탭 시작 */}
                <Tab eventKey='submit' title='제출' className='radio-box'>
                    <div className='submit-box'>
                        <Button
                            type='submit'
                            onClick={handleDownload}
                        >
                            답안지 제출
                        </Button>
                    </div>
                </Tab>
                {/* 제출 탭 끝 */}
            </Tabs>
            {/* 탭 레이아웃 끝 */}
        </div>
    )
}