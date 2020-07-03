import { h, Component } from "preact";
import IoLogo from "../../components/io_logo";
import SocialFooter from "../../components/social_footer";
import Footer from "../../components/footer";
import style from "./style";

import axios from "axios";
import Snackbar from "preact-material-components/Snackbar";
import "preact-material-components/Snackbar/style.css";

export default class Nothing extends Component {
  constructor(props) {
    super(props);
    this.cena = this.cena.bind(this);
  }

  handleScroll() {
    const ele = document.querySelector(".topappbar.mdc-top-app-bar");
    if (document.documentElement.scrollTop < 56) {
      ele.setAttribute("top", true);
    } else {
      ele.removeAttribute("top");
    }
  }

  cena() {
    axios
      .post("https://badges.dscomg.com/api/session/", {
        session: "cena",
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
    document.title = "Nothing - DSCOMG 2020";
    window.addEventListener("scroll", this.handleScroll, { passive: true });
    this.handleScroll();
    window.addEventListener("showRefreshSnack", this.showRefreshSnack);
    this.cena();
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    document.querySelector(".topappbar.mdc-top-app-bar").removeAttribute("top");
    window.removeEventListener("showRefreshSnack", this.showRefreshSnack);
  }

  render({ rootPath }) {
    return (
      <div>
        <div class="hero">
          <IoLogo rootPath={rootPath} />
          <button class={style.action_button} onClick={this.cena}>
            Anyway Get a badge
          </button>
          <h2>Told you this was a blank page</h2>
          <img src="https://pbs.twimg.com/profile_images/414720320482709504/4BjoxjIf.jpeg" />
        </div>

        <SocialFooter rootPath={rootPath} />
        <Footer rootPath={rootPath} />
        <Snackbar
          ref={(snackbar) => {
            this.snackbar = snackbar;
          }}
        />
      </div>
    );
  }
}
