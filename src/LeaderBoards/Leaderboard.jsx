import {
  ref,
  orderByChild,
  limitToFirst,
  limitToLast,
  getDatabase,
  query,
} from "firebase/database";
import { get } from "firebase/database";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  Customized,
} from "recharts";
import { useState, useEffect } from "react";
import styles from "./Leaderboard.module.css";

// const app = initializeApp(firebaseConfig);

const CHART_COLORS = {
  gold: "#FFD700", // Gold for 1st place
  silver: "#FF8C00", // Orange for 2nd place
  bronze: "#FFA07A", // Light salmon for 3rd place
  gridLines: "#f0f0f0", // Light grey for grid
};

const Leaderboard = () => {
  const db = getDatabase();
  const [leaderBoardData, setLeaderBoardData] = useState([]);

  useEffect(() => {
    const fetchLeaderBoardData = async () => {
      const leaderboardRef = ref(db, "leaderBoard");
      const top5Query = query(
        leaderboardRef,
        orderByChild("maxScore"),
        limitToLast(3)
      );

      try {
        const snapshot = await get(top5Query);
        const top3Entries = Object.entries(snapshot.val() || {})
          .map(([id, data]) => ({
            name: id,
            score: data.maxScore,
          }))
          .reverse();
        setLeaderBoardData(top3Entries);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      }
    };

    fetchLeaderBoardData();
  }, [db]);

  const renderCrown = ({ chartX, chartY, dataIndex }) => {
    const crownSize = 30; // Set the crown size
    if (dataIndex === 0) {
      return (
        <svg
          x={chartX - crownSize / 2} // Center the crown
          y={chartY - crownSize - 10} // Place above the bar
          width={crownSize}
          height={crownSize}
          viewBox="0 0 256 256"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 74.434 78.507 H 15.566 c -0.484 0 -0.899 -0.348 -0.984 -0.824 L 7.676 38.959 C 3.537 39.208 0 35.872 0 31.734 c 0 -3.991 3.247 -7.238 7.238 -7.238 s 7.238 3.247 7.238 7.238 c 0 0.965 -0.196 1.92 -0.573 2.809 l 17.022 10.26 l 9.99 -20.101 c -1.967 -1.339 -3.154 -3.547 -3.154 -5.971 c 0 -3.991 3.247 -7.238 7.238 -7.238 s 7.238 3.247 7.238 7.238 c 0 2.374 -1.148 4.557 -3.054 5.903 l 10.313 19.909 l 16.599 -10.001 c -0.376 -0.889 -0.572 -1.844 -0.572 -2.808 c 0 -3.991 3.247 -7.238 7.238 -7.238 S 89 27.743 89 31.734 c 0 4.138 -3.536 7.477 -7.677 7.225 l -6.905 38.723 C 75.333 78.159 74.918 78.507 74.434 78.507 z"
            fill="#FFD700"
          />
        </svg>
      );
    }
    return null;
  };

  return (
    <div className={styles.container}>
      {/* Left Column */}
      <div className={`${styles.column} ${styles.leftColumn}`}>
        <h3 className={styles.title}>Keep Practicing!</h3>
        <p className={styles.subtitle}>
          Challenge yourself to reach the top of the leaderboard! 🚀
        </p>
        <p>Regular practice will help you:</p>
        <ul className={styles.list}>
          <li className={styles.listItem}>🎯 Improve your quiz scores</li>
          <li className={styles.listItem}>📚 Master new concepts</li>
          <li className={styles.listItem}>🏆 Compete with other learners</li>
        </ul>
      </div>

      {/* Middle Column - Chart */}
      <div className={`${styles.column} ${styles.middleColumn}`}>
        <h2 className={styles.title}>Top 3 Leaderboard</h2>
        {leaderBoardData.length > 0 ? (
          <BarChart
            width={500}
            height={300}
            data={leaderBoardData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={CHART_COLORS.gridLines}
            />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              cursor={{ fill: "rgba(255, 140, 0, 0.1)" }} // Light orange hover effect
            />
            <Legend />
            <Bar dataKey="score" animationDuration={1500}>
              {leaderBoardData.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={
                    index === 0
                      ? CHART_COLORS.gold
                      : index === 1
                      ? CHART_COLORS.silver
                      : CHART_COLORS.bronze
                  }
                />
              ))}
            </Bar>
            <Customized component={(props) => renderCrown({ ...props })} />
          </BarChart>
        ) : (
          <p>Loading Leaderboard...</p>
        )}
      </div>

      {/* Right Column */}
      <div className={`${styles.column} ${styles.rightColumn}`}>
        <h3 className={styles.title}>How it Works</h3>
        <p className={styles.subtitle}>
          The leaderboard shows the top 3 highest scores from all players.
        </p>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            🥇 Gold bar represents the highest score
          </li>
          <li className={styles.listItem}>
            👥 Scores are updated in real-time
          </li>
          <li className={styles.listItem}>
            📈 Only your best score is displayed
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Leaderboard;
1;

//ONLY QUERY THROGH THE TOP 5 USERS??
