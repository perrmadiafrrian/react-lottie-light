import Lottie from "../index";
import animationDataA from "./pinjump.json";
import animationDataB from "./TwitterHeart.json";
import animationDataC from "./beating-heart.json";
import { useEffect, useRef, useState } from "react";

const LottieStory = ({
  animation,
  isStopped,
  direction,
  looping,
  segments,
  speed,
  pausing,
  pauseOnClick,
}) => {
  const animationRef = useRef();
  const [options, setOptions] = useState({
    animationData: animationDataA,
    loop: looping,
  });

  useEffect(() => {
    if (pausing) {
      animationRef.current?.anim().pause();
    }
  }, [pausing]);

  useEffect(() => {
    const getAnim = async () => {
      switch (animation) {
        case "Pin Jump":
          setOptions((state) => ({ ...state, animationData: animationDataA }));
          break;
        case "Heart":
          setOptions((state) => ({ ...state, animationData: animationDataB }));
          break;
        case "Heart Beat":
          setOptions((state) => ({ ...state, animationData: animationDataC }));
          break;
        case "Among Us":
          const fetchData = await fetch(
            "https://assets1.lottiefiles.com/packages/lf20_unljj7y7.json"
          ).then((response) => response.json());
          setOptions((state) => ({ ...state, animationData: fetchData }));
          break;
        default:
      }
    };
    getAnim();
  }, [animation]);

  const togglePause = () => {
    if (animationRef.current?.anim().isPaused) {
      animationRef.current?.anim().play();
    } else {
      animationRef.current?.anim().pause();
    }
  };

  return (
    <div>
      <Lottie
        ref={animationRef}
        options={options}
        height={300}
        width={300}
        isStopped={isStopped}
        speed={speed}
        direction={direction ? 1 : -1}
        segments={segments}
        isClickToPauseDisabled={!pauseOnClick}
      />
      <button onClick={togglePause}>Toggle Pause</button>
    </div>
  );
};

export default {
  title: "Lottie Example",
  component: LottieStory,
  argTypes: {
    animation: {
      options: ["Pin Jump", "Heart", "Heart Beat", "Among Us"],
      control: { type: "select" },
    },
    speed: {
      control: { type: "range", min: 0, max: 3, step: 0.5 },
    },
    pausing: {
      name: "Pause",
      control: { type: "boolean" },
    },
    pauseOnClick: {
      name: "Pause on Click",
      description: "Pause animation on clicked",
      control: { type: "boolean" },
    },
    looping: {
      description: "Set animation to looping",
      control: { type: "boolean" },
    },
    isStopped: {
      name: "Stop Animation",
      description: "Stop Animation",
      control: { type: "boolean" },
    },
    direction: {
      name: "Animation Direction",
      control: { type: "boolean" },
    },
    segments: {
      name: "Segments",
      control: { type: "array" },
    },
  },
};

export const Primary = LottieStory.bind({});
Primary.args = {
  animation: "Pin Jump",
  speed: 1,
  pausing: false,
  pauseOnClick: false,
  looping: true,
  isStopped: false,
  direction: true,
};
