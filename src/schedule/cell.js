import React from "react";

class Cell extends React.Component {
    constructor(props) {
        super(props);
        const normalBackground = this.props.style.backgroundColor;
        const brightBackground = this.increase_brightness(this.props.style.backgroundColor, 20);

        this.state = {
            normalBackground: normalBackground,
            brightBackground: brightBackground,
            listStyle: {
                height: this.props.style.height,
            },
            linkStyle: {
                color: this.props.style.color,
                background: normalBackground
            }
        };
    }

    // noinspection JSUnusedGlobalSymbols
    componentDidMount = () => {
        
    };

    increase_brightness = (hex, percent) => {
        // strip "#" if it's there
        hex = hex.replace(/^\s*#|\s*$/g, '');

        // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
        if (hex.length === 3)
            hex = hex.replace(/(.)/g, '$1$1');

        const r = parseInt(hex.substr(0, 2), 16),
            g = parseInt(hex.substr(2, 2), 16),
            b = parseInt(hex.substr(4, 2), 16);
        const calculate = color => ((0|(1<<8) + color + (256 - color) * percent / 100).toString(16)).substr(1);
        return '#' + calculate(r) + calculate(g) + calculate(b);
    };

    setBackground = (background) => {
        let style = Object.assign({}, this.state.linkStyle);
        style.background = background;
        this.setState({linkStyle: style});
    };

    render() {
        return (
            <li className={this.props.className} style={this.state.listStyle}>
                <a onMouseOver={() => this.setBackground(this.state.brightBackground)} onMouseOut={() => this.setBackground(this.state.normalBackground)} style={this.state.linkStyle}>{this.props.children}</a>
            </li>
        );
    }
}

export default Cell;