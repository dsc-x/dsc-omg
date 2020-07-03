import { Component } from "preact";
import style from "./style";

export default class VideoOnScreen extends Component {
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
  }



  componentDidMount() {
    const ele = document.querySelector(`.video_embed`);
    if (!this.io || !ele) return;

    this.io.observe(ele);
  }

  componentWillUnmount() {
    if (!this.io) return;
    this.io.disconnect();
  }

  render({ rootPath }) {
    return (
      <div class={style.video_embed}>
            <div class={style.col_1}>
                <iframe class={style.homescreen_embed} src="https://www.youtube.com/embed/vxwpPOz_5os" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <div class={style.col_1}>
                <iframe class={style.homescreen_embed} src="https://www.youtube.com/embed/RNuaH3XkU4U" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <div class={style.col_1}>
                <iframe class={style.homescreen_embed} src="https://www.youtube.com/embed/Efwa0lTJLsc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <div class={style.col_1}>
                <iframe class={style.homescreen_embed} src="https://www.youtube.com/embed/unzi3EtZysA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
      </div>
    );
  }
}
