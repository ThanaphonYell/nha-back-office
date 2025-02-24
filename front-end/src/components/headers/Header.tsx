import Logo from "../logo/Logo"
import NavProfile from "../nav-profile/NavProfile"
import Notification from "../notifications/Notification"

function Header() {
  return (
    <header id="header" className="header fixed-top d-flex align-items-center">

        <div className="d-flex align-items-center justify-content-between">
            <Logo />
            <i className="bi bi-list toggle-sidebar-btn"></i>
        </div>

        <div className="search-bar">
            <form className="search-form d-flex align-items-center" method="POST" action="#">
                <input type="text" name="query" placeholder="Search" title="Enter search keyword" />
                <button type="submit" title="Search"><i className="bi bi-search"></i></button>
            </form>
        </div>

        <nav className="header-nav ms-auto">
            <ul className="d-flex align-items-center">
                <li className="nav-item d-block d-lg-none">
                    <a className="nav-link nav-icon search-bar-toggle " href="#">
                        <i className="bi bi-search"></i>
                    </a>
                </li>

                <li className="nav-item dropdown">
                    <Notification type="notifications" />
                </li>

                <li className="nav-item dropdown">
                    <Notification type="messages" />
                </li>

                <li className="nav-item dropdown pe-3">
                    <NavProfile 
                        displayName="Kevin Anderson" 
                        infoTitle="Web Designer"
                        srcProfile="assets/img/profile-img.jpg"
                    />
                </li>
            </ul>
        </nav>

    </header>
  )
}

export default Header