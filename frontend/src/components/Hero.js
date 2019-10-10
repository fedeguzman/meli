import React from "react";

const Hero = () => {
  return (
    <div className="hero">
      <picture>
        <source
          media="(max-width: 1000px)"
          srcSet="https://http2.mlstatic.com/optimize/o:f_webp/resources/exhibitors/MLA-dia-de-la-madre/89afff00-e140-11e9-80af-0b0e0e87d341-home-slider_mobile.jpg"
        />
        <source
          media="(min-width: 1000px)"
          srcSet="https://http2.mlstatic.com/optimize/o:f_webp/resources/exhibitors/MLA-dia-de-la-madre/89afff00-e140-11e9-80af-0b0e0e87d341-home-slider_desktop.jpg"
        />
        <img
          src="https://http2.mlstatic.com/optimize/o:f_webp/resources/exhibitors/MLA-dia-de-la-madre/89afff00-e140-11e9-80af-0b0e0e87d341-home-slider_desktop.jpg"
          alt="Día de la Madre - Regalarle  a tu mamá, te llega"
        />
      </picture>
    </div>
  );
};

export default Hero;
