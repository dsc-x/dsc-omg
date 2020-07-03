import { ANIMATIONS } from "./bodymovinAnimationData";
import { padStart } from "lodash";
import lottie from "lottie-web/build/player/lottie_light_html";

// Google I/O 2019 start time
const EVENT_DATE = new Date("June 28, 2020 18:00 GMT+5:30");

const FRAME_RANGES = {
  nine: {
    0: [285, 307],
    1: [255, 277],
    2: [225, 247],
    3: [195, 217],
    4: [165, 187],
    5: [135, 157],
    6: [105, 127],
    7: [75, 97],
    8: [45, 67],
    9: [15, 37]
  },

  five: {
    0: [165, 180],
    1: [135, 157],
    2: [105, 127],
    3: [75, 97],
    4: [45, 67],
    5: [15, 37]
  },

  two: {
    0: [75, 90],
    1: [45, 67],
    2: [15, 37]
  }
};

const COLORS = ["blue", "red", "yellow", "green"];

export class Countdown {
  constructor(style, container, isReset) {
    this.countdownContainer = container;
    this.style = style;
    this.endTime = Date.parse(EVENT_DATE.toString()) / 1000;
    this.daysCounter = null;
    this.hoursCounter = null;
    this.isReset = isReset;
    this.minutesCounter = null;
    this.secondsCounter = null;
    this.render = this.render.bind(this);
    this.getRandomColorNotMatchingSiblings = this.getRandomColorNotMatchingSiblings.bind(
      this
    );
    this.assignRandomColor = this.assignRandomColor.bind(this);
    this.digitObjects = [];
    this.currentDigits = {
      seconds: {
        firstDigit: null,
        secondDigit: null
      },
      minutes: {
        firstDigit: null,
        secondDigit: null
      },
      hours: {
        firstDigit: null,
        secondDigit: null
      },
      days: {
        firstDigit: null,
        secondDigit: null
      }
    };
  }

  init() {
    const digitsElements = Array.from(
      this.countdownContainer.querySelectorAll(".js-digit")
    );
    const numDigits = digitsElements.length;
    const numRows = 2;
    const numDigitsPerRow = numDigits / numRows;

    this.digitObjects = digitsElements.map((digit, index) => {
      const maxNumber = digit.dataset.maxNumber;
      let isDigitInFirstRow;
      let color;

      if (index < numDigitsPerRow) {
        isDigitInFirstRow = true;
        color = COLORS[index];
      } else {
        isDigitInFirstRow = false;
        color = null;
      }

      return {
        element: digit,
        animation: lottie.loadAnimation({
          container: digit,
          renderer: "svg",
          loop: false,
          autoplay: false,
          animationData: ANIMATIONS[maxNumber]
        }),
        frameRanges: FRAME_RANGES[maxNumber],
        lastColor: null,
        currentColor: color,
        currentNumber: null,
        lastNumber: null,
        prevDigitObject: null,
        nextDigitObject: null,
        firstRowDigit: isDigitInFirstRow
      };
    });

    this.digitObjects.forEach((digitObject, index) => {
      for (let i = 0; i < numRows; i++) {
        if (numDigitsPerRow * (i + 1) - numDigitsPerRow === index) {
          digitObject.prevDigitObject = null;
          digitObject.nextDigitObject = this.digitObjects[index + 1];
        } else if (numDigitsPerRow * (i + 1) - 1 === index) {
          digitObject.prevDigitObject = this.digitObjects[index - 1];
          digitObject.nextDigitObject = null;
        } else {
          digitObject.prevDigitObject = this.digitObjects[index - 1];
          digitObject.nextDigitObject = this.digitObjects[index + 1];
        }
      }

      digitObject.animation.addEventListener("enterFrame", event => {
        if (event.currentTime === 21) {
          if (digitObject.lastNumber) {
            digitObject.element
              .querySelectorAll(`.number-${digitObject.lastNumber}`)
              .forEach(el => {
                el.classList.remove(this.style[digitObject.lastColor]);
              });
          }
        }
      });
    });

    this.patchBodymovinClasses([
      "lightfill",
      "darkfill",
      "lightstroke",
      "darkstroke"
    ]);

    this.checkAndSetTime();
    this.render();
  }

  reset(isReset) {
    this.digitObjects.forEach(digitObject => {
      while (digitObject.element.firstChild) {
        digitObject.element.removeChild(digitObject.element.firstChild);
      }
    });
    this.digitObjects = null;
    this.isReset = isReset;
  }

  patchBodymovinClasses(classNames) {
    classNames.forEach(className => {
      this.countdownContainer.querySelectorAll(`.${className}`).forEach(el => {
        el.classList.add(this.style[className]);
      });
    });
  }

  getFormattedLabel(num) {
    const numberString = num.toString();
    return num < 10 ? "0" + numberString : numberString;
  }

  getFormattedFirstDigit(num) {
    return padStart(num.toString(), 2, "0")[0];
  }

  getFormattedSecondDigit(num) {
    return padStart(num.toString(), 2, "0")[1];
  }

  getRandomColorNotMatchingSiblings(siblingColors) {
    let colorSet = new Set(COLORS);

    if (siblingColors) {
      siblingColors.forEach(color => {
        colorSet.delete(color);
      });
    }

    let colorArray = Array.from(colorSet);
    const randomIndex = Math.floor(Math.random() * colorArray.length);

    return colorArray[randomIndex];
  }

  assignRandomColor(digit, leftDigit, rightDigit) {
    let color;

    if (digit.firstRowDigit && this.onInitialLoadout) {
      color = digit.currentColor;
    } else if (leftDigit && rightDigit) {
      color = this.getRandomColorNotMatchingSiblings([
        leftDigit.currentColor,
        rightDigit.currentColor
      ]);
    } else if (leftDigit) {
      color = this.getRandomColorNotMatchingSiblings([leftDigit.currentColor]);
    } else if (rightDigit) {
      color = this.getRandomColorNotMatchingSiblings([rightDigit.currentColor]);
    }

    digit.element
      .querySelectorAll(`.number-${digit.currentNumber}`)
      .forEach(el => {
        el.classList.add(this.style[color]);
      });

    digit.lastColor = digit.currentColor;
    digit.currentColor = color;
  }

  compareDigits(firstDigitObj, secondDigitObj, label, currentDigits) {
    const currentFirstDigit = this.getFormattedFirstDigit(label);
    const currentSecondDigit = this.getFormattedSecondDigit(label);

    if (currentFirstDigit !== currentDigits.firstDigit) {
      firstDigitObj.lastNumber = currentDigits.firstDigit;
      firstDigitObj.currentNumber = parseInt(currentFirstDigit, 10);

      this.assignRandomColor(
        firstDigitObj,
        firstDigitObj.prevDigitObject,
        firstDigitObj.nextDigitObject
      );

      firstDigitObj.animation.playSegments(
        [firstDigitObj.frameRanges[currentFirstDigit]],
        true
      );

      currentDigits.firstDigit = currentFirstDigit;
    }

    if (currentSecondDigit !== currentDigits.secondDigit) {
      secondDigitObj.lastNumber = currentDigits.secondDigit;
      secondDigitObj.currentNumber = parseInt(currentSecondDigit, 10);

      this.assignRandomColor(
        secondDigitObj,
        secondDigitObj.prevDigitObject,
        secondDigitObj.nextDigitObject
      );

      secondDigitObj.animation.playSegments(
        [secondDigitObj.frameRanges[currentSecondDigit]],
        true
      );

      currentDigits.secondDigit = currentSecondDigit;
    }
  }

  getTime() {
    const now = Date.now() / 1000;
    const timeLeft = Math.max(this.endTime - now, 0);
    const daysLeft = Math.floor(timeLeft / 86400);
    const hoursLeft = Math.floor((timeLeft - daysLeft * 86400) / 3600);
    const minutesLeft = Math.floor(
      (timeLeft - daysLeft * 86400 - hoursLeft * 3600) / 60
    );
    const secondsLeft = Math.floor(
      timeLeft - daysLeft * 86400 - hoursLeft * 3600 - minutesLeft * 60
    );

    return {
      now,
      timeLeft,
      daysLeft,
      hoursLeft,
      minutesLeft,
      secondsLeft
    };
  }

  checkAndSetTime() {
    const time = this.getTime();

    if (this.secondsCounter !== time.secondsLeft) {
      this.setSeconds(time);
    }

    if (this.minutesCounter !== time.minutesLeft) {
      this.setMinutes(time);
    }

    if (this.hoursCounter !== time.hoursLeft) {
      this.setHours(time);
    }

    if (this.daysCounter !== time.daysLeft) {
      this.setDays(time);
      this.setAriaLabel(time.daysLeft);
    }
  }

  /**
   * Sets aria label for the countdown container
   * @param {number} daysLeft the number of days left
   */

  setAriaLabel(daysLeft) {
    this.countdownContainer.setAttribute(
      "aria-label",
      `Countdown to I/O: ${daysLeft} days left`
    );
  }

  setDays(time) {
    const daysLabel = this.getFormattedLabel(time.daysLeft);
    const currentDigits = this.currentDigits.days;

    this.compareDigits(
      this.digitObjects[0],
      this.digitObjects[1],
      daysLabel,
      currentDigits
    );

    this.daysCounter = time.daysLeft;
  }

  setHours(time) {
    const hoursLabel = this.getFormattedLabel(time.hoursLeft);
    const currentDigits = this.currentDigits.hours;

    this.compareDigits(
      this.digitObjects[2],
      this.digitObjects[3],
      hoursLabel,
      currentDigits
    );

    this.hoursCounter = time.hoursLeft;
  }

  setMinutes(time) {
    const minutesLabel = this.getFormattedLabel(time.minutesLeft);
    const currentDigits = this.currentDigits.minutes;

    this.compareDigits(
      this.digitObjects[4],
      this.digitObjects[5],
      minutesLabel,
      currentDigits
    );

    this.minutesCounter = time.minutesLeft;
  }

  setSeconds(time) {
    const secondsLabel = this.getFormattedLabel(time.secondsLeft);
    const currentDigits = this.currentDigits.seconds;

    this.compareDigits(
      this.digitObjects[6],
      this.digitObjects[7],
      secondsLabel,
      currentDigits
    );

    this.secondsCounter = time.secondsLeft;
  }

  render() {
    if (this.isReset) {
      return false;
    }

    this.onInitialLoadout = false;
    this.checkAndSetTime();

    requestAnimationFrame(this.render);
  }
}
