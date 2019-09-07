import React from 'react';
import Title from './Title';

export default function About() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-10 mx-auto pt-5">
                    <h1 className="text-center text-title">
                        <Title name="ABOUT" title="THIS PROJECT" />
                    </h1>
                    <h2>This Ecommerce's project was developed fully thanks to the guidance of John Smilga from <a href="https://www.youtube.com/watch?v=wPQ1-33teR4">FreeCodeCamp Videos</a></h2>
                </div>
            </div>
        </div>
    );
}