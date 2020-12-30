import React from 'react'
import * as FaIcons from 'react-icons/fa'
import * as MdIcons from 'react-icons/md'
import * as IoIcons from 'react-icons/io'
import * as AiIcons from 'react-icons/ai'

export const SidebarData = [
  // {
  //   title: '시험지 목록',
  //   path: '/',
  //   icon: <FaIcons.FaList />,
  // },
  {
    title: '시험지 생성',
    path: '/create',
    icon: <MdIcons.MdCreate />,
  },
  // {
  //   title: '결과서 생성',
  //   path: '/reports',
  //   icon: <IoIcons.IoIosPaper />,
  // },
  {
    title: '시험',
    path: '/exam',
    icon: <AiIcons.AiOutlineSolution />,
  },
]
