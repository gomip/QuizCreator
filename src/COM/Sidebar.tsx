import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {SidebarData} from './SidebarData'
import './style/Sidebar.css'
import * as FaIcons from 'react-icons/fa'
/**
 * 2020.12.09 | gomip | created
 */
export interface SidebarProps{
  handleShowName: () => void
  handleHideName: () => void
}

export const Sidebar: React.FC<SidebarProps> = (props) => {
  // State -------------------------------------------------------------------------------------------------------------
  const [clicked, setClicked] = useState(false)
  // Function ----------------------------------------------------------------------------------------------------------
  const handleNavBar = () => {
    const toggle = document.getElementById('nav-toggle')
    const navbar = document.getElementById('nav-bar')
    !clicked ? setClicked(true) : setClicked(false)

    if (navbar && toggle) {
      navbar.classList.toggle('expander')
      // clicked ? props.handleHideName() : props.handleShowName()
    }
  }

  // const linkColor = document.querySelectorAll('.nav-link')
  const activeMenu = (idx: number) => {
    const selected = document.getElementById('item-'+idx.toString())
    selected && selected.classList.toggle('sidebar-active')
    SidebarData.forEach((item, index) => {
      if(index !== idx) {
        const exclude = document.getElementById('item-'+index.toString())
        exclude && exclude.classList.remove('sidebar-active')
      }
    })
  }
  // linkColor.forEach(item => item.addEventListener('click', activeMenu))
  // Dom ---------------------------------------------------------------------------------------------------------------
  return(
    <>
      <div className="nav-bar" id="nav-bar">
        <nav className="sidebar-nav">
          <div>
            {/* 상단 home으로 이동하는 아이콘 시작 */}
            <div className="nav-brand">
              <i className="nav-toggle" id="nav-toggle" onClick={handleNavBar}><FaIcons.FaLayerGroup/></i>
              <span className="nav-logo">
                문제생성
              </span>
            </div>
            {/* 상단 home으로 이동하는 아이콘 끝 */}

            {/* 사이드바 메뉴 시작 */}
            <div className="nav-list">
              {SidebarData.map((item,idx) => {
                return (
                  <Link key={idx} to={item.path} className="sidebar-nav-link" onClick={() => activeMenu(idx)} id={'item-' + idx.toString()}>
                    <i className="nav-icon">{item.icon}</i>
                    <span className="nav-name">{item.title}</span>
                  </Link>
                )
              })}
            </div>
            {/* 사이드바 메뉴 끝 */}
          </div>
        </nav>
      </div>
    </>
  )
}
