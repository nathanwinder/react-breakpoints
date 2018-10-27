import * as React from "react";
import { BreakpointContextValue } from "./types";
export function createBreakpointContext(resizeEventSource, defaultSelector) {
    const Context = React.createContext(new BreakpointContextValue(defaultSelector()));
    // tslint:disable-next-line:max-classes-per-file
    class BreakpointProvider extends React.PureComponent {
        constructor(props) {
            super(props);
            this.onResize = () => {
                const value = (this.props.selector || defaultSelector)();
                this.setState((s) => {
                    if (value instanceof Array) {
                        if (!(s.breakpoint instanceof Array)) {
                            return { breakpoint: value };
                        }
                        if (s.breakpoint.length !== value.length) {
                            return { breakpoint: value };
                        }
                        for (let i = 0; i < s.breakpoint.length; i++) {
                            if (s.breakpoint[i] !== value[i]) {
                                return { breakpoint: value };
                            }
                        }
                        return s;
                    }
                    else {
                        return { breakpoint: value };
                    }
                });
            };
            const value = (this.props.selector || defaultSelector)();
            this.state = {
                breakpoint: value
            };
        }
        componentDidMount() {
            resizeEventSource.addEventListener("resize", this.onResize);
        }
        componentWillUnmount() {
            resizeEventSource.removeEventListener("resize", this.onResize);
        }
        render() {
            return (React.createElement(Context.Provider, { value: new BreakpointContextValue(this.state.breakpoint) }, this.props.children));
        }
    }
    Context.displayName = "BreakpointContext";
    return {
        Consumer: Context.Consumer,
        Provider: BreakpointProvider
    };
}
//# sourceMappingURL=createBreakpointContext.js.map