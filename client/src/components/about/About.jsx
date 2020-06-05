import React from 'react';
import './about.css';

// TODO: Change the text accordingly to our shop !?!?!

const About = () => {
    return(
        <section id="what-we-do">
            <div class="container-fluid">
                <h2 class="section-title mb-2 h1">What we do ?</h2>
                <p class="text-center text-muted h5">We will be glad to make your home or your celebration beautiful
                    with the aid of flower design and a variety of plants.</p>
                <div class="row mt-5">
                    <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-4">
                        <div class="card">
                            <div class="card-block block-1">
                                <h3 class="card-title">Professional team</h3>
                                <p class="card-text">A team of professionals will be happy to assist you with any
                                    time and any questions.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-4">
                        <div class="card">
                            <div class="card-block block-2">
                                <h3 class="card-title">Special ideas</h3>
                                <p class="card-text">We can offer you many suggestions for original and unique
                                    ideas.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-4">
                        <div class="card">
                            <div class="card-block block-3">
                                <h3 class="card-title">Optimal conditions</h3>
                                <p class="card-text">We work with only fresh flowers directly from greenhouses and
                                    retain their beauty under optimal conditions.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-4">
                        <div class="card">
                            <div class="card-block block-4">
                                <h3 class="card-title">Sense of victory</h3>
                                <p class="card-text">Wherever you come with our own flowers, you will always come
                                    out with a sense of victory.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-4">
                        <div class="card">
                            <div class="card-block block-5">
                                <h3 class="card-title">Wish congratulations</h3>
                                <p class="card-text">Want to wish a friend a blessing? We will send it to you
                                    everywhere.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-4">
                        <div class="card">
                            <div class="card-block block-6">
                                <h3 class="card-title">On-line market</h3>
                                <p class="card-text">You can shop online while sitting in your air-conditioned
                                    living room.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;