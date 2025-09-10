import { memo } from "react";


export const ProgressBar = memo(({ progress }) => (
  <div className="fixed top-0 left-0 w-full h-1 bg-gray-200/50 z-50">
    <div 
      className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-150"
      style={{ width: `${progress}%` }}
    />
  </div>
));