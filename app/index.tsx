import { Link } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import Constants from "expo-constants";
import { links } from "@/constants/Others";

export default function Index() {
  return (
    <ScrollView style={{ flex: 1, padding: 10 }}>
      {/* <Text>{Constants.expoConfig?.hostUri?.split(':').shift()}</Text> */}
      {links.toReversed().map(x => 
        <Link
          key={x.id}
          href={`./${x.url}`}
          style={{
            marginBottom: 20,
            padding: 10,
            width: '100%',
            backgroundColor: 'lightgreen'
          }}
        >{x.displayName}</Link>
      )}
    </ScrollView>
  );
}
