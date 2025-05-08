import React from "react";

const CircularProgress = ({ value = 50, size = 70, stroke = 8, image }) => {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  const getColorByValue = (val) => {
    if (val < 30) return "text-red-500";
    if (val > 30 && val < 60) return "text-yellow-500";
    if (val >= 60 && val < 85) return "text-orange-600";
    if (val > 85) return "text-green-500";
    return "text-blue-500"; // default
  };

  const colorClass = getColorByValue(value);

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} className="relative">
        {/* Background Circle */}
        <circle
          className="text-gray-300"
          strokeWidth={stroke}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Progress Circle */}
        <circle
          className={`${colorClass} transition-all duration-300`}
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Image in the center */}
        <image
          href={image}
          x={size / 2 - 16}
          y={size / 2 - 16}
          width="35"
          height="35"
          clipPath="circle(16px at center)"
        />
      </svg>
      {/* Value below the circle */}
      <span className={`mt-1 text-sm font-medium ${colorClass}`}>{value}%</span>
    </div>
  );
};

export default CircularProgress;
