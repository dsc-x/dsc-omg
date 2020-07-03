import { Component } from "preact";
import IoLogo from "../../components/io_logo";
import SocialFooter from "../../components/social_footer";
import Footer from "../../components/footer";
import style from "./style";
import TimeFormat from "hh-mm-ss";
import moment from "moment-timezone";
import axios from "axios";
import Snackbar from "preact-material-components/Snackbar";
import "preact-material-components/Snackbar/style.css";

export default class EventLivePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      remaining: 900000,
      user: props.user,
    };

    this.ticker = this.ticker.bind(this);
    this.subTimer = this.subTimer.bind(this);
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

  componentWillUnmount() {
    window.removeEventListener("showRefreshSnack", this.showRefreshSnack);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== this.props.user) {
      this.setState({ user: nextProps.user });
    }
  }

  componentDidMount() {
    const user = this.props.user;
    this.setState({ user: user });
    window.addEventListener("showRefreshSnack", this.showRefreshSnack);
  }

  handleScroll() {
    const ele = document.querySelector(".topappbar.mdc-top-app-bar");
    if (document.documentElement.scrollTop < 56) {
      ele.setAttribute("top", true);
    } else {
      ele.removeAttribute("top");
    }
  }

  performPost() {
    var now = moment.tz("Asia/Kolkata");

    var sessionCurrent = "D0S0";

    if (
      now >= moment.tz("2020-06-28 18:00", "Asia/Kolkata") &&
      now < moment.tz("2020-06-28 18:30", "Asia/Kolkata")
    ) {
      sessionCurrent = "D5S1";
    } else if (
      now >= moment.tz("2020-06-28 18:30", "Asia/Kolkata") &&
      now < moment.tz("2020-06-28 19:15", "Asia/Kolkata")
    ) {
      sessionCurrent = "D5S1";
    } else if (
      now >= moment.tz("2020-06-28 19:15", "Asia/Kolkata") &&
      now < moment.tz("2020-06-28 20:05", "Asia/Kolkata")
    ) {
      sessionCurrent = "D5S2";
    } else if (
      now >= moment.tz("2020-06-28 20:05", "Asia/Kolkata") &&
      now < moment.tz("2020-06-28 20:40", "Asia/Kolkata")
    ) {
      sessionCurrent = "D5S4";
    } else if (
      now >= moment.tz("2020-06-28 20:40", "Asia/Kolkata") &&
      now < moment.tz("2020-06-28 21:00", "Asia/Kolkata")
    ) {
      sessionCurrent = "D5S3";
    }

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
              message: "Points Collected! Earn more points to get a badge.",
              timeout: 5000,
            });
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  subTimer() {
    this.setState({ remaining: 900000 });
    this.performPost();
  }

  ticker() {
    var remainingTime = this.state.remaining;
    this.setState({ remaining: remainingTime - 1000 });
  }

  componentDidMount() {
    document.title = "Event Live - DSCOMG 2020";
    window.addEventListener("scroll", this.handleScroll, { passive: true });
    this.handleScroll();

    var ticker = setInterval(this.ticker, 1000);
    this.setState({ ticker: ticker });

    var subTimer = setInterval(this.subTimer, 900000);
    this.setState({ subTimer: subTimer });
  }

  componentWillUnmount() {
    document.querySelector(".topappbar.mdc-top-app-bar").removeAttribute("top");

    clearInterval(this.state.subTimer);
    clearInterval(this.state.ticker);
  }

  render({ rootPath, user }) {
    return (
      <div class={style.scrollbar}>
        {/* {info && info.map_image && (<img class={style.mapImage} crossorigin="anonymous"  src={info.map_image} />)}
         */}
        <div class={`${style.hero} hero`}>
          <IoLogo rootPath={rootPath} />
          <h2>Watch live</h2>
          <div class={style.youtube_embed}>
            <iframe
              src="https://www.youtube.com/embed/9o5CDkeWPmM"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
            {/* <iframe class={style.chat_embed} src="https://www.youtube.com/live_chat?v=vxwpPOz_5os" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}
          </div>
          <p>
            If you cannot watch the video here, use the button below to open
            YouTube in a new Tab &nbsp;👇 <br />
            <div class={style.button_holder}>
              <a
                href="https://www.youtube.com/live_chat?v=9o5CDkeWPmM"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button class={style.action_button}>Open Live Chat</button>
              </a>

              <a
                href="https://www.youtube.com/watch?v=9o5CDkeWPmM"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button class={style.action_button}>Open on YouTube</button>
              </a>
            </div>
          </p>

          <p>
            Stay Tuned here for the Live Sessions, updates and much, much more.
            PS - Don't close this tab to earn Badges.
            <br />
            Also, subscribe to our YouTube Channel and hit the Bell Icon to get
            more updates.
          </p>
          <button class={style.action_timer}>
            <b>
              {this.props.user
                ? `Claiming Points in ${TimeFormat.fromMs(
                    this.state.remaining
                  )}`
                : "You need to be Signed in to receive Badges"}
            </b>
          </button>
          <p style={{ fontSize: "85%", padding: 0, margin: 0 }}>
            * Claim points for each session to earn Badges. Do keep this tab
            open while watching the stream to keep collecting points. <br />*
            Badges are granted after crossing a certain threshold of points.
          </p>
          <p>* Points are collected after EVERY 15 minutes</p>

          <br />
          <br />
        </div>
        <Snackbar
          ref={(snackbar) => {
            this.snackbar = snackbar;
          }}
        />
        <div class={style.footer}>
          <SocialFooter rootPath={rootPath} user={this.props.user} />
          <Footer rootPath={rootPath} user={this.props.user} />
        </div>
      </div>
    );
  }
}
