class Period {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }

    getDifference = () => Math.abs(this.end.toNumber() - this.start.toNumber());
    hashCode = () =>  this.start.hashCode() + this.end.hashCode();

}

Period.prototype.toString = function() {
    return this.start + " - " + this.end;
};

export default Period;