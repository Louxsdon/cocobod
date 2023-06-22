import React from "react";

export default function HeroHeader() {
    return (
        <header className="bg-white ">
            <div className="hero min-h-[60vh] container navbar max-w-6xl">
                <div className="hero-content  flex-col justify-between gap-x-20 lg:flex-row-reverse">
                    <img src="/assets/svgs/hero.svg" className="max-w-xl" />
                    <div>
                        <section className="text-6xl lg:text-8xl font-black text-black">
                            <h1 className="text-secondary text-8xl lg:text-9xl font-serif">
                                JessCo
                            </h1>
                            <span className="text-primary">Store.</span>
                        </section>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat
                            fugiat ut assumenda excepturi exercitationem quasi.
                            In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                        <button className="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </div>
        </header>
    );
}
