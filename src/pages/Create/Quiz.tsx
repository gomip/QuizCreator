import React from 'react'
import {useLocation} from 'react-router-dom'
import {Document, Font, Image, Page, PDFViewer, StyleSheet, Text, View} from '@react-pdf/renderer'
import {ExcelData} from "./Create"
import {Button} from "react-bootstrap"
import '../style/Create.css'
import * as Xlsx from 'xlsx'
import {saveAs} from 'file-saver'

/**
 * 2020.12.16 | gomip | created
 * 2020.12.22 | gomip | 한글 처리 및 pdf 적용 (듣기)
 * 2020.12.25 | gomip | PDF뷰어 작업 , 다운로드 버튼 작업
 */

const {useState} = React

interface AnswerSheet {
    qus_number: number,
    qus_answer: number,
}

export const Quiz: React.FC = (props) => {
    // State -----------------------------------------------------------------------------------------------------------
    const location: any = useLocation()
    const listen = location.state.selectedListen
    const read = location.state.selectedRead
    const write = location.state.selectedWrite

    let lsOne: boolean = false                                                                                          // 듣기 섹션 1 구분
    let lsTwo: boolean = false                                                                                          // 듣기 섹션 2 구분
    let lsTwoFirst: number = 0                                                                                          // 듣기 섹션 2의 첫번째 문제 번호
    let lsThreeFirst: number = 0                                                                                        // 듣기 섹션 3의 첫번째 문제 번호

    const date = new Date()
    const getCurrentDate: string = date.getFullYear() + '.' + (date.getMonth() + 1) + '.' + date.getDate()
    // Function --------------------------------------------------------------------------------------------------------
    Font.register({
        family: "Nanum Gothic",
        src: "https://fonts.gstatic.com/ea/nanumgothic/v5/NanumGothic-Regular.ttf"
    })                                                                                                                  // 한글 나눔고딕 설정

    const styles = StyleSheet.create({
        page: {
            paddingTop: 35,
            paddingBottom: 65,
            paddingHorizontal: 35,
        },
        section: {
            margin: 10,
            padding: 10,
        },
        korean: {
            fontFamily: 'Nanum Gothic',
            fontSize: 12
        },
        imageListen: {
            width: 150,
            height: 150,
        },
        imageWrite: {
            width: 500,
            height: 200,
        },
        viewHorizontal:{
            display: "flex",
            justifyContent: "space-around",
            flexDirection: "row",
        },
        viewMarginTop: {
            marginTop: 10
        },
        pageNumber: {
            position: 'absolute',
            fontSize: 12,
            bottom: 30,
            left: 0,
            right: 0,
            textAlign: 'center',
            color: 'grey',
        },
    })

    const renderImage = (id: string, mode: string) => {                                                                 // 이미지 조회하는 함수
        return (
            <Image
                style={mode === 'listen' ? styles.imageListen : mode === 'read' ? styles.imageRead : styles.imageWrite}
                src={window.location.origin +'/Image/' + id+'.png'}                                                     // 이미지 경로
            />
        )
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
            listen.forEach((item: any, idx: number) => {
                listen_ans.push([idx+1, item.ans])
            })
            console.log('listen-ans', listen_ans)
            console.log('sheet', wb)
            wb.Sheets["듣기"] = Xlsx.utils.aoa_to_sheet(listen_ans)

            wb.SheetNames.push("읽기")                                                                                   // 읽기 페이지 생성
            let read_ans: any[] = []
            read.forEach((item: any, idx: number) => {
                read_ans.push([idx+1, item.ans])
            })
            wb.Sheets["읽기"] = Xlsx.utils.aoa_to_sheet(read_ans)

            wb.SheetNames.push("쓰기")                                                                                   // 쓰기 페이지 생성
            let write_ans: any[] = []
            write.forEach((item: any, idx: number) => {
                write_ans.push([idx+1, item.ans])
            })
            wb.Sheets["쓰기"] = Xlsx.utils.aoa_to_sheet(write_ans)

            const wbout = Xlsx.write(wb, {bookType:'xlsx', type: 'binary'})
            saveAs(new Blob([convertFile(wbout)], {type: "application/octet-stream"}), "답안지.xlsx")     // 엑셀 페이지 생성 "답안지.xlsx" 영역은 추후 원하는 값으로 변경하면됨
        })
        promise.then((items) => {
            console.log('done')
        })
    }

    // Dom -------------------------------------------------------------------------------------------------------------
    return (
        <>
            <div className='card-base file-select-card'>
                {/* 필터 : 답안지 파일 저장 시작 */}
                <Button
                    className='file-select-input'
                    type='submit'
                    onClick={handleDownload}
                >
                    다운로드
                </Button>
                {/* 필터 : 답안지 파일 저장 끝 */}
            </div>
            {/* pdf 뷰 시작 */}
            <PDFViewer style={{width: '100%', height: '85vh', marginTop: '20px'}}>
                <Document title={getCurrentDate}>
                    <Page size='A4' style={styles.page}>
                        {/* 듣기 영역 시작 */}
                        {
                            listen.length !== 0 ?
                                listen.map((item: ExcelData, idx: number) => {
                                    if (item.pic_yn === 'Y') {                                                              // 사진이 있을 경우 보기를 사진으로 정해준다.
                                        if (!lsOne) {
                                            lsOne = true
                                        }
                                        return (
                                            <View style={styles.section} wrap={false}>
                                                <Text style={styles.korean}>Q{idx +1}. {item.qus}</Text>
                                                <View style={styles.viewMarginTop}/>
                                                <View style={styles.viewHorizontal}>
                                                    {renderImage(item.item_one, 'listen')}
                                                    {renderImage(item.item_two, 'listen')}
                                                </View>
                                                <View style={styles.viewHorizontal}>
                                                    {renderImage(item.item_three, 'listen')}
                                                    {renderImage(item.item_four, 'listen')}
                                                </View>
                                            </View>
                                        )
                                    } else {
                                        if (lsOne) {
                                            lsOne = false
                                            lsTwo = true
                                            lsTwoFirst = idx+1
                                        }
                                        if (item.help !== '') {                                                             // 사진이 없고, help 항목이 있을 경우
                                            if (lsTwo) {
                                                lsTwo = false
                                                lsThreeFirst = idx+1
                                            }
                                            return (
                                                <View style={styles.section} break={lsThreeFirst === idx+1} wrap={false}>
                                                    <Text style={styles.korean}>◎ {item.qus}</Text>
                                                    <View style={styles.viewMarginTop} />
                                                    <Text style={styles.korean}>Q{idx + 1}. {item.help}</Text>
                                                    <View style={styles.viewMarginTop} />
                                                    <Text style={styles.korean}>① {item.item_one}</Text>
                                                    <Text style={styles.korean}>① {item.item_two}</Text>
                                                    <Text style={styles.korean}>① {item.item_three}</Text>
                                                    <Text style={styles.korean}>① {item.item_four}</Text>
                                                </View>
                                            )
                                        } else {
                                            return (
                                                <View style={styles.section} break={lsTwoFirst === idx+1} wrap={false}>
                                                    <Text style={styles.korean}>Q{idx + 1}. {item.qus}</Text>
                                                    <View style={styles.viewMarginTop} />
                                                    <Text style={styles.korean}>① {item.item_one}</Text>
                                                    <Text style={styles.korean}>① {item.item_two}</Text>
                                                    <Text style={styles.korean}>① {item.item_three}</Text>
                                                    <Text style={styles.korean}>① {item.item_four}</Text>
                                                </View>
                                            )
                                        }
                                    }
                                })
                                : null
                        }
                        {/* 듣기 영역 끝 */}

                        {/* 읽기 영역 시작 */}
                        <View break>
                            {
                                read.length !== 0 ?
                                    read.map ((item: ExcelData, idx: number) => {
                                        if (item.rel_file === ''){                                                      // 사진이 없는 경우
                                            if (item.help === '') {                                                     // 안내문이 없는 경우
                                                return (
                                                    <View style={styles.section} wrap={false}>
                                                        <Text style={styles.korean}>Q{idx + 1}. {item.qus}</Text>
                                                        <View style={styles.viewMarginTop} />
                                                        <Text style={styles.korean}>① {item.item_one}</Text>
                                                        <Text style={styles.korean}>① {item.item_two}</Text>
                                                        <Text style={styles.korean}>① {item.item_three}</Text>
                                                        <Text style={styles.korean}>① {item.item_four}</Text>
                                                    </View>
                                                )
                                            } else {                                                                    // 안내문이 있는 경우
                                                return (
                                                    <View style={styles.section} wrap={false}>
                                                        <Text style={styles.korean}>◎ {item.qus}</Text>
                                                        <View style={styles.viewMarginTop} />
                                                        <Text style={styles.korean}>Q{idx + 1}. {item.help}</Text>
                                                        <View style={styles.viewMarginTop} />
                                                        <Text style={styles.korean}>① {item.item_one}</Text>
                                                        <Text style={styles.korean}>① {item.item_two}</Text>
                                                        <Text style={styles.korean}>① {item.item_three}</Text>
                                                        <Text style={styles.korean}>① {item.item_four}</Text>
                                                    </View>
                                                )
                                            }
                                        } else {                                                                        // 사진이 있는 경우
                                            if (item.help === '') {                                                     // 안내문이 없는 경우
                                                return (
                                                    <View style={styles.section} wrap={false}>
                                                        <Text style={styles.korean}>Q{idx + 1}. {item.qus}</Text>
                                                        <View style={styles.viewMarginTop} />
                                                        {renderImage(item.rel_file!!, 'read')}
                                                        <View style={styles.viewMarginTop} />
                                                        <Text style={styles.korean}>① {item.item_one}</Text>
                                                        <Text style={styles.korean}>① {item.item_two}</Text>
                                                        <Text style={styles.korean}>① {item.item_three}</Text>
                                                        <Text style={styles.korean}>① {item.item_four}</Text>
                                                    </View>
                                                )
                                            } else {                                                                    // 안내문이 있는 경우우
                                                return (
                                                    <View style={styles.section} wrap={false}>
                                                        <Text style={styles.korean}>◎ {item.help}</Text>
                                                        <View style={styles.viewMarginTop} />
                                                        {renderImage(item.rel_file!!, 'read')}
                                                        <View style={styles.viewMarginTop} />
                                                        <Text style={styles.korean}>Q{idx + 1}. {item.qus}</Text>
                                                        <View style={styles.viewMarginTop} />
                                                        <Text style={styles.korean}>① {item.item_one}</Text>
                                                        <Text style={styles.korean}>① {item.item_two}</Text>
                                                        <Text style={styles.korean}>① {item.item_three}</Text>
                                                        <Text style={styles.korean}>① {item.item_four}</Text>
                                                    </View>
                                                )
                                            }
                                        }
                                    })
                                   : null
                            }
                        </View>
                        {/* 읽기 영역 끝 */}

                        {/* 쓰기 영역 시작 */}
                        <View break>
                            {
                                write.length !== 0 ?
                                    write.map((item: ExcelData, idx: number) => {
                                        return (
                                            <View style={styles.section} wrap={false}>
                                                <Text style={styles.korean}>Q{idx+1}. {item.qus}</Text>
                                                <View style={styles.viewMarginTop}/>
                                                <View>
                                                    {renderImage(item.help!!, 'write')}
                                                </View>
                                            </View>
                                        )
                                    })
                                    : null
                            }
                        </View>
                        {/* 쓰기 영역 끝 */}

                        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                            `${pageNumber} / ${totalPages}`
                        )} fixed />
                    </Page>
                </Document>
            </PDFViewer>
            {/* pdf 뷰 끝 */}
        </>
    )
}