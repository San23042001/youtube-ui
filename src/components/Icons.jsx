import React from "react";

const base = { display: "block", flexShrink: 0 };

export function IconThumbUp({ size = 20, filled = false, color = "currentColor" }) {
  return (
    <svg style={base} width={size} height={size} viewBox="0 0 24 24"
      fill={filled ? color : "none"} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
      <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
    </svg>
  );
}

export function IconThumbDown({ size = 20, filled = false, color = "currentColor" }) {
  return (
    <svg style={base} width={size} height={size} viewBox="0 0 24 24"
      fill={filled ? color : "none"} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3H10z" />
      <path d="M17 2h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17" />
    </svg>
  );
}

export function IconShare({ size = 18 }) {
  return (
    <svg style={base} width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

export function IconDownload({ size = 18 }) {
  return (
    <svg style={base} width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

export function IconMore({ size = 20 }) {
  return (
    <svg style={base} width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5"  cy="12" r="1" />
    </svg>
  );
}

export function IconVerified({ size = 14, color = "#aaa" }) {
  return (
    <svg style={base} width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

export function IconSort({ size = 16 }) {
  return (
    <svg style={base} width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8"    y1="6"  x2="21" y2="6"  />
      <line x1="8"    y1="12" x2="21" y2="12" />
      <line x1="8"    y1="18" x2="21" y2="18" />
      <line x1="3"    y1="6"  x2="3.01" y2="6"  />
      <line x1="3"    y1="12" x2="3.01" y2="12" />
      <line x1="3"    y1="18" x2="3.01" y2="18" />
    </svg>
  );
}

export function IconPlay({ size = 64 }) {
  return (
    <svg style={base} width={size} height={size} viewBox="0 0 24 24" fill="rgba(255,255,255,0.25)">
      <circle cx="12" cy="12" r="10" />
      <polygon points="10 8 16 12 10 16 10 8" fill="white" />
    </svg>
  );
}

export function IconPin({ size = 12 }) {
  return (
    <svg style={base} width={size} height={size} viewBox="0 0 24 24" fill="#aaa">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}