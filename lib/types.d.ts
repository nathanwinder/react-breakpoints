import { Consumer } from "react";
import { Omit } from "./internal";
export declare type BreakpointSelector<T> = () => T | T[];
export interface IResizeEventSource {
    addEventListener(event: "resize", listener: () => void): void;
    removeEventListener(event: "resize", listener: () => void): void;
}
export declare class BreakpointContextValue<T> {
    readonly breakpoints: T[];
    readonly breakpoint: T;
    constructor(breakpoint: T | T[]);
    /**
     * Returns true if the breakpoint(s) have been triggered.
     * @param breakpoint The breakpoint(s) to check.
     */
    is(...breakpoint: T[]): boolean;
}
export interface IBreakpointProviderProps<T> {
    selector?: BreakpointSelector<T>;
}
export declare type IBreakpointProvider<T> = React.ComponentType<IBreakpointProviderProps<T>>;
export interface IBreakpointContext<T> {
    Consumer: Consumer<BreakpointContextValue<T>>;
    Provider: IBreakpointProvider<T>;
}
export declare type BreakpointProps<T, B extends string> = {
    [K in keyof T]: T[K] | {
        [X in B]?: T[K];
    };
};
export declare type IWithBreakpointProps<P, B extends string, K extends keyof P> = Omit<P, K> & Pick<BreakpointProps<P, B>, K>;
export declare type IWithBreakpoints<P, B extends string, K extends keyof P> = React.ComponentType<Omit<P, K> & Pick<BreakpointProps<P, B>, K>>;
//# sourceMappingURL=types.d.ts.map