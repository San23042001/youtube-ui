import React, { useState } from "react";

/**
 * Expandable video description box.
 *
 * @param {string}   text
 * @param {string}   views
 * @param {string}   publishedAt
 * @param {string[]} tags
 */
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
      {/* Views + date + tags */}
      <div style={styles.meta}>
        <span style={styles.metaText}>{views} views</span>
        <span style={styles.metaText}>{publishedAt}</span>
        {tags.map((tag) => (
          <span key={tag} style={styles.tag}>{tag}</span>
        ))}
      </div>

      {/* Description body */}
      <div
        style={{
          ...styles.body,
          maxHeight: expanded ? "2000px" : "76px",
          overflow: "hidden",
          transition: "max-height 0.4s ease",
        }}
      >
        {text.split("\n").map((line, i) => (
          <React.Fragment key={i}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </div>

      {/* Toggle buttons */}
      {!expanded && (
        <button
          style={styles.toggleBtn}
          onClick={(e) => { e.stopPropagation(); setExpanded(true); }}
        >
          ...more
        </button>
      )}
      {expanded && (
        <button
          style={styles.toggleBtn}
          onClick={() => setExpanded(false)}
        >
          Show less
        </button>
      )}
    </div>
  );
}

const styles = {
  box: {
    background: "#272727",
    borderRadius: 12,
    padding: "12px 14px",
    marginBottom: 24,
  },
  meta: {
    display: "flex",
    flexWrap: "wrap",
    gap: 6,
    alignItems: "center",
    marginBottom: 8,
  },
  metaText: {
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
  toggleBtn: {
    display: "block",
    marginTop: 6,
    background: "transparent",
    color: "#f1f1f1",
    fontWeight: 700,
    fontSize: 14,
    padding: 0,
    cursor: "pointer",
    border: "none",
  },
};