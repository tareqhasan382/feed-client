const notificationItems = Array.from({ length: 16 }, (_, index) =>
  index % 2 === 0
    ? {
        image: '/images/friend-req.png',
        content: (
          <>
            <span className="_notify_txt_link">Steve Jobs</span>
            posted a link in your timeline.
          </>
        ),
      }
    : {
        image: '/images/profile-1.png',
        content: (
          <>
            An admin changed the name of the group <span className="_notify_txt_link">Freelacer usa</span>
            to
            <span className="_notify_txt_link"> Freelacer usa </span>
          </>
        ),
      },
);

interface NotificationsDropdownProps {
  isOpen: boolean;
}

const NotificationsDropdown = ({ isOpen }: NotificationsDropdownProps) => (
  <div id="_notify_drop" className={`_notification_dropdown${isOpen ? ' show' : ''}`}>
    <div className="_notifications_content">
      <h4 className="_notifications_content_title">Notifications</h4>
      <div className="_notification_box_right">
        <button type="button" className="_notification_box_right_link">
          <svg xmlns="http://www.w3.org/2000/svg" width="4" height="17" fill="none" viewBox="0 0 4 17">
            <circle cx="2" cy="2" r="2" fill="#C4C4C4" />
            <circle cx="2" cy="8" r="2" fill="#C4C4C4" />
            <circle cx="2" cy="15" r="2" fill="#C4C4C4" />
          </svg>
        </button>
        <div className="_notifications_drop_right">
          <ul className="_notification_list">
            <li className="_notification_item">
              <span className="_notification_link">Mark as all read</span>
            </li>
            <li className="_notification_item">
              <span className="_notification_link">Notifivations seetings</span>
            </li>
            <li className="_notification_item">
              <span className="_notification_link">Open Notifications</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div className="_notifications_drop_box">
      <div className="_notifications_drop_btn_grp">
        <button type="button" className="_notifications_btn_link">
          All
        </button>
        <button type="button" className="_notifications_btn_link1">
          Unread
        </button>
      </div>
      <div className="_notifications_all">
        {notificationItems.map((item, index) => (
          <div key={index} className="_notification_box">
            <div className="_notification_image">
              <img src={item.image} alt="Image" className="_notify_img" />
            </div>
            <div className="_notification_txt">
              <p className="_notification_para">{item.content}</p>
              <div className="_nitification_time">
                <span>42 miniutes ago</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default NotificationsDropdown;
