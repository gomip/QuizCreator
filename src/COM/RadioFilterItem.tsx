import * as React from 'react'
import {Dropdown, Form, Row} from 'react-bootstrap'
import {FilterItemOption} from './style/type'

/**
 * 2020.12.10 | gomip | created
 */

export interface RaidoFilterProps {
  label: string,
  value: string,
  name: string,
  id: string,
  options: FilterItemOption[]
  handleChange(e: React.SyntheticEvent<HTMLInputElement>): void
  disabled?: boolean
}

const {useState} = React

export const RadioFilterItem: React.FC<RaidoFilterProps> = (props) => {
  // State -------------------------------------------------------------------------------------------------------------
  const [directTextYn, setDirectTextYn] = useState(false)

  // Function ----------------------------------------------------------------------------------------------------------
  const directInputLabel = () => {
    let a : string
    if (directTextYn) {
      a = (props.value === ' ' ? '전체' : props.value)
    } else {
      a = (props.value === ' ' ? '전체' : props.options.find(opt => opt.value === props.value)! && props.options.find(opt => opt.value === props.value)!.label)
    }
    return a
  }
  // Dom ---------------------------------------------------------------------------------------------------------------
  return (
    <Form.Group as={Row} className="ml-10">
      <Form.Label column>{props.label}</Form.Label>
      <Dropdown id={props.id}>
        <Dropdown.Toggle id={props.id + '-toggle'} className="width-140 btn-default" disabled={props.disabled}>
          {directInputLabel()}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {props.options
            .filter(opt => opt.value)
            .map((option, idx) => (
              <div className="dropdown-item"
                   key={option.value + option.label}
                   onSelect={() => setDirectTextYn(false)}
                   onClick={() => setDirectTextYn(false)}>
                <label className="d-block">
                  <input type="radio" name={props.name} value={option.value} onChange={props.handleChange} checked={option.value === props.value}/>
                  <span className="radio-item">{option.label}</span>
                </label>
              </div>
            ))
          }
        </Dropdown.Menu>
      </Dropdown>
    </Form.Group>
  )
}
