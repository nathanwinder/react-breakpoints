import { Consumer } from "react";
import { Omit } from "./internal";

export type BreakpointSelector<T> = () => T | T[];

export interface IResizeEventSource {
  addEventListener(event: "resize", listener: () => void): void;
  removeEventListener(event: "resize", listener: () => void): void;
}

export class BreakpointContextValue<T> {
  public readonly breakpoints: T[];

  public readonly breakpoint: T;

  public constructor(breakpoint: T | T[]) {
    if (breakpoint instanceof Array) {
      this.breakpoints = breakpoint;
      this.breakpoint = breakpoint[0];
    } else {
      this.breakpoints = [breakpoint];
      this.breakpoint = breakpoint;
    }
  }

  /**
   * Returns true if the breakpoint(s) have been triggered.
   * @param breakpoint The breakpoint(s) to check.
   */
  public is(...breakpoint: T[]) {
    return this.breakpoints.some((bp1) => breakpoint.some((bp2) => bp1 === bp2));
  }
}

export interface IBreakpointProviderProps<T> {
  selector?: BreakpointSelector<T>;
}

export type IBreakpointProvider<T> = React.ComponentType<
  IBreakpointProviderProps<T>
>;

export interface IBreakpointContext<T> {
  Consumer: Consumer<BreakpointContextValue<T>>;
  Provider: IBreakpointProvider<T>;
}

export type BreakpointProps<T, B extends string> = {
  [K in keyof T]: T[K] | { [X in B]?: T[K] }
};

export type IWithBreakpointProps<P, B extends string, K extends keyof P> = Omit<
  P,
  K
> &
  Pick<BreakpointProps<P, B>, K>;

export type IWithBreakpoints<
  P,
  B extends string,
  K extends keyof P
> = React.ComponentType<Omit<P, K> & Pick<BreakpointProps<P, B>, K>>;
