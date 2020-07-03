import { h, Component } from "preact";
import IoLogo from "../../components/io_logo";
import VideoOnScreen from "../../components/Videoonscreen";
import SocialFooter from "../../components/social_footer";
import Footer from "../../components/footer";
import GalleryBlock from "../../components/gallery_block";
import Countdown from "../../components/Countdown";
import Dialog from "preact-material-components/Dialog";
import "preact-material-components/Dialog/style.css";
import firebase from "../../components/firebase";

import style from "./style";
import moment from "moment-timezone";

import axios from "axios";
import Snackbar from "preact-material-components/Snackbar";
import "preact-material-components/Snackbar/style.css";

export default class Home extends Component {
  constructor(props) {
    super(props);
    if (typeof window !== "undefined") {
      this.io = new IntersectionObserver(
        (entries) => {
          const visibleEntries = entries.filter((e) => e.isIntersecting);

          visibleEntries
            .filter((e) => e.target instanceof HTMLImageElement)
            .forEach((e) => {
              e.target.src = e.target.dataset.src;
            });
        },
        {
          /* Using default options. Details below */
        }
      );
    }

    this.getYTBadge = this.getYTBadge.bind(this);
    this.getDayNightBadge = this.getDayNightBadge.bind(this);
  }
  handleScroll() {
    const ele = document.querySelector(".topappbar.mdc-top-app-bar");
    if (document.documentElement.scrollTop < 56) {
      ele.setAttribute("top", true);
    } else {
      ele.removeAttribute("top");
    }
  }

  showRefreshSnack = () => {
    this.snackbar.MDComponent.show({
      message: "Site updated. Refresh this page for better experience.",
      actionText: "Refresh",
      timeout: 5000,
      actionHandler: () => {
        window.location.reload();
      },
    });
  };

  componentDidMount() {
    document.title = "DSCOMG 2020";
    window.addEventListener("scroll", this.handleScroll, { passive: true });
    this.handleScroll();

    const ele = document.querySelector(".belt");
    const cover = document.querySelector("#cover");
    const sponsorLogos = document.querySelectorAll(".sponsor_logo");

    window.addEventListener("showRefreshSnack", this.showRefreshSnack);

    if (!this.io) return;

    this.io.observe(ele);
    this.io.observe(cover);
    sponsorLogos.forEach((logo) => this.io.observe(logo));
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    document.querySelector(".topappbar.mdc-top-app-bar").removeAttribute("top");
    window.removeEventListener("showRefreshSnack", this.showRefreshSnack);

    if (!this.io) return;
    this.io.disconnect();
  }

  signIn = () => {
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
  };

  signOut = () => {
    // eslint-disable-next-line no-undef
    gtag("event", "logout", { method: "Google" });

    firebase
      .auth()
      .signOut()
      .then(() => {
        this.signoutDig.MDComponent.close();
      });
  };

  toggleSigninDig = () => {
    // eslint-disable-next-line no-undef
    gtag("event", "login", { method: "Google" });

    this.signIn();
  };

  toggleSignoutDig = () => {
    this.signoutDig.MDComponent.show();
  };

  getYTBadge() {
    axios
      .post("https://badges.dscomg.com/api/session/", {
        session: "YTsub",
        email: this.props.user.email,
      })
      .then(
        (response) => {
          if (response.data.badgeEarned) {
            this.snackbar.MDComponent.show({
              message: "You earned a badge!",
              timeout: 5000,
            });
          } else {
            this.snackbar.MDComponent.show({
              message: "You already have this badge",
              timeout: 5000,
            });
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  getDayNightBadge() {
    var now = moment.tz("Asia/Kolkata");

    var sessionCurrent = "D0S0";

    if (
      now >= moment.tz("2020-06-26 04:00", "Asia/Kolkata") &&
      now < moment.tz("2020-06-26 18:00", "Asia/Kolkata")
    ) {
      sessionCurrent = "morning";
    } else if (
      now >= moment.tz("2020-06-27 04:00", "Asia/Kolkata") &&
      now < moment.tz("2020-06-27 18:00", "Asia/Kolkata")
    ) {
      sessionCurrent = "morning";
    } else if (
      now >= moment.tz("2020-06-28 04:00", "Asia/Kolkata") &&
      now < moment.tz("2020-06-28 18:00", "Asia/Kolkata")
    ) {
      sessionCurrent = "morning";
    } else if (
      now >= moment.tz("2020-06-26 21:00", "Asia/Kolkata") &&
      now < moment.tz("2020-06-27 04:00", "Asia/Kolkata")
    ) {
      sessionCurrent = "night";
    } else if (
      now >= moment.tz("2020-06-27 21:00", "Asia/Kolkata") &&
      now < moment.tz("2020-06-28 04:00", "Asia/Kolkata")
    ) {
      sessionCurrent = "night";
    } else if (
      now >= moment.tz("2020-06-28 21:00", "Asia/Kolkata") &&
      now < moment.tz("2020-06-29 04:00", "Asia/Kolkata")
    ) {
      sessionCurrent = "night";
    } else {
      this.snackbar.MDComponent.show({
        message:
          "Unlocks at another time ;) Hint - Focus on watching stream now",
        timeout: 5000,
      });
    }

    if (sessionCurrent !== "D0S0") {
      axios
        .post("https://badges.dscomg.com/api/session/", {
          session: sessionCurrent,
          email: this.props.user.email,
        })
        .then(
          (response) => {
            if (response.data.badgeEarned) {
              this.snackbar.MDComponent.show({
                message: "You earned a badge!",
                timeout: 5000,
              });
            } else {
              this.snackbar.MDComponent.show({
                message: "You already have this badge",
                timeout: 5000,
              });
            }
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }

  render({ rootPath, user }) {
    return (
      <div>
        <div className={[style.signout_dialog, "signout_dialog"].join(" ")}>
          <Dialog
            onCancel={this.onClose}
            onAccept={this.onClose}
            ref={(signoutDig) => {
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

        <div class={`${style.hero} hero`}>
          <div class={style.hero_title}>
            <IoLogo rootPath={rootPath} />
            <h2>
              Developer Student Clubs OMG brings together developers from around
              the globe for talks, hands-on learning with Developer Student Club
              Leads and Google experts, and a first look at some of the amazing
              Community Projects.
            </h2>
            <br />
            <h4>28 June 2020 · Day 5 Coming Up</h4>
            <br />
            <div class={style.button_holder}>
              {user ? (
                <div>
                  <h4>
                    Hello there, welcome to OMG 🥳 <br />
                    Check your mailbox for the Welcome Kit!
                  </h4>
                  <br />
                  <a
                    href="https://myframe.dscomg.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button class={style.action_button}>
                      Get your <b>OMG</b> Frame
                    </button>
                  </a>
                  <a
                    href="https://www.youtube.com/channel/UCCR8rHzvm0l9E7DNa6Y_OGA?sub_confirmation=1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button
                      class={style.action_button}
                      onClick={this.getYTBadge}
                    >
                      Subscribe on YouTube | Earn a Badge
                    </button>
                  </a>
                  <button
                    class={style.action_button}
                    onClick={this.getDayNightBadge}
                  >
                    A Badge?
                  </button>
                </div>
              ) : (
                <div class={style.action_button} onClick={this.toggleSigninDig}>
                  Sign-In to Register
                </div>
              )}

              {/* <a href="https://sessionize.com/dscomg" target="_blank" rel="noopener noreferrer">
                  <button class={style.action_button}>Call for Proposal</button>
                </a>   */}
            </div>
          </div>
          <Countdown />
        </div>
        <div class={`${style.belt} belt`}>
          <img
            id="cover"
            crossorigin="anonymous"
            data-src="https://res.cloudinary.com/distortedaura/image/upload/v1591563925/DSCOMG/IMG_6116.jpg"
          />
        </div>
        <div class={style.home_info} id="headsup">
          <div class={style.text}>
            <h3>What you need to know, before you ask.</h3>
            <p>
              The Online Mega Gathering - aka OMG brings together the world
              class experts in Design, Android, Web, Machine Learning, Cloud
              technologies and much more for a week of sessions, workshops and
              showcases.
            </p>
            <div class={style.button_holder}>
              <a
                href="https://contest.dscomg.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button class={style.action_button}>
                  Tweet <b>&#x23;dscomg</b>
                </button>
              </a>

              <a
                href="https://myframe.dscomg.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button class={style.action_button}>
                  Get your <b>OMG</b> Frame
                </button>
              </a>
            </div>
          </div>
          <div class={style.stats}>
            <div class={style.stat}>
              <div class={style.number}>20+</div>
              <div class={style.label}>Sessions</div>
            </div>
            <div class={style.stat}>
              <div class={style.number}>5</div>
              <div class={style.label}>Days</div>
            </div>
          </div>
        </div>
        
        <GalleryBlock />


        <div class={style.home_info} id="headsup" style="padding-bottom: 10px">
          <div class={style.text}>
            <h3>Watch on Demand</h3>
            <p>
              Missed watching the Sessions live? <br/>Watch the Streams from Developer Students Club OMG here.
            </p>
            </div>
        </div>
        <VideoOnScreen />

        <SocialFooter rootPath={rootPath} user={user} />
        <Footer rootPath={rootPath} user={user} />
        <Snackbar
          ref={(snackbar) => {
            this.snackbar = snackbar;
          }}
        />
      </div>
    );
  }
}
