"use client";

import { FC, RefObject } from 'react';
import { motion } from "framer-motion";

interface IllustrationSectionProps {
    containerRef: RefObject<HTMLDivElement>;
    mousePosition: {
        x: number;
        y: number;
    };
    eyesLookingUp: boolean;
    isAnimating: boolean;
}

interface ShapeCharacterProps {
    className: string;
    calculateEyePosition: (baseX: number, baseY: number) => { x: number; y: number };
    withSmile?: boolean;
}

/**
 * Component representing a character shape with eyes and an optional smile.
 *
 * @param {string} className - The CSS class for styling the character.
 * @param {function} calculateEyePosition - Function to calculate the eye position based on base coordinates.
 * @param {boolean} [withSmile] - Optional flag to include a smile on the character.
 * @returns {JSX.Element} The rendered ShapeCharacter component.
 */
const ShapeCharacter: FC<ShapeCharacterProps> = ({ className, calculateEyePosition, withSmile }) => (
    <div className={`absolute ${className} rounded-lg flex flex-col items-center pt-4`}>
        <div className="flex gap-2 relative">
            <div className="w-7 h-7 bg-white rounded-full relative overflow-hidden">
                <motion.div
                    className="w-3.5 h-3.5 bg-black rounded-full absolute"
                    animate={{
                        x: calculateEyePosition(3.5, 3.5).x,
                        y: calculateEyePosition(3.5, 3.5).y,
                    }}
                />
            </div>
            <div className="w-7 h-7 bg-white rounded-full relative overflow-hidden">
                <motion.div
                    className="w-3.5 h-3.5 bg-black rounded-full absolute"
                    animate={{
                        x: calculateEyePosition(3.5, 3.5).x,
                        y: calculateEyePosition(3.5, 3.5).y,
                    }}
                />
            </div>
        </div>
        {withSmile && <div className="w-8 h-4 border-b-2 border-black rounded-b-full mt-1" />}
    </div>
);

const styles = `
  .cloud {
    position: absolute;
    background: white;
    border-radius: 999px;
    animation: float 20s infinite;
    z-index: 2;
    width: 80px;
    height: 50px;
  }

  @keyframes float {
    0% { transform: translateX(0px); }
    50% { transform: translateX(20px); }
    100% { transform: translateX(0px); }
  }

  .tower {
    position: absolute;
    bottom: 40px;
    left: 10%;
    width: 60px;
    height: 150px;
    z-index: 15;
    transform: rotate(-5deg);
  }

  .tower-main,
  .tower-top,
  .tower-roof {
    transform: rotate(5deg);
  }

  .tower-main {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 45px;
    height: 105px;
    background: #ffb5b5;
    border-radius: 8px 8px 0 0;
    box-shadow: inset -10px 0 15px -5px rgba(0,0,0,0.1);
  }

  .tower-top {
    position: absolute;
    bottom: 105px;
    left: 50%;
    transform: translateX(-50%);
    width: 52px;
    height: 30px;
    background: #ffc2c2;
    border-radius: 8px 8px 0 0;
    box-shadow: inset -10px 0 15px -5px rgba(0,0,0,0.1);
  }

  .tower-roof {
    position: absolute;
    bottom: 135px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 22px solid transparent;
    border-right: 22px solid transparent;
    border-bottom: 22px solid #ffd4d4;
  }

  .window {
    position: absolute;
    width: 12px;
    height: 16px;
    background: rgba(255,255,255,0.9);
    border-radius: 10px 10px 0 0;
    box-shadow: inset 0 -5px 10px -5px rgba(0,0,0,0.1);
    transform: rotate(5deg);
  }

  .window:nth-child(1) { top: 15px; left: 8px; }
  .window:nth-child(2) { top: 15px; right: 8px; }
  .window:nth-child(3) { top: 45px; left: 8px; }
  .window:nth-child(4) { top: 45px; right: 8px; }
  .window:nth-child(5) { top: 75px; left: 8px; }
  .window:nth-child(6) { top: 75px; right: 8px; }
`;


/**
 * Component representing an illustration section with animated elements.
 *
 * @param {RefObject<HTMLDivElement>} containerRef - Reference to the container element.
 * @param {Object} mousePosition - The current mouse position.
 * @param {number} mousePosition.x - The x-coordinate of the mouse position.
 * @param {number} mousePosition.y - The y-coordinate of the mouse position.
 * @param {boolean} eyesLookingUp - Flag indicating if the eyes should look up.
 * @param {boolean} isAnimating - Flag indicating if the section is animating.
 * @returns {JSX.Element} The rendered IllustrationSection component.
 */
export const IllustrationSection: FC<IllustrationSectionProps> = ({
                                                                      containerRef,
                                                                      mousePosition,
                                                                      eyesLookingUp,
                                                                      isAnimating
                                                                  }) => {
    /**
     * Function to calculate the eye position based on the base coordinates and mouse position.
     *
     * @param {number} baseX - The base x-coordinate.
     * @param {number} baseY - The base y-coordinate.
     * @returns {Object} The calculated eye position.
     * @returns {number} x - The x-coordinate of the eye position.
     * @returns {number} y - The y-coordinate of the eye position.
     */
    const calculateEyePosition = (baseX: number, baseY: number) => {
        if (eyesLookingUp) {
            return { x: baseX, y: baseY - 3 };
        }
        const dx = mousePosition.x - 0.5;
        const dy = mousePosition.y - 0.5;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 0.18;
        const scale = Math.min(distance / maxDistance, 1);
        const x = baseX + 3.6 * dx * scale;
        const y = baseY + 3.6 * dy * scale;
        return { x, y };
    };

    return (
        <motion.div
            className="hidden md:flex md:w-1/2 bg-gradient-to-b from-pink-100 to-orange-50
                 items-center justify-center p-12 relative overflow-hidden"
            animate={isAnimating ? { x: "-100%" } : { x: "0%" }}
            transition={{ duration: 0.5 }}
        >
            <style jsx>{styles}</style>

            <div className="absolute inset-0 overflow-hidden">
                {/* Medieval Tower */}
                <div className="tower">
                    <div className="tower-roof" />
                    <div className="tower-top">
                        <div className="window" />
                        <div className="window" />
                    </div>
                    <div className="tower-main">
                        {[...Array(6)].map((_, i) => (
                            <div key={`window-${i}`} className="window" />
                        ))}
                    </div>
                </div>

                {/* Animated Background Elements */}
                {[...Array(5)].map((_, i) => (
                    <div
                        key={`cloud-${i}`}
                        className="cloud"
                        style={{
                            animationDuration: `${22 + i * 3}s`,
                            top: `${10 + i * 10}%`,
                            left: i % 2 === 0 ? `${10 + i * 15}%` : undefined,
                            right: i % 2 !== 0 ? `${15 + i * 5}%` : undefined
                        }}
                    />
                ))}

                {/* Sun with Glow Effect */}
                <div className="absolute w-32 h-32 top-12 left-1/2 -translate-x-1/2">
                    <div className="absolute inset-0 bg-yellow-100 rounded-full animate-pulse" />
                    <div className="absolute inset-2 bg-white rounded-full" />
                </div>

                {/* Enhanced Hills with Gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-48 z-10">
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-r
                         from-pink-200 to-pink-300 rounded-full translate-y-16" />
                    <div className="absolute bottom-0 left-1/4 right-0 h-24 bg-gradient-to-r
                         from-pink-300 to-pink-200 rounded-full translate-y-8" />
                    <div className="absolute bottom-0 right-12 w-4 h-12 bg-pink-400 skew-x-12
                         shadow-lg" />
                </div>
            </div>

            {/* Interactive Geometric Shapes */}
            <div ref={containerRef} className="absolute bottom-4 left-1/2 -translate-x-1/2
                                       w-[400px] h-[300px] z-30">
                <div className="absolute left-1/2 bottom-0 -translate-x-1/2">
                    <ShapeCharacter
                        className="-translate-x-20 -translate-y-52 w-24 h-48 bg-purple-500"
                        calculateEyePosition={calculateEyePosition}
                    />
                    <ShapeCharacter
                        className="-translate-x-4 -translate-y-40 w-20 h-36 bg-gray-900"
                        calculateEyePosition={calculateEyePosition}
                    />
                    <ShapeCharacter
                        className="translate-x-12 -translate-y-36 w-24 h-32 bg-yellow-400 rounded-full"
                        calculateEyePosition={calculateEyePosition}
                        withSmile
                    />
                    <ShapeCharacter
                        className="-translate-x-8 -translate-y-20 w-32 h-16 bg-orange-400 rounded-t-full"
                        calculateEyePosition={calculateEyePosition}
                        withSmile
                    />
                </div>
            </div>
        </motion.div>
    );
};

export default IllustrationSection;