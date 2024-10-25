import React, { useState, useEffect } from 'react';
import './Animation.css';

const fieldWidth = 800;
const fieldHeight = 500;
const ballSize = 100;
const maxLeft = fieldWidth - ballSize - 2;
const maxTop = fieldHeight - ballSize - 2;
const centerLeft = maxLeft / 2;
const centerTop = maxTop / 2;
const vx = 5;
const vy = 5;
const speed = 40;

function Animation() {
  const [running, setRunning] = useState(false);
  const [x, setX] = useState(centerLeft);
  const [y, setY] = useState(centerTop);
  const [goRight, setGoRight] = useState(true);
  const [goDown, setGoDown] = useState(true);
  const [ang, setAng] = useState(0);
  const [rotateRight, setRotateRight] = useState(true);
  const [image, setImage] = useState(null);
  const [beforeBtn, setBeforeBtn] = useState('itNone');

  useEffect(() => {
    if (running) {
      const interval = setInterval(process, speed);
      return () => clearInterval(interval);
    }
  }, [running, x, y, ang, rotateRight]);

  const toggleRunning = () => {
    setRunning(!running);
  };

  const changeImg = (param) => {
    if (param === 'itNone') {
      setImage(null);
      setBeforeBtn('itNone');
    } else {
      setImage(param);
      setBeforeBtn(param);
    }
  };

  const process = () => {
    calculate();
  };

  const calculate = () => {
    let newX = x;
    let newY = y;
    let newAng = ang;

    // Move horizontally
    if (goRight) {
      newX += vx;
      if (newX >= maxLeft) {
        newX = maxLeft - (newX - maxLeft);
        setGoRight(false);
      }
    } else {
      newX -= vx;
      if (newX <= 0) {
        newX = -newX;
        setGoRight(true);
      }
    }

    // Move vertically
    if (goDown) {
      newY += vy;
      if (newY >= maxTop) {
        newY = maxTop - (newY - maxTop);
        setGoDown(false);
      }
    } else {
      newY -= vy;
      if (newY <= 0) {
        newY = -newY;
        setGoDown(true);
      }
    }

    // Rotate
    if (rotateRight) {
      newAng += 5;
      if (newX >= maxLeft || newX <= 0 || newY >= maxTop || newY <= 0) {
        setRotateRight(false);
      }
    } else {
      newAng -= 5;
      if (newX >= maxLeft || newX <= 0 || newY >= maxTop || newY <= 0) {
        setRotateRight(true);
      }
    }

    setX(newX);
    setY(newY);
    setAng(newAng);
  };

  return (
    <div id="container">
      <div id="field" style={{ width: fieldWidth, height: fieldHeight }}>
        <div
          id="ball"
          style={{
            left: `${x}px`,
            top: `${y}px`,
            width: `${ballSize}px`,
            height: `${ballSize}px`,
            backgroundColor: image ? 'transparent' : 'lightblue',
            backgroundImage: image ? `url('./images/${image}.png')` : 'none',
            transform: `rotate(${ang}deg)`,
          }}
        ></div>
      </div>

      <div id="control">
        <button
          id="run"
          className={`btn ${running ? 'btn-danger' : 'btn-success'}`}
          onClick={toggleRunning}
        >
          <span className={`bi ${running ? 'bi-pause' : 'bi-play'}`}>
            &nbsp;{running ? 'PAUSE' : 'RUN'}
          </span>
        </button>
        <button
          id="itNone"
          className={`btn ${beforeBtn === 'itNone' ? 'btn-dark' : 'btn-outline-dark'}`}
          onClick={() => changeImg('itNone')}
        >
          NONE
        </button>
        {['basketball', 'football', 'volleyball', 'human', 'cartoon', 'logo'].map((item) => (
          <button
            key={item}
            id={item}
            className={`btn ${beforeBtn === item ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => changeImg(item)}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Animation;
