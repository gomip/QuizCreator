import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import { SidebarData } from './SidebarData'
import './style/Navbar.css'
import {IconContext} from 'react-icons'

/**
 * 2020.12.07 | gomip | created
 * @constructor
 */

export const NavBar: React.FC = () => {
  // Declaration -------------------------------------------------------------------------------------------------------
  const [sidebar, setSidebar] = useState(false)

  // Function ----------------------------------------------------------------------------------------------------------
  const showSidebar = () => setSidebar(!sidebar)                                                                        // 사이드 바 숨김 여

  // Dom ---------------------------------------------------------------------------------------------------------------
  return (
    <>
      <IconContext.Provider value={{color: '#fff'}}>
      <div className="navbar">
        <Link to="#" className="menu-bars">
          <FaIcons.FaBars onClick={showSidebar}/>
        </Link>
      </div>
      <nav className={sidebar ? 'nav-menu sidebar-active' : 'nav-menu'}>
        <ul className='nav-menu-items' onClick={showSidebar}>
          <li className="navbar-toggle">
            <Link to="#" className="menu-bars">
              <AiIcons.AiOutlineClose />
            </Link>
          </li>
          {SidebarData.map((item, idx) => {                                                               // SidebarData에 정의한 데이터들을 리스트화
            return (
              <li key={idx}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
      </IconContext.Provider>
    </>
  )
}
