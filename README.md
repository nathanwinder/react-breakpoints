# @winderful/react-breakpoints

Flexible TypeScript breakpoint components that utilize React's Context and HOCs. Supports React and React Native.

## Installation (_NPM Comming Soon_)

```
npm install github:nathanwinder/react-breakpoints
```

or

```
yarn add github:nathanwinder/react-breakpoints
```

## Features

- Custom breakpoints with valid typeing and intellisense support.

```typescript
import { createBreakpointContext } from "@winderful/react-breakpoints";

const BreakpointContext = createBreakpointContext(
  window,
  () => (window.innerWidth < 768 ? "mobile" : "tablet")
);
```

- Use with React Native

```typescript
import { Dimensions } from "react-native";
import {
  createBreakpointContext,
  NativeResizeEventSource
} from "@winderful/react-breakpoints";

const BreakpointContext = createBreakpointContext(
  new NativeResizeEventSource(Dimensions),
  () => (window.innerWidth < 768 ? "mobile" : "tablet")
);
```

- Use a Consumer to conditionaly render based on breakpoint

```html
const App = () => (
    <BreakpointContext.Provider>
        <BreakpointContext.Consumer>{bp=>
            bp.breakpoint === "mobile"? "Mobile" : "Tablet"
        }</BreakpointContext.Consumer>
    </BreakpointContext.Provider>
)
```

- Higher Order Component to "inline" breakpoint support into your third-party components. This implementation is type-correct and supports warnings and intellisense. You can choose which properties you want to add breakpoint support to. All value types with the exception of "object" are supported.

```html
const Title = withBreakpointProps(
    (props: {children: string}) => <h1>{props.children}</h1>,
    BreakpointContext.Consumer,
    "children");

const App = () => (
    <BreakpointContext.Provider>
        <Title>{{
            mobile: "Title on mobile",
            tablet: "Title on tablet"
        }}</Title>
        <Title>String still works as well.</Title>
    </BreakpointContext.Provider>
)
```

- Provide different breakpoints for different areas of your application.

```html
<BreakpointContext.Provider selector={()=> window.innerWidth < 300? "mobile" : "tablet"}>
    <Title>{{ mobile: "Visible upto 300px wide" }}</Title>
    <BreakpointContext.Provider selector={()=> window.innerWidth < 600? "mobile" : "tablet"}>
        <Title>{{ mobile: "Visible upto 600px wide" }}</Title>
    </BreakpointContext.Provider>
</BreakpointContext.Provider>
```

- Define new context for different areas of your application.

```typescript
const DetailedBreakpointContext = createBreakpointContext(window, () => {
  if (window.innerWidth < 768) return "mob";
  if (window.innerWidth < 992) return "tab";
  if (window.innerWidth < 1200) return "desk";
  return "wide";
});
```

```html
<BreakpointContext.Provider>
    <Title>{{ mobile: "Mobile", tablet: "Tablet" }}</Title>
    <DetailedBreakpointContext.Provider>
        <DetailedTitle>{{ mob: "Mobile", tab: "Tablet", desk: "Desktop", wide: "Wide" }}</DetailedTitle>
    </DetailedBreakpointContext.Provider>
</BreakpointContext.Provider>
```

- Multiple-dimensional or sliding breakpoints

```typescript
const BreakpointContext = createBreakpointContext(window, () => {
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
```

```html
<BreakpointContext.Provider>
    <Span>{{ narrow: "Narrow", wide: "Wide" }}</Span> and <Span>{{ tall: "tall", short: "short" }}</Span>
</BreakpointContext.Provider>
```

## Contributing

All are welcome to contribute. Please follow these steps when contributing. Suggestions about process and tooling are also welcome; I'm new in town.

### Bug Fixes and Enhancements

1. Create an issue with a title and description that explains the bug-fix or feature you are contributing.
2. For features update README.md and CHANGELOG.md to reflect the new functionality you are adding.
3. For bugs update CHANGELOG.md to reflect the bug you are fixing.
4. Submit a pull request.
5. I will personally review the request as promtly as possible.

### Getting Started

1. I am using VSCode for editing, feel free to use the editor of your choice.
2. Once you have cloned the repo run yarn in the root directory and the "example" directory.
3. In the root directory run `yarn link`
4. Change directory to `example` and run `yarn link "@winderful/react-breakpoints"`
5. You have now created a symlink from the example React app to the root library, any changes you make in the root will be reflected in example once you build. NOTE: This does not work in the "example-native" project, I believe CRNA still has problems with symlinks. I tried `yarn add file:../` but this hangs indefinately at 1116/1117. Please share any thoughts/suggestions.

6. In the root directory run `yarn build` to generate a build with your changes.
7. In the example directory run `yarn start` to launch the example React application.

### Additional Tools

#### Node Version Manager (optional)

Used to manage node versions.
.nvmrc is used to identify the prefered version of node used in a directory

https://github.com/creationix/nvm

```
> yarn global add nvm
```

#### AVN (optional)

Automatic version switching for Node.js
.node-version is used to indicate the desired version of Node.

https://github.com/wbyoung/avn

```
> yarn global add avn avn-nvm
```

#### Troubleshooting

- I have issues with RN Packager and have to run this anytime my IP address changes

```
> $env:REACT_NATIVE_PACKAGER_HOSTNAME = "*my-ip-address*"
```

- Cant `yarn link` example-native. I belive CRNA has a known issue with Symlinks. Not sure what the solution for this is. Open to suggestions.
