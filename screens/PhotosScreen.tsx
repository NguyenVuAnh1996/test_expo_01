import TestCamera from "@/components/main/camera/TestCamera";
import { ScrollView } from "react-native";

export default function PhotosScreen() {
  return (
    <ScrollView style={{ flex: 1 }}>
      <TestCamera />
    </ScrollView>
  )
}