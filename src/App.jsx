import React from "react";
import VideoPlayer from "./components/VideoPlayer";
import VideoInfo from "./components/VideoInfo";
import Description from "./components/Description";
import CommentSection from "./components/CommentSection";
import SuggestedSidebar from "./components/SuggestedSidebar";
import { VIDEO, COMMENTS, SUGGESTED_VIDEOS } from "./data/videoData";
import { useIsMobile } from "./hooks";
import "./styles/global.css";

export default function App() {
  const isMobile = useIsMobile(1024);

  return (
    <div style={styles.page}>
      {/* Video player spans full content width */}
      <VideoPlayer />

      {/* Main content area */}
      <div style={{ ...styles.layout, flexDirection: isMobile ? "column" : "row" }}>
        {/* ── Left / Main column ── */}
        <main style={styles.mainCol}>
          <VideoInfo video={VIDEO} />

          <Description
            text={VIDEO.description}
            views={VIDEO.views}
            publishedAt={VIDEO.publishedAt}
            tags={VIDEO.tags}
          />

          <CommentSection comments={COMMENTS} />
        </main>

        {/* ── Right / Sidebar ── */}
        <div style={{ ...styles.sideCol, width: isMobile ? "100%" : 402 }}>
          <SuggestedSidebar videos={SUGGESTED_VIDEOS} />
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    background: "#0f0f0f",
    minHeight: "100vh",
    color: "#f1f1f1",
    fontFamily: "var(--font-sans)",
  },
  layout: {
    display: "flex",
    maxWidth: 1280,
    margin: "0 auto",
    padding: "16px 16px 0",
    gap: 24,
    alignItems: "flex-start",
  },
  mainCol: {
    flex: "1 1 0",
    minWidth: 0,
    animation: "fadeSlideUp 0.4s ease both",
  },
  sideCol: {
    flexShrink: 0,
  },
};