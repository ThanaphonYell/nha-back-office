import Link from 'next/link'
import Img from '../images/Img'

function Logo({ isAlignCenter }: { isAlignCenter?: boolean }) {
  return (
    <>
        <Link href="/" className={`logo d-flex align-items-center ${isAlignCenter === true && 'justify-content-center'}`} >
          <Img src="./assets/img/logo.png" alt="" />
          <span className="d-none d-lg-block">NiceAdmin</span>
        </Link>
    </>
  )
}

export default Logo