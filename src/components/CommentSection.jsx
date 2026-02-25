import React, { useState, useRef } from "react";
import CommentCard from "./CommentCard";
import Avatar from "./Avatar";
import { IconSort } from "./Icons";
import { SORT_OPTIONS } from "../data/videoData";

const TOTAL_COMMENT_COUNT = 6235; // static display count

/**
 * Full comments section: header, input field, sort menu, and comment list.
 *
 * @param {{ comments: Array }} props
 */
export default function CommentSection({ comments }) {
  const [sortOption, setSortOption] = useState(SORT_OPTIONS[0]);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

  function handleSortSelect(option) {
    setSortOption(option);
    setShowSortMenu(false);
  }

  if (!comments || comments.length === 0) {
    return (
      <div style={styles.empty}>
        <p style={styles.emptyText}>No comments yet. Be the first to comment!</p>
      </div>
    );
  }

  return (
    <section style={styles.wrapper} aria-label="Comments">
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.heading}>
          <h2 style={styles.title}>Comments</h2>
          <span style={styles.count}>{TOTAL_COMMENT_COUNT.toLocaleString()}</span>
        </div>

        {/* Sort selector */}
        <div style={styles.sortWrapper}>
          <button
            style={styles.sortBtn}
            onClick={() => setShowSortMenu((v) => !v)}
            aria-haspopup="listbox"
            aria-expanded={showSortMenu}
          >
            <IconSort size={16} />
            <span>{sortOption}</span>
          </button>

          {showSortMenu && (
            <div style={styles.sortMenu} role="listbox" aria-label="Sort comments">
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  role="option"
                  aria-selected={sortOption === opt}
                  style={{
                    ...styles.sortItem,
                    color: sortOption === opt ? "#fff" : "#aaa",
                  }}
                  onClick={() => handleSortSelect(opt)}
                >
                  {sortOption === opt && <span style={{ marginRight: 8 }}>✓</span>}
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Comment input */}
      <div style={styles.inputRow}>
        <Avatar initials="ME" color="#3ea6ff" size="md" />
        <div style={styles.inputWrapper}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Add a comment…"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => setInputFocused(true)}
            onBlur={() => !inputValue && setInputFocused(false)}
            style={{
              ...styles.input,
              borderBottomColor: inputFocused ? "#fff" : "#3d3d3d",
            }}
            aria-label="Add a comment"
          />
          {inputFocused && (
            <div style={styles.inputActions} className="anim-fade">
              <button style={styles.cancelBtn} onClick={() => { setInputValue(""); setInputFocused(false); }}>
                Cancel
              </button>
              <button
                style={{
                  ...styles.submitBtn,
                  opacity: inputValue.trim() ? 1 : 0.5,
                  cursor: inputValue.trim() ? "pointer" : "default",
                }}
                disabled={!inputValue.trim()}
              >
                Comment
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Comment list */}
      <div>
        {comments.map((comment, index) => (
          <CommentCard
            key={comment.id}
            comment={comment}
            hasBorderTop={index !== 0}
          />
        ))}
      </div>

      {/* Load more */}
      <button style={styles.loadMoreBtn} aria-label="Load more comments">
        Load more comments
      </button>
    </section>
  );
}

const styles = {
  wrapper: {
    paddingBottom: 48,
  },
  empty: {
    padding: "24px 0",
  },
  emptyText: {
    color: "#aaa",
    fontSize: 14,
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  heading: {
    display: "flex",
    alignItems: "baseline",
    gap: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 600,
    color: "#f1f1f1",
  },
  count: {
    fontSize: 14,
    color: "#aaa",
  },
  sortWrapper: {
    position: "relative",
  },
  sortBtn: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "transparent",
    color: "#f1f1f1",
    padding: "6px 10px",
    borderRadius: 4,
    fontSize: 14,
    fontWeight: 500,
    cursor: "pointer",
    transition: "background 0.15s ease",
    border: "none",
  },
  sortMenu: {
    position: "absolute",
    right: 0,
    top: "110%",
    background: "#282828",
    borderRadius: 8,
    padding: "8px 0",
    zIndex: 100,
    minWidth: 168,
    boxShadow: "0 4px 24px rgba(0,0,0,0.6)",
  },
  sortItem: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    padding: "10px 20px",
    background: "transparent",
    fontSize: 14,
    fontWeight: 500,
    cursor: "pointer",
    transition: "background 0.15s ease",
    textAlign: "left",
    border: "none",
  },
  inputRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 24,
  },
  inputWrapper: {
    flex: 1,
  },
  input: {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: "1px solid",
    color: "#f1f1f1",
    fontSize: 14,
    padding: "8px 0",
    outline: "none",
    transition: "border-color 0.2s ease",
  },
  inputActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 8,
    marginTop: 8,
  },
  cancelBtn: {
    padding: "8px 14px",
    borderRadius: 9999,
    fontSize: 14,
    fontWeight: 600,
    color: "#f1f1f1",
    background: "transparent",
    cursor: "pointer",
    border: "none",
    transition: "background 0.15s ease",
  },
  submitBtn: {
    padding: "8px 14px",
    borderRadius: 9999,
    fontSize: 14,
    fontWeight: 600,
    color: "#0f0f0f",
    background: "#3ea6ff",
    cursor: "pointer",
    border: "none",
    transition: "opacity 0.2s ease",
  },
  loadMoreBtn: {
    display: "block",
    margin: "16px auto 0",
    background: "transparent",
    color: "#3ea6ff",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    padding: "10px 20px",
    borderRadius: 9999,
    border: "1px solid #3d3d3d",
    transition: "border-color 0.15s ease",
  },
};