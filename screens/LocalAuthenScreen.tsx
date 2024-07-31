import TestLocalAuthen from "@/components/main/bio-authen/TestLocalAuthen";
import { ScrollView } from "react-native";

export default function LocalAuthenScreen() {
  return (
    <ScrollView style={{ flex: 1, padding: 10 }}>
      <TestLocalAuthen />
    </ScrollView>
  )
}