import React from 'react';
              import waveVideo from '../assets/videos.mp4';
const Premium = () => {
  return (
    <>
      {/* <!-- product more dtl --> */}
      <section className="se1">
        <section className="section" aria-labelledby="anti-title-1">
          <div className="antii">
            {/* Video section instead of image */}
            <div className="jar">

<video
  src={waveVideo}
  className="promo-video"
  autoPlay
  loop
  muted
  playsInline
></video>
            </div>

            {/* Text content */}
            <div className="contain">
              <div className="lives">
                <img src="../assets/golden-lives3.png" alt="" />
              </div>
              <div className="contain-dtl">
                <h3>Glitzmia Cream</h3>
                <p>
                  It is a long established fact that a reader will be distracted by the readable content of a
                  page when looking at its layout. The point of using Lorem Ipsum is that it has a
                  more-or-less.
                </p>
                <button>
                  <a href="./blog.html">Read more</a> <i className="ri-arrow-right-line"></i>
                </button>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default Premium;
