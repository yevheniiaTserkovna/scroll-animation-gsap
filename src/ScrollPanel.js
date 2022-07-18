import "./ScrollPanel.css";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useState } from "react";

gsap.registerPlugin(ScrollTrigger);

function ScrollPanelDesctop({ data }) {
  const el = useRef(null);

  useEffect(() => {
    const mainScrollWrapper = el.current;

    gsap.defaults({ overwrite: "auto" });
    const tl = gsap.timeline();

    const contentMarkers = gsap.utils.toArray(
      mainScrollWrapper.querySelectorAll(".contentWrapper > div")
    );

    contentMarkers.forEach((marker) => {
      let currentIndex = parseInt(marker.dataset.markerContent);
      let nextItemIndex = currentIndex + 1;
      marker.content = {
        currentImg: mainScrollWrapper.querySelector(
          "#scrollImg-" + currentIndex
        ),
        nextContent: mainScrollWrapper.querySelector(
          "#scrollContent-" + nextItemIndex
        ),
        nextImg: mainScrollWrapper.querySelector("#scrollImg-" + nextItemIndex),
      };
    });

    contentMarkers.forEach((item) => {
      tl.to(item, {
        scrollTrigger: {
          trigger: item,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onEnter: () => {
            if (!item.content.nextImg) return;
            gsap.to(
              [item.content.nextImg.parentElement, item.content.nextContent],
              {
                opacity: 1,
                duration: 1,
              }
            );
            gsap.to([item, item.content.currentImg], {
              opacity: 0,
              duration: 1,
            });
          },
          onLeaveBack: () => {
            if (!item.content.nextImg) return;
            gsap.to(
              [item.content.nextImg.parentElement, item.content.nextContent],
              {
                opacity: 0,
                duration: 1,
              }
            );
            gsap.to([item, item.content.currentImg], {
              opacity: 1,
              duration: 1,
            });
          },
        },
      });
    });

    ScrollTrigger.create({
      trigger: mainScrollWrapper,
      start: "top top",
      end: "bottom bottom",
      pin: mainScrollWrapper.querySelector(".leftPanel"),
      scrub: true,
    });
  }, []);

  return (
    <div className="scrollWrapper" ref={el}>
      <div className="leftPanel">
        <div className="imageContainer">
          {data.images.map((item, i) => (
            <div key={"img" + item.props.id} className="imgWrapper">
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className="rightPanel">
        <div className="contentContainer">
          {data.content.map((item, i) => (
            <div key={item.props.id} className="contentWrapper">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ScrollPanelMobile({ data }) {
  return (
    <div className="scrollWrapperMobile">
      {data.content.map((item, i) => (
        <div key={item.props.id} className="container">
          {data.images[i]}
          {item}
        </div>
      ))}
    </div>
  );
}

function ScrollPanel({ data }) {
  const [width, setWidth] = useState(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);
  const isMobile = width <= 768;

  return (
    <>
      {isMobile && <ScrollPanelMobile data={data} />}
      {!isMobile && <ScrollPanelDesctop data={data} />}
    </>
  );
}

export default ScrollPanel;
