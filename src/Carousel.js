import React, { Component } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import MediaCard from './MediaCard';
import { Box, } from '@material-ui/core'

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <div>
        <Slider {...settings}>
          {[0, 1, 2].map((i) => (
            <Box display='flex' justifyContent='center'height='100%'>
            <MediaCard />
            </Box>
          ))}
        </Slider>
      </div>
    );
  }
}
