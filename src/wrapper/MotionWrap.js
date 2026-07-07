import React from 'react';

/** Plain wrapper — avoids Framer Motion hydration leaving sections at opacity: 0 */
const MotionWrap = (Component, classNames) => function HOC() {
  return (
    <div className={`${classNames} app__flex`}>
      <Component />
    </div>
  );
};

export default MotionWrap;
