import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FeedHeader from '../components/feed/FeedHeader';
import FeedLeftSidebar from '../components/feed/FeedLeftSidebar';
import FeedMobileBottomNav from '../components/feed/FeedMobileBottomNav';
import FeedMobileHeader from '../components/feed/FeedMobileHeader';
import FeedRightSidebar from '../components/feed/FeedRightSidebar';
import FeedStoriesDesktop from '../components/feed/FeedStoriesDesktop';
import FeedStoriesMobile from '../components/feed/FeedStoriesMobile';
import FeedList from '../components/feed/FeedList';
import ModeSwitchButton from '../components/feed/ModeSwitchButton';
import { useAuth } from '../hooks/useAuth';

const Feed = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

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
          onLogout={handleLogout}
          user={user}
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
                    <FeedList />
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
