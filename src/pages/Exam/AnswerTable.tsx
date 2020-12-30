import * as React from 'react'
import {Form, Table} from "react-bootstrap";
import {RadioBox} from "./RadioBox";

/**
 *  2021.12.28 | gomip | created
 */

const {useState, useEffect} = React

export interface AnswerTableProps {
    mode: string
    handleRadioChange: (e: React.SyntheticEvent<HTMLInputElement>) => void
    handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const AnswerTable: React.FC<AnswerTableProps> = (props) => {
    // State -----------------------------------------------------------------------------------------------------------
    const {mode,handleRadioChange, handleChange} = props
    const [tmp, setTmp] = useState<number[]>([])
    const [wTmp, setWTmp] = useState<number[]>([])

    // LifeCycle -------------------------------------------------------------------------------------------------------
    useEffect(() => {
        let t : number[] = []
        for (let i = 1 ; i <= 50; i ++){
            t.push(i)
        }
        setTmp(t)

        let w: number[] = []
        for (let i = 1; i <= 20; i++) {
            w.push(i)
        }
        setWTmp(w)
    }, [])
    // Function --------------------------------------------------------------------------------------------------------

    // Dom -------------------------------------------------------------------------------------------------------------
    return (
        <>
            {
                mode !== 'write' ?
                    <Table>
                        <colgroup>
                            <col style={{width: '40px'}}/>
                            <col style={{width: '200px'}}/>
                            <col style={{width: '40px'}}/>
                            <col style={{width: '200px'}}/>
                        </colgroup>
                        <thead>
                        <tr>
                            <th style={{fontSize: '14px', padding: '0'}}>문제</th>
                            <th style={{fontSize: '14px', padding: '0'}}>정답</th>
                            <th style={{fontSize: '14px', padding: '0'}}>문제</th>
                            <th style={{fontSize: '14px', padding: '0'}}>정답</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            tmp.map((idx) => {
                                return (
                                    <tr key={idx}>
                                        <th style={{display: 'flex', justifyContent: 'center', fontSize: '14px', padding: '0'}}>{idx}</th>
                                        <td style={{fontSize: '14px', padding: '0'}}><RadioBox qus_number={idx} mode={mode} handleChange={handleRadioChange}/></td>
                                        <th style={{display: 'flex', justifyContent: 'center', fontSize: '14px', padding: '0'}}>{idx+50}</th>
                                        <td style={{fontSize: '14px', padding: '0'}}><RadioBox qus_number={idx+50} mode={mode} handleChange={handleRadioChange}/></td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </Table>
                    :
                    <Table>
                        <colgroup>
                            <col style={{width: '40px'}}/>
                            <col style={{width: '450px'}}/>
                        </colgroup>
                        <thead>
                        <tr>
                            <th style={{fontSize: '14px', padding: '0'}}>문제</th>
                            <th style={{fontSize: '14px', padding: '0'}}>정답</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            wTmp.map((idx) => {
                                return(
                                    <tr key={idx}>
                                        <th style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40px', fontSize: '14px', padding: '0'}}>{idx}</th>
                                        <td>
                                            <Form>
                                                <Form.Control
                                                    type='text'
                                                    id='text'
                                                    name={mode+'-'+idx.toString()}
                                                    onChange={handleChange}
                                                    style={{height: '200px'}}
                                                    />
                                            </Form>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </Table>
            }
        </>

    )
}