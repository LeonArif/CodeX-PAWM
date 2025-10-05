import React, { useEffect, useRef, useState } from "react";
import { FaPython, FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import codeXLogo from "@assets/codeX-removebg-preview1.png";
import waveHaikei from "@assets/wave-haikei.svg";
import "@css/landing.css";

const slidesData = [
  {
    title: "Python",
    desc: "Let's Learn Python!",
    link: "/python",
    icon: <FaPython className="fa-python" />
  },
  {
    title: "Python",
    desc: "Let's Learn Python!",
    link: "/python",
    icon: <FaPython className="fa-python" />
  },
  {
    title: "Python",
    desc: "Let's Learn Python!",
    link: "/python",
    icon: <FaPython className="fa-python" />
  }
];

const ANIMATION_DURATION = 400; // ms

const Home = () => {
  const navigate = useNavigate();
  // Refs
  const homeRef = useRef(null);
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const carouselBoxRef = useRef(null);
  const geserRef = useRef(null);
  const subtitleRef = useRef(null);
  const contentTulisanRef = useRef(null);

  // State for carousel
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // State for overlay opacity & muncul class
  const [homeOverlay, setHomeOverlay] = useState(0);
  const [contentOverlay, setContentOverlay] = useState(0);
  const [showTitle, setShowTitle] = useState(false);
  const [showCarousel, setShowCarousel] = useState(false);
  const [showGeser, setShowGeser] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showContentTulisan, setShowContentTulisan] = useState(false);

  // Carousel class builder
  const getSlideClass = (i) => {
    const total = slidesData.length;
    const leftIdx = (current - 1 + total) % total;
    const rightIdx = (current + 1) % total;
    if (i === leftIdx) return "language left";
    if (i === current) return "language active muncul";
    if (i === rightIdx) return "language right";
    return "language hidden";
  };

  // Overlay & muncul animation on scroll
  useEffect(() => {
    const handleScroll = () => {
      // home overlay
      if (homeRef.current) {
        const homeRect = homeRef.current.getBoundingClientRect();
        const scrolled = Math.max(0, -homeRect.top);
        const totalHeight = homeRef.current.offsetHeight;
        const progress = Math.min(1.4, scrolled / totalHeight);
        setHomeOverlay(progress * 1.2);
      }
      // content overlay
      if (contentRef.current) {
        const contentRect = contentRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        let visibleHeight = windowHeight - contentRect.top;
        let totalHeight = contentRef.current.offsetHeight;
        visibleHeight = Math.max(0, Math.min(visibleHeight, totalHeight));
        const progress = visibleHeight / totalHeight;
        setContentOverlay(Math.min(1.2, progress * 1.4));
      }
      // muncul logic
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      // title
      if (titleRef.current) {
        const titleRect = titleRef.current.getBoundingClientRect();
        setShowTitle(
          titleRect.top < windowHeight - titleRect.height / 2 && titleRect.bottom > 0
        );
      }
      // carousel
      if (carouselBoxRef.current) {
        const carouselRect = carouselBoxRef.current.getBoundingClientRect();
        setShowCarousel(
          carouselRect.top < windowHeight - carouselRect.height / 2 && carouselRect.bottom > 0
        );
      }
      // geser
      if (geserRef.current) {
        const geserRect = geserRef.current.getBoundingClientRect();
        setShowGeser(
          geserRect.top < windowHeight - geserRect.height / 2 + 100 && geserRect.bottom > 0
        );
      }
      // subtitle
      if (subtitleRef.current) {
        const subtitleRect = subtitleRef.current.getBoundingClientRect();
        setShowSubtitle(
          subtitleRect.top < windowHeight - subtitleRect.height / 2 && subtitleRect.bottom > 0
        );
      }
      // content-tulisan
      if (contentTulisanRef.current && contentRef.current) {
        const contentRect = contentRef.current.getBoundingClientRect();
        setShowContentTulisan(
          contentRect.top < windowHeight && contentRect.bottom > 0
        );
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Carousel next/prev
  const total = slidesData.length;
  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((prev) => (prev + 1) % total);
    setTimeout(() => setIsAnimating(false), ANIMATION_DURATION);
  };
  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((prev) => (prev - 1 + total) % total);
    setTimeout(() => setIsAnimating(false), ANIMATION_DURATION);
  };

  // Scroll to content section (go-content)
  useEffect(() => {
    const handleGoContentClick = (e) => {
      const content = contentRef.current;
      if (content) {
        const y = content.getBoundingClientRect().top + window.pageYOffset;
        const extraOffset = 30;
        window.scrollTo({ top: y + extraOffset, behavior: "smooth" });
      }
    };
    document.querySelectorAll(".go-content").forEach((el) => {
      el.addEventListener("click", handleGoContentClick);
    });
    return () => {
      document.querySelectorAll(".go-content").forEach((el) => {
        el.removeEventListener("click", handleGoContentClick);
      });
    };
  }, []);

  // Slide click to open link if active
  const handleSlideClick = (i) => {
    if (i === current && slidesData[i].link) {
      navigate(slidesData[i].link);
    }
  };

  return (
    <div>
      {/* Header */}
      <header
        className="home"
        ref={homeRef}
        style={{
          backgroundImage: `url(${waveHaikei})`,
        }}
      >
        <nav className="nav">
          <div className="nav-kiri">
            <Link to="/"> 
              <img
                className="logo"
                src={codeXLogo}
                alt="CodeX Logo"
              />
            </Link>
          </div>
          <p className="nav-quote">
            “every line of code is a verse in the codex of innovation.”
          </p>
          <div className="nav-tulisan">
            <p className="nav-contents go-content">
              Contents
            </p>
            <button className="sign-in">
              <span>Sign in</span>
            </button>
          </div>
        </nav>
        {/* Overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "black",
            opacity: homeOverlay,
            transition: "opacity 0.1s linear",
          }}
        />
        <div className="tulisan">
          <h1
            ref={titleRef}
            className={`title${showTitle ? " muncul" : ""}`}
          >
            CodeX
          </h1>
          <p className="desc-title">
            Hey! Wanting to learn a programming language? Let's learn together with CodeX!
          </p>
          <div className="search-container">
            <input
              type="text"
              id="search-input"
              placeholder="Search, e.g Python"
            />
            <button
              id="search-btn"
            >
              <FaSearch className="fa-search" />
            </button>
          </div>
          <p
            ref={subtitleRef}
            className={`mt-4 subtitle go-content${showSubtitle ? " muncul" : ""}`}
          >
            Not sure where to begin?
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <section
          className="content"
          id="content"
          ref={contentRef}
        >
          {/* Overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "black",
              opacity: contentOverlay,
              transition: "opacity 0.1s linear",
            }}
          />
          <header
            ref={contentTulisanRef}
            className={`content-tulisan${showContentTulisan ? " muncul" : ""}`}
          >
            <h2 className="content-title font-light mb-8 text-5xl">Contents</h2>
            <p className="font-thin text-2xl">
              Select a programming language you want to learn!
            </p>
          </header>
          <section className="carousel">
            <div
              ref={carouselBoxRef}
              className={`carousel-box${showCarousel ? " muncul" : ""}${isAnimating ? " animating" : ""}`}
            >
              {slidesData.map((slide, i) => (
                <article
                  key={i}
                  className={getSlideClass(i)}
                  style={{
                    minWidth: "350px",
                    height: "350px",
                    zIndex: i === current ? 3 : i === (current - 1 + total) % total || i === (current + 1) % total ? 2 : 0,
                    pointerEvents: isAnimating
                      ? "none"
                      : i === current
                      ? "auto"
                      : "none",
                    cursor: i === current ? "pointer" : "default"
                  }}
                  data-link={slide.link}
                  onClick={() => handleSlideClick(i)}
                >
                  {slide.icon}
                  <h1 className="mt-4 text-3xl">{slide.title}</h1>
                  <p className="font-thin" style={{ marginTop: "4px" }}>{slide.desc}</p>
                </article>
              ))}
            </div>
            <div
              ref={geserRef}
              className={`geser${showGeser ? " muncul" : ""}`}
            >
              <button
                className="carousel-btn prev"
                onClick={handlePrev}
                disabled={isAnimating}
              >
                &lt;
              </button>
              <button
                className="carousel-btn next"
                onClick={handleNext}
                disabled={isAnimating}
              >
                &gt;
              </button>
            </div>
          </section>
        </section>
      </main>
    </div>
  );
};

export default Home;