import { Text } from "react-native";
import getLunarDate from './lunarCalendar';

export default function TestLunar() {
  return (
    <Text>{JSON.stringify(getLunarDate(25, 6, 2006))}</Text>
  )
}