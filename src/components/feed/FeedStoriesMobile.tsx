const mobileStories = [
  { type: 'create', image: '/images/mobile_story_img.png', label: 'Your Story', storyClass: '_feed_inner_ppl_card_area_story', labelClass: '_feed_inner_ppl_card_area_link_txt', showBtn: true },
  { type: 'active', image: '/images/mobile_story_img1.png', label: 'Ryan...', storyClass: '_feed_inner_ppl_card_area_story_active', labelClass: '_feed_inner_ppl_card_area_txt', showBtn: false },
  { type: 'inactive', image: '/images/mobile_story_img2.png', label: 'Ryan...', storyClass: '_feed_inner_ppl_card_area_story_inactive', labelClass: '_feed_inner_ppl_card_area_txt', showBtn: false },
  { type: 'active', image: '/images/mobile_story_img1.png', label: 'Ryan...', storyClass: '_feed_inner_ppl_card_area_story_active', labelClass: '_feed_inner_ppl_card_area_txt', showBtn: false },
  { type: 'inactive', image: '/images/mobile_story_img2.png', label: 'Ryan...', storyClass: '_feed_inner_ppl_card_area_story_inactive', labelClass: '_feed_inner_ppl_card_area_txt', showBtn: false },
  { type: 'active', image: '/images/mobile_story_img1.png', label: 'Ryan...', storyClass: '_feed_inner_ppl_card_area_story_active', labelClass: '_feed_inner_ppl_card_area_txt', showBtn: false },
  { type: 'plain', image: '/images/mobile_story_img.png', label: 'Ryan...', storyClass: '_feed_inner_ppl_card_area_story', labelClass: '_feed_inner_ppl_card_area_txt', showBtn: false },
  { type: 'active', image: '/images/mobile_story_img1.png', label: 'Ryan...', storyClass: '_feed_inner_ppl_card_area_story_active', labelClass: '_feed_inner_ppl_card_area_txt', showBtn: false },
];

const FeedStoriesMobile = () => (
  <div className="_feed_inner_ppl_card_mobile _mar_b16">
    <div className="_feed_inner_ppl_card_area">
      <ul className="_feed_inner_ppl_card_area_list">
        {mobileStories.map((story, index) => (
          <li key={index} className="_feed_inner_ppl_card_area_item">
            <a href="#0" className="_feed_inner_ppl_card_area_link">
              <div className={story.storyClass}>
                <img src={story.image} alt="Image" className={story.type === 'create' ? '_card_story_img' : '_card_story_img1'} />
                {story.showBtn && (
                  <div className="_feed_inner_ppl_btn">
                    <button className="_feed_inner_ppl_btn_link" type="button">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 12 12">
                        <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" d="M6 2.5v7M2.5 6h7" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
              <p className={story.labelClass}>{story.label}</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default FeedStoriesMobile;
