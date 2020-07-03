/* eslint-disable react/jsx-indent-props */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/jsx-no-comment-textnodes */
import { h, Component } from 'preact';
import { Link, Match } from 'preact-router/match';
import firebase from '../firebase';
import Drawer from 'preact-material-components/Drawer';
import TopAppBar from 'preact-material-components/TopAppBar';
import Dialog from 'preact-material-components/Dialog';
import 'preact-material-components/Dialog/style.css';
import 'preact-material-components/TopAppBar/style.css';
import 'preact-material-components/Drawer/style.css';
import 'preact-material-components/List/style.css';
import IoLogo from '../io_logo';
import MenuIcon from '../SVG/Icons/menu';
import HomeIcon from '../SVG/Icons/home';
import BadgeIcon from '../SVG/Icons/badge';
// import RegistrationIcon from '../SVG/Icons/registration';
import ScheduleIcon from '../SVG/Icons/schedule';
import SpeakerIcon from '../SVG/Icons/speaker';
import FaqIcon from '../SVG/Icons/faq';
import MapIcon from '../SVG/Icons/map';
import style from './style';

export default class NavBar extends Component {
  closeDrawer = () => this.setState({ drawerOpened: false });

  openDrawer = () => this.setState({ drawerOpened: !this.state.drawerOpened });

  signIn = () => {
  	firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
  };

  signOut = () => {
  	// eslint-disable-next-line no-undef
  	gtag('event', 'logout', { method: 'Google' });

  	firebase
  		.auth()
  		.signOut()
  		.then(() => {
  			this.signoutDig.MDComponent.close();
  		});
  };

  toggleSigninDig = () => {
  	// eslint-disable-next-line no-undef
  	gtag('event', 'login', { method: 'Google' });

  	this.signIn();
  };

  toggleSignoutDig = () => {
  	this.signoutDig.MDComponent.show();
  };

  render({ rootPath, user }) {
  	return (
  		<div>
  			<div className={[style.signout_dialog, 'signout_dialog'].join(' ')}>
  				<Dialog
  					onCancel={this.onClose}
  					onAccept={this.onClose}
  					ref={signoutDig => {
  						this.signoutDig = signoutDig;
  					}}
  				>
  					<div class={style.dialog_body}>
  						<h3>Sign out?</h3>
  						<p>All saved events remain synced to your account.</p>
  					</div>
  					<Dialog.Footer>
  						<Dialog.FooterButton class={style.cancel_btn} accept>
                Not now
  						</Dialog.FooterButton>
  						<Dialog.FooterButton
  							primary
  							class={style.signout_btn}
  							onClick={this.signOut}
  						>
                Sign out
  						</Dialog.FooterButton>
  					</Dialog.Footer>
  				</Dialog>
  			</div>

  			<div class={style.toolbar}>
  				<TopAppBar className="topappbar">
  					<TopAppBar.Row>
  						<TopAppBar.Section align-start>
  							<MenuIcon class={style.menu_icon} onClick={this.openDrawer} />
  						</TopAppBar.Section>
  						<div class={style.mobile_title}>
  							<Match path={rootPath + 'schedule'}>
  								{({ path }) =>
  									path.startsWith(rootPath + 'schedule') && (
  										<span>Schedule</span>
  									)
  								}
  							</Match>
  							<Match path={rootPath + 'speakers'}>
  								{({ path }) =>
  									path.startsWith(rootPath + 'speakers') && (
  										<span>Speakers</span>
  									)
  								}
  							</Match>
  						</div>
  						<TopAppBar.Section align-end>
  							{user ? (
  								<img
  									crossorigin="anonymous"
  									src={user.photoURL}
  									onClick={this.toggleSignoutDig}
  								/>
  							) : (
  								<div class={style.signin_btn} onClick={this.toggleSigninDig}>
                    Sign In
  								</div>
  							)}
  						</TopAppBar.Section>
  					</TopAppBar.Row>
  				</TopAppBar>
  			</div>
  			<Drawer modal open={this.state.drawerOpened} onClose={this.closeDrawer}>
  				<Drawer.DrawerContent>
  					<div class={style.drawer_toolbar}>
  						<IoLogo />
  						<h2>24 June 2020</h2>
  						<p>In a Galaxy not too far away</p>
  					</div>
  					<div class={style.drawer_nav}>
  						<Link
  							activeClassName={style.active}
  							href={rootPath}
  							onClick={this.closeDrawer}
  						>
                Home
  						</Link>
						  <Match path="/badges">
  							{({ path, url }) => (
  								<Link
  									activeClassName={style.active}
  									href={rootPath + 'badges'}
  									onClick={this.closeDrawer}
  									path={path.startsWith(`${rootPath}badges/`) ? url : undefined}
  								>
                    Badges
  								</Link>
  							)}
  						</Match>
  						<Match path="/faq">
  							{({ path, url }) => (
  								<Link
  									activeClassName={style.active}
  									href={rootPath + 'faq'}
  									onClick={this.closeDrawer}
  									path={path.startsWith(`${rootPath}faq/`) ? url : undefined}
  								>
                    FAQ
  								</Link>
  							)}
  						</Match>
  						<Match path="/schedule">
  							{({ path, url }) => (
  								<Link
  									activeClassName={style.active}
  									href={rootPath + 'schedule'}
  									onClick={this.closeDrawer}
  									path={
  										path.startsWith(`${rootPath}schedule/`) ? url : undefined
  									}
  								>
                    Schedule
  								</Link>
  							)}
  						</Match>
  						<Match path="/speakers">
  							{({ path, url }) => (
  								<Link
  									activeClassName={style.active}
  									href={rootPath + 'speakers'}
  									onClick={this.closeDrawer}
  									path={
  										path.startsWith(`${rootPath}speakers/`) ? url : undefined
  									}
  								>
                    Speakers
  								</Link>
  							)}
  						</Match>
  						<Match path="/live">
  							{({ path, url }) => (
  								<Link
  									activeClassName={style.active}
  									href={rootPath + 'live'}
  									onClick={this.closeDrawer}
  									path={path.startsWith(`${rootPath}live/`) ? url : undefined}
  								>
                    Live
  								</Link>
  							)}
  						</Match>
  						
  					</div>
  				</Drawer.DrawerContent>
  			</Drawer>
  			<div class={style.desktop_toolbar}>
  				{user ? (
  					<img
  						crossorigin="anonymous"
  						src={user.photoURL}
  						onClick={this.toggleSignoutDig}
  					/>
  				) : (
  					<div class={style.signin_btn} onClick={this.toggleSigninDig}>
              Sign In
  					</div>
  				)}
  			</div>
  			<div class={style.navbar}>
  				<div class={style.hamburger}>
  					<MenuIcon class={style.menu_icon} onClick={this.openDrawer} />
  				</div>
  				<nav>
  					<Link
  						activeClassName={style.active}
  						class={style.nav_item}
  						href={rootPath}
  					>
  						<HomeIcon />
  						<span>Home</span>
  					</Link>
  					<Match path="/badges">
  						{({ path, url }) => (
  							<Link
  								activeClassName={style.active}
  								class={style.nav_item}
  								href={rootPath + 'badges'}
  								path={path.startsWith(`${rootPath}badges/`) ? url : undefined}
  							>
  								<BadgeIcon />
  								<span>Badges</span>
  							</Link>
  						)}
  					</Match>
  					{/* <Match path="/faq">
  						{({ path, url }) => (
  							<Link
  								activeClassName={style.active}
  								class={style.nav_item}
  								href={rootPath + 'faq'}
  								path={path.startsWith(`${rootPath}faq/`) ? url : undefined}
  							>
  								<FaqIcon />
  								<span>FAQ</span>
  							</Link>
  						)}
  					</Match> */}
  					<Match path="/schedule">
  						{({ path, url }) => (
  							<Link
  								activeClassName={style.active}
  								class={style.nav_item}
  								href={rootPath + 'schedule'}
  								path={
  									path.startsWith(`${rootPath}schedule/`) ? url : undefined
  								}
  							>
  								<ScheduleIcon />
  								<span>Schedule</span>
  							</Link>
  						)}
  					</Match>
  					<Match path="/speakers">
  						{({ path, url }) => (
  							<Link
  								activeClassName={style.active}
  								class={style.nav_item}
  								href={rootPath + 'speakers'}
  								path={
  									path.startsWith(`${rootPath}speakers/`) ? url : undefined
  								}
  							>
  								<SpeakerIcon />
  								<span>Speakers</span>
  							</Link>
  						)}
  					</Match>
  					<Match path="/live">
  						{({ path, url }) => (
  							<Link
  								activeClassName={style.active}
  								class={style.nav_item}
  								href={rootPath + 'live'}
  								path={path.startsWith(`${rootPath}live/`) ? url : undefined}
  							>
  								<MapIcon />
  								<span>Live</span>
  							</Link>
  						)}
  					</Match>
  					<div class={style.line} />
  				</nav>
  			</div>
  		</div>
  	);
  }
}
