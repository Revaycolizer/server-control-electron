"use client"

import { useState } from "react";
import LinkButton from "./LinkButton";
import { useEffect } from "react";

const Hero = () => {
  const [showLine, setShowLine] = useState(false);
  useEffect(() => {
    setShowLine(true);
  }, []);
  return (
    <div className="relative w-full py-16 px-4 mt-10 ">
      {/* Centered Background mesh with radial gradient */}
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="w-[400px] h-[400px] bg-radial bg-gradient-radial from-customGreen via-transparent to-transparent opacity-40 rounded-full"></div>
      </div>

      <div className="relative max-w-7xl mx-auto text-center z-10">
        <h1 className="text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
          Innovating the{" "}
          {/* <span className="text-underline cool-underline cursor-pointer md:border-b-8 border-b-customGreenDark dark:border-b-customGreenLight transition-all ease-in-out hover:border-b-neutral-700 dark:hover:border-b-white">
            Future
          </span>{" "} */}

          <span className={"cool-underline "+(showLine?'show-underline':'')}>
            Future{"  "}
          </span>
          with Ekilie
        </h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto mb-8">
          At Ekilie, we are pioneers in shaping the digital landscape with our
          cutting-edge products:{" "}
          <span className="font-semibold">ekiliSense</span>,{" "}
          <span className="font-semibold">ekiliRelay</span>,{" "}
          <span className="font-semibold">ekiliConvo</span>, and{" "}
          <span className="font-semibold">Insights</span>. Join us in
          transforming {"tomorrow's"} technology.
        </p>
        <div className="mt-8">
          <LinkButton to="#explore">Discover Our Products</LinkButton>
        </div>
      </div>
    </div>
  );
};

export default Hero;
