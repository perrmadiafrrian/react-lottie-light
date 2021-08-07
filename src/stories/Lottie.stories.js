import Lottie from "../index";
import animationDataA from "./pinjump.json";
import animationDataB from "./TwitterHeart.json";
import animationDataC from "./beating-heart.json";
import { useEffect, useRef } from "react";

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

  useEffect(() => {
    if (pausing) {
      animationRef.current?.anim().pause();
    }
  }, [pausing]);

  const getAnim = (c_animation) => {
    switch (c_animation) {
      case "Pin Jump":
        return animationDataA;
      case "Heart":
        return animationDataB;
      case "Heart Beat":
        return animationDataC;
      default:
        return animationDataA;
    }
  };

  const togglePause = () => {
    if (animationRef.current?.anim().isPaused) {
      animationRef.current?.anim().play();
    } else {
      animationRef.current?.anim().pause();
    }
  };

  const defaultOptions = {
    animationData: getAnim(animation),
    loop: looping,
  };

  return (
    <div>
      <Lottie
        ref={animationRef}
        options={defaultOptions}
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
      options: ["Pin Jump", "Heart", "Heart Beat"],
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
