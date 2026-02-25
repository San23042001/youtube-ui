
import { IconPlay } from "./Icons";

export default function VideoPlayer({ progress = 0.011, currentTime = "0:13", duration = "19:15" }) {
  return (
    <div style={styles.wrapper}>
      {/* Poster / centre play icon */}
      <div style={styles.poster}>
        <IconPlay size={64} />
        <p style={styles.label}>Video Player Area</p>
      </div>

      {/* Progress bar */}
      <div style={styles.progressTrack}>
        <div style={{ ...styles.progressFill, width: `${progress * 100}%` }} />
        <div style={{ ...styles.progressDot, left: `${progress * 100}%` }} />
      </div>

      {/* Controls bar */}
      <div style={styles.controls}>
        <span style={styles.time}>{currentTime} / {duration}</span>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    width: "100%",
    maxWidth: 896,
    margin: "0 auto",
    aspectRatio: "16 / 9",
    background: "#1a1a1a",
    display: "flex",
    flexDirection: "column",
  },
  poster: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  label: {
    color: "rgba(255,255,255,0.35)",
    fontSize: 14,
  },
  progressTrack: {
    width: "100%",
    height: 4,
    background: "#333",
    position: "relative",
  },
  progressFill: {
    height: "100%",
    background: "#ff0000",
  },
  progressDot: {
    width: 12,
    height: 12,
    borderRadius: "50%",
    background: "#ff0000",
    position: "absolute",
    top: "50%",
    transform: "translate(-50%, -50%)",
  },
  controls: {
    background: "#000",
    padding: "6px 16px",
  },
  time: {
    color: "#aaa",
    fontSize: 13,
  },
};