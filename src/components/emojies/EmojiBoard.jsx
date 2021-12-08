import React, { useState, useEffect } from "react";
import styled, { keyFrames } from "styled-components";
import EmojiButton from "./EmojiButton";
import EmojiWrapper from "./EmojiWrapper";
import { generate } from "short-id";
import EmojiBubble from "./EmojiBubble";
import AutoExpire from "../AutoExpired";
const EmojiBoard = () => {
  const emojis = [
    { label: "Thumbs Up", symbol: "👍" },
    { label: "Monster", symbol: "👾" },
    { label: "Heart", symbol: "❤️" },
    { label: "Shiny heart", symbol: "💖" },
    { label: "Love", symbol: "💞" }
  ];
  const [emojiQueue, setEmojiQueue] = useState([]);

  const randomNumber = (max, min) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  const randomPosOrNeg = (max, min) => {
    let randomNumber = Math.floor(Math.random() * (max - min + 1) + min);

    randomNumber *= Math.floor(Math.random() * 2 === 1 ? 1 : -1);
    return randomNumber;
  };
  const handleEmojiClick = (label, symbol) => {
    setEmojiQueue([
      ...emojiQueue,
      {
        label,
        symbol,
        size: randomNumber(5, 2),
        left: randomNumber(100, 0),
        one: randomPosOrNeg(200, 50),
        two: randomPosOrNeg(200, 50),
        id: generate()
      }
    ]);
  };
  const handleKeyDown = (e, label, symbol) => {
    if (e.key === "Enter") {
      setEmojiQueue([
        ...emojiQueue,
        {
          label,
          symbol,
          size: randomNumber(5, 2),
          left: randomNumber(100, 0),
          one: randomPosOrNeg(200, 50),
          two: randomPosOrNeg(200, 50),
          id: generate()
        }
      ]);
    }
  };
  return (
    <React.Fragment>
      <div>
        <Wrap>
          {emojis.map(({ label, symbol }, i) => (
            <EmojiButton
              key={i}
              onClick={() => handleEmojiClick(label, symbol)}
              onKeyDown={(e) => handleKeyDown(e, label, symbol)}
            >
              <Emoji label={label} symbol={symbol} />
            </EmojiButton>
          ))}
        </Wrap>
      </div>
      <div>
        {emojiQueue.map(({ id, label, symbol, size, left, one, two }) => (
          <AutoExpire key={id}>
            <EmojiBubble
              key={id}
              label={label}
              symbol={symbol}
              size={size}
              left={left}
              one={one}
              two={two}
            />
          </AutoExpire>
        ))}
      </div>
    </React.Fragment>
  );
};

const Emoji = styled(EmojiWrapper)`
  font-size: 3rem;
`;

const Wrap = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
export default EmojiBoard;
