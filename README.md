# React Lottie Light

React component for [lottie-web](https://github.com/airbnb/lottie-web). This repositoriy originally is a fork from [react-lottie](https://github.com/chenqingspring/react-lottie), but then re-created using [create-react-app](https://reactjs.org/docs/create-a-new-react-app.html).

This component using functional component and [hooks](https://reactjs.org/docs/hooks-intro.html), instead of [component classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes).

## Light version of Lottie

This component of lottie using the `lottie-light`, so bear in mind that `expression` cannot be used with this component. If you want to use `expression` you can fork this repo then modify the lottie import.

## Installation

using npm:

```shell
npm i @rookino/react-lottie-light
```

using yarn:

```shell
yarn add @rookino/react-lottie-light
```

then you can import it in you project

```jsx
import Lottie from "@rookino/react-lottie-light";
```

## Using the components

basic usage:

```jsx
import Lottie from "@rookino/react-lottie-light";
import animation from "your-animation.json";

const MyComponent = () => {
  const defaultOptions = {
    animationData: animation,
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <Lottie options={defaultOptions} />
    </div>
  );
};
```

## Props

Some props that available inside this component:

### options

options is pretty much the same with `lottie-web`'s options

```js
const options = {
  loop: true,
  autoplay: true,
  animationData: animationData, // the animation data
  // ...or if your animation contains repeaters:
  // animationData: cloneDeep(animationData), // e.g. lodash.clonedeep
  rendererSettings: {
    preserveAspectRatio: "xMinYMin slice", // Supports the same options as the svg element's preserveAspectRatio property
    progressiveLoad: false, // Boolean, only svg renderer, loads dom elements when needed. Might speed up initialization for large number of elements.
    hideOnTransparent: true, //Boolean, only svg renderer, hides elements when opacity reaches 0 (defaults to true)
    className: "some-css-class-name",
    id: "some-id",
  },
};
```

---

### style

React component style object to be added to the lottie animation's container element, not the lottie animation element.

---

### width

---

### height

---

### isClickToPauseDisabled

`boolean` to indicate component if it should be paused when component being clicked

---

### isStopped

`boolean`

---

### onComplete

`function` callback that going to be called when lottie completed the animation

---

### className

`string` class that going to be used for container

---

### isPaused

`boolean`

---

### segments

`array` consists of 2 points where the animations should be started and ended

---

### speed

`number` used for the animation speed

---

### direction

direction going to be `1` or `-1`. `1` for normal animation direction, `-1` for the reverse direction

---

## References

- [react-lottie](https://github.com/chenqingspring/react-lottie)
- [jarretmoses's comment](https://github.com/chenqingspring/react-lottie/pull/120#issuecomment-894373857)
- [React hooks](https://reactjs.org/docs/hooks-intro.html)
- [lottie-web](https://github.com/airbnb/lottie-web)
- [lottie-web's issue](https://github.com/airbnb/lottie-web/issues/1184)

## Finally

Any kind of contribution, help, advice and criticism will always be welcomed.

---

[MIT License](./LICENSE) © Permadi Afrian
