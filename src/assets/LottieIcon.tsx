import React from "react";
import Lottie from "lottie-react";

interface LottieIconProps {
  animationData: any;
  size?: string;
}

// Separate component for Lottie animations to avoid hooks errors
const LottieIcon: React.FC<LottieIconProps> = ({
  animationData,
  size = "18px",
}) => {
  return (
    <div style={{ width: size, height: size, marginRight: "5px" }}>
      <Lottie
        animationData={animationData}
        loop={true}
        autoplay={true}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default LottieIcon;
