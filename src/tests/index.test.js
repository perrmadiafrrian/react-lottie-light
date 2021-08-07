import "jest-canvas-mock";
import Lottie from "..";
import pinjump from "../stories/pinjump.json";
import heart from "../stories/TwitterHeart.json";
import { mount, configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { createRef } from "react";

configure({ adapter: new Adapter() });
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
        const component = mount(
          <Lottie ref={compRef} options={defaultOptions} />
        );
        component.find("div").simulate("click");
        expect(compRef.current.paused()).toEqual(false);
      });
      it("should not pausing when isClickToPauseDisabled props is true", () => {
        const compRef = createRef();
        const component = mount(
          <Lottie
            ref={compRef}
            isClickToPauseDisabled={false}
            options={defaultOptions}
          />
        );
        component.find("div").simulate("click");
        expect(compRef.current.paused()).toEqual(true);

        component.find("div").simulate("click");
        expect(compRef.current.paused()).toEqual(false);

        component.setProps({ isClickToPauseDisabled: true });
        component.find("div").simulate("click");
        expect(compRef.current.paused()).toEqual(false);

        component.find("div").simulate("click");
        expect(compRef.current.paused()).toEqual(false);
      });
    });

    describe("height and width", () => {
      it("should set the container style correctly", () => {
        const component = shallow(
          <Lottie options={defaultOptions} height={200} width={300} />
        );

        expect(component.find("div").prop("style").height).toEqual("200px");
        expect(component.find("div").prop("style").width).toEqual("300px");
      });
    });

    describe("className", () => {
      it("set classname of the component", () => {
        const component = shallow(
          <Lottie options={defaultOptions} className="classname-test" />
        );

        expect(component.find("div").prop("className")).toEqual(
          "classname-test"
        );
      });
    });

    describe("onComplete", () => {
      it("should called onComplete once because of loop is false", async () => {
        const onComplete = jest.fn();
        const options = {
          ...defaultOptions,
          loop: false,
        };
        mount(<Lottie options={options} speed={4} onComplete={onComplete} />);

        await new Promise((r) => setTimeout(r, 1000));

        expect(onComplete).toHaveBeenCalledTimes(1);
      });
      it("should not called onComplete because it is looping", async () => {
        const onComplete = jest.fn();
        mount(
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
      const component = mount(
        <Lottie options={defaultOptions} ref={compRef} />
      );

      expect(compRef.current.anim().animationData).toEqual(pinjump);

      component.setProps({
        options: {
          ...defaultOptions,
          animationData: heart,
        },
      });

      expect(compRef.current.anim().animationData).toEqual(heart);
    });
    it("should pause the animation if isPaused is true", () => {
      const compRef = createRef();
      const component = mount(
        <Lottie options={defaultOptions} ref={compRef} />
      );

      expect(compRef.current.paused()).toEqual(false);
      component.setProps({ isPaused: true });
      expect(compRef.current.paused()).toEqual(true);
    });
  });
});
