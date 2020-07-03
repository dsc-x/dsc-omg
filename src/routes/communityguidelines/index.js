import { h, Component } from 'preact';
import IoLogo from '../../components/io_logo';
import SocialFooter from '../../components/social_footer';
import Footer from '../../components/footer';
import style from './style';

export default class Register extends Component {
	handleScroll() {
		const ele = document.querySelector('.topappbar.mdc-top-app-bar');
		if (document.documentElement.scrollTop < 56) {
			ele.setAttribute('top', true);
		}
		else {
			ele.removeAttribute('top');
		}
	}

	componentDidMount() {
		document.title = 'Community Guidelines - DSCOMG 2020';
		window.addEventListener('scroll', this.handleScroll, { passive: true });
		this.handleScroll();
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
		document.querySelector('.topappbar.mdc-top-app-bar').removeAttribute('top');
	}

	render({ rootPath }) {
		return (
			<div>
				{/* <div class="hero">
					<IoLogo rootPath={rootPath} />
					<h2>Community Guidelines</h2>
				</div>
				<div class={style.container}>
					<p>Google Developer Group Kuala Lumpur (GDGKL) and Google is dedicated to providing a harassment-free and inclusive event experience for everyone regardless of gender identity and expression, sexual orientation, disabilities, neurodiversity, physical appearance, body size, ethnicity, nationality, race, age, religion, or other protected category. We do not tolerate harassment of event participants in any form. Google takes violations of our policy seriously and will respond appropriately.</p>
					<p>All participants of Google-supported events must abide by the following policy:</p>
					<h4>Be excellent to each other.</h4>
					<p><span>Treat everyone with respect. Participate while acknowledging that everyone deserves to be here — and each of us has the right to enjoy our experience without fear of harassment, discrimination, or condescension, whether blatant or via micro-aggressions. Jokes shouldn’t demean others. Consider what you are saying and how it would feel if it were said to or about you.</span></p>
					<h4>Speak up if you see or hear something.</h4>
					<p><span>Harassment is not tolerated, and you are empowered to politely engage when you or others are disrespected. The person making you feel uncomfortable may not be aware of what they are doing, and politely bringing their behavior to their attention is encouraged.</span></p>
					<h4>Practice saying "Yes and" to each other.</h4>
					<p><span>It’s a theatre improv technique to build on each other’s ideas. We all benefit when we create together.</span></p>
					<h4>We have a ZERO TOLERANCE POLICY for harassment of any kind, including but not limited to:</h4>
					<ul>
						<li>Stalking/following</li>
						<li>Deliberate intimidation</li>
						<li>Harassing photography or recording</li>
						<li><span>Sustained disruption of talks or other events</span></li>
						<li>Offensive verbal language</li>
						<li>Verbal language that reinforces social structures of domination</li>
						<li>Sexual imagery and language in public spaces</li>
						<li>Inappropriate physical contact</li>
						<li>Unwelcome sexual or physical attention</li>
					</ul>
					<p><span>In relation to, but not limited to:</span></p>
					<ul>
						<li>Neurodiversity</li>
						<li>Race</li>
						<li>Color</li>
						<li>National origin</li>
						<li>Gender identity</li>
						<li>Gender expression</li>
						<li>Sexual orientation</li>
						<li>Age</li>
						<li>Body size</li>
						<li>Disabilities</li>
						<li>Appearance</li>
						<li>Religion</li>
						<li>Pregnancy</li>
					</ul>
					<br />
					<p>Participants asked to stop any harassing behavior are expected to comply immediately. Our zero tolerance policy means that we will look into and review every allegation of violation of our Event Community Guidelines and Anti-Harassment Policy and respond appropriately. We empower and encourage you to report any behavior that makes you or others feel uncomfortable by finding a GDGKL organizer or volunteer or by emailing <a href="mailto:events@gdgkl.org">events@gdgkl.org</a>.</p>
					<br />
					<p>Event staff will be happy to help participants contact hotel/venue security or local law enforcement, provide escorts, or otherwise assist those experiencing discomfort or harassment to feel safe for the duration of the event. We value your attendance.</p>
					<br />
					<p>This policy extends to talks, forums, workshops, codelabs, social media, parties, hallway conversations, all attendees, partners, sponsors, volunteers, event staff, etc. You catch our drift. GDGKL reserves the right to refuse admittance to, or remove any person from, any GDGKL hosted event (including future GDGKL events) at any time in its sole discretion. This includes, but is not limited to, attendees behaving in a disorderly manner or failing to comply with this policy, and the terms and conditions herein. If a participant engages in harassing or uncomfortable behavior, the conference organizers may take any action they deem appropriate, including warning or expelling the offender from the conference with no refund.</p>
				</div> */}
				<SocialFooter rootPath={rootPath} />
				<Footer rootPath={rootPath} />
			</div>
		);
	}
}
