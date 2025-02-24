import React from 'react';
import Link from 'next/link'
import { Url } from 'next/dist/shared/lib/router/router';
import Img from '../images/Img';

export type TNotificationModule = 'notifications' | 'messages' | 'profile';

export const NotificationModule = {
  UI: ({ children, type, renderHeader, disableFooter } : { 
    children: React.ReactNode, 
    type: TNotificationModule, 
    renderHeader?: React.ReactNode,
    disableFooter?: boolean
  }) => {
    return (
      <ul className={`dropdown-menu dropdown-menu-end dropdown-menu-arrow ${type}`}>
        <li className="dropdown-header">
            {renderHeader ? renderHeader :
              <>
                You have 4 new notifications
                <a href="#">
                  <span className="badge rounded-pill bg-primary p-2 ms-2">View all</span>
                </a>
              </>
            }
        </li>
        {NotificationModule.Divider()}

        {children}

        {disableFooter !== true &&
          <li className="dropdown-footer">
            <a href="#">Show all notifications</a>
          </li>
        }
      </ul>
    )
  },

  Divider: () => {
    return (
      <li>
        <hr className="dropdown-divider" />
      </li>
    )
  },

  NotificationItem: ({ type } : { type: 'success' | 'waring' | 'danger' | 'info' }) => {
    const typeClassName = {
      'success': 'bi bi-check-circle text-success',
      'waring': 'bi bi-exclamation-circle text-warning',
      'danger': 'bi bi-x-circle text-danger',
      'info': 'bi bi-info-circle text-primary'
    }

    return (
      <>      
        <li className="notification-item">
          {typeClassName[type] && 
            <i className={typeClassName[type]}></i>
          }
          <div>
              <h4>Lorem Ipsum</h4>
              <p>Quae dolorem earum veritatis oditseno</p>
              <p>30 min. ago</p>
          </div>
        </li>

        {NotificationModule.Divider()}
      </>
    )
  },

  MessageItem: () => {
    return (
      <>      
        <li className="message-item">
          <a href="#">
              <Img src="assets/img/messages-1.jpg" alt="" className="rounded-circle" />
              <div>
              <h4>Maria Hudson</h4>
              <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
              <p>4 hrs. ago</p>
              </div>
          </a>
        </li>

        {NotificationModule.Divider()}
      </>
    )
  },

  LinkItem: ({ children, href } : { children: React.ReactNode, href: Url  }) => {
    return (
      <>      
        <li>
          <Link href={href} className="dropdown-item d-flex align-items-center" >
            {children}
          </Link>
        </li>

        {NotificationModule.Divider()}
      </>
    )
  }
}

