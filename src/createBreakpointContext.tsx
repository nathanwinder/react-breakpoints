import * as React from "react";
import {
  BreakpointContextValue,
  BreakpointSelector,
  IBreakpointContext,
  IBreakpointProviderProps,
  IResizeEventSource
} from "./types";

export function createBreakpointContext<T>(
  resizeEventSource: IResizeEventSource,
  defaultSelector: BreakpointSelector<T>
): IBreakpointContext<T> {
  const Context = React.createContext(
    new BreakpointContextValue(defaultSelector())
  );

  interface IState {
    breakpoint: T | T[];
  }

  // tslint:disable-next-line:max-classes-per-file
  class BreakpointProvider extends React.PureComponent<
    IBreakpointProviderProps<T>,
    IState
  > {
    constructor(props: IBreakpointProviderProps<T>) {
      super(props);
      const value = (this.props.selector || defaultSelector)();
      this.state = {
        breakpoint: value
      };
    }

    public componentDidMount() {
      resizeEventSource.addEventListener("resize", this.onResize);
    }

    public componentWillUnmount() {
      resizeEventSource.removeEventListener("resize", this.onResize);
    }

    public render() {
      return (
        <Context.Provider
          value={new BreakpointContextValue(this.state.breakpoint)}
        >
          {this.props.children}
        </Context.Provider>
      );
    }

    private readonly onResize = () => {
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
        } else {
          return { breakpoint: value };
        }
      });
    }
  }

  (Context as any).displayName = "BreakpointContext";

  return {
    Consumer: Context.Consumer,
    Provider: BreakpointProvider
  };
}
