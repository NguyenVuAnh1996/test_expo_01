import TestForm from "@/components/main/forms/TestForm";
import { ScrollView } from "react-native";

export default function FormScreen() {
  return (
    <ScrollView style={{ flex: 1 }}>
      <TestForm />
    </ScrollView>
  )
}