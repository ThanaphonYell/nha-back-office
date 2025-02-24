import { NotificationModule, TNotificationModule } from "../modules/NotificationModule"

function Notification({ type } : { type: TNotificationModule }) {
    return (
        <div>
            <a className="nav-link nav-icon" href="javascript:void(0);" data-bs-toggle="dropdown">
                {type === "notifications" &&
                    <>
                        <i className="bi bi-bell"></i>
                        <span className="badge bg-primary badge-number">4</span>
                    </>
                }

                {type === "messages" &&
                    <>
                        <i className="bi bi-chat-left-text"></i>
                        <span className="badge bg-success badge-number">3</span>
                    </>
                }
            </a>

            <NotificationModule.UI type={type}>  
                {type === "notifications" &&
                    <NotificationModule.NotificationItem type="success" />
                }

                {type === "messages" &&
                    <NotificationModule.MessageItem  />
                }
            </NotificationModule.UI>          
        </div>
    )
}

export default Notification