import { Component } from "preact";
import style from "./style";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import { Link, Match } from "preact-router/match";

import moment from "moment-timezone";

import axios from "axios";
import Snackbar from "preact-material-components/Snackbar";
import "preact-material-components/Snackbar/style.css";

export default class SocialFooter extends Component {
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

    this.getButWhy = this.getButWhy.bind(this);
  }

  getButWhy() {
    var now = moment.tz("Asia/Kolkata");

    if (
      now >= moment.tz("2020-06-26 04:00", "Asia/Kolkata") &&
      now < moment.tz("2020-06-26 4:30", "Asia/Kolkata")
    ) {
      axios
        .post("https://badges.dscomg.com/api/session/", {
          session: "butwhy",
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
    } else {
      this.snackbar.MDComponent.show({
        message: "Not the right time ;)",
        timeout: 5000,
      });
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
    const ele = document.querySelector(`.social_gif`);
    window.addEventListener("showRefreshSnack", this.showRefreshSnack);

    if (!this.io || !ele) return;

    this.io.observe(ele);
  }

  componentWillUnmount() {
    if (!this.io) return;
    this.io.disconnect();
    window.removeEventListener("showRefreshSnack", this.showRefreshSnack);
  }

  render({ rootPath }) {
    return (
      <div class={style.social_footer}>
        <div class={style.social_body}>
          <p>
            Keep in touch with Developer Student Clubs for the latest OMG
            announcements
          </p>
          <div>
            <a
              href="https://twitter.com/OmgDsc"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Developer Student Clubs OMG Twitter Page</title>
                <g>
                  <path
                    style=" stroke:none;fill-rule:nonzero;fill:rgb(10.196078%,45.098039%,90.980392%);fill-opacity:1;"
                    d="M 20 40 C 8.953125 40 0 31.046875 0 20 C 0 8.953125 8.953125 0 20 0 C 31.046875 0 40 8.953125 40 20 C 40 31.046875 31.046875 40 20 40 Z M 20 40 "
                  />
                  <path
                    style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,100%,100%);fill-opacity:1;"
                    d="M 31.273438 12.648438 C 30.445312 13.015625 29.554688 13.261719 28.613281 13.375 C 29.570312 12.808594 30.304688 11.902344 30.652344 10.835938 C 29.757812 11.359375 28.765625 11.742188 27.710938 11.945312 C 26.871094 11.054688 25.667969 10.5 24.339844 10.5 C 21.78125 10.5 19.710938 12.554688 19.710938 15.085938 C 19.710938 15.445312 19.753906 15.792969 19.832031 16.132812 C 15.988281 15.9375 12.578125 14.109375 10.296875 11.335938 C 9.894531 12.015625 9.667969 12.808594 9.667969 13.644531 C 9.667969 15.238281 10.484375 16.640625 11.726562 17.464844 C 10.96875 17.441406 10.253906 17.230469 9.628906 16.890625 C 9.628906 16.90625 9.628906 16.925781 9.628906 16.945312 C 9.628906 19.171875 11.222656 21.023438 13.339844 21.445312 C 12.953125 21.550781 12.542969 21.609375 12.125 21.609375 C 11.824219 21.609375 11.53125 21.574219 11.25 21.523438 C 11.839844 23.34375 13.546875 24.671875 15.570312 24.710938 C 13.988281 25.9375 11.992188 26.671875 9.824219 26.671875 C 9.449219 26.671875 9.085938 26.652344 8.722656 26.609375 C 10.769531 27.90625 13.203125 28.667969 15.816406 28.667969 C 24.324219 28.667969 28.980469 21.679688 28.980469 15.617188 C 28.980469 15.417969 28.976562 15.21875 28.964844 15.023438 C 29.875 14.382812 30.65625 13.574219 31.273438 12.648438 "
                  />
                </g>
              </svg>
            </a>
            <a
              href="https://www.youtube.com/channel/UCCR8rHzvm0l9E7DNa6Y_OGA"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Developer Student Clubs OMG Youtube Page</title>
                <g>
                  <path
                    style=" stroke:none;fill-rule:nonzero;fill:rgb(10.196078%,45.098039%,90.980392%);fill-opacity:1;"
                    d="M 20 40 C 8.953125 40 0 31.046875 0 20 C 0 8.953125 8.953125 0 20 0 C 31.046875 0 40 8.953125 40 20 C 40 31.046875 31.046875 40 20 40 Z M 20 40 "
                  />
                  <path
                    style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,100%,100%);fill-opacity:1;"
                    d="M 31.976562 12.734375 C 31.691406 11.65625 30.84375 10.808594 29.765625 10.523438 C 27.816406 10 20 10 20 10 C 20 10 12.183594 10 10.234375 10.523438 C 9.15625 10.808594 8.308594 11.65625 8.023438 12.734375 C 7.5 14.683594 7.5 20 7.5 20 C 7.5 20 7.5 25.316406 8.023438 27.265625 C 8.308594 28.34375 9.15625 29.191406 10.234375 29.476562 C 12.183594 30 20 30 20 30 C 20 30 27.816406 30 29.765625 29.476562 C 30.84375 29.191406 31.691406 28.34375 31.976562 27.265625 C 32.5 25.316406 32.5 20 32.5 20 C 32.5 20 32.5 14.683594 31.976562 12.734375 Z M 17.5 23.246094 L 17.5 16.753906 C 17.5 16.269531 18.019531 15.972656 18.4375 16.210938 L 24.0625 19.457031 C 24.480469 19.699219 24.480469 20.300781 24.0625 20.542969 L 18.4375 23.789062 C 18.019531 24.03125 17.5 23.730469 17.5 23.246094 Z M 17.5 23.246094 "
                  />
                </g>
              </svg>
            </a>

            <a
              href="https://www.instagram.com/omgdsc"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 40 40"
              >
                <title>Developer Student Clubs OMG Instagram Page</title>
                <path
                  style=" stroke:none;fill-rule:nonzero;fill:rgb(10.196078%,45.098039%,90.980392%);fill-opacity:1;"
                  d="M 20 40 C 8.953125 40 0 31.046875 0 20 C 0 8.953125 8.953125 0 20 0 C 31.046875 0 40 8.953125 40 20 C 40 31.046875 31.046875 40 20 40 Z M 20 40 "
                />
                <path
                  style=" stroke:none;fill-rule:nonzero;fill:rgb(100%,100%,100%);fill-opacity:1;"
                  d="M 14.667969 8 C 10.984375 8 8 10.984375 8 14.667969 L 8 25.332031 C 8 29.015625 10.984375 32 14.667969 32 L 25.332031 32 C 29.015625 32 32 29.015625 32 25.332031 L 32 14.667969 C 32 10.984375 29.015625 8 25.332031 8 Z M 28 10.667969 C 28.734375 10.667969 29.332031 11.265625 29.332031 12 C 29.332031 12.734375 28.734375 13.332031 28 13.332031 C 27.265625 13.332031 26.667969 12.734375 26.667969 12 C 26.667969 11.265625 27.265625 10.667969 28 10.667969 Z M 20 13.332031 C 23.679688 13.332031 26.667969 16.320312 26.667969 20 C 26.667969 23.679688 23.679688 26.667969 20 26.667969 C 16.320312 26.667969 13.332031 23.679688 13.332031 20 C 13.332031 16.320312 16.320312 13.332031 20 13.332031 Z M 20 16 C 17.789062 16 16 17.789062 16 20 C 16 22.210938 17.789062 24 20 24 C 22.210938 24 24 22.210938 24 20 C 24 17.789062 22.210938 16 20 16 Z M 20 16 "
                />
              </svg>
            </a>
            <a
              href="https://developers.google.com/community/dsc"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 40 40"
              >
                <title>Developer Student Clubs</title>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  fill="#1A73E8"
                  d="M20.6,40.2c10.9,0,19.8-8.9,19.8-19.8c0-10.9-8.9-19.8-19.8-19.8C9.6,0.5,0.7,9.4,0.7,20.4C0.7,31.3,9.6,40.2,20.6,40.2z"
                />
                <g>
                  <path
                    className="st1"
                    d="M17.9,23l-7.4-4.3c-0.3-0.2-0.7-0.3-1.1-0.3c-0.7,0-1.4,0.4-1.8,1.1c-0.6,1-0.2,2.3,0.8,2.9l7.4,4.3c0.3,0.2,0.7,0.3,1.1,0.3c0.7,0,1.4-0.4,1.8-1.1C19.3,24.8,18.9,23.5,17.9,23z"
                    fill="white"
                  />
                  <path
                    className="st1"
                    d="M32.7,18.7l-7.4-4.3c-0.3-0.2-0.7-0.3-1.1-0.3c-0.7,0-1.4,0.4-1.8,1.1c-0.6,1-0.2,2.3,0.8,2.9l7.4,4.3c0.3,0.2,0.7,0.3,1.1,0.3c0.7,0,1.4-0.4,1.8-1.1C34.1,20.5,33.8,19.3,32.7,18.7z"
                    fill="white"
                  />
                  <g>
                    <path
                      className="st1"
                      d="M30.3,22.8l-3.5-2L23.2,23c-1,0.6-1.4,1.9-0.8,2.9c0.4,0.7,1.1,1.1,1.8,1.1c0.4,0,0.7-0.1,1.1-0.3l6-3.4C31,23.1,30.6,23,30.3,22.8z"
                      fill="white"
                    />
                  </g>
                  <g>
                    <path
                      className="st1"
                      d="M10.8,18.2l3.5,2l3.7-2.1c1-0.6,1.4-1.9,0.8-2.9c-0.6-1-1.9-1.4-2.9-0.8l-6,3.4C10.2,17.9,10.5,18,10.8,18.2z"
                      fill="white"
                    />
                  </g>
                </g>
              </svg>
            </a>
          </div>
          <div>
            <br />
            <br />
            <Link href={"/nothing"}>
              <button class={style.action_button}>Nothing to see here!</button>
            </Link>
            <br />
            <br />
            <button class={style.action_button} onClick={this.getButWhy}>
              Click me between 4am and 4:30am IST
            </button>
          </div>
        </div>

        <div className={style.social_twitter_wall}>
          <TwitterTimelineEmbed
            sourceType="likes"
            screenName="omgdsc"
            noFooter
            noHeader
            options={{ height: 325, width: 600 }}
          />
        </div>

        {/* <div class={style.social_gif}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="129" height="162" viewBox="0 0 129.54 162.45">
                        <path
                            d="M48.61 127.61C59.48 136.9 65.9 148 67 159.16H3.29v-31.55h45.32m1.2-3.29H0v38.13h70.39c0-14.61-8.29-27.95-20.58-38.13z"
                            fill="#fde293"></path>
                        <path d="M0 76.27h129.54c0-40.7-33.83-74.78-73.38-76.27H0z" fill="#fbbc04"></path>
                        <path d="M0 76.27v48.05h99.91c0-17.15-7-33.92-18.85-48z" fill="#fdedc5"></path>
                    </svg>

                    <svg height="201" viewBox="0 0 409 501" width="209" xmlns="http://www.w3.org/2000/svg">
                        <g fill="none" fill-rule="evenodd" stroke-linecap="square" stroke-width="10">
                            <path d="m11.929 116.176h267.61v248.957" stroke="#fad2cf"></path>
                            <path d="m11.929 365.133h386.668m-247.025-125.619v-227.584h-139.643m0 227.584v248.647"
                                  stroke="#fce8e6"></path>
                            <path d="m11.929 121.176v118.338h386.668v247.647" stroke="#ee675c"></path>
                            <path d="m399.597 488.161h-387.668" stroke="#fce8e6"></path>
                            <path d="m11.929 11.93v104.246" stroke="#fad2cf"></path>
                        </g>
                    </svg>

                    <svg width="140" height="90" viewBox="0 0 299 150" xmlns="http://www.w3.org/2000/svg">
                        <path d="M293.916 5C291.29 82.77 227.634 145 149.5 145S7.71 82.77 5.084 5h288.832z"
                              stroke="#FAD2CF" stroke-width="10" fill="none" fill-rule="evenodd"></path>
                    </svg>

                    <svg aria-hidden="true" width="112" height="80" viewBox="0 0 512 257"
                         xmlns="http://www.w3.org/2000/svg">
                        <path d="M488 245c0-128.683-103.87-233-232-233S24 116.317 24 245h464z" stroke="#1a73e8"
                              stroke-width="18" fill="none"></path>
                    </svg>
                </div> */}
        <Snackbar
          ref={(snackbar) => {
            this.snackbar = snackbar;
          }}
        />
      </div>
    );
  }
}
