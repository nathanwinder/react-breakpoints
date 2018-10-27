import {
  createBreakpointContext,
  withBreakpointProps
} from "@winderful/react-breakpoints";
import * as React from "react";
import "./App.css";

import logo from "./logo.svg";

const DetailedBreakpointContext = createBreakpointContext(window, () => {
  if (window.innerWidth < 768) {
    return "mob";
  }
  if (window.innerWidth < 992) {
    return "tab";
  }
  if (window.innerWidth < 1200) {
    return "desk";
  }
  return "wide";
});

const MultiDimensionBreakpointContext = createBreakpointContext(window, () => {
  const dimensions: Array<"narrow" | "wide" | "tall" | "short"> = [];
  if (window.innerWidth < 768) {
    dimensions.push("narrow");
  } else {
    dimensions.push("wide");
  }
  if (window.innerHeight < 768) {
    dimensions.push("short");
  } else {
    dimensions.push("tall");
  }
  return dimensions;
});

const SlidingBreakpointContext = createBreakpointContext<
  "mob" | "tab" | "desk" | "wide"
>(window, () => {
  if (window.innerWidth < 768) {
    return ["mob"];
  }
  if (window.innerWidth < 992) {
    return ["mob", "tab"];
  }
  if (window.innerWidth < 1200) {
    return ["mob", "tab", "desk"];
  }
  return ["mob", "tab", "desk", "wide"];
});

const DetailParagraph = withBreakpointProps(
  (props: { children: string }) => <p>{props.children}</p>,
  DetailedBreakpointContext.Consumer,
  "children"
);

const SlidingParagraph = withBreakpointProps(
  (props: { children: string | null }) => <p>{props.children}</p>,
  SlidingBreakpointContext.Consumer,
  "children"
);

class App extends React.Component {
  public render() {
    return (
      <DetailedBreakpointContext.Provider>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Winderful React Breakpoints</h1>
          </header>
          <DetailedBreakpointContext.Consumer>
            {bp => {
              let size: string = "";
              switch (bp.breakpoint) {
                case "mob":
                  size = "mobile device";
                  break;
                case "tab":
                  size = "tablet";
                  break;
                case "desk":
                  size = "desktop";
                  break;
                case "wide":
                  size = "wide desktop";
                  break;
              }
              return <p>You are on a {size}</p>;
            }}
          </DetailedBreakpointContext.Consumer>
          <DetailParagraph>
            {{
              mob: "only visible on mobile",
              wide: "only visible on wide desktop"
            }}
          </DetailParagraph>
          <MultiDimensionBreakpointContext.Provider>
            <MultiDimensionBreakpointContext.Consumer>
              {bp => {
                return `${bp.is("narrow") ? "narrow" : "wide"} and ${
                  bp.is("tall") ? "tall" : "short"
                }`;
              }}
            </MultiDimensionBreakpointContext.Consumer>
          </MultiDimensionBreakpointContext.Provider>
          <SlidingBreakpointContext.Provider>
            <SlidingParagraph>
              {{ mob: "Visible on mobile, tablet, desktop, or widescreen" }}
            </SlidingParagraph>
            <SlidingParagraph>
              {{ tab: "Visible on tablet, desktop, or widescreen" }}
            </SlidingParagraph>
            <SlidingParagraph>
              {{ desk: "Visible on desktop, or widescreen" }}
            </SlidingParagraph>
            <SlidingParagraph>
              {{ desk: "Visible on widescreen" }}
            </SlidingParagraph>
            <SlidingParagraph>
              {{ tab: "Visible on tab and desk but not wide", wide: null }}
            </SlidingParagraph>
          </SlidingBreakpointContext.Provider>
        </div>
      </DetailedBreakpointContext.Provider>
    );
  }
}

export default App;
