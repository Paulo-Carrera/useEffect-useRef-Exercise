import React from 'react';

function Card({ image, alt, index }) {
  const style = {
    position: "absolute", // Absolutely position cards relative to parent container
    width: "100px",
    height: "auto",
    transform: `rotate(${index * 10}deg)`, // Tilt each card slightly
    top: `${index * 15}px`, // Stack cards vertically with some overlap
    left: `${index * 5}px`, // Stack cards horizontally with some overlap
    transition: "transform 0.5s ease, top 0.5s ease, left 0.5s ease",
    zIndex: 10 - index, // Ensure cards with higher index stack on top
  };

  const textStyle = {
    height: "50px",
    width: "100px",
    backgroundColor: "black", // Slightly transparent background for text
    position: "absolute",
    top: "120%",
    left: "50%",
    transform: "translate(-50%, -50%)", // Center the text inside the card
    color: "white", // Text color for visibility
    fontSize: "16px", // Adjust font size
    fontWeight: "bold",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", // Optional: Adds shadow for visibility
    padding: "5px 0", // Padding for better spacing
    textAlign: "center", // Center the text horizontally
    borderRadius: "5px", // Rounded corners on the text box
  };

  return (
    <div style={style}>
      <img src={image} alt={alt} style={{ width: "100px", height: "auto" }} />
      <p style={textStyle}>{alt}</p> {/* Card name overlaps here */}
    </div>
  );
}

export default Card;

