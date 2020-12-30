import * as React from 'react'
import {Table} from 'react-bootstrap'

/**
 * 2020.12.10 | gomip | created
 * @constructor
 */

const {useState, useEffect} = React
export interface TabData{
  qus: any[]
  chp: string
  sub: string
  dif: string
  mode: string
}

export const ReadTab: React.FC<TabData> = (props) => {
  // State -------------------------------------------------------------------------------------------------------------
  const {qus, chp, sub, dif, mode} = props
  const [data, setData] = useState<any[]>([])
  // LifeCycle ---------------------------------------------------------------------------------------------------------
  useEffect(() => {
    let tmp: any[] = []
    if (qus !== undefined) {
      if (mode === 'listen') {
        console.log('mode', mode)
      } else if (mode === 'read') {
        console.log('mode', mode)
      } else {
        console.log('mode', mode)
      }
      tmp = qus.filter((item) => item.chp.toString() === chp && item.sub.toString() === sub && item.dif.toString() === dif)
    }
    setData(tmp)
  }, [chp, sub, dif])
  // Function ----------------------------------------------------------------------------------------------------------

  // Dom ---------------------------------------------------------------------------------------------------------------
  return (
    <>
      <div>hihi</div>
    </>
  )
}
