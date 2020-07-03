import { h, Component } from "preact";
import IoLogo from "../../components/io_logo";
import SocialFooter from "../../components/social_footer";
import Footer from "../../components/footer";
import axios from "axios";
import style from "./style";

export default class Collection extends Component {
  constructor(props) {
    super(props);

    this.id = props.id;

    this.state = {
      badges: [],
      email: null,
    };
  }

  componentDidMount() {
    axios
      .get("https://badges.dscomg.com/api/collection/" + this.id)
      .then((response) => {
        this.setState({
          badges: response.data.badges,
          email: response.data.email,
        });
      });
  }

  render({ rootPath }) {
    return (
      <div>
        <div class="hero">
          <IoLogo rootPath={rootPath} />
          <h1 class={style.badge_header}>The Badge Board</h1>
          <h4 class={style.badge_header}>{this.state.email}</h4>
        </div>

        {this.state.email ? (
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
          <div class={style.speakers}>Invalid Public Profile</div>
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
          <SocialFooter rootPath={rootPath} />
          <Footer rootPath={rootPath} />
        </div>
      </div>
    );
  }
}
