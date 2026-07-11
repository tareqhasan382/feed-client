import { useState } from 'react';
import FeedCreatePost from '../components/feed/FeedCreatePost';
import FeedHeader from '../components/feed/FeedHeader';
import FeedLeftSidebar from '../components/feed/FeedLeftSidebar';
import FeedMobileBottomNav from '../components/feed/FeedMobileBottomNav';
import FeedMobileHeader from '../components/feed/FeedMobileHeader';
import FeedRightSidebar from '../components/feed/FeedRightSidebar';
import FeedStoriesDesktop from '../components/feed/FeedStoriesDesktop';
import FeedStoriesMobile from '../components/feed/FeedStoriesMobile';
import FeedTimelinePost from '../components/feed/FeedTimelinePost';
import ModeSwitchButton from '../components/feed/ModeSwitchButton';

const Feed = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [openTimelineDropdown, setOpenTimelineDropdown] = useState<number | null>(0);

  const layoutClassName = `_layout _layout_main_wrapper${isDarkMode ? ' _dark_wrapper' : ''}`;

  return (
    <div className={layoutClassName}>
      <ModeSwitchButton onToggle={() => setIsDarkMode((prev) => !prev)} />
      <div className="_main_layout">
        <FeedHeader
          showNotifications={showNotifications}
          showProfileDropdown={showProfileDropdown}
          onToggleNotifications={() => {
            setShowNotifications((prev) => !prev);
            setShowProfileDropdown(false);
          }}
          onToggleProfileDropdown={() => {
            setShowProfileDropdown((prev) => !prev);
            setShowNotifications(false);
          }}
        />
        <FeedMobileHeader />
        <FeedMobileBottomNav />
        <div className="container _custom_container">
          <div className="_layout_inner_wrap">
            <div className="row">
              <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
                <FeedLeftSidebar />
              </div>
              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                <div className="_layout_middle_wrap">
                  <div className="_layout_middle_inner">
                    <FeedStoriesDesktop />
                    <FeedStoriesMobile />
                    <FeedCreatePost />
                    <FeedTimelinePost
                      postIndex={1}
                      showDropdown={openTimelineDropdown === 0}
                      onToggleDropdown={() => setOpenTimelineDropdown((prev) => (prev === 0 ? null : 0))}
                      commentLink
                    />
                    <FeedTimelinePost
                      postIndex={2}
                      showDropdown={openTimelineDropdown === 1}
                      onToggleDropdown={() => setOpenTimelineDropdown((prev) => (prev === 1 ? null : 1))}
                    />
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
                <FeedRightSidebar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
