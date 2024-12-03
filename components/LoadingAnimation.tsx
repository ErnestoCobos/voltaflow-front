import React, { FC } from 'react';

/**
 * LoadingAnimation component
 *
 * This component renders a loading animation with four bouncing elements.
 * The animation is smooth and slightly translucent.
 *
 * @returns {JSX.Element} The rendered loading animation component.
 */
const LoadingAnimation: FC = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-white">
      <div className="relative w-32 h-32">
        <div className="absolute bottom-0 left-0 w-16 h-24 bg-purple-600 animate-bounce-smooth" style={{ animationDelay: "0ms", opacity: 0.8 }} />
        <div className="absolute bottom-0 left-16 w-16 h-32 bg-black animate-bounce-smooth" style={{ animationDelay: "150ms", opacity: 0.8 }} />
        <div className="absolute bottom-0 right-0 w-16 h-16 bg-yellow-400 animate-bounce-smooth" style={{ animationDelay: "300ms", borderTopRightRadius: '100%', opacity: 0.8 }} />
        <div className="absolute top-0 left-0 w-16 h-16 bg-orange-400 animate-bounce-smooth" style={{ animationDelay: "450ms", borderBottomLeftRadius: '100%', opacity: 0.8 }} />
      </div>
      <style jsx>{`
        @keyframes bounce-smooth {
          0%, 100% {
            transform: translateY(0);
            animation-timing-function: ease-in;
          }
          50% {
            transform: translateY(-50%);
            animation-timing-function: ease-out;
          }
        }
        .animate-bounce-smooth {
          animation: bounce-smooth 1.5s infinite;
        }
      `}</style>
    </div>
  );
}

export default LoadingAnimation;