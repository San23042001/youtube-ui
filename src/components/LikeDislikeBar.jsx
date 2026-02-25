
import { IconThumbUp, IconThumbDown } from "./Icons";
import { formatCount } from "../utility/Helpers";

/**
 * Pill-shaped like/dislike control.
 *
 * @param {boolean} liked
 * @param {boolean} disliked
 * @param {number}  likeCount  - raw number (will be formatted)
 * @param {Function} onLike
 * @param {Function} onDislike
 */
export default function LikeDislikeBar({ liked, disliked, likeCount, onLike, onDislike }) {
  return (
    <div style={styles.wrapper} role="group" aria-label="Like or dislike video">
      {/* Like */}
      <button
        style={{
          ...styles.btn,
          color: liked ? "#fff" : "#aaa",
          background: liked ? "rgba(255,255,255,0.12)" : "transparent",
        }}
        onClick={onLike}
        aria-label={`Like — ${formatCount(likeCount)} likes`}
        aria-pressed={liked}
      >
        <IconThumbUp size={20} filled={liked} color={liked ? "#fff" : "#aaa"} />
        <span style={styles.count}>{formatCount(likeCount)}</span>
      </button>

      {/* Divider */}
      <span style={styles.divider} aria-hidden="true" />

      {/* Dislike */}
      <button
        style={{
          ...styles.btn,
          color: disliked ? "#fff" : "#aaa",
          background: disliked ? "rgba(255,255,255,0.12)" : "transparent",
          paddingRight: 14,
        }}
        onClick={onDislike}
        aria-label="Dislike"
        aria-pressed={disliked}
      >
        <IconThumbDown size={20} filled={disliked} color={disliked ? "#fff" : "#aaa"} />
      </button>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    alignItems: "center",
    background: "#272727",
    borderRadius: 9999,
    overflow: "hidden",
  },
  btn: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "8px 14px",
    transition: "background 0.15s ease",
    borderRadius: 0,
  },
  count: {
    fontSize: 14,
    fontWeight: 500,
    color: "inherit",
  },
  divider: {
    width: 1,
    height: 24,
    background: "#444",
    flexShrink: 0,
  },
};