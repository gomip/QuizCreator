import * as React from 'react'
import {Form} from 'react-bootstrap'
import '../style/Solve.css'

/**
 *  2021.12.27 | gomip | created
 */

export interface RadioBoxProps {
    qus_number: number
    mode: string
    handleChange: (e: React.SyntheticEvent<HTMLInputElement>) => void
}

export const RadioBox: React.FC<RadioBoxProps> = (props) => {
    // State -----------------------------------------------------------------------------------------------------------
    const {qus_number, mode, handleChange} = props
    // Function --------------------------------------------------------------------------------------------------------
    // Dom -------------------------------------------------------------------------------------------------------------
    return (
        <div>
            <Form className='radio-wrap'>
                <Form.Check
                    id='one'
                    name={mode+'-'+qus_number.toString()}
                    value={1}
                    label={1}
                    type='radio'
                    onChange={handleChange}
                />
                <Form.Check
                    id='two'
                    name={mode+'-'+qus_number.toString()}
                    value={2}
                    label={2}
                    type='radio'
                    onChange={handleChange}
                />
                <Form.Check
                    id='three'
                    name={mode+'-'+qus_number.toString()}
                    value={3}
                    label={3}
                    type='radio'
                    onChange={handleChange}
                />
                <Form.Check
                    id='four'
                    name={mode+'-'+qus_number.toString()}
                    value={4}
                    label={4}
                    type='radio'
                    onChange={handleChange}
                />
            </Form>
        </div>
    )
}