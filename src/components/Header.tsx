'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import Button from './Button'

const Header: React.FC = () => {
  const router = useRouter();

  const handleLogout = () => {
    router.push('/dashboard');
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <div className="logo-icon">
            <img src="/images/logo.svg" alt="Logo"/>
          </div>
          <span className="logo-text">통역봇</span>
        </div>

        <div className="user-info">
          <div className="user-profile">
            <div className="profile-image">
              <img src="/images/profile.png" alt="Profile" />
            </div>
            <span className="username">honggildong27</span>
          </div>
          <Button className='ico-only i-logout' onClick={handleLogout}>로그아웃</Button>
        </div>
      </div>
    </header>
  )
}

export default Header