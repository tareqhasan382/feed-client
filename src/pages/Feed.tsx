import React, { useState } from 'react';

const Feed: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  return (
    <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-[#F0F2F5]'} min-h-screen overflow-hidden`}>
      {/* Mode Switch Button */}
      <div className="fixed top-1/2 right-0 -translate-y-1/2 z-10">
        <button
          className="bg-[#1890FF] border border-[#1890FF] rounded-[40px] w-[66px] h-8 flex items-center relative rotate-90"
          onClick={() => setIsDarkMode(!isDarkMode)}
        >
          <div className={`absolute transition-all duration-200 ${isDarkMode ? 'right-1' : 'left-[10px]'}`}>
            <div className="w-[18px] h-[18px] rounded-full bg-white"></div>
          </div>
          <div className="absolute right-4 -rotate-90">
            <svg width="11" height="16" fill="none" viewBox="0 0 11 16">
              <path fill="#fff" d="M2.727 14.977l.04-.498-.04.498zm-1.72-.49l.489-.11-.489.11zM3.232 1.212L3.514.8l-.282.413zM9.792 8a6.5 6.5 0 00-6.5-6.5v-1a7.5 7.5 0 017.5 7.5h-1zm-6.5 6.5a6.5 6.5 0 006.5-6.5h1a7.5 7.5 0 01-7.5 7.5v-1zm-.525-.02c.173.013.348.02.525.02v1c-.204 0-.405-.008-.605-.024l.08-.997zm-.261-1.83A6.498 6.498 0 005.792 7h1a7.498 7.498 0 01-3.791 6.52l-.495-.87zM5.792 7a6.493 6.493 0 00-2.841-5.374L3.514.8A7.493 7.493 0 016.792 7h-1zm-3.105 8.476c-.528-.042-.985-.077-1.314-.155-.316-.075-.746-.242-.854-.726l.977-.217c-.028-.124-.145-.09.106-.03.237.056.6.086 1.165.131l-.08.997zm.314-1.956c-.622.354-1.045.596-1.31.792a.967.967 0 00-.204.185c-.01.013.027-.038.009-.12l-.977.218a.836.836 0 01.144-.666c.112-.162.27-.3.433-.42.324-.24.814-.519 1.41-.858L3 13.52zM3.292 1.5a.391.391 0 00.374-.285A.382.382 0 003.514.8l-.563.826A.618.618 0 012.702.95a.609.609 0 01.59-.45v1z" />
            </svg>
          </div>
          <div className={`absolute left-4 -rotate-90 transition-opacity ${isDarkMode ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="4.389" stroke="#fff" transform="rotate(-90 12 12)" />
              <path stroke="#fff" strokeLinecap="round" d="M3.444 12H1M23 12h-2.444M5.95 5.95L4.222 4.22M19.778 19.779L18.05 18.05M12 3.444V1M12 23v-2.445M18.05 5.95l1.728-1.729M4.222 19.779L5.95 18.05" />
            </svg>
          </div>
        </button>
      </div>

      {/* Main Wrapper */}
      <div className="min-h-screen">
        {/* Desktop Header */}
        <header className="bg-white fixed top-0 left-0 right-0 z-[1030]">
          <div className="container mx-auto px-0">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center">
                <a href="#">
                  <img src="/images/logo.svg" alt="Logo" className="max-w-[169px]" />
                </a>
              </div>

              <div className="flex items-center gap-3">
                {/* Search */}
                <form className="relative">
                  <svg className="absolute top-3 left-[18px]" xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="none" viewBox="0 0 17 17">
                    <circle cx="7" cy="7" r="6" stroke="#666" />
                    <path stroke="#666" strokeLinecap="round" d="M16 16l-3-3" />
                  </svg>
                  <input
                    type="search"
                    placeholder="input search text"
                    className="bg-[#F5F5F5] border border-[#F5F5F5] rounded-[32px] w-[424px] h-10 px-[47px] py-[7px] transition-all hover:border-[#1890FF]"
                  />
                </form>

                {/* Nav Icons */}
                <ul className="flex items-center gap-3 mr-2">
                  <li className="relative">
                    <a href="#" className="block p-[22px_16px_26px] relative hover:bg-gray-50">
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#00ACFF]"></div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="21" fill="none" viewBox="0 0 18 21">
                        <path className="stroke-black stroke-opacity-60" stroke="#000" strokeWidth="1.5" d="M1 9.924c0-1.552 0-2.328.314-3.01.313-.682.902-1.187 2.08-2.196l1.143-.98C6.667 1.913 7.732 1 9 1c1.268 0 2.333.913 4.463 2.738l1.142.98c1.179 1.01 1.768 1.514 2.081 2.196.314.682.314 1.458.314 3.01v4.846c0 2.155 0 3.233-.67 3.902-.669.67-1.746.67-3.901.67H5.57c-2.155 0-3.232 0-3.902-.67C1 18.002 1 16.925 1 14.77V9.924z" />
                        <path className="stroke-black stroke-opacity-60" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11.857 19.341v-5.857a1 1 0 00-1-1H7.143a1 1 0 00-1 1v5.857" />
                      </svg>
                    </a>
                  </li>
                  <li className="relative">
                    <a href="#" className="block p-[22px_16px_26px] relative hover:bg-gray-50">
                      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="20" fill="none" viewBox="0 0 26 20">
                        <path fill="#000" fillOpacity=".6" fillRule="evenodd" d="M12.79 12.15h.429c2.268.015 7.45.243 7.45 3.732 0 3.466-5.002 3.692-7.415 3.707h-.894c-2.268-.015-7.452-.243-7.452-3.727 0-3.47 5.184-3.697 7.452-3.711l.297-.001h.132zm0 1.75c-2.792 0-6.12.34-6.12 1.962 0 1.585 3.13 1.955 5.864 1.976l.255.002c2.792 0 6.118-.34 6.118-1.958 0-1.673-3.326-1.982-6.118-1.982zm9.743-2.224c2.846.424 3.444 1.751 3.444 2.79 0 .636-.251 1.794-1.931 2.43a.882.882 0 01-1.137-.506.873.873 0 01.51-1.13c.796-.3.796-.633.796-.793 0-.511-.654-.868-1.944-1.06a.878.878 0 01-.741-.996.886.886 0 011.003-.735zm-18.43.735a.878.878 0 01-.742.997c-1.29.19-1.944.548-1.944 1.059 0 .16 0 .501.798.793a.873.873 0 01-.314 1.693.897.897 0 01-.313-.057C.25 16.259 0 15.1 0 14.466c0-1.037.598-2.366 3.446-2.79.485-.06.929.257 1.002.735zM12.789 0c2.96 0 5.368 2.392 5.368 5.33 0 2.94-2.407 5.331-5.368 5.331h-.031a5.329 5.329 0 01-3.782-1.57 5.253 5.253 0 01-1.553-3.764C7.423 2.392 9.83 0 12.789 0zm0 1.75c-1.987 0-3.604 1.607-3.604 3.58a3.526 3.526 0 001.04 2.527 3.58 3.58 0 002.535 1.054l.03.875v-.875c1.987 0 3.605-1.605 3.605-3.58S14.777 1.75 12.789 1.75zm7.58-.607a4.222 4.222 0 013.566 4.172c-.004 2.094-1.58 3.89-3.665 4.269a.911.911 0 01-1.036-.761.897.897 0 01.782-1.01c1.273-.173 2.235-1.248 2.237-2.501 0-1.242-.916-2.293-2.179-2.494a.897.897 0 01-.756-1.027.917.917 0 011.055-.736zm-13.528.72a.897.897 0 01-.757 1.027C4.79 3.13 3.874 4.182 3.874 5.426c.002 1.251.963 2.327 2.236 2.5.503.067.853.519.783 1.008a.912.912 0 01-1.036.762c-2.175-.297-3.816-2.131-3.82-4.267 0-2.126 1.563-3.918 3.717-4.262.515-.079.972.251 1.055.736z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </li>
                  <li className="relative">
                    <button
                      className="block p-[22px_16px_26px] relative hover:bg-gray-50"
                      onClick={() => setShowNotifications(!showNotifications)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" fill="none" viewBox="0 0 20 22">
                        <path fill="#000" fillOpacity=".6" fillRule="evenodd" d="M7.547 19.55c.533.59 1.218.915 1.93.915.714 0 1.403-.324 1.938-.916a.777.777 0 011.09-.056c.318.284.344.77.058 1.084-.832.917-1.927 1.423-3.086 1.423h-.002c-1.155-.001-2.248-.506-3.077-1.424a.762.762 0 01.057-1.083.774.774 0 011.092.057zM9.527 0c4.58 0 7.657 3.543 7.657 6.85 0 1.702.436 2.424.899 3.19.457.754.976 1.612.976 3.233-.36 4.97-5.935 5.375-12.002 5.375-6.067 0-11.55-.405-11.998-5.296-.003-1.686.515-2.544.973-3.959l.203-.324c.501-.814.928-1.7.928-3.502C3.022 3.543 5.897 0 10.527 0zm0 1.535c-3.6 0-6.11 2.802-6.11 5.316 0 2.553-.75 3.733-1.41 4.774-.531.836-.95 1.497-.95 2.932.216 2.316 1.831 3.533 10.055 3.533 8.178 0 9.844-1.271 10.06-3.613-.004-1.355-.423-2.016-.954-2.852-.662-1.041-1.41-2.221-1.41-4.774 0-3.017-3.161-6.38-7.696-6.38z" clipRule="evenodd" />
                      </svg>
                      <span className="absolute top-4 right-[10px] bg-[#1890FF] border border-white rounded-[9px] min-w-[17px] h-[17px] text-xs font-normal text-white flex items-center justify-center px-0.5">6</span>

                      {/* Notifications Dropdown */}
                      {showNotifications && (
                        <div className="absolute top-[32px] left-[-110px] bg-white shadow-[0_8px_24px_rgba(149,157,165,0.2)] p-4 w-[400px] h-[calc(100vh-90px)] overflow-y-auto rounded-[6px]">
                          <div className="flex items-center justify-between mb-5">
                            <h4 className="text-xl font-semibold text-[#212121]">Notifications</h4>
                            <div className="relative">
                              <button className="border-none bg-transparent outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" width="4" height="17" fill="none" viewBox="0 0 4 17">
                                  <circle cx="2" cy="2" r="2" fill="#C4C4C4" />
                                  <circle cx="2" cy="8" r="2" fill="#C4C4C4" />
                                  <circle cx="2" cy="15" r="2" fill="#C4C4C4" />
                                </svg>
                              </button>
                            </div>
                          </div>

                          <div className="flex gap-2.5 mb-5">
                            <button className="border border-[#f1f1f1] px-2 py-2 rounded-[6px] text-base font-medium text-[#1890FF] bg-[#1890ff26]">
                              All
                            </button>
                            <button className="border border-[#f1f1f1] px-2 py-2 rounded-[6px] text-base font-medium text-[#212121]">
                              Unread
                            </button>
                          </div>

                          {/* Notifications List */}
                          <div>
                            {Array(10).fill(null).map((_, i) => (
                              <div key={i} className="flex items-center gap-3 mb-4 p-1.5 rounded hover:bg-[#66666621] cursor-pointer">
                                <div className="flex-shrink-0">
                                  <img
                                    src={i % 2 === 0 ? "/images/friend-req.png" : "/images/profile-1.png"}
                                    alt=""
                                    className="max-w-14 h-14 rounded-full object-cover"
                                  />
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-[#666666]">
                                    <span className="text-[#212121]">
                                      {i % 2 === 0 ? "Steve Jobs" : "Admin"}
                                    </span>
                                    {i % 2 === 0 ? " posted a link in your timeline." : " changed the name of the group Freelancer usa to Freelancer usa"}
                                  </p>
                                  <div className="mt-1">
                                    <span className="text-xs font-semibold text-[#1890FF]">42 minutes ago</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </button>
                  </li>
                  <li className="relative">
                    <a href="#" className="block p-[22px_16px_26px] relative hover:bg-gray-50">
                      <svg xmlns="http://www.w3.org/2000/svg" width="23" height="22" fill="none" viewBox="0 0 23 22">
                        <path fill="#000" fillOpacity=".6" fillRule="evenodd" d="M11.43 0c2.96 0 5.743 1.143 7.833 3.22 4.32 4.29 4.32 11.271 0 15.562C17.145 20.886 14.293 22 11.405 22c-1.575 0-3.16-.33-4.643-1.012-.474-.188-.917-.366-1.235-.366-.366.003-.859.171-1.335.334-.976.333-2.19.748-3.09-.142-.895-.89-.482-2.093-.149-3.061.164-.477.333-.97.333-1.342 0-.306-.149-.697-.376-1.259C-1 12.417-.032 7.011 3.516 3.49A11.96 11.96 0 0111.43 0zm0 1.535A9.5 9.5 0 004.69 4.307a9.463 9.463 0 00-1.91 10.686c.261.642.514 1.267.514 1.917 0 .649-.225 1.302-.422 1.878-.163.475-.41 1.191-.252 1.349.156.16.881-.092 1.36-.255.576-.195 1.228-.42 1.874-.424.648 0 1.259.244 1.905.503 3.96 1.818 8.645.99 11.697-2.039 4.026-4 4.026-10.509 0-14.508a9.5 9.5 0 00-7.303-3.002zm4.407 9.607c.617 0 1.117.495 1.117 1.109 0 .613-.5 1.109-1.117 1.109a1.116 1.116 0 01-1.12-1.11c0-.613.494-1.108 1.11-1.108h.01zm-4.476 0c.616 0 1.117.495 1.117 1.109 0 .613-.5 1.109-1.117 1.109a1.116 1.116 0 01-1.121-1.11c0-.613.493-1.108 1.11-1.108h.01zm-4.477 0c.617 0 1.117.495 1.117 1.109 0 .613-.5 1.109-1.117 1.109a1.116 1.116 0 01-1.12-1.11c0-.613.494-1.108 1.11-1.108h.01z" clipRule="evenodd" />
                      </svg>
                      <span className="absolute top-4 right-[10px] bg-[#1890FF] border border-white rounded-[9px] min-w-[17px] h-[17px] text-xs font-normal text-white flex items-center justify-center px-0.5">2</span>
                    </a>
                  </li>
                </ul>

                {/* Profile */}
                <div className="flex items-center">
                  <div className="mr-2">
                    <img src="/images/profile.png" alt="Profile" className="max-w-6" />
                  </div>
                  <button
                    className="flex items-center cursor-pointer"
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  >
                    <p className="text-base font-normal text-[#212121] mr-2">Dylan Field</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="6" fill="none" viewBox="0 0 10 6">
                      <path fill="#112032" d="M5 5l.354.354L5 5.707l-.354-.353L5 5zm4.354-3.646l-4 4-.708-.708 4-4 .708.708zm-4.708 4l-4-4 .708-.708 4 4-.708.708z" />
                    </svg>
                  </button>

                  {/* Profile Dropdown */}
                  {showProfileDropdown && (
                    <div className="absolute right-4 top-16 bg-white shadow-[0_8px_24px_rgba(149,157,165,0.2)] p-4 rounded-[6px] w-64">
                      <div className="flex items-center gap-4 mb-4 pb-4 border-b">
                        <img src="/images/profile.png" alt="" />
                        <div>
                          <h4 className="text-lg font-medium text-[#212121]">Dylan Field</h4>
                          <a href="#" className="text-[#1890FF]">View Profile</a>
                        </div>
                      </div>
                      <ul>
                        <li className="mb-2">
                          <a href="#" className="flex items-center justify-between text-[#666666] hover:text-[#1890FF]">
                            <div className="flex items-center gap-3">
                              <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" fill="none" viewBox="0 0 18 19">
                                  <path fill="#377DFF" d="M9.584 0c.671 0 1.315.267 1.783.74.468.473.721 1.112.7 1.709l.009.14a.985.985 0 00.136.395c.145.242.382.418.659.488.276.071.57.03.849-.13l.155-.078c1.165-.538 2.563-.11 3.21.991l.58.99a.695.695 0 01.04.081l.055.107c.519 1.089.15 2.385-.838 3.043l-.244.15a1.046 1.046 0 00-.314.339 1.042 1.042 0 00-.11.805c.074.272.255.504.53.66l.158.1c.478.328.823.812.973 1.367.17.626.08 1.292-.257 1.86l-.625 1.022-.094.144c-.735 1.038-2.16 1.355-3.248.738l-.129-.066a1.123 1.123 0 00-.412-.095 1.087 1.087 0 00-.766.31c-.204.2-.317.471-.316.786l-.008.163C11.956 18.022 10.88 19 9.584 19h-1.17c-1.373 0-2.486-1.093-2.484-2.398l-.008-.14a.994.994 0 00-.14-.401 1.066 1.066 0 00-.652-.493 1.12 1.12 0 00-.852.127l-.169.083a2.526 2.526 0 01-1.698.122 2.47 2.47 0 01-1.488-1.154l-.604-1.024-.08-.152a2.404 2.404 0 01.975-3.132l.1-.061c.292-.199.467-.527.467-.877 0-.381-.207-.733-.569-.94l-.147-.092a2.419 2.419 0 01-.724-3.236l.615-.993a2.503 2.503 0 013.366-.912l.126.066c.13.058.269.089.403.09a1.08 1.08 0 001.086-1.068l.008-.185c.049-.57.301-1.106.713-1.513A2.5 2.5 0 018.414 0h1.17zm0 1.535h-1.17c-.287 0-.562.113-.764.312-.179.177-.288.41-.308.628l-.012.29c-.098 1.262-1.172 2.253-2.486 2.253a2.475 2.475 0 01-1.013-.231l-.182-.095a1.1 1.1 0 00-1.488.407l-.616.993a1.05 1.05 0 00.296 1.392l.247.153A2.43 2.43 0 003.181 9.5c0 .802-.401 1.552-1.095 2.023l-.147.091c-.486.276-.674.873-.448 1.342l.053.102.597 1.01c.14.248.374.431.652.509.246.069.51.05.714-.04l.103-.05a2.506 2.506 0 011.882-.248 2.456 2.456 0 011.823 2.1l.02.335c.059.535.52.95 1.079.95h1.17c.566 0 1.036-.427 1.08-.95l.005-.104a2.412 2.412 0 01.726-1.732 2.508 2.508 0 011.779-.713c.331.009.658.082.992.23l.3.15c.469.202 1.026.054 1.309-.344l.068-.105.61-1a1.045 1.045 0 00-.288-1.383l-.257-.16a2.435 2.435 0 01-1.006-1.389 2.393 2.393 0 01.25-1.847c.181-.31.429-.575.752-.795l.152-.095c.485-.278.672-.875.448-1.346l-.067-.127-.012-.027-.554-.945a1.095 1.095 0 00-1.27-.487l-.105.041-.098.049a2.515 2.515 0 01-1.966.553z" />
                                </svg>
                              </span>
                              Settings
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="6" height="10" fill="none" viewBox="0 0 6 10">
                              <path fill="#112032" d="M5 5l.354.354L5.707 5l-.353-.354L5 5zM1.354 9.354l4-4-.708-.708-4 4 .708.708zm4-4.708l-4-4-.708.708 4 4 .708-.708z" opacity=".5" />
                            </svg>
                          </a>
                        </li>
                        <li className="mb-2">
                          <a href="#" className="flex items-center justify-between text-[#666666] hover:text-[#1890FF]">
                            <div className="flex items-center gap-3">
                              <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
                                  <path stroke="#377DFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 19a9 9 0 100-18 9 9 0 000 18z" />
                                  <path stroke="#377DFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7.38 7.3a2.7 2.7 0 015.248.9c0 1.8-2.7 2.7-2.7 2.7M10 14.5h.009" />
                                </svg>
                              </span>
                              Help & Support
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="6" height="10" fill="none" viewBox="0 0 6 10">
                              <path fill="#112032" d="M5 5l.354.354L5.707 5l-.353-.354L5 5zM1.354 9.354l4-4-.708-.708-4 4 .708.708zm4-4.708l-4-4-.708.708 4 4 .708-.708z" opacity=".5" />
                            </svg>
                          </a>
                        </li>
                        <li className="mb-2">
                          <a href="#" className="flex items-center justify-between text-[#666666] hover:text-[#1890FF]">
                            <div className="flex items-center gap-3">
                              <span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="none" viewBox="0 0 19 19">
                                  <path stroke="#377DFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6.667 18H2.889A1.889 1.889 0 011 16.111V2.89A1.889 1.889 0 012.889 1h3.778M13.277 14.222L18 9.5l-4.723-4.722M18 9.5H6.667" />
                                </svg>
                              </span>
                              Log Out
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="6" height="10" fill="none" viewBox="0 0 6 10">
                              <path fill="#112032" d="M5 5l.354.354L5.707 5l-.353-.354L5 5zM1.354 9.354l4-4-.708-.708-4 4 .708.708zm4-4.708l-4-4-.708.708 4 4 .708-.708z" opacity=".5" />
                            </svg>
                          </a>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Header */}
        <div className="lg:hidden bg-white fixed top-0 left-0 right-0 z-[1030] p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <a href="#">
                <img src="/images/logo.svg" alt="Logo" className="max-w-[169px]" />
              </a>
            </div>
            <div className="flex items-center">
              <form>
                <a href="#" className="mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="none" viewBox="0 0 17 17">
                    <circle cx="7" cy="7" r="6" stroke="#666" />
                    <path stroke="#666" strokeLinecap="round" d="M16 16l-3-3" />
                  </svg>
                </a>
              </form>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto pt-[70px]">
          <div className="flex">
            {/* Left Sidebar */}
            <div className="hidden lg:block lg:w-1/4 h-[calc(100vh-75px)] overflow-y-auto pt-[18px] pr-0">
              <div className="bg-white rounded-[6px] p-6 mb-4">
                <h4 className="text-xl font-medium text-[#212121] mb-6">Explore</h4>
                <ul>
                  <li className="mb-6 relative">
                    <a href="#" className="flex items-center text-base font-medium text-[#666666] hover:text-[#1890FF]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20" className="mr-3.5">
                        <path fill="#666" d="M10 0c5.523 0 10 4.477 10 10s-4.477 10-10 10S0 15.523 0 10 4.477 0 10 0zm0 1.395a8.605 8.605 0 100 17.21 8.605 8.605 0 000-17.21zm-1.233 4.65l.104.01c.188.028.443.113.668.203 1.026.398 3.033 1.746 3.8 2.563l.223.239.08.092a1.16 1.16 0 01.025 1.405c-.04.053-.086.105-.19.215l-.269.28c-.812.794-2.57 1.971-3.569 2.391-.277.117-.675.25-.865.253a1.167 1.167 0 01-1.07-.629c-.053-.104-.12-.353-.171-.586l-.051-.262c-.093-.57-.143-1.437-.142-2.347l.001-.288c.01-.858.063-1.64.157-2.147.037-.207.12-.563.167-.678.104-.25.291-.45.523-.575a1.15 1.15 0 01.58-.14zm.14 1.467l-.027.126-.034.198c-.07.483-.112 1.233-.111 2.036l.001.279c.009.737.053 1.414.123 1.841l.048.235.192-.07c.883-.372 2.636-1.56 3.23-2.2l.08-.087-.212-.218c-.711-.682-2.38-1.79-3.167-2.095l-.124-.045z" />
                      </svg>
                      Learning
                    </a>
                    <span className="absolute right-0 top-0 text-xs font-normal text-white bg-[#0ACF83] border-2 border-white rounded-[8px] w-9 h-6 flex items-center justify-center">New</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Middle Content */}
            <div className="w-full lg:w-1/2 h-[calc(100vh-75px)] overflow-y-auto pt-[10px] flex-grow">
              <div className="px-0 lg:px-4">
                {/* Stories */}
                <div className="bg-white rounded-[6px] mb-4 p-4">
                  <div className="flex items-center gap-4 overflow-x-auto">
                    <div className="flex-shrink-0 relative cursor-pointer">
                      <img src="/images/profile.png" alt="" className="rounded-[6px]" />
                      <div className="absolute bottom-0 left-0 right-0 bg-[#112032] rounded-[25.5px_25.5px_6px_6px] pt-[30px] pb-0">
                        <p className="text-center text-xs text-white font-medium mb-2.5">Create Story</p>
                      </div>
                      <div className="absolute top-[-12px] left-1/2 -translate-x-1/2">
                        <button className="bg-[#1890FF] border-2 border-[#112032] rounded-[40px] w-8 h-8 flex items-center justify-center">
                          <span className="text-white text-lg">+</span>
                        </button>
                      </div>
                    </div>
                    {Array(5).fill(null).map((_, i) => (
                      <div key={i} className="flex-shrink-0 relative cursor-pointer group">
                        <img src={`/images/f${i + 1}.png`} alt="" className="rounded-[6px]" />
                        <div className="absolute inset-0 bg-black opacity-50 rounded-[6px] group-hover:opacity-70 transition-opacity"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-2">
                          <p className="text-center text-xs text-white font-medium">User {i + 1}</p>
                        </div>
                        <div className="absolute top-3 right-3">
                          <img src="/images/profile.png" alt="" className="bg-[#C4C4C4] border-2 border-white rounded-[40px] max-w-[28px]" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Create Post */}
                <div className="bg-white rounded-[6px] mb-4">
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        <img src="/images/profile.png" alt="" className="max-w-10 rounded-full p-0.5" />
                      </div>
                      <div className="flex-1">
                        <textarea
                          placeholder="What's on your mind, Dylan?"
                          className="w-full border-none p-2 resize-none"
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-4 py-4 bg-[rgba(24,144,255,0.05)] rounded-b-[6px]">
                    <div className="flex items-center gap-2">
                      <button className="flex items-center gap-2 px-2.5 py-0 hover:opacity-80">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
                          <path fill="#666" d="M10 17.5a.5.5 0 00.5-.5v-6h6a.5.5 0 000-1h-6v-6a.5.5 0 00-1 0v6h-6a.5.5 0 000 1h6v6a.5.5 0 00.5.5z" />
                        </svg>
                      </button>
                      <button className="flex items-center gap-2 px-2.5 py-0 hover:opacity-80">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
                          <path fill="#666" d="M16 5H4a1 1 0 00-1 1v8a1 1 0 001 1h12a1 1 0 001-1V6a1 1 0 00-1-1zm-1 8H5V7h10v6z" />
                        </svg>
                        <span className="text-base font-normal text-[#666666]">Photo/Video</span>
                      </button>
                    </div>
                    <button className="bg-[#1890FF] text-white font-medium text-base px-6 py-3 rounded-[6px] border border-transparent hover:bg-[#377DFF] transition-colors">
                      Post
                    </button>
                  </div>
                </div>

                {/* Posts */}
                <div className="space-y-4">
                  {Array(3).fill(null).map((_, i) => (
                    <div key={i} className="bg-white rounded-[6px] p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4 cursor-pointer">
                          <div className="flex-shrink-0">
                            <img src="/images/profile.png" alt="" className="max-w-11 rounded-full hover:bg-black hover:opacity-70 transition-opacity" />
                          </div>
                          <div>
                            <h4 className="text-base font-normal text-black hover:underline">Dylan Field</h4>
                            <p className="text-sm font-normal text-[#666666]">2 hours ago</p>
                          </div>
                        </div>
                        <button className="p-2 hover:bg-gray-100 rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 18 18">
                            <circle cx="9" cy="3" r="1.5" fill="#666" />
                            <circle cx="9" cy="9" r="1.5" fill="#666" />
                            <circle cx="9" cy="15" r="1.5" fill="#666" />
                          </svg>
                        </button>
                      </div>
                      <p className="text-base text-[#666666] mb-4">
                        Just posted a new photo! Check it out!
                      </p>
                      <div className="mb-4">
                        <img src={`/images/f${(i % 5) + 1}.png`} alt="" className="w-full rounded-[6px]" />
                      </div>
                      <div className="flex items-center justify-between border-t border-b border-[#DFDFDF] py-3 mb-3">
                        <div className="flex items-center gap-2">
                          <div className="flex -space-x-2">
                            <img src="/images/react_img1.png" alt="" className="w-6 h-6 rounded-full border-2 border-white" />
                            <img src="/images/react_img2.png" alt="" className="w-6 h-6 rounded-full border-2 border-white" />
                            <img src="/images/react_img3.png" alt="" className="w-6 h-6 rounded-full border-2 border-white" />
                          </div>
                          <span className="text-sm font-normal text-[#666666]">128 likes</span>
                        </div>
                        <div className="flex gap-6">
                          <span className="text-sm font-normal text-[#666666]">24 comments</span>
                          <span className="text-sm font-normal text-[#666666]">8 shares</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-around">
                        <button className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-50 text-[#666666] hover:text-[#1890FF]">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
                            <path fill="#666" d="M10 18.25l-1.45-1.32C3.4 12.36 1 10.28 1 7.5 1 5.42 2.42 4 4.5 4c1.74 0 3.41.81 4.5 2.09C10.09 4.81 11.76 4 13.5 4 15.58 4 17 5.42 17 7.5c0 2.78-2.4 4.86-7.55 9.43L10 18.25z" />
                          </svg>
                          <span className="text-base font-medium">Like</span>
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-50 text-[#666666] hover:text-[#1890FF]">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
                            <path fill="#666" d="M18 10c0 3.87-4.03 7-9 7-1.5 0-2.94-.32-4.22-.9L2 18l1.65-3.38C2.61 13.52 2 11.82 2 10c0-3.87 4.03-7 9-7s9 3.13 9 7z" />
                          </svg>
                          <span className="text-base font-medium">Comment</span>
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-50 text-[#666666] hover:text-[#1890FF]">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
                            <path fill="#666" d="M15 5.63L10 2 5 5.63v3.79l5 3.64 5-3.64V5.63zM5 11.76l5 3.64 5-3.64v3.79l-5 3.63-5-3.63v-3.79z" />
                          </svg>
                          <span className="text-base font-medium">Share</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="hidden lg:block lg:w-1/4 h-[calc(100vh-75px)] overflow-y-auto pt-[18px] pl-0">
              <div className="bg-white rounded-[6px] p-6 mb-4">
                <h4 className="text-xl font-medium text-[#212121] mb-6">Suggestions</h4>
                <ul className="space-y-6">
                  {Array(4).fill(null).map((_, i) => (
                    <li key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <img src={`/images/friend-req.png`} alt="" className="max-w-[50px] h-[50px] rounded-full object-cover" />
                        <div>
                          <h5 className="text-base font-medium text-[#212121]">John Doe {i + 1}</h5>
                          <p className="text-xs font-light text-[#212121]">12 mutual friends</p>
                        </div>
                      </div>
                      <button className="border border-[#f1f1f1] px-2.5 py-2 rounded-[6px] text-sm font-medium text-[#959eae] hover:bg-[#377DFF] hover:text-white transition-colors">
                        Add
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg">
          <ul className="flex items-center justify-around p-2">
            <li>
              <a href="#" className="flex flex-col items-center gap-1 p-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="27" fill="none" viewBox="0 0 24 27">
                  <path className="fill-black fill-opacity-60" fill="#000" fillOpacity=".6" stroke="#666666" strokeWidth="1.5" d="M1 13.042c0-2.094 0-3.141.431-4.061.432-.92 1.242-1.602 2.862-2.965l1.571-1.321C8.792 2.232 10.256 1 12 1c1.744 0 3.208 1.232 6.136 3.695l1.572 1.321c1.62 1.363 2.43 2.044 2.86 2.965.432.92.432 1.967.432 4.06v6.54c0 2.908 0 4.362-.92 5.265-.921.904-2.403.904-5.366.904H7.286c-2.963 0-4.445 0-5.365-.904C1 23.944 1 22.49 1 19.581v-6.54z" />
                  <path fill="#fff" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.07 18.497h5.857v7.253H9.07v-7.253z" />
                </svg>
              </a>
            </li>
            <li>
              <a href="#" className="flex flex-col items-center gap-1 p-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="27" height="20" fill="none" viewBox="0 0 27 20">
                  <path className="fill-black fill-opacity-60" fill="#000" fillOpacity=".6" fillRule="evenodd" d="M13.334 12.405h.138l.31.001c2.364.015 7.768.247 7.768 3.81 0 3.538-5.215 3.769-7.732 3.784h-.932c-2.364-.015-7.77-.247-7.77-3.805 0-3.543 5.405-3.774 7.77-3.789l.31-.001h.138zm0 1.787c-2.91 0-6.38.348-6.38 2.003 0 1.619 3.263 1.997 6.114 2.018l.266.001c2.91 0 6.379-.346 6.379-1.998 0-1.673-3.469-2.024-6.38-2.024zm9.742-2.27c2.967.432 3.59 1.787 3.59 2.849 0 .648-.261 1.83-2.013 2.48a.953.953 0 01-.327.058.919.919 0 01-.858-.575.886.886 0 01.531-1.153c.83-.307.83-.647.83-.81 0-.521-.682-.886-2.027-1.082a.9.9 0 01-.772-1.017c.074-.488.54-.814 1.046-.75zm-18.439.75a.9.9 0 01-.772 1.017c-1.345.196-2.027.56-2.027 1.082 0 .163 0 .501.832.81a.886.886 0 01.531 1.153.92.92 0 01-.858.575.953.953 0 01-.327-.058C.262 16.6 0 15.418 0 14.77c0-1.06.623-2.417 3.592-2.85.506-.061.97.263 1.045.751zM13.334 0c3.086 0 5.596 2.442 5.596 5.442 0 3.001-2.51 5.443-5.596 5.443H13.3a5.616 5.616 0 01-3.943-1.603A5.308 5.308 0 017.74 5.439C7.739 2.442 10.249 0 13.334 0zm0 1.787c-2.072 0-3.758 1.64-3.758 3.655-.003.977.381 1.89 1.085 2.58a3.772 3.772 0 002.642 1.076l.03.894v-.894c2.073 0 3.76-1.639 3.76-3.656 0-2.015-1.687-3.655-3.76-3.655zm7.58-.62c2.153.344 3.717 2.136 3.717 4.26-.004 2.138-1.647 3.972-3.82 4.269a.911.911 0 01-1.036-.761.897.897 0 01.782-1.01c1.273-.173 2.235-1.248 2.237-2.501 0-1.242-.916-2.293-2.179-2.494a.897.897 0 01-.756-1.027.917.917 0 011.055-.736zM6.81 1.903a.897.897 0 01-.757 1.027C4.79 3.13 3.874 4.182 3.874 5.426c.002 1.251.963 2.327 2.236 2.5.503.067.853.519.783 1.008a.912.912 0 01-1.036.762c-2.175-.297-3.816-2.131-3.82-4.267 0-2.126 1.563-3.918 3.717-4.262.515-.079.972.251 1.055.736z" clipRule="evenodd" />
                </svg>
              </a>
            </li>
            <li>
              <a href="#" className="flex flex-col items-center gap-1 p-2 relative">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="27" fill="none" viewBox="0 0 25 27">
                  <path className="fill-black fill-opacity-60" fill="#000" fillOpacity=".6" fillRule="evenodd" d="M10.17 23.46c.671.709 1.534 1.098 2.43 1.098.9 0 1.767-.39 2.44-1.099.36-.377.976-.407 1.374-.067.4.34.432.923.073 1.3-1.049 1.101-2.428 1.708-3.886 1.708h-.003c-1.455-.001-2.831-.608-3.875-1.71a.885.885 0 01.072-1.298 1.01 1.01 0 011.374.068zM12.663 0c5.768 0 9.642 4.251 9.642 8.22 0 2.043.549 2.909 1.131 3.827.576.906 1.229 1.935 1.229 3.88-.453 4.97-5.935 5.375-12.002 5.375-6.067 0-11.55-.405-11.998-5.296-.003-2.024.649-3.053 1.225-3.959l.203-.324c.501-.814.928-1.7.928-3.502C3.022 4.25 6.897 0 12.663 0zm0 1.842c-4.533 0-7.693 3.362-7.693 6.378 0 2.553-.75 3.733-1.41 4.774-.531.836-.95 1.497-.95 2.932.216 2.316 1.831 3.533 10.055 3.533 8.178 0 9.844-1.271 10.06-3.613-.004-1.355-.423-2.016-.954-2.852-.662-1.042-1.41-2.221-1.41-4.774 0-4.774h.001c0-3.017 3.161-6.38 7.696-6.38z" clipRule="evenodd" />
                </svg>
                <span className="absolute top-1 right-1 bg-[#1890FF] border border-white rounded-[9px] min-w-[17px] h-[17px] text-xs font-normal text-white flex items-center justify-center">6</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex flex-col items-center gap-1 p-2 relative">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path className="fill-black fill-opacity-60" fill="#000" fillOpacity=".6" fillRule="evenodd" d="M12.002 0c3.208 0 6.223 1.239 8.487 3.489 4.681 4.648 4.681 12.211 0 16.86-2.294 2.28-5.384 3.486-8.514 3.486-1.706 0-3.423-.358-5.03-1.097-.474-.188-.917-.366-1.235-.366-.366.003-.859.171-1.335.334-.976.333-2.19.748-3.09-.142-.895-.89-.482-2.093-.149-3.061.164-.477.333-.97.333-1.342 0-.306-.149-.697-.376-1.259C-1 12.417-.032 7.011 3.516 3.49A11.96 11.96 0 0112.002 0zm.001 1.663a10.293 10.293 0 00-7.304 3.003A10.253 10.253 0 002.63 16.244c.261.642.514 1.267.514 1.917 0 .649-.225 1.302-.422 1.878-.163.475-.41 1.191-.252 1.349.156.16.881-.092 1.36-.255.576-.195 1.228-.42 1.874-.424.648 0 1.259.244 1.905.503 3.96 1.818 8.645.99 11.697-2.039 4.026-4 4.026-10.509 0-14.508a10.294 10.294 0 00-7.303-3.002zm4.407 9.607c.617 0 1.117.495 1.117 1.109 0 .613-.5 1.109-1.117 1.109a1.116 1.116 0 01-1.12-1.11c0-.613.494-1.108 1.11-1.108h.01zm-4.476 0c.616 0 1.117.495 1.117 1.109 0 .613-.5 1.109-1.117 1.109a1.116 1.116 0 01-1.121-1.11c0-.613.493-1.108 1.11-1.108h.01zm-4.477 0c.617 0 1.117.495 1.117 1.109 0 .613-.5 1.109-1.117 1.109a1.116 1.116 0 01-1.12-1.11c0-.613.494-1.108 1.11-1.108h.01z" clipRule="evenodd" />
                </svg>
                <span className="absolute top-1 right-1 bg-[#1890FF] border border-white rounded-[9px] min-w-[17px] h-[17px] text-xs font-normal text-white flex items-center justify-center">2</span>
              </a>
            </li>
            <li>
              <form action="#">
                <button type="submit" className="p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="14" fill="none" viewBox="0 0 18 14">
                    <path stroke="#666" strokeLinecap="round" strokeWidth="1.5" d="M1 1h16M1 7h16M1 13h16" />
                  </svg>
                </button>
              </form>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Feed;
