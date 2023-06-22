import React from "react";

import { Carousel as ReactCarousel } from "react-responsive-carousel";

export default function Carousel() {
    return (
        <ReactCarousel
            autoPlay={true}
            interval={6000}
            stopOnHover={true}
            infiniteLoop={true}
            showThumbs={false}
            showStatus={false}
            transitionTime={1000}
            className=" lg:rounded-lg w-full overflow-hidden"
        >
            <div className="img">
                <img src="/imgs/header2.png" className="w-full " />
            </div>
            <div className="img">
                <img src="/imgs/header1.png" className="w-full" />
            </div>
            <div className="img">
                <img src="/imgs/header2.png" className="w-full " />
            </div>
            <div className="img">
                <img src="/imgs/header1.png" className="w-full" />
            </div>
        </ReactCarousel>
    );
}
