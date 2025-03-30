"use client";

import React, { useState, useEffect } from "react";
import styles from "./TimeSlider.module.css";

export default function TimeSlider({ time, setTime }) {
  const [customTime, setCustomTime] = useState("");
  const timeOptions = [15, 30, 45, 60, 90, 120];
  const [isHovering, setIsHovering] = useState(false);

  // Calculate positions for time nodes in a circle
  const getNodePosition = (index, total) => {
    const angle = (index * 2 * Math.PI) / total - Math.PI / 2; // Start from top
    const radius = 120; // Distance from center
    const x = Math.cos(angle) * radius + 150 - 30; // 150 is center of 300px circle, 30 is half of 60px node
    const y = Math.sin(angle) * radius + 150 - 30;
    return { x, y };
  };

  const handleCustomTimeChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      setCustomTime(value);
    }
  };

  const handleCustomTimeBlur = () => {
    if (customTime) {
      const numValue = parseInt(customTime, 10);
      if (numValue >= 5 && numValue <= 240) {
        setTime(numValue);
      } else {
        setCustomTime("");
      }
    }
  };

  const handleCustomTimeKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCustomTimeBlur();
    }
  };

  return (
    <div
      className={styles.container}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <h2 className={styles.title}>How much time do you have?</h2>

      <div className={styles.circleSelector}>
        <div
          className={styles.timeWheel}
          style={{
            transform: isHovering
              ? "scale(1.02) rotateX(2deg)"
              : "scale(1) rotateX(0deg)",
          }}
        >
          {/* Time nodes positioned around the circle */}
          {timeOptions.map((option, index) => {
            const position = getNodePosition(index, timeOptions.length);
            return (
              <div
                key={option}
                className={`${styles.timeNode} ${
                  time === option ? styles.timeNodeSelected : ""
                }`}
                onClick={() => setTime(option)}
                style={{
                  left: position.x + "px",
                  top: position.y + "px",
                }}
              >
                <div className={styles.glowBg} />
                <span className={styles.timeValue}>{option}</span>
              </div>
            );
          })}

          {/* Center node showing current selection */}
          <div className={styles.centerNode}>
            <span className={styles.centerValue}>{time}</span>
            <span className={styles.centerLabel}>minutes</span>
          </div>
        </div>
      </div>

      <div className={styles.customInput}>
        <span className={styles.inputLabel}>Custom:</span>
        <div className={styles.inputContainer}>
          <input
            type="text"
            value={customTime}
            onChange={handleCustomTimeChange}
            onBlur={handleCustomTimeBlur}
            onKeyDown={handleCustomTimeKeyDown}
            placeholder="Time"
            className={styles.input}
            maxLength={3}
          />
        </div>
        <span className={styles.inputLabel}>minutes</span>
      </div>
    </div>
  );
}
