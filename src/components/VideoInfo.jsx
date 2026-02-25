
import Avatar from "./Avatar";
import LikeDislikeBar from "./LikeDislikeBar";
import ActionButton from "./ActionButton";
import { IconVerified, IconShare, IconDownload, IconMore } from "./Icons";
import { useLikeDislike, useToggle } from "../hooks";
import {copyToClipboard } from "../utility/Helpers";

export default function VideoInfo({ video }) {
  const { liked, disliked, toggleLike, toggleDislike } = useLikeDislike();
  const [subscribed, toggleSubscribed] = useToggle(false);
  const [copied, triggerCopied] = useToggle(false, 2000);

  const likeCount = video.likes + (liked ? 1 : 0);

  function handleShare() {
    copyToClipboard("https://youtu.be/example", triggerCopied);
  }

  return (
    <div style={styles.wrapper}>
   
      <h1 style={styles.title}>{video.title}</h1>


      <div style={styles.metaRow}>
 
        <div style={styles.channelGroup}>
          <Avatar initials={video.channel.initials} color="#0066cc" size="lg" />

          <div style={styles.channelText}>
            <div style={styles.channelNameRow}>
              <span style={styles.channelName}>{video.channel.name}</span>
              {video.channel.verified && <IconVerified size={14} color="#aaa" />}
            </div>
            <span style={styles.subscribers}>{video.channel.subscribers} subscribers</span>
          </div>

          <button
            style={{
              ...styles.subscribeBtn,
              background: subscribed ? "#2a2a2a" : "#fff",
              color: subscribed ? "#aaa" : "#0f0f0f",
            }}
            onClick={toggleSubscribed}
            aria-label={subscribed ? "Unsubscribe" : "Subscribe to Sony LIV"}
          >
            {subscribed ? "✓ Subscribed" : "Subscribe"}
          </button>
        </div>

        {/* Action buttons */}
        <div style={styles.actionsGroup}>
          <LikeDislikeBar
            liked={liked}
            disliked={disliked}
            likeCount={likeCount}
            onLike={toggleLike}
            onDislike={toggleDislike}
          />

          <ActionButton
            icon={<IconShare size={18} />}
            label={copied ? "Copied!" : "Share"}
            onClick={handleShare}
          />

          <ActionButton
            icon={<IconDownload size={18} />}
            label="Download"
            onClick={() => {}}
          />

          <ActionButton
            icon={<IconMore size={20} />}
            label=""
            ariaLabel="More actions"
            onClick={() => {}}
          />
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    marginBottom: 12,
  },
  title: {
    fontSize: "clamp(16px, 2.2vw, 20px)",
    fontWeight: 600,
    lineHeight: 1.4,
    color: "#f1f1f1",
    marginBottom: 12,
  },
  metaRow: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  channelGroup: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    flexWrap: "wrap",
  },
  channelText: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  channelNameRow: {
    display: "flex",
    alignItems: "center",
    gap: 4,
  },
  channelName: {
    fontSize: 15,
    fontWeight: 600,
    color: "#f1f1f1",
  },
  subscribers: {
    fontSize: 12,
    color: "#aaa",
  },
  subscribeBtn: {
    padding: "9px 18px",
    borderRadius: 9999,
    fontWeight: 600,
    fontSize: 14,
    transition: "background 0.2s ease, color 0.2s ease",
    cursor: "pointer",
    border: "none",
  },
  actionsGroup: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
  },
};