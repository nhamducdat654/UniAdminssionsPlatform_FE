import React from 'react'
import { Link } from 'react-router-dom'
// import logoImg from '../../../images/logo.png'
// import logoLightImg from '../../../images//logo-light.png'
import LogoSvg from './LogoSvg'
//{ img = logoImg, imgLight = logoLightImg }
const Logo = () => {
  return (
    <Link to="/" className="ttnc-logo inline-block text-primary-6000">
      <LogoSvg />
    </Link>
  )
}

export default Logo
