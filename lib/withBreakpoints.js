import * as React from "react";
export function withBreakpointProps(Component, BreakpointConsumer, ...props // TODO: Limit K so that it only includes properties with values that do not extend 'object'.
) {
    class WithBreakpoints extends React.Component {
        render() {
            // If any of the properties are breakpoint maps then we'll need
            // to know the current breakpoint to select the right value. If breakpoints
            // are not required we can optimize the code by not using
            // the BreakpointConsumer.
            let requiresMapping = false;
            for (const key of props) {
                const value = this.props[key];
                if (value !== undefined) {
                    if (typeof value === "object") {
                        requiresMapping = true;
                        break;
                    }
                }
            }
            if (requiresMapping) {
                return (React.createElement(BreakpointConsumer, null, (bp) => {
                    const mappedProps = {};
                    for (const key of props) {
                        const value = this.props[key];
                        if (value != null) {
                            if (typeof value === "object") {
                                // ensure that the breakpoint "map" gets cleared
                                // that way if there is no match we don't pass
                                // it to the wrapped component.
                                mappedProps[key] = undefined;
                                // step through the breakpoints that are applicable
                                // to see if any of them provide a value.
                                for (const breakpoint of bp.breakpoints) {
                                    const bpValue = value[bp.breakpoint];
                                    if (bpValue !== undefined) {
                                        mappedProps[key] = bpValue;
                                        break;
                                    }
                                }
                            }
                        }
                    }
                    return React.createElement(Component, Object.assign({}, this.props, mappedProps));
                }));
            }
            else {
                return React.createElement(Component, Object.assign({}, this.props));
            }
        }
    }
    WithBreakpoints.displayName = `${Component.displayName}.WithBreakpointProps`;
    return WithBreakpoints;
}
//# sourceMappingURL=withBreakpoints.js.map