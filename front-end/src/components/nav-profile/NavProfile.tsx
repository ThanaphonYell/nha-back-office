import Img from "../images/Img"
import { NotificationModule } from "../modules/NotificationModule"

function NavProfile({ displayName, srcProfile, infoTitle }: { displayName: string, srcProfile?: string, infoTitle: string }) {
    return (
        <div>
            <a className="nav-link nav-profile d-flex align-items-center pe-0" href="javascript:void(0);" data-bs-toggle="dropdown">
                {srcProfile && <Img src={srcProfile} alt={displayName} className="rounded-circle" />}
                <span className="d-none d-md-block dropdown-toggle ps-2">{displayName}</span>
            </a>

            <NotificationModule.UI 
                type="profile"
                disableFooter={true}
                renderHeader={
                    <>
                        <h6>{displayName}</h6>
                        <span>{infoTitle}</span>
                    </>
                }
            >  
                <NotificationModule.LinkItem href={'/'}>
                    <i className="bi bi-person"></i>
                    <span>My Profile</span>
                </NotificationModule.LinkItem>

                <NotificationModule.LinkItem href={'/'}>
                    <i className="bi bi-gear"></i>
                    <span>Account Settings</span>
                </NotificationModule.LinkItem>

                <NotificationModule.LinkItem href={'/'}>
                    <i className="bi bi-question-circle"></i>
                    <span>Need Help?</span>
                </NotificationModule.LinkItem>

                <NotificationModule.LinkItem href={'/'}>
                    <i className="bi bi-box-arrow-right"></i>
                    <span>Sign Out</span>
                </NotificationModule.LinkItem>

            </NotificationModule.UI>
        </div>
    )
}

export default NavProfile