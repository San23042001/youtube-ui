import React, { useState } from "react";
import SuggestedVideoCard from "./SuggestedVideoCard";
import { FILTER_CHIPS } from "../data/videoData";

/**
 * Right-side panel: filter chips + suggested video list.
 *
 * @param {{ videos: Array }} props
 */
export default function SuggestedSidebar({ videos }) {
  const [activeChip, setActiveChip] = useState(FILTER_CHIPS[0]);

  return (
    <aside style={styles.wrapper} aria-label="Suggested videos">
      {/* Filter chips */}
      <div style={styles.chips} role="list">
        {FILTER_CHIPS.map((chip) => (
          <button
            key={chip}
            role="listitem"
            style={{
              ...styles.chip,
              background: activeChip === chip ? "#fff" : "#2a2a2a",
              color: activeChip === chip ? "#0f0f0f" : "#fff",
            }}
            onClick={() => setActiveChip(chip)}
            aria-pressed={activeChip === chip}
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Video list */}
      {videos.map((video) => (
        <SuggestedVideoCard key={video.id} video={video} />
      ))}
    </aside>
  );
}

const styles = {
  wrapper: {
    width: "100%",
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  chip: {
    padding: "6px 12px",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 500,
    cursor: "pointer",
    border: "none",
    transition: "background 0.15s ease, color 0.15s ease",
    whiteSpace: "nowrap",
  },
};