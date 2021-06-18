import React from "react";

class Typing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wordsList: [],
      status: [],
      currentActiveWord: 0,
      inputValue: "",
      letters: [],
      letterStatus: [],
      currentActiveLetter: 0,
      inputDisabled: false,
    };
    this.correctWords = 0;
    this.timerRunning = false;
  }

  componentDidMount() {
    this.init();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.reset !== this.props.reset) this.init();
    if(prevProps.inputDisabled !== this.props.inputDisabled)
      this.findResult()
  }

  init = () => {
    this.timerRunning = false;
    this.correctWords = 0
    var wordsList = this.props.text.split(" ");
    var status = [];
    for (var i = 0; i < wordsList.length; i++) {
      status[i] = "inactive";
    }
    status[0] = "active";
    var letterStatus = [];

    var tempWordList = this.props.text.split("");
    tempWordList.push(" ");
    for (var j = 0; j < tempWordList.length; j++) {
      letterStatus[j] = "letter-inactive";
    }
    letterStatus[0] = "letter-active";

    this.setState({
      wordsList: wordsList,
      status: status,
      letterStatus: letterStatus,
      letters: tempWordList,
      inputDisabled: false,
      inputValue: "",
      currentActiveLetter: 0,
      currentActiveWord: 0,
    });
  };

  findResult = () => {
    console.log("find result called")
    this.setWordCount(this.correctWords);
    this.setState({inputDisabled: true})
  
    var totalLettersTyped = this.state.currentActiveLetter
    var correctLetters = (this.state.letterStatus.join("").match(/letter-valid/g) || []).length
    this.props.findResult(totalLettersTyped, totalLettersTyped - correctLetters)
  };

  setWordCount = (correct) => {
    this.props.setWordCount(correct, this.state.currentActiveWord - correct);
  };

  setStarted = () => {
    this.props.setStarted();
    const promise = new Promise(function(resolve, reject) {
      resolve('Success!');
    });
    return promise
  };

  onChange = (event) => {
    this.setState({ inputValue: event.target.value.trim() });
  };

  onKeyPress = (event) => {
    var letters = this.state.letters;
    var currentActiveLetter = this.state.currentActiveLetter;
    var letterStatus = this.state.letterStatus;
    var currentActiveWord = this.state.currentActiveWord;
    var status = this.state.status;
    var wordsList = this.state.wordsList;
    var inputValue = this.state.inputValue;

    if (event.key.length === 1) {
      if (!this.timerRunning) {
        this.timerRunning = true;
        this.setStarted();
      }

      if (event.key === letters[currentActiveLetter]) {
        letterStatus[currentActiveLetter] = "letter-valid";
      } else {
        letterStatus[currentActiveLetter] = "letter-invalid";
      }

      var currentWordLength =
        wordsList.length <= currentActiveWord
          ? 0
          : wordsList[currentActiveWord].length - 1;
      if (
        letters
          .slice(
            currentActiveLetter - currentWordLength,
            currentActiveLetter + 1
          )
          .join("") === wordsList[currentActiveWord]
      ) {

        status[currentActiveWord] = "inactive";
        currentActiveWord += 1;
      }

      if (letters[currentActiveLetter] === " ") {
        status[currentActiveWord] = "active";
      }

      currentActiveLetter += 1;
      letterStatus[currentActiveLetter] = "letter-active";

      if (event.keyCode === 32 || event.keyCode === 0) {
        
        if (wordsList[currentActiveWord - 1] === inputValue) {
          this.correctWords += 1;
        }
        if (wordsList.length <= currentActiveWord) {
          currentActiveLetter -= 1
          letterStatus[currentActiveLetter] = "letter-inactive";
          this.setStarted().then(()=>
            this.findResult()
          )
        }

        inputValue = "";
      }

      

      this.setState({
        currentActiveLetter: currentActiveLetter,
        letterStatus: letterStatus,
        currentActiveWord: currentActiveWord,
        status: status,
        inputValue: inputValue
      });
    }
    
    else if (event.key === "Backspace") {
      if (inputValue.length > 0) {
        letterStatus[currentActiveLetter] = "letter-inactive";

        if (letters[currentActiveLetter] === " ") {
          currentActiveWord -= 1;
          status[currentActiveWord] = "active";
        }

        currentActiveLetter -= 1;
        letterStatus[currentActiveLetter] = "letter-active";

        if (letters[currentActiveLetter] === " ") {
          status[currentActiveWord] = "inactive";
        }
        this.setState({
          currentActiveLetter: currentActiveLetter,
          letterStatus: letterStatus,
          status: status,
          currentActiveWord: currentActiveWord,
        });
      }
    }
  };

  render() {
    var letterIndex = 0;
    return (
      <div className="typing">
        <div className="input-section">
          <div className="text-area">
            <p>
              {this.state.wordsList.map((word, index) => (
                <>
                  <span
                    className={"word " + this.state.status[index]}
                    key={"word" + index}
                  >
                    {word.split("").map((letter, ind) => (
                      <span
                        className={this.state.letterStatus[letterIndex++]}
                        key={"letter" + letterIndex}
                      >
                        {letter}
                      </span>
                    ))}
                  </span>
                  <span
                    className={
                      "space " + this.state.letterStatus[letterIndex++]
                    }
                    key={"space" + index}
                  ></span>
                </>
              ))}
            </p>
          </div>
          <input
            type="text"
            className="text-input"
            autoFocus={true}
            onKeyDown={this.onKeyPress}
            value={this.state.inputValue}
            onChange={this.onChange}
            disabled={this.state.inputDisabled}
            placeholder="Start typing..."
          />
        </div>
      </div>
    );
  }
}

export default Typing;
