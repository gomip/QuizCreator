import React from 'react'

/**
 * 2020.12.07 | gomip | created
 * @constructor
 */
export interface ReportProps {
  showName: boolean
}

export const Report: React.FC<ReportProps> = (props) => {
  // State -------------------------------------------------------------------------------------------------------------
  const {showName} = props
  // Function ----------------------------------------------------------------------------------------------------------

  // Dom ---------------------------------------------------------------------------------------------------------------
  return (
    <div className={showName ? 'body-pd' : ''}>
      <h1>Report</h1>
    </div>
  )
}
