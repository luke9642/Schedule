import React, { Component } from 'react';
import {Background, Parallax} from "react-parallax";

export default class Home extends Component {
    state = {
        image1: "abstract-art-artificial-131634.jpg",
        image2: "abstract-art-background-1020317.jpg"
    };

    render() {
        return (
            <div>
                <h2>Lorem ipsum</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque faucibus maximus leo. Morbi interdum placerat libero, ac condimentum nisi hendrerit at. Sed pharetra, risus sit amet ultrices pharetra, elit risus commodo orci, ut fringilla ligula turpis id neque. Nulla blandit, eros sagittis ultricies sollicitudin, libero purus dictum metus, sed consectetur sem nisi in risus. Suspendisse ex quam, semper maximus volutpat eget, commodo sed enim. Suspendisse volutpat, nisl eu venenatis scelerisque, nulla nibh cursus libero, in auctor massa orci ac est. Pellentesque ac justo non dolor porta auctor. Vivamus facilisis risus id rhoncus convallis. Quisque vitae augue vel purus accumsan dictum. Nam cursus tellus sed purus malesuada dapibus. Pellentesque in ante faucibus, eleifend augue ullamcorper, cursus eros. Sed in pretium tellus. In hac habitasse platea dictumst.
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque faucibus maximus leo. Morbi interdum placerat libero, ac condimentum nisi hendrerit at. Sed pharetra, risus sit amet ultrices pharetra, elit risus commodo orci, ut fringilla ligula turpis id neque. Nulla blandit, eros sagittis ultricies sollicitudin, libero purus dictum metus, sed consectetur sem nisi in risus. Suspendisse ex quam, semper maximus volutpat eget, commodo sed enim. Suspendisse volutpat, nisl eu venenatis scelerisque, nulla nibh cursus libero, in auctor massa orci ac est. Pellentesque ac justo non dolor porta auctor. Vivamus facilisis risus id rhoncus convallis. Quisque vitae augue vel purus accumsan dictum. Nam cursus tellus sed purus malesuada dapibus. Pellentesque in ante faucibus, eleifend augue ullamcorper, cursus eros. Sed in pretium tellus. In hac habitasse platea dictumst.
                </p>
                <Parallax blur={5} strength={500}>
                    <h1 id="Home1">App</h1>
                    <Background className="custom-bg">
                        <img src="main.jpg" alt="fill murray" />
                    </Background>
                </Parallax>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque faucibus maximus leo. Morbi interdum placerat libero, ac condimentum nisi hendrerit at. Sed pharetra, risus sit amet ultrices pharetra, elit risus commodo orci, ut fringilla ligula turpis id neque. Nulla blandit, eros sagittis ultricies sollicitudin, libero purus dictum metus, sed consectetur sem nisi in risus. Suspendisse ex quam, semper maximus volutpat eget, commodo sed enim. Suspendisse volutpat, nisl eu venenatis scelerisque, nulla nibh cursus libero, in auctor massa orci ac est. Pellentesque ac justo non dolor porta auctor. Vivamus facilisis risus id rhoncus convallis. Quisque vitae augue vel purus accumsan dictum. Nam cursus tellus sed purus malesuada dapibus. Pellentesque in ante faucibus, eleifend augue ullamcorper, cursus eros. Sed in pretium tellus. In hac habitasse platea dictumst.
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque faucibus maximus leo. Morbi interdum placerat libero, ac condimentum nisi hendrerit at. Sed pharetra, risus sit amet ultrices pharetra, elit risus commodo orci, ut fringilla ligula turpis id neque. Nulla blandit, eros sagittis ultricies sollicitudin, libero purus dictum metus, sed consectetur sem nisi in risus. Suspendisse ex quam, semper maximus volutpat eget, commodo sed enim. Suspendisse volutpat, nisl eu venenatis scelerisque, nulla nibh cursus libero, in auctor massa orci ac est. Pellentesque ac justo non dolor porta auctor. Vivamus facilisis risus id rhoncus convallis. Quisque vitae augue vel purus accumsan dictum. Nam cursus tellus sed purus malesuada dapibus. Pellentesque in ante faucibus, eleifend augue ullamcorper, cursus eros. Sed in pretium tellus. In hac habitasse platea dictumst.
                </p>
                <Parallax blur={{ min: 0, max: 10000 }} strength={500}>
                    <h1 id="Home2">Notes</h1>
                    <Background className="custom-bg">
                        <img src="note.jpg" alt="fill murray" />
                    </Background>
                </Parallax>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque faucibus maximus leo. Morbi interdum placerat libero, ac condimentum nisi hendrerit at. Sed pharetra, risus sit amet ultrices pharetra, elit risus commodo orci, ut fringilla ligula turpis id neque. Nulla blandit, eros sagittis ultricies sollicitudin, libero purus dictum metus, sed consectetur sem nisi in risus. Suspendisse ex quam, semper maximus volutpat eget, commodo sed enim. Suspendisse volutpat, nisl eu venenatis scelerisque, nulla nibh cursus libero, in auctor massa orci ac est. Pellentesque ac justo non dolor porta auctor. Vivamus facilisis risus id rhoncus convallis. Quisque vitae augue vel purus accumsan dictum. Nam cursus tellus sed purus malesuada dapibus. Pellentesque in ante faucibus, eleifend augue ullamcorper, cursus eros. Sed in pretium tellus. In hac habitasse platea dictumst.
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque faucibus maximus leo. Morbi interdum placerat libero, ac condimentum nisi hendrerit at. Sed pharetra, risus sit amet ultrices pharetra, elit risus commodo orci, ut fringilla ligula turpis id neque. Nulla blandit, eros sagittis ultricies sollicitudin, libero purus dictum metus, sed consectetur sem nisi in risus. Suspendisse ex quam, semper maximus volutpat eget, commodo sed enim. Suspendisse volutpat, nisl eu venenatis scelerisque, nulla nibh cursus libero, in auctor massa orci ac est. Pellentesque ac justo non dolor porta auctor. Vivamus facilisis risus id rhoncus convallis. Quisque vitae augue vel purus accumsan dictum. Nam cursus tellus sed purus malesuada dapibus. Pellentesque in ante faucibus, eleifend augue ullamcorper, cursus eros. Sed in pretium tellus. In hac habitasse platea dictumst.
                </p>
                <Parallax strength={500}>
                    <h1 id="Home3">Schedule</h1>
                    <Background className="custom-bg">
                        <img src="schedule.jpg" alt="fill murray" />
                    </Background>
                </Parallax>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque faucibus maximus leo. Morbi interdum placerat libero, ac condimentum nisi hendrerit at. Sed pharetra, risus sit amet ultrices pharetra, elit risus commodo orci, ut fringilla ligula turpis id neque. Nulla blandit, eros sagittis ultricies sollicitudin, libero purus dictum metus, sed consectetur sem nisi in risus. Suspendisse ex quam, semper maximus volutpat eget, commodo sed enim. Suspendisse volutpat, nisl eu venenatis scelerisque, nulla nibh cursus libero, in auctor massa orci ac est. Pellentesque ac justo non dolor porta auctor. Vivamus facilisis risus id rhoncus convallis. Quisque vitae augue vel purus accumsan dictum. Nam cursus tellus sed purus malesuada dapibus. Pellentesque in ante faucibus, eleifend augue ullamcorper, cursus eros. Sed in pretium tellus. In hac habitasse platea dictumst.
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque faucibus maximus leo. Morbi interdum placerat libero, ac condimentum nisi hendrerit at. Sed pharetra, risus sit amet ultrices pharetra, elit risus commodo orci, ut fringilla ligula turpis id neque. Nulla blandit, eros sagittis ultricies sollicitudin, libero purus dictum metus, sed consectetur sem nisi in risus. Suspendisse ex quam, semper maximus volutpat eget, commodo sed enim. Suspendisse volutpat, nisl eu venenatis scelerisque, nulla nibh cursus libero, in auctor massa orci ac est. Pellentesque ac justo non dolor porta auctor. Vivamus facilisis risus id rhoncus convallis. Quisque vitae augue vel purus accumsan dictum. Nam cursus tellus sed purus malesuada dapibus. Pellentesque in ante faucibus, eleifend augue ullamcorper, cursus eros. Sed in pretium tellus. In hac habitasse platea dictumst.
                </p>
            </div>
        );
    }

};
