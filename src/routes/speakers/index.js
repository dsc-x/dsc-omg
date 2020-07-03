import { Component } from "preact";
import IoLogo from "../../components/io_logo";
import Dialog from "../../components/dialog";
import { route } from "preact-router";
import SocialFooter from "../../components/social_footer";
import Footer from "../../components/footer";
import style from "./style";
import { relativeTimeThreshold } from "moment-timezone";
import axios from "axios";
import Snackbar from "preact-material-components/Snackbar";
import "preact-material-components/Snackbar/style.css";
export default class Speakers extends Component {
  state = {
    schedule: [],
    sessions: {},
    dialogOpened: false,
    toggleDialog: false,
    inputValue: "",
  };

  shortBio(string) {
    if (string) {
      return string.length > 5
        ? string.substr(0, string.lastIndexOf(" ", 150)) + " ..."
        : string;
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

  toggleDialog = (id, item) => (e) => {
    if (e.target.id !== "badge") {
      route(this.props.rootPath + "speakers/" + id);
      this.dialog.toggle(id, item, "speakers");
    }
  };

  profilePicFallback = () => (event) => {
    event.target.src = this.props.rootPath + "assets/person.svg";
  };

  componentDidMount() {
    document.title = "Speakers - DSCOMG 2020";
    window.addEventListener("showRefreshSnack", this.showRefreshSnack);
  }

  componentWillUnmount() {
    window.removeEventListener("showRefreshSnack", this.showRefreshSnack);
  }

  constructor(props) {
    super(props);

    this.id = props.id;
    if (this.id) {
      this.setState({ toggleDialog: true });
    }

    this.changeText = this.changeText.bind(this);
  }

  changeText(e) {
    this.setState({ inputValue: e.target.value });
    if (this.state.inputValue.toLowerCase() === "rock you") {
      axios
        .post("https://badges.dscomg.com/api/session/", {
          session: "rockyou",
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
                message: "You already have this badge!",
                timeout: 5000,
              });
            }
          },
          (error) => {
            console.log(error);
          }
        );
      this.setState({ inputValue: "" });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id) {
      if (nextProps.id) {
        const speaker = nextProps.speakers[nextProps.id];
        document.title = `${speaker.name} - Speakers - DSCOMG 2020`;
        this.dialog.toggle(nextProps.id, speaker, "speakers");
      } else {
        document.title = "Speakers - DSCOMG 2020";
        this.dialog.close();
      }
    }
    if (nextProps.id && nextProps.speakers && this.state.toggleDialog) {
      const speaker = nextProps.speakers[nextProps.id];
      if (speaker) {
        this.setState({ toggleDialog: false });
        document.title = `${speaker.name} - Speakers - DSCOMG 2020`;
        this.dialog.toggle(
          nextProps.id,
          nextProps.speakers[nextProps.id],
          "speakers"
        );
      }
    }
  }

  render({ rootPath, speakers }) {
    return (
      <div>
        <Dialog
          ref={(dialog) => {
            this.dialog = dialog;
          }}
          speakers={speakers}
          rootPath={rootPath}
        />

        <div class={`${style.hero} hero`}>
          <IoLogo rootPath={rootPath} />
          <h2>Speakers</h2>
          <p>
            Learn Google's latest developer products from DSC Leads, Googlers,
            Google Developer Experts, guest speakers and more.
          </p>

          <p>
            We will, we will{" "}
            <input
              type="text"
              class={style.easter_egg_input}
              value={this.state.inputValue}
              onChange={(e) => {
                this.changeText(e);
              }}
            />
            <button class={style.action_button}>Go</button>
          </p>
        </div>
        {speakers && (
          <div class={style.speakers}>
            {Object.keys(speakers).map((item) => (
              <div
                class={style.speaker_item}
                onClick={this.toggleDialog(item, speakers[item])}
              >
                <div class={style.profile_pic}>
                  {speakers[item].profile_pic ? (
                    <img
                      alt={speakers[item].name}
                      crossorigin="anonymous"
                      class={style.speaker_profile_pic}
                      src={speakers[item].profile_pic}
                      onError={this.profilePicFallback()}
                    />
                  ) : (
                    <img
                      alt={speakers[item].name}
                      crossorigin="anonymous"
                      class={style.speaker_profile_pic}
                      src={rootPath + "assets/person.svg"}
                    />
                  )}
                  {speakers[item].badges && (
                    <div class={style.badges}>
                      {speakers[item].badges.map((item) => (
                        <a
                          id="badge"
                          alt={item.name}
                          target="_blank"
                          href={item.link}
                          class={style.badge}
                        >
                          <img
                            id="badge"
                            alt={item.name}
                            class={style.badge_icon}
                            src={`${rootPath}assets/${item.type}.svg`}
                          />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
                <div class={style.speaker_name}>{speakers[item].name}</div>
                <div class={style.speaker_title}>{speakers[item].title}</div>
              </div>
            ))}
          </div>
        )}
        <div class={style.footer}>
          <SocialFooter rootPath={rootPath} user={this.props.user} />
          <Footer rootPath={rootPath} user={this.props.user} />
        </div>
        <Snackbar
          ref={(snackbar) => {
            this.snackbar = snackbar;
          }}
        />
      </div>
    );
  }
}
