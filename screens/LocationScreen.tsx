import TestLocation from "@/components/main/gps/TestLocation";
import { ScrollView } from "react-native";

export default function LocationScreen() {
  return (
    <ScrollView style={{ flex: 1, padding: 10 }}>
      <TestLocation />
    </ScrollView>
  )
}