import { Component } from 'preact';
import SocialFooter from '../../components/social_footer';
import Footer from '../../components/footer';
import style from './style';

export default class CallForPresentersPage extends Component {
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
		document.title = 'Call for Presenters - DSCOMG 2020';
		window.addEventListener('scroll', this.handleScroll, { passive: true });
		this.handleScroll();
	}

	componentWillUnmount() {
		document.querySelector('.topappbar.mdc-top-app-bar').removeAttribute('top');
	}

	render({ rootPath }) {
		return (
			<div>
				{/* <div class={style.cfp}>
					<iframe src="https://docs.google.com/forms/d/e/1FAIpQLSeLSSPdRakpp8rG1ZCeMRwzDQ_NEs8K6QnL8_f6JvFtjnLT5g/viewform?embedded=true" width="640" height="2050" frameborder="0" marginheight="0" marginwidth="0">Loading...</iframe>
				</div> */}
				<div class={style.footer}>
					<SocialFooter rootPath={rootPath} />
					<Footer rootPath={rootPath} />
				</div>
			</div>
		);
	}
}
