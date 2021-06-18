import React from "react";
import Typing from "./Typing";
import Details from "./Details";

class MainComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timerRunning: false,
      correctWords: 0,
      incorrectWords: 0,
      reset: false,
      inputDisabled: false,
      wpm: 0,
      accuracy: 100,
    };
    this.timeInSec = 60;
    this.texts = [
      "For both students and professionals, clear communication is important. Whether you are typing an email or writing a report or essay, it is your responsibility as the writer to present your thoughts and ideas clearly and precisely. Writing in complete sentences is one way to ensure that you communicate well. This section covers how to recognize and write basic sentence structures and how to avoid some common writing errors.",
      "The hands start off in a standard position on the keyboard. Each finger is responsible for a section of keys within its proximity. Typing courses like Touch-type Read and Spell (TTRS) have worked out which letters you should learn first and common letter and key combinations you’ll need to type English words.The more you practice typing the bits that make-up words, the easier it will be to handle phrases and sentences.",
      "It is always a good idea to be clear about the structure of your writing before you start your essay so that you don’t go off track. If you always write your essays according to the same structure, you will get used to this and it will keep you focused. You will know that, for example, you will be writing an introduction, 2 main body paragraphs and a conclusion and in a general sense, the types of things that you would write in each paragraph.",
      "It's not only writers who can benefit from this free online tool. If you're a programmer who's working on a project where blocks of text are needed, this tool can be a great way to get that. It's a good way to test your programming and that the tool being created is working well. Above are a few examples of how the random paragraph generator can be beneficial.",
      "At the start of an essay writing task, many candidates report that they struggle with coming up with the ideas to base their essay upon. You may not be feeling your most creative in an exam situation and sometimes your mind just goes blank! As well as using sample materials to practice essays for this part of the test, put some revision time aside to read some example topic sentences and generate ideas for a potential essay in a few minutes as you would do if you were writing an actual essay.",
      "The reason that typing speed may feel like an issue in these areas is that there is a set time to type your answer. The section where most people would struggle with this would be the essay section as the candidate is required to write up to 300 words in 20 minutes. Some candidates feel that this is just not enough time to complete the task and this leads to anxiety which in turn detracts from producing good written content.",
      "When applying for a job, being able to type fast and accurately is going to put you at a big advantage. Employers like to know that their employees can type properly because it will make them more productive and improve the accuracy of their work.So make sure you clearly state your word per minute (WPM) on your resume to impress prospective employers.you may find that more opportunities come your way.",
      "No matter whether you can touch type or not, you will still spend a lot of your time typing in almost any office-based role. Everyone knows that sitting down at your desk for long periods of time without a break is bad for your posture, so it makes sense to reduce the amount of time you sit down.No matter whether you can touch type or not, you will still spend a lot of your time typing in almost any office-based role.",
      "Typing remains a fundamental skill, and it is still one of the most important computer skills you can learn. Learning to type fast and accurately will help you in many ways in life, and it should be considered an essential skill for anyone who sees themselves working with a computer in some capacity. You can be more productive, if you double the speed you can type and can spend time on other things",
      "Another benefit of learning to type faster is that you will not have to look at the keyboard and think about where your fingers are going. Once you are typing fast, you will be able to look directly at the screen, and your fingers will type without you even thinking about the movements. This means that you will be able to improve your focus.So learn how to type properly with focus without interuppting your thought processes.",

      
    ];



    this.text = this.texts[Math.floor(Math.random() * 10)];
  }

  setStarted = () => {
    this.setState({ timerRunning: !this.state.timerRunning });
  };

  resetGame = () => {
    console.log("reset game called");
    this.text = this.texts[Math.floor(Math.random() * 10)];
    this.timeInSec = 60;
    this.setState({
      reset: !this.state.reset,
      correctWords: 0,
      incorrectWords: 0,
      timerRunning: false,
      wpm: 0,
      accuracy: 100,
    });
  };

  setCorrectAndIncorrectWords = (correct, incorrect) => {
    this.setState({ correctWords: correct, incorrectWords: incorrect });
  };

  timeUp = () => {
    this.setState({ inputDisabled: true });
  };

  finishGame = (timeInSec) => {
    console.log("Time took to finish: ", timeInSec);
    this.timeInSec = timeInSec;
  };

  findResult = (totalLettersTyped, incorrectLetters) => {
    console.log(
      "Total letters typed: " +
        totalLettersTyped +
        " incorrect letters: " +
        incorrectLetters +
        "timeInSec: " +
        this.timeInSec
    );
    var timeInMin = this.timeInSec / 60;
    var grossWPM = totalLettersTyped / 5 / timeInMin;
    var netWPM = grossWPM - incorrectLetters / timeInMin;
    netWPM = netWPM.toFixed(2);
    var accuracy =
      ((totalLettersTyped - incorrectLetters) * 100) / totalLettersTyped;
    accuracy = accuracy.toFixed(1);
    console.log("WPM: " + netWPM + " accuracy: " + accuracy);
    this.setState({ wpm: netWPM, accuracy: accuracy });
  };

  render() {
    return (
      <div className="main">
        <Typing
          setStarted={this.setStarted}
          text={this.text}
          setWordCount={(correct, incorrect) =>
            this.setCorrectAndIncorrectWords(correct, incorrect)
          }
          reset={this.state.reset}
          inputDisabled={this.state.inputDisabled}
          findResult={(totalLettersTyped, incorrectLetters) =>
            this.findResult(totalLettersTyped, incorrectLetters)
          }
        />
        <Details
          timerRunning={this.state.timerRunning}
          totalWords={this.text.split(" ").length}
          correctWords={this.state.correctWords}
          incorrectWords={this.state.incorrectWords}
          resetGame={this.resetGame}
          reset={this.state.reset}
          timeUp={this.timeUp}
          finishGame={(timeInSec) => this.finishGame(timeInSec)}
          wpm={this.state.wpm}
          accuracy={this.state.accuracy}
        />
      </div>
    );
  }
}

export default MainComponent;
