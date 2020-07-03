import { h, Component } from 'preact';
import IoLogo from '../../components/io_logo';
import SocialFooter from '../../components/social_footer';
import Footer from '../../components/footer';
import style from './style';

export default class Attending extends Component {
	state = {
		isMobile: false,
		showTravel: true,
		showEvent: true
	}

	handleScroll() {
		const ele = document.querySelector('.topappbar.mdc-top-app-bar');
		if (document.documentElement.scrollTop < 56) {
			ele.setAttribute('top', true);
		}
		else {
			ele.removeAttribute('top');
		}
	}

	checkResize() {
		if (this.windowWidth !== window.innerWidth) {
			this.resize();
		}
	}

	resize() {
		if (window.innerWidth > 768 && this.state.isMobile) {
			this.setState({ isMobile: false, showTravel: true, showEvent: true });
		}
		if (window.innerWidth <= 768 && !this.state.isMobile) {
			this.setState({ isMobile: true, showTravel: false, showEvent: true });
		}
	}

	showTravel = (state) => e => {
		this.setState({ showTravel: state, showEvent: !state });
	}

	constructor(props) {
		super(props);
		this.checkResize = this.checkResize.bind(this);
	}


	componentDidMount() {
		document.title = 'Attending - DSCOMG 2020';
		this.windowWidth = window.innerWidth;
		window.addEventListener('scroll', this.handleScroll, { passive: true });
		window.addEventListener('resize', this.checkResize);
		this.resize();
		this.handleScroll();
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
		window.removeEventListener('resize', this.checkResize);
		document.querySelector('.topappbar.mdc-top-app-bar').removeAttribute('top');
	}

	render({ rootPath, info }, { showTravel, showEvent }) {
		return (
			<div>
				{/* <div class={`${style.hero} hero`}>
					<IoLogo rootPath={rootPath} />
					<h2>Attending</h2>
					<p>Join us at Sunway University as we celebrate product and platform innovations at Google.</p>
				</div>
				<div class={style.tabs}>
					<div class={style.tab} onClick={this.showTravel(false)} active={!showTravel}>Event</div>
					<div class={style.tab} onClick={this.showTravel(true)} active={showTravel}>Travel</div>
					<div class={style.line} />
				</div>
				<div class={`${style.belt} belt`}
					style={"background-image: url('" + rootPath + "assets/sunway_auditorium.jpg')"}
				/>
				<div class={style.attending}>
					{showEvent &&
						<div class={style.event} id="event">
							{info && info.show_wifi &&
								<div class={style.attending_item}>
									<div class={style.attending_title}>Wi-Fi</div>
									<div class={style.attending_content}>
										<p><b>Wi-Fi Network:</b>&emsp;<a>{info.wifi_ssid}</a></p>
										<p><b>Username:</b>&emsp;<a>{info.wifi_username}</a></p>
										<p><b>Password:</b>&emsp;<a>{info.wifi_password}</a></p>
									</div>
								</div>
							}
							<div class={style.attending_item}>
								<div class={style.attending_title}>What to expect and explore</div>
								<div class={style.attending_content}>
									<p>DSCOMG 2020 features hands-on learning, Google's latest developer products, and technical talks given by the engineers who are developing our latest APIs and tools–plus a few surprises along the way.</p>
									<br />
									<p><b>Sessions</b></p>
									<p>Learn Google's latest developer products from Googlers, Google Developer Experts and more.</p>
									<p><b>Sandbox</b></p>
									<p>Dedicated spaces to explore, learn, and play with our latest products and platforms via interactive demos, physical installations, and more.</p>
									<p><b>Meals</b></p>
									<p>Attendees are offered complimentary breakfast, lunch, and tea-break.</p>
								</div>
							</div>
						</div>
					}
					{showTravel &&
						<div class={style.travel} id="travel">
							<div class={style.attending_item}>
								<div class={style.attending_title}>Getting to Sunway University</div>
								<div class={style.attending_content}>
									<p>Plan ahead, expect traffic delays, be patient, and consider carpooling.</p>
									<p><b>Get transportation directions: </b></p>
									<div class={style.attending_list}>
										<p>
											<a href="https://goo.gl/maps/vok9mgz1nB62" target="_blank" rel="noopener noreferrer">Google Maps</a>
										</p>
										<p>
											<a href="https://mobile-web.world.waze.com/en_US/meetup/location?h=w2832n3w7snh" target="_blank" rel="noopener noreferrer">Waze</a>
										</p>
									</div>
								</div>
							</div>
							<div class={style.attending_item}>
								<div class={style.attending_title}>Public Transportation</div>
								<div class={style.attending_content}>
									<p>Public transportation to the area is accessible via:</p>
									<div class={style.attending_list}>
										<p>
											<a href="https://www.myrapid.com.my/traveling-with-us/how-to-travel-with-us/rapid-kl/brt-sunway-line" target="_blank" rel="noopener noreferrer">BRT Sunway Line</a>
										</p>
									</div>
								</div>
							</div>
							<div class={style.attending_item}>
								<div class={style.attending_title}>Ridesharing</div>
								<div class={style.attending_content}>
									<p><b>Grab</b></p>
									<p>Download the Grab app from <a href="https://play.google.com/store/apps/details?id=com.grabtaxi.passenger" target="_blank" rel="noopener noreferrer">Google Play</a> or the <a href="https://itunes.apple.com/MY/app/id647268330" target="_blank" rel="noopener noreferrer">App Store</a>.</p>
								</div>
							</div>
							<div class={style.attending_item}>
								<div class={style.attending_title}>Parking</div>
								<div class={style.attending_content}>Limited parking is available at Sunway University. The parking rate is RM5.00 per entry.</div>
							</div>
						</div>
					}
				</div> */}
				<div class={style.footer}>
					<SocialFooter rootPath={rootPath} />
					<Footer rootPath={rootPath} />
				</div>
			</div>
		);
	}
}
