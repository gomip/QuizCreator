import * as React from 'react'
import {Button, Modal} from "react-bootstrap";

/**
 *  2021.12.27 | gomip | created
 *  모달 정보 출력
 */

export interface ErrorModalProps{
    category: string,
    show: boolean
    handleClose: () => void
}
export const ErrorModal: React.FC<ErrorModalProps> = (props) => {
    // State -----------------------------------------------------------------------------------------------------------
    const {category,show, handleClose} = props
    // Function --------------------------------------------------------------------------------------------------------
    // Dom -------------------------------------------------------------------------------------------------------------
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>입력 오류</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{category} 입력 바랍니다.</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-primary' onClick={handleClose}>예</Button>
            </Modal.Footer>aㅁ
        </Modal>
    )
}