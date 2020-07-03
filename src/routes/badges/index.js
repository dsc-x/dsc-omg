import { h, Component } from "preact";
import IoLogo from "../../components/io_logo";
import SocialFooter from "../../components/social_footer";
import Footer from "../../components/footer";
import axios from "axios";
import style from "./style";

export default class Badges extends Component {
  constructor(props) {
    super(props);

    this.state = {
      badges: [],
      uuid: null,
      user: props.user,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== this.props.user) {
      this.setState({ user: nextProps.user });

      const email = nextProps.user.email;
      axios
        .get("https://badges.dscomg.com/api/badges?email=" + email)
        .then((response) => {
          this.setState({
            badges: response.data.badges,
            uuid: response.data.uuid,
          });
        });
    }
  }

  handleScroll() {
    const ele = document.querySelector(".topappbar.mdc-top-app-bar");
    if (document.documentElement.scrollTop < 56) {
      ele.setAttribute("top", true);
    } else {
      ele.removeAttribute("top");
    }
  }

  componentWillMount() {}

  componentDidMount() {
    document.title = "Badges - DSCOMG 2020";
    window.addEventListener("scroll", this.handleScroll, { passive: true });
    this.handleScroll();

    const email = this.props.user.email;
    axios
      .get("https://badges.dscomg.com/api/badges?email=" + email)
      .then((response) => {
        this.setState({
          badges: response.data.badges,
          uuid: response.data.uuid,
        });
      });
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    document.querySelector(".topappbar.mdc-top-app-bar").removeAttribute("top");
  }

  render({ rootPath }) {
    return (
      <div>
        <div class="hero">
          <IoLogo rootPath={rootPath + "/badges"} />
          <h1 class={style.badge_header}>The Badge Board</h1>
          <h4 class={style.badge_description}>
            Stay tuned to Developer Student Club OMG and grab some exciting
            Badges along the way.
          </h4>
          <h4>
            {this.state.user ? (
              <div>
                {this.state.user.email}
                <p>
                  Share Your badges using this{" "}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`/collection/${this.state.uuid}`}
                  >
                    public link:
                  </a>
                </p>
              </div>
            ) : (
              "Sign In to start Getting badges"
            )}
          </h4>
        </div>
        {this.state.user ? (
          <div>
            {this.state.badges.length === 0 ? (
              <div class={style.speakers}>
                No Badges earned! <br />
                Nevermind, it's not too late. Watch sessions to earn badges.
              </div>
            ) : (
              <div class={style.speakers}>
                {this.state.badges.map((item, index) => (
                  <div class={style.speaker_item}>
                    <div class={style.profile_pic}>
                      {item.image ? (
                        <img
                          alt={item.name}
                          class={style.speaker_profile_pic}
                          src={"https://badges.dscomg.com" + item.image}
                        />
                      ) : (
                        <img
                          alt={item.name}
                          class={style.speaker_profile_pic}
                          src={rootPath + "assets/person.svg"}
                        />
                      )}
                    </div>
                    <div class={style.speaker_name}>{item.name}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div class={style.speakers}>Sign-In to view badges</div>
        )}
        <div class="hero">
          <h3>
            PS - Please note that these Badges are not Certificates, and can not
            be exchanged nor transferred. <br />
            Badges here are representative souvenirs and are meant to celebrate
            the community togetherness <br />
            And your participation in the Developer Student Clubs OMG.
          </h3>
        </div>
        <div class={style.footer}>
          <SocialFooter rootPath={rootPath} user={this.props.user} />
          <Footer rootPath={rootPath} user={this.props.user} />
        </div>
      </div>
    );
  }
}
