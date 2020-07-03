let style = require("./style.css");
import { Component } from "preact";
import { Countdown as CountdownController } from "./Countdown";

export default class Countdown extends Component {
  state = {
  	isReset: false
  };

  componentDidMount() {
  	if (!this.controller) {
  		this.controller = new CountdownController(
  			style,
  			this.countdownContainer,
  			this.state.isReset
  		);
  		this.controller.reset(this.state.isReset);
  		this.controller.init();
  	}
  }

  shouldComponentUpdate() {
  	return !this.controller.isReset;
  }

  componentWillUnmount() {
  	this.setState({
  		isReset: true
  	});

  	this.controller.reset(this.state.isReset);
  }

  render() {
  	return (
  		<div
	class={style.countdownContainer}
	ref={div => (this.countdownContainer = div)}
  		>
  			<div
	class={`${style.countdown}`}
	aria-hidden="true"
	role="presentation"
  			>
  				<div class={`${style.unitWrapper}`}>
  					<div
	class={`${style.digit} js-digit`}
	data-unit="days"
	data-max-number="nine"
  					/>
  					<div
	class={`${style.digit} js-digit`}
	data-unit="days"
	data-max-number="nine"
  					/>
  					<span class={`${style.unitLabel}`}>D</span>
  				</div>
  				<div class={`${style.unitWrapper}`}>
  					<div
	class={`${style.digit} js-digit`}
	data-unit="hours"
	data-max-number="two"
  					/>
  					<div
	class={`${style.digit} js-digit`}
	data-unit="hours"
	data-max-number="nine"
  					/>
  					<span class={`${style.unitLabel}`}>H</span>
  				</div>
  				<div class={`${style.unitWrapper}`}>
  					<div
	class={`${style.digit} js-digit`}
	data-unit="minutes"
	data-max-number="five"
  					/>
  					<div
	class={`${style.digit} js-digit`}
	data-unit="minutes"
	data-max-number="nine"
  					/>
  					<span class={`${style.unitLabel}`}>M</span>
  				</div>
  				<div class={`${style.unitWrapper}`}>
  					<div
	class={`${style.digit} js-digit`}
	data-unit="seconds"
	data-max-number="five"
  					/>
  					<div
	class={`${style.digit} js-digit`}
	data-unit="seconds"
	data-max-number="nine"
  					/>
  					<span class={`${style.unitLabel}`}>S</span>
  				</div>
  			</div>
  		</div>
  	);
  }
}
