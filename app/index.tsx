import { Link } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import Constants from "expo-constants";

interface LinkItem {
  id: number,
  url: string,
  displayName: string
}

const links: LinkItem[] = [
  { id: 1, url: 'deviceid', displayName: 'Device ID' },
  { id: 2, url: 'form', displayName: 'Form' },
  { id: 3, url: 'localauthen', displayName: 'Local Authen' },
  { id: 4, url: 'location', displayName: 'GPS' },
  { id: 5, url: 'photos', displayName: 'Hình ảnh' },
  { id: 6, url: 'videos', displayName: 'Video' },
]

export default function Index() {
  return (
    <ScrollView style={{ flex: 1, padding: 10 }}>
      {/* <Text>{Constants.expoConfig?.hostUri?.split(':').shift()}</Text> */}
      <Text style={{
        margin: 20,
        fontSize: 20,
        fontWeight: 'bold'
      }}>Trang chủ</Text>
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
