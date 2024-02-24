import React from "react";

interface LightModuleProps {
  colors: string[];
  volume: number;
}

const LightModule: React.FC<LightModuleProps> = ({ colors, volume }) => {
  const count = 4;
  const maxOpacity = 1; // Maximum allowed opacity

  const modules = [];
  for (let i = 0; i < count; i++) {
    const color = colors[i % colors.length];
    let opacity;

    // For element 0, set opacity to 1, regardless of volume
    if (i === 3) {
      opacity = 1;
    } else {
      // Adjust opacity for other elements based on volume level
      if (volume === 0) {
        opacity = 0; // All at 0% opacity if at 0% volume
      } else if (volume >= 100) {
        opacity = maxOpacity; // Set to maximum opacity if at 100% volume
      } else {
        const volumeStep = 25;
        const volumeThreshold = (count - i - 1) * volumeStep; // Threshold for current element

        if (volume >= volumeThreshold) {
          // If volume exceeds or is equal to the threshold for the current element, calculate opacity
          opacity = Math.min(
            maxOpacity,
            (volume - volumeThreshold) / volumeStep
          );
        } else {
          // Otherwise, set opacity to 0
          opacity = 0;
        }
      }
    }

    const boxShadowXs = `0px 0px 15px 5px rgba(${hexToRgb(color)}, ${opacity})`;
    const boxShadowSm = `0px 0px 15px 5px rgba(${hexToRgb(color)}, ${opacity})`;
    const boxShadowMd = `0px 0px 15px 5px rgba(${hexToRgb(color)}, ${opacity})`;
    const boxShadowLg = `0px 0px 15px 5px rgba(${hexToRgb(color)}, ${opacity})`;

    modules.push(
      <div
        key={i}
        className="aspect-square rounded-full mx-auto"
        style={{
          backgroundColor: `rgba(${hexToRgb(color)}, ${opacity})`,
          boxShadow: `var(--shadow-size-xs)`,
        }}
      >
        <div
          className="block sm:hidden lg:hidden md:hidden rounded-full w-5 h-5"
          style={{ boxShadow: boxShadowXs }}
        ></div>
        <div
          className="sm:block lg:hidden md:hidden hidden rounded-full w-7 h-7"
          style={{ boxShadow: boxShadowSm }}
        ></div>
        <div
          className="md:block lg:hidden sm:hidden hidden rounded-full w-10 h-10"
          style={{ boxShadow: boxShadowMd }}
        ></div>
        <div
          className="lg:block md:hidden sm:hidden hidden rounded-full w-10 h-10"
          style={{ boxShadow: boxShadowLg }}
        ></div>
      </div>
    );
  }

  return <>{modules}</>;
};

// Function to convert hex color to rgb format
function hexToRgb(hex: string) {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `${r}, ${g}, ${b}`;
}

export default LightModule;
