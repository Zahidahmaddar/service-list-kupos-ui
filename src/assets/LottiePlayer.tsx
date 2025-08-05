import React from "react";

if (typeof document !== "undefined") {
  if (!document.getElementById("lottie-player-script")) {
    const script = document.createElement("script");
    script.id = "lottie-player-script";
    script.src =
      "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js";
    script.async = true;
    document.head.appendChild(script);
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "lottie-player": any;
    }
  }
}

interface LottiePlayerProps {
  animationData: any;
  background?: string;
  speed?: string;
  width?: string;
  height?: string;
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
}

const LottiePlayer: React.FC<LottiePlayerProps> = ({
  animationData,
  background = "transparent",
  speed = "1",
  width = "20px",
  height = "20px",
  loop = true,
  autoplay = true,
  className = "",
}) => {
  return (
    <div className={`lottie-container ${className}`}>
      {typeof window !== "undefined" && (
        <div
          dangerouslySetInnerHTML={{
            __html: `<lottie-player 
              src='${JSON.stringify(animationData)}' 
              background="${background}" 
              speed="${speed}" 
              style="width: ${width}; height: ${height};" 
              ${loop ? "loop" : ""}
              ${autoplay ? "autoplay" : ""}>
            </lottie-player>`,
          }}
        />
      )}
    </div>
  );
};

export default LottiePlayer;
