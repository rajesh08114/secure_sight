import React from 'react';

type ThreatIconsProps = {
  type: string;
  size?: number;
};

const ThreatIcons = ({ type, size = 24 }: ThreatIconsProps) => {
  const getIconColor = () => {
    switch (type) {
      case 'Gun Threat':
        return 'text-red-500';
      case 'Unauthorised Access':
        return 'text-yellow-500';
      case 'Face Recognised':
        return 'text-blue-500';
      case 'Suspicious Package':
        return 'text-orange-500';
      case 'Perimeter Breach':
        return 'text-purple-500';
      default:
        return 'text-gray-500';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'Gun Threat':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6L6 18" />
            <path d="M6 6l12 12" />
          </svg>
        );
      case 'Unauthorised Access':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        );
      case 'Face Recognised':
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="10" r="3" />
            <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
          </svg>
        );
      default:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        );
    }
  };

  return <div className={`${getIconColor()}`}>{getIcon()}</div>;
};

export default ThreatIcons;