import { h, Component } from 'preact';
import style from './style';

export default class TicketIcon extends Component {
	render() {
		return (
			<svg class={style.ticket_icon} aria-hidden="true" width="50" height="61" viewBox="0 0 50 61" xmlns="http://www.w3.org/2000/svg">
				<g fill="none" fill-rule="evenodd">
					<path fill="#D2E3FC" d="M.115 30.496V60.98h49.686V47.528H37.623v-4.98H27.19v-6.3H15.172v-5.752z" />
					<path fill="#4285F4" d="M.115 30.496h49.686V17.043H37.623v-4.979H27.189V5.763H15.172V.01H.115z" />
				</g>
			</svg>
		);
	}
}