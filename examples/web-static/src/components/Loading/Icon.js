import React from 'react';

const View = ({ style }) => {
  return (
    <div style={{ ...style }}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" className="lds-dual-ring" style={{ background: 'none', width: '100%', height: '100%' }}>
        <circle cx="50" cy="50" ng-attr-r="{{config.radius}}" ng-attr-stroke-width="{{config.width}}" ng-attr-stroke="{{config.stroke}}" ng-attr-stroke-dasharray="{{config.dasharray}}" fill="none" strokeLinecap="round" r="30" strokeWidth="6" stroke="#00aeec" strokeDasharray="47.12388980384689 47.12388980384689" transform="rotate(299.916 50 50)">
          <animateTransform attributeName="transform" type="rotate" calcMode="linear" values="0 50 50;360 50 50" keyTimes="0;1" dur="1.5s" begin="0s" repeatCount="indefinite"></animateTransform>
        </circle>
      </svg>
    </div>
  );
};

export default View;
