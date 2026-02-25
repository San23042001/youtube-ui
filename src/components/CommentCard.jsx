import React, { useState } from "react";
import Avatar from "./Avatar";
import { IconThumbUp, IconThumbDown, IconPin } from "./Icons";
import { useLikeDislike } from "../hooks";
import { formatCount } from "../utility/Helpers";

/**
 * Single comment row with like/dislike and collapsible replies.
 *
 * @param {{ id, author, initials, avatarColor, text, likes, time, replyCount, pinned }} comment
 * @param {boolean} hasBorderTop
 */
export default function CommentCard({ comment, hasBorderTop = true }) {
  const { liked, disliked, toggleLike, toggleDislike } = useLikeDislike();
  const [showReplies, setShowReplies] = useState(false);
  const displayLikes = comment.likes + (liked ? 1 : 0);

  return (
    <div style={{ ...styles.wrapper, borderTop: hasBorderTop ? "1px solid #2a2a2a" : "none" }}>
      {/* Pinned badge */}
      {comment.pinned && (
        <div style={styles.pinnedRow}>
          <IconPin size={12} />
          <span style={styles.pinnedLabel}>Pinned by Sony LIV</span>
        </div>
      )}

      <div style={styles.row}>
        <Avatar initials={comment.initials} color={comment.avatarColor} size="md" />

        <div style={styles.body}>
          {/* Author + time */}
          <div style={styles.metaRow}>
            <span style={styles.author}>{comment.author}</span>
            <span style={styles.time}>{comment.time}</span>
          </div>

          {/* Text */}
          <p style={styles.text}>{comment.text}</p>

          {/* Actions */}
          <div style={styles.actions}>
            {/* Like */}
            <button
              style={{ ...styles.reactionBtn, color: liked ? "#fff" : "#aaa" }}
              onClick={toggleLike}
              aria-label="Like comment"
              aria-pressed={liked}
            >
              <IconThumbUp size={14} filled={liked} color={liked ? "#fff" : "#aaa"} />
              <span>{formatCount(displayLikes)}</span>
            </button>

            {/* Dislike */}
            <button
              style={{ ...styles.reactionBtn, color: disliked ? "#fff" : "#aaa" }}
              onClick={toggleDislike}
              aria-label="Dislike comment"
              aria-pressed={disliked}
            >
              <IconThumbDown size={14} filled={disliked} color={disliked ? "#fff" : "#aaa"} />
            </button>

            {/* Reply */}
            <button style={styles.replyBtn}>Reply</button>
          </div>

          {/* Expand replies */}
          {comment.replyCount > 0 && (
            <>
              <button
                style={styles.repliesToggle}
                onClick={() => setShowReplies((v) => !v)}
              >
                {showReplies ? "▲" : "▼"} {comment.replyCount} replies
              </button>

              {showReplies && (
                <div style={styles.repliesPlaceholder} className="anim-fade">
                  <p style={styles.repliesNote}>Replies would be loaded here from static data.</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    padding: "16px 0",
    animation: "fadeSlideUp 0.3s ease both",
  },
  pinnedRow: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
    paddingLeft: 48,
  },
  pinnedLabel: {
    color: "#aaa",
    fontSize: 12,
  },
  row: {
    display: "flex",
    gap: 12,
  },
  body: {
    flex: 1,
    minWidth: 0,
  },
  metaRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  author: {
    fontSize: 13,
    fontWeight: 600,
    color: "#f1f1f1",
  },
  time: {
    fontSize: 12,
    color: "#aaa",
  },
  text: {
    fontSize: 14,
    lineHeight: 1.55,
    color: "#ddd",
    marginBottom: 8,
    wordBreak: "break-word",
  },
  actions: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  reactionBtn: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    fontSize: 12,
    fontWeight: 500,
    background: "transparent",
    border: "none",
    cursor: "pointer",
    transition: "color 0.15s ease",
  },
  replyBtn: {
    fontSize: 13,
    fontWeight: 600,
    color: "#aaa",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: "4px 8px",
    borderRadius: 4,
    transition: "color 0.15s ease, background 0.15s ease",
  },
  repliesToggle: {
    marginTop: 10,
    fontSize: 13,
    fontWeight: 700,
    color: "#3ea6ff",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: "4px 0",
    transition: "opacity 0.15s ease",
  },
  repliesPlaceholder: {
    marginTop: 10,
    paddingLeft: 12,
    borderLeft: "2px solid #333",
  },
  repliesNote: {
    color: "#555",
    fontSize: 13,
  },
};