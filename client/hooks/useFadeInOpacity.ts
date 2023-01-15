import React from 'react';

/**
 * A custom hook that will wait for a short period of time and then fade-in an element. Returns an object with the opacity and transition properties that can be passed or spread into the style prop of a component.
 * @param wait The amount of time to wait before fading in the element, in milliseconds. @default 200
 * @param duration The duration of the fade-in animation, in milliseconds. @default 700
 * @returns
 */
const useFadeInOpacity = (wait: number = 200, duration: number = 700) => {
  const [opacity, setOpacity] = React.useState(0);

  React.useEffect(() => {
    const timerId = setTimeout(() => {
      setOpacity(1);
    }, wait);

    return () => {
      clearTimeout(timerId);
    };
  }, []);

  return {
    opacity,
    transition: `opacity ${duration}ms ease-in-out`,
  };
};

export default useFadeInOpacity;
