import React, { useState } from "react";
import { IconVerified } from "./Icons";

/**
 * Single suggested video card in the sidebar.
 *
 * @param {{ id, title, channel, views, time, duration, badge, thumbColor, verified }} video
 */
export default function SuggestedVideoCard({ video }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        ...styles.card,
        background: hovered ? "#1a1a1a" : "transparent",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="button"
      tabIndex={0}
      aria-label={`Watch: ${video.title}`}
    >
      {/* Thumbnail */}
      <div style={{ ...styles.thumb, background: video.thumbColor }}>
        {video.badge && <span style={styles.badge}>{video.badge}</span>}
        <span style={styles.duration}>{video.duration}</span>
      </div>

      {/* Info */}
      <div style={styles.info}>
        <p style={styles.title}>{video.title}</p>
        <p style={styles.channel}>
          {video.channel}
          {video.verified && (
            <IconVerified size={12} color="#aaa" />
          )}
        </p>
        <p style={styles.meta}>{video.views} · {video.time}</p>
      </div>
    </div>
  );
}

const styles = {
  card: {
    display: "flex",
    gap: 8,
    padding: 8,
    borderRadius: 8,
    cursor: "pointer",
    transition: "background 0.15s ease",
    marginBottom: 4,
  },
  thumb: {
    width: 168,
    height: 94,
    borderRadius: 8,
    flexShrink: 0,
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: 4,
    left: 4,
    background: "#cc0000",
    color: "#fff",
    fontSize: 10,
    fontWeight: 700,
    padding: "2px 5px",
    borderRadius: 3,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  duration: {
    position: "absolute",
    bottom: 4,
    right: 6,
    background: "rgba(0,0,0,0.85)",
    color: "#fff",
    fontSize: 12,
    fontWeight: 600,
    padding: "2px 5px",
    borderRadius: 4,
  },
  info: {
    flex: 1,
    minWidth: 0,
    paddingTop: 2,
  },
  title: {
    fontSize: 13,
    fontWeight: 500,
    lineHeight: 1.4,
    color: "#f1f1f1",
    marginBottom: 4,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
  channel: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    fontSize: 12,
    color: "#aaa",
    marginBottom: 2,
  },
  meta: {
    fontSize: 12,
    color: "#aaa",
  },
};