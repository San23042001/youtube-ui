
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
      <div style={{ ...styles.layout, flexDirection: isMobile ? "column" : "row" }}>

        <main style={styles.mainCol}>
          <VideoPlayer />

          <div style={styles.detailPad}>
            <VideoInfo video={VIDEO} />

            <Description
              text={VIDEO.description}
              views={VIDEO.views}
              publishedAt={VIDEO.publishedAt}
              tags={VIDEO.tags}
            />

            <CommentSection comments={COMMENTS} />
          </div>
        </main>


        <aside style={{ ...styles.sideCol, width: isMobile ? "100%" : 402 }}>
          <SuggestedSidebar videos={SUGGESTED_VIDEOS} />
        </aside>

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
    maxWidth: 1440,
    margin: "0 auto",
    padding: "20px 24px 0",
    gap: 24,
    alignItems: "flex-start",
  },
  mainCol: {
    flex: "1 1 0",
    minWidth: 0,                     
    animation: "fadeSlideUp 0.4s ease both",
  },
  detailPad: {
    padding: "12px 0 0",
  },
  sideCol: {
    flexShrink: 0,
    position: "sticky",              
    top: 20,
    maxHeight: "calc(100vh - 40px)",
    overflowY: "auto",
    paddingBottom: 20,
    scrollbarWidth: "none",
    msOverflowStyle: "none",
  },
};