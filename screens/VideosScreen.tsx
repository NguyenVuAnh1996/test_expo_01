import TestCameraVideo from "@/components/main/camera/TestCameraVideo";
import { ScrollView } from "react-native";

export default function VideosScreen() {
  return (
    <ScrollView style={{ flex: 1 }}>
      <TestCameraVideo />
    </ScrollView>
  )
}