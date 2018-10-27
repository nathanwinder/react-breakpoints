import * as React from "react";
import { Omit } from "./internal";
import {
  BreakpointContextValue,
  BreakpointProps,
  IWithBreakpoints
} from "./types";

export function withBreakpointProps<P, B extends string, K extends keyof P>(
  Component: React.ComponentType<P>,
  BreakpointConsumer: React.Consumer<BreakpointContextValue<B>>,
  ...props: K[] // TODO: Limit K so that it only includes properties with values that do not extend 'object'.
): IWithBreakpoints<P, B, K> {
  class WithBreakpoints extends React.Component<
    Omit<P, K> & Pick<BreakpointProps<P, B>, K>
  > {
    public render() {
      // If any of the properties are breakpoint maps then we'll need
      // to know the current breakpoint to select the right value. If breakpoints
      // are not required we can optimize the code by not using
      // the BreakpointConsumer.
      let requiresMapping: boolean = false;
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
        return (
          <BreakpointConsumer>
            {(bp) => {
              const mappedProps: Partial<Pick<P, K>> = {};
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
                      const bpValue = (value as any)[bp.breakpoint];
                      if (bpValue !== undefined) {
                        mappedProps[key] = bpValue;
                        break;
                      }
                    }
                  }
                }
              }
              return <Component {...this.props} {...mappedProps} />;
            }}
          </BreakpointConsumer>
        );
      } else {
        return <Component {...this.props} />;
      }
    }
  }

  (WithBreakpoints as any).displayName = `${
    Component.displayName
  }.WithBreakpointProps`;
  return WithBreakpoints;
}
