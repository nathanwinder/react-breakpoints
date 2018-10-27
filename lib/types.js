export class BreakpointContextValue {
    constructor(breakpoint) {
        if (breakpoint instanceof Array) {
            this.breakpoints = breakpoint;
            this.breakpoint = breakpoint[0];
        }
        else {
            this.breakpoints = [breakpoint];
            this.breakpoint = breakpoint;
        }
    }
    /**
     * Returns true if the breakpoint(s) have been triggered.
     * @param breakpoint The breakpoint(s) to check.
     */
    is(...breakpoint) {
        return this.breakpoints.some((bp1) => breakpoint.some((bp2) => bp1 === bp2));
    }
}
//# sourceMappingURL=types.js.map