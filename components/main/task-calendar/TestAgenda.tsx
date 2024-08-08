import { Text, View } from "react-native";
// import { Agenda } from "react-native-calendars";
import { daysOfWeek } from "./RNCalendarsConfig";
import { Agenda } from "../react_native_calendars";

interface TaskItemShown {
  name: string

}

interface TaskItem {
  id: number
  name: string
  startTime: Date
  endTime: Date
  desc: string
}

const taskList: TaskItem[] = [
]

export default function TestAgenda() {
  return (
    <View style={{ flex: 1 }} >
      <Agenda
        items={{
          '2024-08-08': [{ name: 'research jquery', height: 80, day: '' }],
          '2024-08-07': [{ name: 'cleaning', height: 80, day: '' }],
          // '2024-08-06': [],
          '2024-08-05': [{ name: 'fishing', height: 80, day: '' }, { name: 'go to hospital', height: 80, day: '' }]
        }}
        renderItem={(item: any) =>
          <View style={{
            width: '100%',
            padding: 10,
            marginTop: 10,
            height: 80,
            backgroundColor: 'lightgreen'
          }}>
            <Text>{item.name}</Text>
          </View>
        }
        renderEmptyData={() => (
          <View style={{
            width: '100%',
            padding: 20,
          }}>
            <Text style={{
              textAlign: 'center',
              fontSize: 20
            }}>Không có công việc nào</Text>
          </View>
        )}

        // danh sách tất cả các prop ở đây:
        // https://github.com/wix/react-native-calendars/blob/master/src/types.ts
        theme={{
          selectedDayBackgroundColor: 'green',
          dotColor: 'green',
          todayTextColor: 'green',
          // agendaDayNumColor: 'red',
          // agendaDayTextColor: 'red',
          agendaTodayColor: 'green',
        }}
      />
    </View>
  )
}