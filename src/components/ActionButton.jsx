import React, { useState } from "react";

/**
 * Generic pill-style action button (Share, Download, …).
 *
 * @param {React.ReactNode} icon
 * @param {string}          label
 * @param {Function}        onClick
 * @param {string}          [ariaLabel]
 */
export default function ActionButton({ icon, label, onClick, ariaLabel }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      style={{
        ...styles.btn,
        background: hovered ? "rgba(255,255,255,0.1)" : "#272727",
      }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={ariaLabel ?? label}
      title={ariaLabel ?? label}
    >
      {icon}
      {label && <span style={styles.label}>{label}</span>}
    </button>
  );
}

const styles = {
  btn: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "8px 14px",
    borderRadius: 9999,
    color: "#fff",
    fontSize: 14,
    fontWeight: 500,
    transition: "background 0.15s ease",
    whiteSpace: "nowrap",
  },
  label: {
    fontSize: 14,
    fontWeight: 500,
  },
};