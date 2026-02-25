
const sizeMap = {
  sm: { width: 32, height: 32, fontSize: 11 },
  md: { width: 36, height: 36, fontSize: 12 },
  lg: { width: 40, height: 40, fontSize: 13 },
};

/**
 * Circular avatar showing user/channel initials.
 *
 * @param {string}  initials   - 1–2 letter abbreviation
 * @param {string}  color      - Background color
 * @param {"sm"|"md"|"lg"} size
 */
export default function Avatar({ initials = "?", color = "#3ea6ff", size = "md" }) {
  const dim = sizeMap[size] ?? sizeMap.md;

  return (
    <div
      style={{
        ...dim,
        borderRadius: "50%",
        background: color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        fontSize: dim.fontSize,
        color: "#fff",
        flexShrink: 0,
        userSelect: "none",
      }}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}