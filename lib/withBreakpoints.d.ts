import * as React from "react";
import { BreakpointContextValue, IWithBreakpoints } from "./types";
export declare function withBreakpointProps<P, B extends string, K extends keyof P>(Component: React.ComponentType<P>, BreakpointConsumer: React.Consumer<BreakpointContextValue<B>>, ...props: K[]): IWithBreakpoints<P, B, K>;
