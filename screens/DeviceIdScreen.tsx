import TestAdsId from "@/components/main/device-id/TestAdsId";
import { ScrollView } from "react-native";

export default function DeviceIdScreen() {
  return (
    <ScrollView style={{ flex: 1, padding: 10 }}>
      <TestAdsId />
    </ScrollView>
  )
}