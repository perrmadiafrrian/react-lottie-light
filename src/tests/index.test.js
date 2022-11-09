import "jest-canvas-mock";
import Lottie from "..";
import pinjump from "../stories/pinjump.json";
import heart from "../stories/TwitterHeart.json";
import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: pinjump,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

jest.setTimeout(10000);

describe("react-lottie-light", () => {
  describe("props", () => {
    describe("isClickToPauseDisabled", () => {
      it("should set isClickToPauseDisabled default value to be true", () => {
        const compRef = createRef();
        render(<Lottie ref={compRef} options={defaultOptions} />);
        fireEvent.click(screen.getByTestId("lottie-container"));
        expect(compRef.current.paused()).toEqual(false);
      });
      it("should not pausing when isClickToPauseDisabled props is true", () => {
        const compRef = createRef();
        const { rerender } = render(
          <Lottie
            ref={compRef}
            isClickToPauseDisabled={false}
            options={defaultOptions}
          />
        );
        const component = screen.getByTestId("lottie-container");
        fireEvent.click(component);
        expect(compRef.current.paused()).toEqual(true);

        fireEvent.click(component);
        expect(compRef.current.paused()).toEqual(false);

        rerender(
          <Lottie
            ref={compRef}
            isClickToPauseDisabled={true}
            options={defaultOptions}
          />
        );
        fireEvent.click(component);
        expect(compRef.current.paused()).toEqual(false);

        fireEvent.click(component);
        expect(compRef.current.paused()).toEqual(false);
      });
    });

    describe("height and width", () => {
      it("should set the container style correctly", () => {
        render(<Lottie options={defaultOptions} height={200} width={300} />);

        const component = screen.getByTestId("lottie-container");
        expect(component.style.height).toEqual("200px");
        expect(component.style.width).toEqual("300px");
      });
    });

    describe("className", () => {
      it("set classname of the component", () => {
        render(<Lottie options={defaultOptions} className="classname-test" />);

        const component = screen.getByTestId("lottie-container");
        expect(component.className).toEqual("classname-test");
      });
    });

    describe("onComplete", () => {
      it("should called onComplete once because of loop is false", async () => {
        const onComplete = jest.fn();
        const options = {
          ...defaultOptions,
          loop: false,
        };
        render(<Lottie options={options} speed={4} onComplete={onComplete} />);

        await new Promise((r) => setTimeout(r, 1000));

        expect(onComplete).toHaveBeenCalledTimes(1);
      });
      it("should not called onComplete because it is looping", async () => {
        const onComplete = jest.fn();
        render(
          <Lottie options={defaultOptions} speed={4} onComplete={onComplete} />
        );

        await new Promise((r) => setTimeout(r, 1500));

        expect(onComplete).not.toHaveBeenCalled();
      });
    });
  });
  describe("when props change", () => {
    it("should change animation based on animation data", () => {
      const compRef = createRef();
      const { rerender } = render(
        <Lottie options={defaultOptions} ref={compRef} />
      );

      expect(compRef.current.anim().animationData).toEqual(pinjump);

      rerender(
        <Lottie
          options={{
            ...defaultOptions,
            animationData: heart,
          }}
          ref={compRef}
        />
      );

      expect(compRef.current.anim().animationData).toEqual(heart);
    });
    it("should pause the animation if isPaused is true", () => {
      const compRef = createRef();
      const { rerender } = render(
        <Lottie options={defaultOptions} ref={compRef} />
      );

      expect(compRef.current.paused()).toEqual(false);
      rerender(
        <Lottie options={defaultOptions} ref={compRef} isPaused={true} />
      );
      expect(compRef.current.paused()).toEqual(true);
    });
  });
});
