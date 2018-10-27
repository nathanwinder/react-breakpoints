import * as React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import {
  createBreakpointContext,
  NativeResizeEventSource,
  withBreakpointProps
} from "winderful-react-breakpoints";

const BreakpointContext = createBreakpointContext(
  new NativeResizeEventSource(Dimensions),
  () => (Dimensions.get("window").width < 500 ? "mobile" : "tablet")
);

const Title = withBreakpointProps(
  (props: { children: string }) => <Text>{props.children}</Text>,
  BreakpointContext.Consumer,
  "children"
);

export default class App extends React.Component<{}> {
  public render() {
    return (
      <BreakpointContext.Provider>
        <View style={styles.container}>
          <Title>{{ mobile: "Mobile", tablet: "Tablet" }}</Title>
          <Text>Open up App.ts to start working on your app!</Text>
          <Text>Changes you make will automatically reload.</Text>
          <Text>Shake your phone to open the developer menu.</Text>
        </View>
      </BreakpointContext.Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center"
  }
});
