/**
 * Copyright 2016 Oleh Zasadnyy, GDG Lviv
 * Source: https://github.com/gdg-x/hoverboard
 */

import { Component } from "preact";
import style from "./style";

export default class GalleryBlock extends Component {
  constructor(props) {
    super(props);
    if (typeof window !== "undefined") {
      this.io = new IntersectionObserver(
        entries => {
          const visibleEntries = entries.filter(e => e.isIntersecting);

          visibleEntries
            .filter(e => e.target instanceof HTMLImageElement)
            .forEach(e => {
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
    if (!this.io) return;

    const elements = document.querySelectorAll(`.${style.grid_item}`);

    elements.forEach(element => this.io.observe(element));
  }

  componentWillUnmount() {
    if (!this.io) return;

    this.io.disconnect();
  }

  render() {
    return (
      <div class={style.photos_grid}>
        <img
          crossorigin="anonymous"
          class={style.grid_item}
          data-src="https://res.cloudinary.com/distortedaura/image/upload/v1591282863/DSCOMG/20190824_141027.jpg"
        />
        <img
          crossorigin="anonymous"
          class={style.grid_item}
          data-src="https://res.cloudinary.com/distortedaura/image/upload/v1591282861/DSCOMG/992162d2-175b-4360-b6ef-78d8ab082155.jpg"
        />
        <img
          crossorigin="anonymous"
          class={style.grid_item}
          data-src="https://res.cloudinary.com/distortedaura/image/upload/v1591282679/DSCOMG/IMG_20190824_190220.jpg"
        />
        <img
          crossorigin="anonymous"
          class={style.grid_item}
          data-src="https://res.cloudinary.com/distortedaura/image/upload/v1591282674/DSCOMG/IMG_20190823_212816.jpg"
        />
        <img
          crossorigin="anonymous"
          class={style.grid_item}
          data-src="https://res.cloudinary.com/distortedaura/image/upload/v1592858574/DSCOMG/AVI_6305.jpg"
        />
        <img
          crossorigin="anonymous"
          class={style.grid_item}
          data-src="https://res.cloudinary.com/distortedaura/image/upload/v1591282674/DSCOMG/IMG_20190823_204504.jpg"
        />
        <img
          crossorigin="anonymous"
          class={style.grid_item}
          data-src="https://res.cloudinary.com/distortedaura/image/upload/v1591950808/DSCOMG/IMG_0895.jpg"
        />
        <img
          crossorigin="anonymous"
          class={style.grid_item}
          data-src="https://res.cloudinary.com/distortedaura/image/upload/v1591950925/DSCOMG/IMG_1005.jpg"
        />
        <div crossorigin="anonymous" class={style.gallery_info}>
          <div>
            <h2>Developer Student Club India highlights</h2>
            <p>
              Developer Student Clubs has been a vibrant community for Developers across the world. Check out photos
              from featured talks, hands-on learning sessions, and after-hours
              fun.
            </p>
          </div>
          {/* <a
            href="https://photos.app.goo.gl/uw6aRmAurGVjafrt8"
            target="_blank"
            rel="noopener noreferrer"
          >
            See all photos
          </a> */}
        </div>
      </div>
    );
  }
}
