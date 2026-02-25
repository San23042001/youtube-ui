import React, { useState } from "react";

const COLLAPSED_HEIGHT = 68;

export default function Description({ text, views, publishedAt, tags = [] }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      style={{ ...styles.box, cursor: expanded ? "default" : "pointer" }}
      onClick={() => !expanded && setExpanded(true)}
      role={expanded ? undefined : "button"}
      aria-expanded={expanded}
      aria-label={expanded ? undefined : "Expand description"}
    >
      {/* Views · date · hashtags */}
      <div style={styles.meta}>
        <span style={styles.metaBold}>{views} views</span>
        <span style={styles.metaBold}>{publishedAt}</span>
        {tags.map((tag) => (
          <span key={tag} style={styles.tag}>{tag}</span>
        ))}
      </div>

      <div style={{ position: "relative" }}>
        <div
          style={{
            ...styles.body,
            maxHeight: expanded ? "2000px" : `${COLLAPSED_HEIGHT}px`,
            overflow: "hidden",
            transition: "max-height 0.35s ease",
          }}
        >
          {text.split("\n").map((line, i) => (
            <React.Fragment key={i}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </div>

        
        {!expanded && (
          <div
            style={styles.fadeOverlay}
            aria-hidden="true"
          />
        )}
      </div>

     
      <button
        style={styles.toggleBtn}
        onClick={(e) => { e.stopPropagation(); setExpanded((v) => !v); }}
      >
        {expanded ? "Show less" : "...more"}
      </button>
    </div>
  );
}

const styles = {
  box: {
    background: "#272727",
    borderRadius: 12,
    padding: "12px 16px 14px",
    marginBottom: 20,
  },
  meta: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  metaBold: {
    fontSize: 14,
    fontWeight: 600,
    color: "#f1f1f1",
  },
  tag: {
    fontSize: 14,
    fontWeight: 500,
    color: "#3ea6ff",
    cursor: "pointer",
  },
  body: {
    fontSize: 14,
    lineHeight: 1.6,
    color: "#ddd",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
  },
  fadeOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 28,
    background: "linear-gradient(to bottom, transparent, #272727)",
    pointerEvents: "none",
  },
  toggleBtn: {
    display: "block",
    marginTop: 8,
    background: "none",
    color: "#f1f1f1",
    fontWeight: 700,
    fontSize: 14,
    padding: 0,
    border: "none",
    outline: "none",
    cursor: "pointer",
    WebkitAppearance: "none",
    appearance: "none",
  },
};