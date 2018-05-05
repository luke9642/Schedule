class Period {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }

    getDifference = () => Math.abs(this.end.toNumber() - this.start.toNumber());
}

export default Period;