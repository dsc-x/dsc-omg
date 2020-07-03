import { h, Component } from "preact";
import IoLogo from "../../components/io_logo";
import SocialFooter from "../../components/social_footer";
import Footer from "../../components/footer";
import style from "./style";

export default class Faq extends Component {
  handleScroll() {
    const ele = document.querySelector(".topappbar.mdc-top-app-bar");
    if (document.documentElement.scrollTop < 56) {
      ele.setAttribute("top", true);
    } else {
      ele.removeAttribute("top");
    }
  }

  componentDidMount() {
    document.title = "FAQ - DSCOMG 2020";
    window.addEventListener("scroll", this.handleScroll, { passive: true });
    this.handleScroll();
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    document.querySelector(".topappbar.mdc-top-app-bar").removeAttribute("top");
  }

  render({ rootPath }) {
    return (
      <div>
        <div class="hero">
          <IoLogo rootPath={rootPath} />
          <h2>FAQ</h2>
        </div>
        <div class={style.faq}>
          <div class={style.faq_item}>
            <div class={style.faq_title}>General</div>
            <div class={style.faq_content}>
              <p>
                <b>Session Schedule</b>
              </p>
              <p>
                The schedule can be found{" "}
                <a href={rootPath + "schedule"}>here</a>.
              </p>
              <br />
              {/* <p><b>Community Guidelines</b></p>
							<p>Our community guidelines can be found <a href={rootPath + 'faq/communityguidelines'}>here</a>. Be nice to each other, and be respectful and constructive.</p>
							<br /> */}
              <p>
                <b>When and Where</b>
              </p>
              <p>
                Developer Student Clubs OMG will take place from June 24th to
                June 28th 2020 in a virtual format through livestreams.
              </p>
              <br />
              <p>
                <b>
                  What is the Developer Student Clubs OMG? Why should I attend
                  it?
                </b>
              </p>
              <p>
                Developer Students Clubs OMG is a platform for you to come and learn
                from the Developer Student Club Leads from all across the
                country. A free and open platform for anyone to learn and grow.
              </p>
              <br />
              <p>
                <b>Who is behind Developer Student Clubs OMG?</b>
              </p>
              <p>
                Developer Student Clubs OMG is a community driven event which is
                being organised by the culmination of over 199 leads from 120
                cities across the country.{" "}
              </p>
              <br />
              <p>
                <b>What would be the language of the event?</b>
              </p>
              <p>
                All presentations at Developer Student Clubs OMG will be in
                English.
              </p>
              <br />
              <p>
                <b>
                  What all sessions will be there in Developer Student Clubs
                  OMG?
                </b>
              </p>
              <p>
                Developer Student Clubs OMG covers a wide range of technical as
                well lightning talks, head over to{" "}
                <a href={rootPath + "schedule"}>schedule</a> tab to know more.
              </p>
            </div>
          </div>
        </div>
        {/* <div class={style.faq}>
					<div class={style.faq_item}>
						<div class={style.faq_title}>Amenities</div>
						<div class={style.faq_content}>
							<p><b>Internet Access</b></p>
							<p>Attendees can connect to the WiFi network <span style="color:#d84315">SunwayEdu</span> with username <strong>fstwfg</strong> and password <strong>Sunw@y01</strong></p>
							<br />
							<p><b>Washroom</b></p>
							<p>Washrooms can be found on either side (East and West) of the Sunway University building, located behind the elevator lobbies.</p>
							<br />
							<p><b>Drinking Fountain</b></p>
							<p>Drinking fountain/bottle filling stations can be found next to all washroom entrances.</p>
							<br />
							<p><b>Surau/Prayer Room</b></p>
							<p>The Surau/Prayer Room can be found on the <strong>East wing</strong> of the Sunway University building, on the <strong>Mezzanine Floor</strong>, next to the Lunch Box.</p>
						</div>
					</div>
				</div> */}
        <div class={style.faq}>
          <div class={style.faq_item}>
            <div class={style.faq_title}>Registration</div>
            <div class={style.faq_content}>
              <p>
                <b>How can I register for Developer Student Clubs OMG?</b>
              </p>
              <p>
                <b>
                  Registrations are now open. Sign In to{" "}
                  <a href="https://dscomg.com">dscomg.com</a> to Register
                </b>
              </p>
              <br />
              <p>
                <b>What is the cost of a Developer Student Clubs OMG ticket?</b>
              </p>
              <p>Developer Student Clubs OMG event has no cost to attend.</p>
              <br />
              <p>
                <b>Can I register for someone else?</b>
              </p>
              <p>
                It is highly recommended that each person submit their own
                registration.
              </p>
              <br />
              {/* <ul>
								<li>Each individual may purchase only one ticket.</li>
								<li>You may not register on behalf of anyone else.</li>
								<li>By registering and accepting any discounts, gifts, or items of value related to DSCOMG 2020, you certify that you are able to do so in compliance with applicable laws and the internal rules of your organization.</li>
								<li>Tickets may not be sold, bartered, or auctioned in any way, and doing so may result in GDG Kuala Lumpur rendering the ticket null and void without any responsibility to GDG Kuala Lumpur.</li>
								<li>Attendees aren’t permitted to bring guests to DSCOMG 2020. If you have someone traveling with you, they’ll need to register themselves and purchase an attendee ticket.</li>
								<li>Photographs and/or video taken at DSCOMG 2020 by GDG Kuala Lumpur, or others on behalf of GDG Kuala Lumpur, may include your image or likeness. You agree that GDG Kuala Lumpur may use such photographs and/or video for any purpose without compensation to you.</li>
								<li>All information entered into the registration form must be correct and accurate to the best of your knowledge.</li>
								<li>All registered attendees agree to allow GDG Kuala Lumpur to contact them regarding their registration and attendance at the event. By registering for a ticket, you agree to allow GDG Kuala Lumpur to communicate with you via email with information regarding the event.</li>
								<li>You agree to be solely responsible for your own safety, belongings, and well-being while participating in DSCOMG 2020. GDG Kuala Lumpur won't be liable for your participation in DSCOMG 2020.</li>
								<li>No solicitation or selling of items or services is allowed at DSCOMG 2020. Any attendee conducting these activities may be removed from the conference.</li>
							</ul> */}
            </div>
          </div>
        </div>
        {/* <div class={style.faq}>
					<div class={style.faq_item}>
						<div class={style.faq_title}>Attendance Details</div>
						<div class={style.faq_content}>
							<p><b>Event Attire</b></p>
							<p>DSCOMG 2020 is a developer event, so please be comfortable and casual. There is no enforced dress code.</p>
							<br />
							<p><b>Onsite food &amp; beverages</b></p>
							<p>Attendees are offered complimentary breakfast, lunch, and tea break.</p>
							<br />
							<p><b>Smoking</b></p>
							<p>Smoking is strictly prohibited in the venue.</p>
							<br />
							<p><b>No Soliciting</b></p>
							<p>No solicitation or selling of items or services is allowed at DSCOMG 2020. Any attendee conducting these activities may be removed from the conference.</p>
							<br />
							<p><b>Community Guidelines</b></p>
							<p>Check out the full Community Guidelines <a href={rootPath + 'faq/communityguidelines'}>here</a>.</p>
						</div>
					</div>
				</div> */}
        <SocialFooter rootPath={rootPath} />
        <Footer rootPath={rootPath} />
      </div>
    );
  }
}
