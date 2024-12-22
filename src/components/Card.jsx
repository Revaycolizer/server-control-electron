"ise client"

import { useState } from "react";

const Card = ({ children, className }) => {
  // State to track the cursor position relative to the card
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });

  // Function to handle mouse movement over the card
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHoverPosition({
      x: e.clientX - rect.left, // Cursor X relative to the card
      y: e.clientY - rect.top, // Cursor Y relative to the card
      width: rect.width,
      height: rect.height,
    });
  };

  // Function to clear hover position on mouse leave
  const clearHoverPosition = () => {
    setHoverPosition({ x: 0, y: 0, width: 0, height: 0 });
  };

  // Function to calculate the closest corner based on the cursor position
  const getClosestCorner = () => {
    const { x, y, width, height } = hoverPosition;

    if (x === 0 && y === 0) return "none"; // No hover, no corner highlight

    const distances = {
      topLeft: Math.sqrt(x ** 2 + y ** 2),
      topRight: Math.sqrt((width - x) ** 2 + y ** 2),
      bottomLeft: Math.sqrt(x ** 2 + (height - y) ** 2),
      bottomRight: Math.sqrt((width - x) ** 2 + (height - y) ** 2),
    };

    // Find the closest corner
    const closestCorner = Object.keys(distances).reduce((a, b) =>
      distances[a] < distances[b] ? a : b
    );

    return closestCorner;
  };

  // Dynamic gradient styles based on closest corner
  const closestCorner = getClosestCorner();
  const gradientStyles = {
    topLeft:
      closestCorner === "topLeft"
        ? "radial-gradient(circle at top left, rgba(72, 180, 97, 0.6), transparent 35%)"
        : "none",
    topRight:
      closestCorner === "topRight"
        ? "radial-gradient(circle at top right, rgba(72, 180, 97, 0.6), transparent 35%)"
        : "none",
    bottomLeft:
      closestCorner === "bottomLeft"
        ? "radial-gradient(circle at bottom left, rgba(72, 180, 97, 0.6), transparent 35%)"
        : "none",
    bottomRight:
      closestCorner === "bottomRight"
        ? "radial-gradient(circle at bottom right, rgba(72, 180, 97, 0.6), transparent 35%)"
        : "none",
  };

  return (
    <div
      className={`relative bg-white w-full dark:bg-neutral-900 overflow-hidden shadow-sm sm:rounded-lg mx-auto sm:px-6 lg:px-8 mb-3 mt-2 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={clearHoverPosition}
      style={{
        position: "relative",
        transition:
          "background-image 0.9s ease-in-out, background-color 0.9s ease-in-out", // Smooth transition for background
        backgroundImage: gradientStyles[closestCorner], // Applying gradient to the closest corner
        backgroundSize: "cover",
      }}
    >
      <div className="p-6 text-neutral-900 dark:text-neutral-100">
        {children}
      </div>
    </div>
  );
};

export default Card;
