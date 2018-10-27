import { BreakpointSelector, IBreakpointContext, IResizeEventSource } from "./types";
export declare function createBreakpointContext<T>(resizeEventSource: IResizeEventSource, defaultSelector: BreakpointSelector<T>): IBreakpointContext<T>;
