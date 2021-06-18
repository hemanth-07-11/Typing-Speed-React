import React from "react";
import speedIcon from "../images/speed.svg";
import accuracyIcon from "../images/target.svg";

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = { time: 60 };
    this.intervalHandle = null;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.reset !== this.props.reset) {
      this.init();
    } else if (prevProps.timerRunning !== this.props.timerRunning) {
      if (this.props.timerRunning) this.startCountDown();
      else {
        console.log("Game finished before time is up!!");
        this.stopCountDown();
        this.finishGame(10 - this.state.time);
      }
    }
  }

  init = () => {
    this.setState({ time: 60 });
    this.stopCountDown();
  };

  tick = () => {
    
    var time = this.state.time - 1;
    if (time <= 0) {
      console.log("Time up");
      this.stopCountDown();
      this.timeUp(0);
    }
    if (time < 10) {
      time = "0" + time;
    }
    this.setState({ time: time });
  };

  startCountDown = () => {
    console.log("Countdown started");
    this.intervalHandle = setInterval(this.tick, 1000);
  };

  stopCountDown = () => {
    console.log("stopping countdown");
    clearInterval(this.intervalHandle);
  };

  timeUp = () => {
    this.props.timeUp();
  };

  finishGame = (timeInSec) => {
    this.props.finishGame(timeInSec);
  };

  render() {
    return (
      <div className="details">
        <div className="details-content">
          <div className="time-section">
            <p>0:{this.state.time}s</p>
          </div>

          <div className="speed-section">
            <span className="speed-heading-section">
              <img src={speedIcon} alt="speed icon" />
              <p className="speed-heading">SPEED</p>
            </span>

            <p className="speed-value">
              {this.props.wpm}
              <span>Words Per Minute</span>
            </p>
          </div>

          <div className="speed-section">
            <span className="speed-heading-section">
              <img src={accuracyIcon} alt="accuracy icon" />
              <p className="speed-heading">ACCURACY</p>
            </span>

            <p className="speed-value">
              {this.props.accuracy}
              <span>%</span>
            </p>
          </div>

          <div className="word-count-section">
            <p className="total-word-count">
              Total words: <span>{this.props.totalWords}</span>
            </p>
            <p className="correct-word-count">
              Correct words: <span>{this.props.correctWords}</span>
            </p>
            <p className="incorrect-word-count">
              Incorrect words: <span>{this.props.incorrectWords}</span>
            </p>
          </div>
          <button
            className="reset-button"
            onClick={() => {
//              console.log("Reset button clicked");
              this.props.resetGame();
            }}
          >
            Reset
          </button>
        </div>
      </div>
    );
  }

  
}
export default Details;
