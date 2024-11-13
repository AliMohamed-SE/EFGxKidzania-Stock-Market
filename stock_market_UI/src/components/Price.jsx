import clsx from "clsx";
import React from "react";

const Price = ({ price, styles, textStyles }) => {
  return (
    <span className={clsx("relative font-semibold", textStyles)}>
      {price}{" "}
      <img src="/images/KidZosicon.svg" alt="Kidzos coins" className={styles} />
    </span>
  );
};

export default Price;
