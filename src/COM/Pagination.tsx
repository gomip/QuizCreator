import * as React from 'react'
/**
 *  2020.12.20 | gomip | created
 */

const {useEffect, useState} = React

export interface PaginationProps {
    total: number
    pageSize: number
    pageNum: number
    handlePageNum: (num: number) => void
}

export const Pagination:React.FC<PaginationProps> = (props) => {
    // State -----------------------------------------------------------------------------------------------------------
    const pageNumbers: number[] = []
    const {total, pageSize, pageNum, handlePageNum} = props
    for (let i = 1; i<= Math.ceil(total / pageSize); i++) {
        pageNumbers.push(i)
    }

    // Function --------------------------------------------------------------------------------------------------------
    const activeStyle = (num: number) => {
        let style = 'page-link'
        if (num === pageNum) {
            style += ' page-active'
        }
        return style
    }
    // Dom -------------------------------------------------------------------------------------------------------------
    return (
        <nav>
            <ul className='pagination' style={{marginBottom: 0}}>
                {pageNumbers.map(num => (
                    <li key={num} className='page-item'>
                        <a onClick={() => handlePageNum(num)} className={activeStyle(num)}>
                            {num}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}