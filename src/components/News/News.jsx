import React, { useEffect, useState } from 'react';
import { fetchFacebookPosts } from '../../hooks/FacebookPosts';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import './News.scss';
import Aos from "aos";
import "aos/dist/aos.css";

const News = () => {
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const accessToken = import.meta.env.VITE_FACEBOOK_TOKEN;

  useEffect(() => {
    const lastFetched = localStorage.getItem('lastFetched');
    if (lastFetched && Date.now() - lastFetched < 120000) {
      setPostData(JSON.parse(localStorage.getItem('posts')));
      setLoading(false);
    } else {
      fetchFacebookPosts(accessToken)
        .then((data) => {
          setPostData(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message || 'Unknown error');
          setLoading(false);
        });
    }

    const interval = setInterval(() => {
      fetchFacebookPosts(accessToken)
        .then((data) => setPostData(data))
        .catch((err) => setError(err.message || 'Unknown error'));
    }, 120000);

    return () => clearInterval(interval);
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading posts: {error}</div>;

  return (
    <div className="news__container wrapper" id='news'>
      <h2 data-aos="zoom-out-up">Новини</h2>
      {postData && postData.length > 0 ? (
        <div className="news__items">
          {postData.map((post, index) => (
            <div className="news__item" data-aos="zoom-out-up" key={post.id}>
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={200}
                slidesPerView={1}
                navigation={true}
                pagination={{ clickable: true }}
                loop={true}
                className="swiper"
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
              >
                {post.attachments && post.attachments.data.map((attachment, subIndex) => (
                  attachment.subattachments && attachment.subattachments.data.length > 0 && attachment.subattachments.data.map((sub, subSubIndex) => (
                    <SwiperSlide key={subSubIndex}>
                      <div className="media-slider__content">
                        {sub.media && sub.media.image && (
                          <img
                            src={sub.media.image.src}
                            alt={`Sub-attachment ${subSubIndex + 1}`}
                            className="media-slider__image"
                          />
                        )}
                        {sub.media && sub.media.source && (
                          <div className="media-slider__video">
                            <video
                              ref={(video) => {
                                if (video && activeIndex === subSubIndex) {
                                  video.play();
                                } else if (video) {
                                  video.pause();
                                }
                              }}
                            >
                              <source src={sub.media.source} type="video/mp4" />
                            </video>
                          </div>
                        )}
                      </div>
                    </SwiperSlide>
                  ))
                ))}
              </Swiper>
              <div className="news__description">
				  <h3>{new Date(post.created_time).toLocaleDateString()}</h3>
                <p>{post.message}</p>
                
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
};

export default News;
