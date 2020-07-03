import SocialFooter from '../../components/social_footer';
import Footer from '../../components/footer';
import Svg404 from '../../components/SVG/404';
import style from './style';

const NotFoundPage = ({ rootPath }) => (
	<div>
		<main class={style.main} style="min-height: 60vh;">
			<Svg404 />
			<h6 class={style.errorMessage}>Error: The URL you requested could not be found.</h6>
		</main>
		<SocialFooter rootPath={rootPath} />
		<Footer rootPath={rootPath} />
	</div>
);

export default NotFoundPage;
