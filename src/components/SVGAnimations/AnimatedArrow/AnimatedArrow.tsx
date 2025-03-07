import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/all';
import './AnimatedArrow.css';

gsap.registerPlugin(MotionPathPlugin);

const AnimatedArrow: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const maskPathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0)

  useEffect(() => {
    if (svgRef.current && pathRef.current && maskPathRef.current) {
      const pathLength = pathRef.current.getTotalLength();
      setPathLength(pathLength);

      gsap.set(maskPathRef.current, {
        strokeDasharray: pathLength ,
        strokeDashoffset: pathLength * 2
      });

      const tl = gsap.timeline();

      tl.to(maskPathRef.current, {
        strokeDashoffset: pathLength,
        duration: 2,
        ease: 'power2.out'
      });

      tl.to(
        '#arrow',
        {
          duration: 2,
          ease: 'power2.out',
          motionPath: {
            path: '#motionPath',
            align: '#motionPath',
            autoRotate: 90,
            alignOrigin: [0.5, 0.5]
          }
        },
        '<'
      );
    }
  }, []);

  return (
    <div className="w-full flex items-center pl-16">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="300"
        height="25vh"
        viewBox="300 0 150 500"
        ref={svgRef}
      >
        <path
          id="motionPath"
          ref={pathRef}
          d="M228.14370727539062,44.311378479003906C233.31735961914063,62.13173736572266,223.83233032226562,103.32934112548828,249.70059204101562,118.56287384033203C275.5688537597656,133.7964065551758,314.3712414550781,91.97604827880859,335.9281311035156,107.78443145751953C357.48502075195313,123.59281463623047,319.1137805175781,162.58682495117188,339.5209655761719,184.43113708496094C359.92815063476564,206.27544921875,394.51495849609375,176.09580810546876,420.95806884765625,198.80239868164062C447.40117919921875,221.5089892578125,442.80238647460936,259.784443359375,449.7005920410156,279.04193115234375"
          fill="none"
          strokeWidth="12"
          stroke="rgb(var(--uwu))"
          strokeLinecap="round"
          strokeDasharray="25 23"
          strokeOpacity="1"
        ></path>
        <path
          ref={maskPathRef}
          d="M228.14370727539062,44.311378479003906C233.31735961914063,62.13173736572266,223.83233032226562,103.32934112548828,249.70059204101562,118.56287384033203C275.5688537597656,133.7964065551758,314.3712414550781,91.97604827880859,335.9281311035156,107.78443145751953C357.48502075195313,123.59281463623047,319.1137805175781,162.58682495117188,339.5209655761719,184.43113708496094C359.92815063476564,206.27544921875,394.51495849609375,176.09580810546876,420.95806884765625,198.80239868164062C447.40117919921875,221.5089892578125,442.80238647460936,259.784443359375,449.7005920410156,279.04193115234375"
          fill="none"
          strokeWidth="15"
          stroke="rgb(var(--light))"
          strokeLinecap="round"
          strokeOpacity="1"
          strokeDasharray={pathLength}
          strokeDashoffset={0}
        ></path>
        <path
          id="arrow"
          d="M207.784423828125,268.2634582519531C212.77444458007812,262.47503662109375,228.74251302083334,233.53292846679688,237.72454833984375,233.53292846679688C246.70658365885416,233.53292846679688,257.6846211751302,262.47503662109375,261.6766357421875,268.2634582519531"
          fill="none"
          strokeWidth="12"
          stroke="rgb(var(--uwu))"
          strokeLinecap="round"
        ></path>
      </svg>
    </div>
  );
};

export default AnimatedArrow;
