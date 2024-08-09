import { Text } from "react-native";
import XDate from "xdate";

const testXDate = (input: Date) => {
  let _date = new XDate(input).clone();
  for (let i = 0; i < 3; i++) {
    _date.addDays(1);
  }
  return String(_date.getDate())
}

export default function TestLunar() {
  return (
    <Text>{testXDate(new Date())}</Text>
  )
}