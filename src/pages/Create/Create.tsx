import * as React from 'react'
import {Button, Form, Tab, Table, Tabs} from 'react-bootstrap'
import '../style/Create.css'
import * as Xlsx from 'xlsx'
import {RadioFilterItem} from '../../COM/RadioFilterItem'
import {FilterItemOption} from '../../FWK/FilterItem/type'
import {DataCard} from '../../COM/DataCard'
import {DataTable} from '../../COM/DataTable'
import {Link, useLocation, Redirect, useHistory} from "react-router-dom"

const {useState, useEffect} = React

/**
 * 2020.12.09 | gomip | created
 * 2020.12.13 | gomip | xlsx 라이브러리 추가
 * 2020.12.22 | gomip | paging 구분
 * @constructor
 */
export interface CreateProps {
  showName: boolean
}

export interface ExcelData {
  chp: number,
  sub: number,
  dif: number,
  qus_number: number,
  item_one: string,
  item_two: string,
  item_three: string,
  item_four: string,
  pic_yn: string
  qus: string,
  help?: string,
  rel_file?: string,
  ans?: string,
}

interface SearchInput {
  chp: string,
  sub: string,
  dif: string,
}

export const Create: React.FC<CreateProps> = (props) => {
  // State -------------------------------------------------------------------------------------------------------------
  const {showName} = props

  const init: ExcelData = {
    chp: 0,
    sub: 0,
    dif: 0,
    qus_number: 0,
    item_one: '',
    item_two: '',
    item_three: '',
    item_four: '',
    pic_yn: '',
    qus: '',
    help: '',
    rel_file: '',
    ans: '',
  }
  const [excelList, setExcelList] = useState<any[]>([])                                                        // 엑셀 데이터 조회
  const [fileSelected, setFileSelected] = useState(false)

  let filterOpt: FilterItemOption[] = []                                                                                // 필터 항목 등록 (1~10) -> 추후 변경이 필요한 루프값 수정하면 됨
  filterOpt = filterOpt.concat({label: '전체', value: ' '})
  for (var i = 1; i < 11; i++) {
    filterOpt = filterOpt.concat({...filterOpt},{label: i.toString(), value: i.toString()})
  }
  const history = useHistory()
  const [searchInput, setSearchInput] = useState<SearchInput>({                                                // 검색 필터 값
    chp: ' ',
    sub: ' ',
    dif: ' ',
  })

  const [curTab, setCurTab] = useState('listen')                                                               // 현재 선택된 탭 값
  const [readList, setReadList] = useState<any[]>([])                                                          // 듣기 목록
  const [writeList, setWriteList] = useState<any[]>([])                                                        // 읽기 목록
  const [listenList, setListenList] = useState<any[]>([])                                                      // 쓰기 목록

  const [pagedReadList, setPagedReadList] = useState<any[]>([])                                                // 페이징 처리된 듣기 목록
  const [pagedWriteList, setPagedWriteList] = useState<any[]>([])                                              // 페이징 처리된 읽기 목록
  const [pagedListenList, setPagedListenList] = useState<any[]>([])                                            // 페이징 처리된 쓰기 목록

  const [selectedRead, setSelectedRead] = useState<any[]>([])                                                  // 선택한 읽기 목록
  const [selectedWrite, setSelectedWrite] = useState<any[]>([])                                                // 선택한 쓰기 목록
  const [selectedListen, setSelectedListen] = useState<any[]>([])                                              // 선택한 듣기 목록

  const [checked, setChecked] = useState<Map<string, boolean>>(new Map())                                               // checkbox에 체크된 아이디들 기록

  // Pagination --------------------------------------------------------------------------------------------------------
  const pageSize = 10                                                                                                   // 테이블에는 최대 10개의 데이터만 조회되도록 해준다.
  const [pageReadNum, setPageReadNum] = useState(0)                                                            // 읽기 탭의 현재 페이지, 파일 선택이 안되어있으면 0
  const [pageWriteNum, setPageWriteNum] = useState(0)                                                          // 쓰기 탭의 현재 페이지, 파일 선택이 안되어있으면 0
  const [pageListenNum, setPageListenNum] = useState(0)                                                        // 듣기 탭의 현재 페이지, 파일 선택이 안되어있으면 0

  // UseEffect ---------------------------------------------------------------------------------------------------------
  useEffect(() => {                                                                                               // 파일이 선택되면 각각 readList, writeList, listenList라는 state를 초기화 해준다
    if (excelList !== undefined) {
      setListenList(excelList[0])
      setReadList(excelList[1])
      setWriteList(excelList[2])
    }
    setPageReadNum(1)                                                                                              // 각각의 탭의 현재페이지를 1로 바꿔준다.
    setPageWriteNum(1)
    setPageListenNum(1)
  }, [fileSelected])

  useEffect(() => {                                                                                               // 엑셀로부터 읽기 데이터를 가져오면 10개씩 쪼개서 한페이지에 보여준다.
    let tmpRead: any[] =[]

    const indexOfLast = pageSize * pageReadNum                                                                          // 한페이지에 보여줄 마지막 데이터의 인덱스
    const indexOfFirst = indexOfLast - pageSize                                                                         // 한페이지에 보여줄 첫번째 데이터의 인덱스

    if (readList !== undefined) {
      tmpRead = readList.slice(indexOfFirst, indexOfLast)                                                               // readList 데이터에서 지정된 범위의 데이터를 조회해서 tmpRead에 넣어준다.
    }

    setPagedReadList(tmpRead)                                                                                           // 화면상에 tmpRead값이 보여지도록 해준다.
  }, [pageReadNum,readList])

  useEffect(() => {                                                                                               // 엑셀로부터 쓰기 데이터를 가져오면 10개씩 쪼개서 한페이지에 보여준다. 아래는 읽기 부분과 동일
    let tmpWrite: any[] =[]

    const indexOfLast = pageSize * pageWriteNum
    const indexOfFirst = indexOfLast - pageSize

    if (writeList !== undefined) {
      tmpWrite = writeList.slice(indexOfFirst, indexOfLast)
    }

    setPagedWriteList(tmpWrite)
  }, [pageWriteNum,writeList])

  useEffect(() => {                                                                                               // 엑셀로부터 듣기 데이터를 가져오면 10개씩 쪼개서 한페이지에 보여준다. 아래는 읽기 부분과 동일
    let tmpListen: any[] =[]

    const indexOfLast = pageSize * pageListenNum
    const indexOfFirst = indexOfLast - pageSize

    if (listenList !== undefined) {
      tmpListen = listenList.slice(indexOfFirst, indexOfLast)
    }

    setPagedListenList(tmpListen)
  }, [pageListenNum,listenList])

  // Function ----------------------------------------------------------------------------------------------------------
  const readExcel = (event?: any) => {                                                                                  // 엑셀 파일 불러오기
    const promise = new Promise((resolve, reject) => {
      const file = event.target.files[0]
      // let rowList: any[] = []

      const fileReader = new FileReader()
      fileReader.readAsBinaryString(file)

      fileReader.onload = (e) => {
        const data = e!.target!.result
        const workbook = Xlsx.read(data, {type: 'binary'})
        workbook.SheetNames.forEach((sheet, idx) => {                                                     // 엑셀 파이터에 있는 시트들 별로 루프 진행
          const rowObject = Xlsx.utils.sheet_to_json(workbook.Sheets[sheet], {defval: ''})
          let obj: any[] = []
          rowObject.forEach((item) => {
            obj.push(item)
          })
          excelList.push(obj)                                                                                           // 우선적으로 excelList에 엑셀에 있는 모든 데이터를 넣는다.
          resolve(rowObject)
        })
      }
      fileReader.onerror = (error) => {
        reject(error)
      }
    })
    promise.then((items) => {                                                                                           // 엑셀이 다 불러와졌으면 파일 선택 했음으로 상태를 변경해준다.
      console.log('File Selected!')
      setFileSelected(true)
    })
  }

  const handleFilterChange = (e: React.SyntheticEvent<HTMLInputElement>) => {                                           // 우측 필터 값 변경
    const {name, value} = e.currentTarget
    searchInput[name as keyof SearchInput] = value
    setSearchInput({...searchInput})
  }

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {                                                  // 우측 필터 변경 후 검색 버튼을 하면 해당 필터로 데이터들이 바뀐다.
    e.preventDefault()

    let listenTmp: any[] = []
    let readTmp: any[] = []
    let writeTmp: any[] = []

    if (searchInput.chp === ' '){
      listenTmp = excelList[0]
      readTmp = excelList[1]
      writeTmp = excelList[2]
    }
    else {
      listenTmp = excelList[0].filter((item: any) => item.chp.toString() === searchInput.chp)
      readTmp = excelList[1].filter((item: any) => item.chp.toString() === searchInput.chp)
      writeTmp = excelList[2].filter((item: any) => item.chp.toString() === searchInput.chp)
    }

    if (searchInput.sub !== ' '){
      listenTmp = listenTmp.filter((item: any) => item.sub.toString() === searchInput.sub)
      readTmp = readTmp.filter((item: any) => item.sub.toString() === searchInput.sub)
      writeTmp = writeTmp.filter((item: any) => item.sub.toString() === searchInput.sub)
    }

    if (searchInput.dif !== ' '){
      listenTmp = listenTmp.filter((item: any) => item.dif.toString() === searchInput.dif)
      readTmp = readTmp.filter((item: any) => item.dif.toString() === searchInput.dif)
      writeTmp = writeTmp.filter((item: any) => item.dif.toString() === searchInput.dif)
    }

    setListenList(listenTmp)
    setReadList(readTmp)
    setWriteList(writeTmp)

  }

  const handleTabChange = (key?: any) => {                                                                              // 탭 변경
    setCurTab(key)
  }

  const handleToggleCheck = (e: React.SyntheticEvent<HTMLInputElement>) => {                                            // 선택 박스 클릭시 리스트에 추가해준다.
    const {name, value} = e.currentTarget
    console.log('value', value)
    const re = new RegExp("^.*?(?=-)")                                                                           // 정규식 : - 앞에 단어 가져오기
    let res = value.match(re)
    const id = new RegExp("(?<=-)(\\d*)")                                                                        // 정규식 : - 뒤에 숫자 가져오기
    let resId = value.match(id)

    let tmpRow: any

    const chk = checked.get(value) || false
    checked.set(value, !chk)

    if (res !== undefined && res !== null && excelList !== null && resId !== null) {                                    // 함수화 필요
      const id = resId[0]
      if (res[0] === 'listen') {
        tmpRow = listenList.filter((item: ExcelData) => item.qus_number.toString() === id)                      // 전체 듣기 목록에서 선택해제된 id를 제외한 나머지를 조회
        let cdn = selectedListen.filter((item: ExcelData) => item.qus_number.toString() === id)                 // 선택된 듣기 목록에서 선택해제된 id를 제외한 나머지를 조회
        if (cdn.length !== 0) {                                                                                         // cdn이 0이 아닐경우,
          let b = selectedListen.filter((item: ExcelData) => item.qus_number !== cdn[0].qus_number)             // => cdn에 있는 문제번호와 선택된 듣기 목록에서 같은 문제번호를 필터링 해서 b에다가 저장
          setSelectedListen(b)                                                                                          // => b를 새로운 듣기목록으로 지정해준다.
        } else {
          let a = selectedListen.concat(tmpRow)
          setSelectedListen(a)
        }
      } else if (res[0] === 'read') {
        tmpRow = readList.filter((item: ExcelData) => item.qus_number.toString() === id)
        let cdn = selectedRead.filter((item: ExcelData) => item.qus_number.toString() === id)
        if (cdn.length !== 0) {
          let b = selectedRead.filter((item: ExcelData) => item.qus_number !== cdn[0].qus_number)
          setSelectedRead(b)
        } else {
          let a = selectedRead.concat(tmpRow)
          setSelectedRead(a)
        }
      }  else if (res[0] === 'write'){
        tmpRow = writeList.filter((item: ExcelData) => item.qus_number.toString() === id)
        let cdn = selectedWrite.filter((item: ExcelData) => item.qus_number.toString() === id)
        if (cdn.length !== 0) {
          let b = selectedWrite.filter((item: ExcelData) => item.qus_number !== cdn[0].qus_number)
          setSelectedWrite(b)
        } else {
          let a = selectedWrite.concat(tmpRow)
          setSelectedWrite(a)
        }
      }
    }
    setChecked(new Map(checked))
  }

  const handleRedirect = () => {
    return history.push({
      pathname:'/quiz',
      state:{selectedListen: selectedListen, selectedRead: selectedRead, selectedWrite: selectedWrite}
    })
  }

  const handlePageReadNum = (num: number) => setPageReadNum(num)
  const handlePageWriteNum = (num: number) => setPageWriteNum(num)
  const handlePageListenNum = (num: number) => setPageListenNum(num)
  // Dom ---------------------------------------------------------------------------------------------------------------
  return (
    <div className={showName ? 'body-pd create-wrap' : 'create-wrap'}>
      {/* 카드 : 파일선택 시작 */}
      <div className='card-base file-select-card'>
        {/* 필터 : 파일 불러오기 시작 */}
        <input
          className='file-select-input'
          id='get-file'
          type='file'
          accept='.xls, .xlsx'
          onChange={(event) => {
            readExcel(event)
          }}
        />
        {/* 필터 : 파일 불러오기 끝 */}
      </div>
      {/* 카드 : 파일선택 끝 */}

      {/* 컨테이너 시작 */}
      <div className='data-container'>
        {/* 데이터 목록 시작 */}
        <div className='data-list card-base'>
          <Tabs
            id='control-tab'
            activeKey={curTab}
            onSelect={(key) => handleTabChange(key)}
          >
            {/* 듣기 영역 시작 */}
            <Tab eventKey='listen' title='듣기'>
              <DataCard
                header={<span className='title'>듣기 : {(fileSelected && listenList !== undefined)? listenList.length : '-'}</span>}
                total={listenList ? listenList.length : 0}
                pageSize={pageSize}
                pageNum={pageListenNum}
                isFooterUse={fileSelected}
                handlePageNum={handlePageListenNum}
              >
                <DataTable
                  mode='listen'
                  data={pagedListenList ? pagedListenList : []}
                  checked={checked}
                  handleToggleCheck={handleToggleCheck}
                />
              </DataCard>
            </Tab>
            {/* 듣기 영역 끝 */}

            {/* 읽기 영역 시작 */}
            <Tab eventKey='read' title='읽기'>
              <DataCard
                header={<span className='title'>듣기 : {(fileSelected && readList !== undefined)? readList.length : '-'}</span>}
                total={readList ? readList.length : 0}
                pageSize={pageSize}
                pageNum={pageReadNum}
                isFooterUse={fileSelected}
                handlePageNum={handlePageReadNum}
              >
                <DataTable
                  mode='read'
                  data={pagedReadList ? pagedReadList : []}
                  checked={checked}
                  handleToggleCheck={handleToggleCheck}
                />
              </DataCard>
            </Tab>
            {/* 읽기 영역 끝 */}

            {/* 쓰기 영역 시작 */}
            <Tab eventKey='write' title='쓰기'>
              <DataCard
                header={<span className='title'>듣기 : {(fileSelected && writeList !== undefined)? writeList.length : '-'}</span>}
                total={writeList ? writeList.length : 0}
                pageSize={pageSize}
                pageNum={pageWriteNum}
                isFooterUse={fileSelected}
                handlePageNum={handlePageWriteNum}
              >
                <DataTable
                  mode='write'
                  data={pagedWriteList ? pagedWriteList : []}
                  checked={checked}
                  handleToggleCheck={handleToggleCheck}
                />
              </DataCard>
            </Tab>
            {/* 쓰기 영역 끝 */}
          </Tabs>
        </div>
        {/* 데이터 목록 끝 */}

        {/* 필터링 및 결과 시작 */}
        <div className='data-filter-wrapper'>
          {/* 데이터 조회 조건 시작 */}
          <div className='card-base data-filter-card'>
            <Form
              id='filter-form'
              onSubmit={handleSubmit}
            >
              <div className='dfcw'>
                {/* 단원 */}
                <RadioFilterItem
                  label="단원"
                  value={searchInput.chp || ''}
                  name="chp"
                  id="chp"
                  handleChange={handleFilterChange}
                  options={filterOpt}
                  disabled={!fileSelected}
                />
                {/* 학습내용 */}
                <RadioFilterItem
                  label="학습내용"
                  value={searchInput.sub || ''}
                  name="sub"
                  id="sub"
                  handleChange={handleFilterChange}
                  options={filterOpt}
                  disabled={!fileSelected}
                />
                {/* 난이도 */}
                <RadioFilterItem
                  label="난이도"
                  value={searchInput.dif || ''}
                  name="dif"
                  id="dif"
                  handleChange={handleFilterChange}
                  options={filterOpt}
                  disabled={!fileSelected}
                />
              </div>
              <Button
                id='filter-form-btn'
                type='submit'
                className='ml-2'
                style={{width: '250px'}}
                disabled={!fileSelected}
              >
                검색
              </Button>
            </Form>
          </div>
          {/* 데이터 조회 조건 끝 */}

          {/* 선택된 데이터 정보 시작 */}
          <div className='card-base data-selected-card'>
            <DataCard
              header={<span className='title'>전체</span>}
              total={1}
              pageSize={1}
              pageNum={1}
            >
              <Table className='table-bordered'>
                <colgroup>
                  <col style={{width: '30%'}}/>
                  <col style={{width: '30%'}}/>
                </colgroup>
                <thead>
                  <tr>
                    <th style={{textAlign: 'center', padding: '5px'}}>항목</th>
                    <th style={{textAlign: 'center', padding: '5px'}}>문제 수</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='result-table-td'>듣기</td>
                    <td className='result-table-td'>{selectedListen.length}</td>
                  </tr>
                  <tr>
                    <td className='result-table-td'>읽기</td>
                    <td className='result-table-td'>{selectedRead.length}</td>
                  </tr>
                  <tr>
                    <td className='result-table-td'>쓰기</td>
                    <td className='result-table-td'>{selectedWrite.length}</td>
                  </tr>
                </tbody>
              </Table>
            </DataCard>
          </div>
          {/* 선택된 데이터 정보  */}
        </div>
        {/* 필터링 및 결과 끝 */}
      </div>

      {/* 하단 다음 페이지 버튼 시작 */}
      <div className='card-base file-select-card next-btn'>
        <Button className='mr-2' onClick={handleRedirect}>다음</Button>
      </div>
      {/* 하단 다음 페이지 버튼 끝 */}
    </div>
  )
}
