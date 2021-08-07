import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import lottie from "lottie-web/build/player/lottie_light";
import PropTypes from "prop-types";

/**
 * Callback on lottie animation completed
 *
 * @callback onComplete
 */

/**
 * @typedef {Object} Props
 * @property {Object} options - Lottie's options, please refer to the README.md
 * @property {Object} style - React component style(s)
 * @property {number} width - width of the container component
 * @property {number} height - height of the container component
 * @property {boolean} isClickToPauseDisabled
 * @property {boolean} isStopped
 * @property {onComplete} onComplete
 * @property {string} className
 * @property {boolean} isPaused
 * @property {Array} segments
 * @property {number} speed
 * @property {number} direction
 */

/**
 * React component for `lottie-web`
 *
 * @param {Props} props Lottie props
 * @returns JSX.Element
 */
const Lottie = forwardRef(
  (
    {
      options,
      style,
      width,
      height,
      isClickToPauseDisabled,
      isStopped,
      onComplete,
      className,
      isPaused,
      segments,
      speed,
      direction,
    },
    ref
  ) => {
    const containerRef = useRef();
    const anim = useRef();

    useEffect(() => {
      const { loop, autoplay, animationData, rendererSettings } = options;
      const m_opt = {
        container: containerRef.current,
        renderer: "svg",
        loop: loop !== false,
        autoplay: autoplay !== false,
        animationData,
        rendererSettings,
        ...options,
      };

      const animationCallback = () => {
        if (onComplete) {
          onComplete();
        }
      };

      anim.current = lottie.loadAnimation(m_opt);

      if (isStopped) anim.current?.stop();
      else if (segments) anim.current?.playSegments(segments);
      else anim.current?.play();

      anim.current?.setSpeed(speed);

      if (isPaused && !anim.current?.isPaused) anim.current?.pause();

      if (direction) anim.current?.setDirection(direction);

      anim.current?.addEventListener("complete", animationCallback);

      return () => {
        anim.current?.removeEventListener("complete", animationCallback);
        anim.current?.destroy();
      };
    }, [direction, isPaused, isStopped, onComplete, options, segments, speed]);

    /**
     * Handling pause animation on component getting
     * clicked
     */
    const handleClickToPause = () => {
      if (anim.current?.isPaused) {
        anim.current?.play();
      } else {
        anim.current?.pause();
      }
    };

    // paused and anim used for testing purpose
    useImperativeHandle(ref, () => ({
      paused: () => anim.current?.isPaused,
      anim: () => anim.current,
      play: (name) => {
        anim.current?.play(name);
      },
      stop: (name) => {
        anim.current?.stop(name);
      },
    }));

    /**
     * Parse size into style's size
     *
     * @param {any} initial size to parse
     * @returns parsed size
     */
    const getSize = (initial) => {
      let size;

      if (typeof initial === "number") {
        size = `${initial}px`;
      } else {
        size = initial || "100%";
      }

      return size;
    };

    const lottieStyles = {
      width: getSize(width),
      height: getSize(height),
      overflow: "hidden",
      margin: "0 auto",
      outline: "none",
      ...style,
    };

    const onClickHandler = isClickToPauseDisabled
      ? () => {}
      : handleClickToPause;

    return (
      <div
        ref={containerRef}
        className={className}
        style={lottieStyles}
        onClick={onClickHandler}
        tabIndex="0"
        data-testid="lottie-container"
      />
    );
  }
);

Lottie.propTypes = {
  isStopped: PropTypes.bool,
  isPaused: PropTypes.bool,
  speed: PropTypes.number,
  options: PropTypes.object.isRequired,
  style: PropTypes.object,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isClickToPauseDisabled: PropTypes.bool,
  onComplete: PropTypes.func,
  className: PropTypes.string,
  segments: PropTypes.array,
  direction: PropTypes.number,
};

Lottie.defaultProps = {
  isStopped: false,
  isPaused: false,
  speed: 1,
  isClickToPauseDisabled: true,
};

export default Lottie;
