import { useState, useRef, useEffect } from "react";

// ─── Static Data ───────────────────────────────────────────────────────────────
const VIDEO_DATA = {
  id: "v001",
  title: "Heizen के Founders ने क्यों नहीं किया Anupam का Offer Accept? | Shark Tank India S5",
  views: "1.7M",
  publishedAt: "11 months ago",
  likes: 52400,
  dislikes: 820,
  description: `Heizen के Founders ने Shark Tank India Season 5 में एक bold decision लिया — Anupam का offer reject करके। आखिर क्यों? इस video में देखिए पूरी कहानी।

Shark Tank India Season 5 में Heizen की team ने अपना innovative product pitch किया। Anupam Mittal ने एक attractive offer दिया, लेकिन founders ने उसे accept नहीं किया। जानिए क्या थी उनकी thinking और strategy।

🔥 Key Highlights:
• Heizen का unique business model
• Anupam का offer और उसकी terms
• Founders का bold decision और reasoning
• Sharks की reactions

📺 Watch full episodes on Sony LIV: https://www.sonyliv.com

#SharkTankIndia #SharkTankIndiaS5 #Heizen #Anupam #SonyLIV`,
  channel: {
    name: "Sony LIV",
    handle: "@SonyLIV",
    subscribers: "25.7M",
    avatar: "SL",
    verified: true,
  },
};

const COMMENTS_DATA = [
  {
    id: "c1",
    author: "Rahul Sharma",
    avatar: "RS",
    avatarColor: "#FF6B35",
    text: "Founders ka decision bilkul sahi tha! Anupam ka offer mein terms bahut strict the. 💯",
    likes: 4821,
    time: "10 months ago",
    replies: 142,
    pinned: true,
  },
  {
    id: "c2",
    author: "Priya Nair",
    avatar: "PN",
    avatarColor: "#7C3AED",
    text: "This is why I love Shark Tank India. Such bold moves. Heizen definitely knew their valuation! 🚀",
    likes: 3290,
    time: "10 months ago",
    replies: 87,
    pinned: false,
  },
  {
    id: "c3",
    author: "Vikram Bose",
    avatar: "VB",
    avatarColor: "#059669",
    text: "Anupam looked genuinely impressed even after rejection. That says a lot about Heizen's confidence.",
    likes: 2175,
    time: "9 months ago",
    replies: 53,
    pinned: false,
  },
  {
    id: "c4",
    author: "Anjali Mehta",
    avatar: "AM",
    avatarColor: "#DC2626",
    text: "Sony LIV always brings the best clips! Full episode was even better 🔥",
    likes: 1834,
    time: "9 months ago",
    replies: 31,
    pinned: false,
  },
  {
    id: "c5",
    author: "Deepak Joshi",
    avatar: "DJ",
    avatarColor: "#D97706",
    text: "The reasoning behind their rejection was so clear and articulate. Founders knew exactly what they wanted.",
    likes: 1102,
    time: "8 months ago",
    replies: 19,
    pinned: false,
  },
];

const SUGGESTED_VIDEOS = [
  {
    id: "sv1",
    title: "'Tripole Gears' के revenue numbers सुनकर Namita ने कहा,...",
    channel: "Shark Tank India",
    views: "1.7M views",
    time: "11 months ago",
    duration: "19:06",
    badge: "NEW SEASON",
    thumb: "#FF6B35",
  },
  {
    id: "sv2",
    title: "इन Pitchers से क्यों Irritate हुए Sharks? | Shark Tank India S5 |...",
    channel: "Sony LIV",
    views: "178K views",
    time: "4 days ago",
    duration: "18:44",
    badge: "New",
    thumb: "#7C3AED",
  },
  {
    id: "sv3",
    title: "Iyer kyu kar raha hai jethalal ka piccha?! | FULL MOVIE | Taara...",
    channel: "Taarak Mehta Ka Ooltah Chashmah",
    views: "2M views",
    time: "3 weeks ago",
    duration: "53:40",
    badge: null,
    thumb: "#059669",
  },
  {
    id: "sv4",
    title: "Pita ki khwaish ke liye bete ne uthaya itna bada qadam 😱 |...",
    channel: "Best Reality Show",
    views: "679 views",
    time: "2 days ago",
    duration: "8:44",
    badge: "New",
    thumb: "#DC2626",
  },
  {
    id: "sv5",
    title: "AJ Styles' farewell tour: WWE Vlog",
    channel: "WWE",
    views: "599K views",
    time: "4 days ago",
    duration: "22:02",
    badge: "New",
    thumb: "#D97706",
  },
];

// ─── Utility ───────────────────────────────────────────────────────────────────
function formatLikes(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return (n / 1000).toFixed(1) + "K";
  return n.toString();
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function LikeDislikeButton({ liked, disliked, likes, onLike, onDislike }) {
  return (
    <div style={styles.likeDislikeWrapper}>
      <button
        style={{ ...styles.likeBtn, background: liked ? "#ffffff20" : "transparent", color: liked ? "#fff" : "#aaa" }}
        onClick={onLike}
        title="Like"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill={liked ? "#fff" : "none"} stroke="currentColor" strokeWidth="2">
          <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
          <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
        </svg>
        <span style={styles.likeCount}>{formatLikes(likes)}</span>
      </button>
      <div style={styles.likeDivider} />
      <button
        style={{ ...styles.dislikeBtn, background: disliked ? "#ffffff20" : "transparent", color: disliked ? "#fff" : "#aaa" }}
        onClick={onDislike}
        title="Dislike"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill={disliked ? "#fff" : "none"} stroke="currentColor" strokeWidth="2">
          <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3H10z" />
          <path d="M17 2h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17" />
        </svg>
      </button>
    </div>
  );
}

function ActionButton({ icon, label, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      style={{ ...styles.actionBtn, background: hovered ? "#ffffff15" : "transparent" }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title={label}
    >
      {icon}
      <span style={styles.actionBtnLabel}>{label}</span>
    </button>
  );
}

function Description({ text, channelName }) {
  const [expanded, setExpanded] = useState(false);
  const preview = text.slice(0, 200);

  return (
    <div style={styles.descBox} onClick={() => !expanded && setExpanded(true)}>
      <div
        style={{
          ...styles.descText,
          maxHeight: expanded ? "2000px" : "80px",
          overflow: "hidden",
          transition: "max-height 0.4s ease",
        }}
      >
        {text.split("\n").map((line, i) => (
          <span key={i}>
            {line}
            <br />
          </span>
        ))}
      </div>
      {!expanded && (
        <div style={styles.descGradient}>
          <button style={styles.showMoreBtn} onClick={(e) => { e.stopPropagation(); setExpanded(true); }}>
            ...more
          </button>
        </div>
      )}
      {expanded && (
        <button style={styles.showLessBtn} onClick={() => setExpanded(false)}>
          Show less
        </button>
      )}
    </div>
  );
}

function CommentCard({ comment, isFirst }) {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  return (
    <div style={{ ...styles.commentCard, borderTop: isFirst ? "none" : "1px solid #2a2a2a" }}>
      {comment.pinned && (
        <div style={styles.pinnedBadge}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#aaa" style={{ marginRight: 4 }}>
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <span style={{ color: "#aaa", fontSize: 12 }}>Pinned by Sony LIV</span>
        </div>
      )}
      <div style={styles.commentRow}>
        <div style={{ ...styles.commentAvatar, background: comment.avatarColor }}>
          {comment.avatar}
        </div>
        <div style={styles.commentBody}>
          <div style={styles.commentMeta}>
            <span style={styles.commentAuthor}>{comment.author}</span>
            <span style={styles.commentTime}>{comment.time}</span>
          </div>
          <p style={styles.commentText}>{comment.text}</p>
          <div style={styles.commentActions}>
            <button
              style={{ ...styles.commentLikeBtn, color: liked ? "#fff" : "#aaa" }}
              onClick={() => { setLiked(!liked); setDisliked(false); }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
                <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
              </svg>
              <span>{formatLikes(comment.likes + (liked ? 1 : 0))}</span>
            </button>
            <button
              style={{ ...styles.commentLikeBtn, color: disliked ? "#fff" : "#aaa" }}
              onClick={() => { setDisliked(!disliked); setLiked(false); }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill={disliked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3H10z" />
                <path d="M17 2h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17" />
              </svg>
            </button>
            {comment.replies > 0 && (
              <button
                style={styles.repliesBtn}
                onClick={() => setShowReplies(!showReplies)}
              >
                <span style={{ color: "#3ea6ff", fontWeight: 600 }}>
                  {showReplies ? "▲" : "▼"} {comment.replies} replies
                </span>
              </button>
            )}
          </div>
          {showReplies && (
            <div style={styles.repliesPlaceholder}>
              <p style={{ color: "#666", fontSize: 13, margin: 0 }}>Replies loaded from static data...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SuggestedVideo({ video }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{ ...styles.suggestedCard, background: hovered ? "#1a1a1a" : "transparent" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ ...styles.suggestedThumb, background: video.thumb }}>
        <span style={styles.thumbDuration}>{video.duration}</span>
        {video.badge && <span style={styles.thumbBadge}>{video.badge}</span>}
      </div>
      <div style={styles.suggestedInfo}>
        <p style={styles.suggestedTitle}>{video.title}</p>
        <p style={styles.suggestedChannel}>{video.channel} ✓</p>
        <p style={styles.suggestedMeta}>{video.views} · {video.time}</p>
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function YouTubeDetails() {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showComments, setShowComments] = useState(true);
  const [sortComments, setSortComments] = useState("Top comments");
  const [isMobile, setIsMobile] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleShare = () => {
    navigator.clipboard?.writeText("https://youtu.be/example").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const likeCount = VIDEO_DATA.likes + (liked ? 1 : 0);

  return (
    <div style={styles.root}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0f0f0f; color: #fff; font-family: 'YouTube Sans', 'Roboto', sans-serif; }
        button { border: none; cursor: pointer; font-family: inherit; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #1a1a1a; }
        ::-webkit-scrollbar-thumb { background: #555; border-radius: 4px; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.05); } }
        .sub-btn:hover { background: #cc0000 !important; }
        .sub-btn-active:hover { background: #3a3a3a !important; }
      `}</style>

      {/* FAKE VIDEO PLAYER PLACEHOLDER */}
      <div style={styles.playerPlaceholder}>
        <div style={styles.playerInner}>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="rgba(255,255,255,0.3)">
            <circle cx="12" cy="12" r="10" />
            <polygon points="10 8 16 12 10 16 10 8" fill="white" />
          </svg>
          <p style={{ color: "rgba(255,255,255,0.5)", marginTop: 12, fontSize: 14 }}>Video Player Area</p>
        </div>
        <div style={styles.playerProgressBar}>
          <div style={styles.playerProgress} />
          <div style={styles.playerDot} />
        </div>
        <div style={styles.playerControls}>
          <span style={{ color: "#aaa", fontSize: 13 }}>0:13 / 19:15</span>
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <div style={{ ...styles.layout, flexDirection: isMobile ? "column" : "row" }}>
        
        {/* LEFT: Video Details */}
        <div style={styles.mainCol}>
          
          {/* Title */}
          <h1 style={styles.videoTitle}>{VIDEO_DATA.title}</h1>

          {/* Channel Row + Actions */}
          <div style={styles.metaRow}>
            <div style={styles.channelSection}>
              <div style={styles.channelAvatar}>{VIDEO_DATA.channel.avatar}</div>
              <div style={styles.channelInfo}>
                <div style={styles.channelNameRow}>
                  <span style={styles.channelName}>{VIDEO_DATA.channel.name}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#aaa" style={{ marginLeft: 4 }}>
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#aaa" strokeWidth="2" fill="none" />
                  </svg>
                </div>
                <span style={styles.subCount}>{VIDEO_DATA.channel.subscribers} subscribers</span>
              </div>
              <button
                className={subscribed ? "sub-btn-active" : "sub-btn"}
                style={{
                  ...styles.subscribeBtn,
                  background: subscribed ? "#2a2a2a" : "#fff",
                  color: subscribed ? "#aaa" : "#0f0f0f",
                }}
                onClick={() => setSubscribed(!subscribed)}
              >
                {subscribed ? "✓ Subscribed" : "Subscribe"}
              </button>
            </div>

            <div style={styles.actionsRow}>
              <LikeDislikeButton
                liked={liked}
                disliked={disliked}
                likes={likeCount}
                onLike={() => { setLiked(!liked); setDisliked(false); }}
                onDislike={() => { setDisliked(!disliked); setLiked(false); }}
              />

              <ActionButton
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                  </svg>
                }
                label={copied ? "Copied!" : "Share"}
                onClick={handleShare}
              />

              <ActionButton
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                }
                label="Download"
                onClick={() => {}}
              />

              <ActionButton
                icon={
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" />
                  </svg>
                }
                label=""
                onClick={() => {}}
              />
            </div>
          </div>

          {/* Views + Description Box */}
          <div style={styles.descWrapper}>
            <div style={styles.viewsMeta}>
              <span>{VIDEO_DATA.views} views</span>
              <span style={{ marginLeft: 8 }}>{VIDEO_DATA.publishedAt}</span>
              <span style={{ ...styles.hashTag, marginLeft: 8 }}>#SharkTankIndia</span>
              <span style={styles.hashTag}>#SonyLIV</span>
              <span style={styles.hashTag}>#Heizen</span>
            </div>
            <Description text={VIDEO_DATA.description} />
          </div>

          {/* Comments */}
          <div style={styles.commentsSection}>
            <div style={styles.commentsHeader}>
              <div style={styles.commentsTitle}>
                <span style={styles.commentsTitleText}>Comments</span>
                <span style={styles.commentsCount}>{(COMMENTS_DATA.length * 1247).toLocaleString()}</span>
              </div>
              <div style={styles.commentsControls}>
                <button
                  style={styles.sortBtn}
                  onClick={() => setShowSortMenu(!showSortMenu)}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" />
                    <line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" />
                    <line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
                  </svg>
                  <span style={{ fontSize: 14, fontWeight: 500 }}>{sortComments}</span>
                </button>
                {showSortMenu && (
                  <div style={styles.sortMenu}>
                    {["Top comments", "Newest first"].map(opt => (
                      <button
                        key={opt}
                        style={{ ...styles.sortMenuItem, color: sortComments === opt ? "#fff" : "#aaa" }}
                        onClick={() => { setSortComments(opt); setShowSortMenu(false); }}
                      >
                        {sortComments === opt && <span style={{ marginRight: 8 }}>✓</span>}
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Comment Input */}
            <div style={styles.commentInputRow}>
              <div style={{ ...styles.commentAvatar, background: "#3ea6ff", flexShrink: 0 }}>ME</div>
              <input
                type="text"
                placeholder="Add a comment..."
                style={styles.commentInput}
              />
            </div>

            {/* Comments List */}
            {showComments && (
              <div style={{ animation: "fadeIn 0.3s ease" }}>
                {COMMENTS_DATA.map((c, i) => (
                  <CommentCard key={c.id} comment={c} isFirst={i === 0} />
                ))}
                <button style={styles.loadMoreBtn}>
                  Load more comments
                </button>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Suggested Videos */}
        {!isMobile && (
          <div style={styles.sideCol}>
            <div style={styles.sideFilters}>
              {["All", "From Sony LIV", "Shark Tank", "Presentations"].map((f, i) => (
                <button
                  key={f}
                  style={{
                    ...styles.filterChip,
                    background: i === 0 ? "#fff" : "#2a2a2a",
                    color: i === 0 ? "#0f0f0f" : "#fff",
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
            {SUGGESTED_VIDEOS.map(v => (
              <SuggestedVideo key={v.id} video={v} />
            ))}
          </div>
        )}

        {/* Mobile: suggested below */}
        {isMobile && (
          <div style={styles.mobileSuggested}>
            <div style={styles.sideFilters}>
              {["All", "From Sony LIV", "Shark Tank"].map((f, i) => (
                <button
                  key={f}
                  style={{
                    ...styles.filterChip,
                    background: i === 0 ? "#fff" : "#2a2a2a",
                    color: i === 0 ? "#0f0f0f" : "#fff",
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
            {SUGGESTED_VIDEOS.map(v => (
              <SuggestedVideo key={v.id} video={v} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────────
const styles = {
  root: {
    background: "#0f0f0f",
    minHeight: "100vh",
    color: "#fff",
    fontFamily: "'YouTube Sans', 'Roboto', -apple-system, sans-serif",
  },
  // Player
  playerPlaceholder: {
    width: "100%",
    maxWidth: 896,
    margin: "0 auto",
    aspectRatio: "16/9",
    background: "#1a1a1a",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  playerInner: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  playerProgressBar: {
    width: "100%",
    height: 4,
    background: "#333",
    position: "relative",
  },
  playerProgress: {
    width: "1.1%",
    height: "100%",
    background: "#ff0000",
  },
  playerDot: {
    width: 12,
    height: 12,
    borderRadius: "50%",
    background: "#ff0000",
    position: "absolute",
    top: -4,
    left: "1.1%",
  },
  playerControls: {
    width: "100%",
    padding: "6px 16px",
    background: "#000",
  },
  // Layout
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
    animation: "fadeIn 0.4s ease",
  },
  sideCol: {
    width: 402,
    flexShrink: 0,
  },
  mobileSuggested: {
    width: "100%",
  },
  // Title
  videoTitle: {
    fontSize: "clamp(16px, 2.2vw, 20px)",
    fontWeight: 600,
    lineHeight: 1.4,
    color: "#fff",
    marginBottom: 12,
  },
  // Meta row
  metaRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: 12,
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  channelSection: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    flexWrap: "wrap",
  },
  channelAvatar: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    background: "linear-gradient(135deg, #0066ff, #00aaff)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: 13,
    flexShrink: 0,
  },
  channelInfo: {
    display: "flex",
    flexDirection: "column",
  },
  channelNameRow: {
    display: "flex",
    alignItems: "center",
  },
  channelName: {
    fontWeight: 600,
    fontSize: 15,
    color: "#fff",
  },
  subCount: {
    fontSize: 12,
    color: "#aaa",
  },
  subscribeBtn: {
    padding: "9px 18px",
    borderRadius: 20,
    fontWeight: 600,
    fontSize: 14,
    transition: "all 0.2s",
    cursor: "pointer",
  },
  // Actions row
  actionsRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
  },
  likeDislikeWrapper: {
    display: "flex",
    alignItems: "center",
    background: "#272727",
    borderRadius: 20,
    overflow: "hidden",
  },
  likeBtn: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "8px 16px",
    color: "#fff",
    fontSize: 14,
    fontWeight: 500,
    transition: "background 0.2s",
    borderRight: "none",
  },
  likeCount: {
    fontSize: 14,
    fontWeight: 500,
  },
  likeDivider: {
    width: 1,
    height: 24,
    background: "#444",
  },
  dislikeBtn: {
    display: "flex",
    alignItems: "center",
    padding: "8px 14px",
    fontSize: 14,
    transition: "background 0.2s",
  },
  actionBtn: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "8px 14px",
    borderRadius: 20,
    color: "#fff",
    fontSize: 14,
    fontWeight: 500,
    transition: "background 0.2s",
  },
  actionBtnLabel: {
    fontSize: 14,
    fontWeight: 500,
    whiteSpace: "nowrap",
  },
  // Description
  descWrapper: {
    background: "#272727",
    borderRadius: 12,
    padding: "12px 14px",
    marginBottom: 24,
    cursor: "pointer",
  },
  viewsMeta: {
    fontSize: 14,
    fontWeight: 600,
    marginBottom: 8,
    color: "#fff",
  },
  hashTag: {
    color: "#3ea6ff",
    fontSize: 14,
    marginLeft: 4,
  },
  descBox: {
    position: "relative",
  },
  descText: {
    fontSize: 14,
    lineHeight: 1.6,
    color: "#ddd",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
  },
  descGradient: {
    position: "absolute",
    bottom: 0,
    right: 0,
    background: "linear-gradient(to right, transparent, #272727 40%)",
    paddingLeft: 40,
  },
  showMoreBtn: {
    background: "transparent",
    color: "#fff",
    fontWeight: 600,
    fontSize: 14,
    padding: 0,
    cursor: "pointer",
  },
  showLessBtn: {
    background: "transparent",
    color: "#fff",
    fontWeight: 600,
    fontSize: 14,
    marginTop: 8,
    cursor: "pointer",
    display: "block",
  },
  // Comments
  commentsSection: {
    paddingBottom: 40,
  },
  commentsHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  commentsTitle: {
    display: "flex",
    alignItems: "baseline",
    gap: 12,
  },
  commentsTitleText: {
    fontSize: 18,
    fontWeight: 600,
  },
  commentsCount: {
    fontSize: 14,
    color: "#aaa",
  },
  commentsControls: {
    position: "relative",
  },
  sortBtn: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "transparent",
    color: "#fff",
    padding: "6px 10px",
    borderRadius: 4,
    fontSize: 14,
    fontWeight: 500,
    cursor: "pointer",
    transition: "background 0.2s",
  },
  sortMenu: {
    position: "absolute",
    right: 0,
    top: "110%",
    background: "#282828",
    borderRadius: 8,
    padding: "8px 0",
    zIndex: 100,
    minWidth: 160,
    boxShadow: "0 4px 24px rgba(0,0,0,0.5)",
  },
  sortMenuItem: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    padding: "10px 20px",
    background: "transparent",
    fontSize: 14,
    fontWeight: 500,
    cursor: "pointer",
    transition: "background 0.2s",
    textAlign: "left",
  },
  commentInputRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 24,
  },
  commentAvatar: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: 12,
    flexShrink: 0,
  },
  commentInput: {
    flex: 1,
    background: "transparent",
    border: "none",
    borderBottom: "1px solid #333",
    color: "#fff",
    fontSize: 14,
    padding: "8px 0",
    outline: "none",
    transition: "border-color 0.2s",
  },
  commentCard: {
    padding: "16px 0",
    animation: "fadeIn 0.3s ease",
  },
  pinnedBadge: {
    display: "flex",
    alignItems: "center",
    marginBottom: 8,
    paddingLeft: 48,
  },
  commentRow: {
    display: "flex",
    gap: 12,
  },
  commentBody: {
    flex: 1,
  },
  commentMeta: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  commentAuthor: {
    fontSize: 13,
    fontWeight: 600,
    color: "#fff",
  },
  commentTime: {
    fontSize: 12,
    color: "#aaa",
  },
  commentText: {
    fontSize: 14,
    lineHeight: 1.5,
    color: "#ddd",
    marginBottom: 8,
  },
  commentActions: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  commentLikeBtn: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    background: "transparent",
    fontSize: 12,
    cursor: "pointer",
    transition: "color 0.2s",
  },
  repliesBtn: {
    background: "transparent",
    fontSize: 13,
    cursor: "pointer",
    padding: "4px 0",
  },
  repliesPlaceholder: {
    marginTop: 12,
    paddingLeft: 12,
    borderLeft: "2px solid #333",
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
    borderRadius: 20,
    transition: "background 0.2s",
    border: "1px solid #333",
  },
  // Sidebar
  sideFilters: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  filterChip: {
    padding: "6px 12px",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 500,
    cursor: "pointer",
    transition: "opacity 0.2s",
    whiteSpace: "nowrap",
  },
  suggestedCard: {
    display: "flex",
    gap: 8,
    padding: "8px",
    borderRadius: 8,
    cursor: "pointer",
    transition: "background 0.2s",
    marginBottom: 4,
  },
  suggestedThumb: {
    width: 168,
    height: 94,
    borderRadius: 8,
    flexShrink: 0,
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  thumbDuration: {
    position: "absolute",
    bottom: 4,
    right: 6,
    background: "rgba(0,0,0,0.8)",
    color: "#fff",
    fontSize: 12,
    fontWeight: 600,
    padding: "2px 4px",
    borderRadius: 4,
  },
  thumbBadge: {
    position: "absolute",
    top: 4,
    left: 4,
    background: "#cc0000",
    color: "#fff",
    fontSize: 10,
    fontWeight: 700,
    padding: "2px 6px",
    borderRadius: 3,
    textTransform: "uppercase",
  },
  suggestedInfo: {
    flex: 1,
    minWidth: 0,
  },
  suggestedTitle: {
    fontSize: 13,
    fontWeight: 500,
    lineHeight: 1.4,
    color: "#fff",
    marginBottom: 4,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
  suggestedChannel: {
    fontSize: 12,
    color: "#aaa",
    marginBottom: 2,
  },
  suggestedMeta: {
    fontSize: 12,
    color: "#aaa",
  },
};
