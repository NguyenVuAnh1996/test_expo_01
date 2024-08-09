import { Text, View } from "react-native";
// import { Agenda } from "react-native-calendars";
import { daysOfWeek } from "./RNCalendarsConfig";
import { Agenda, AgendaEntry, AgendaSchedule } from "../react_native_calendars";
import XDate from "xdate";

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
  // { id: 1, name: 'lorem ipsum 1', startTime: new Date(2024, 7, 12, 9, 10), endTime: new Date(2024, 7, 16, 10, 10), desc: 'asdf asdfkajsdlfja asdjfksdjf' },
  { id: 2, name: 'lorem ipsum 2', startTime: new Date(2024, 7, 13, 23, 20), endTime: new Date(2024, 7, 14, 2, 15), desc: 'bgdf asdfkajsdlfja asdjfksdjf' },
  // { id: 3, name: 'lorem ipsum 3', startTime: new Date(2024, 7, 15, 8, 50), endTime: new Date(2024, 7, 22, 23, 10), desc: 'oop dfkajsdlfja asdjfksdjf' },
]

const convertTaskListIntoAgendaItems = (list: TaskItem[]): AgendaSchedule => {
  const defaultFormat = 'yyyy-MM-dd';
  let result: AgendaSchedule = {};
  list.forEach(x => {
    let startTime = new XDate(x.startTime).clone();
    let endTime = new XDate(x.endTime).clone();
    let diff = (new XDate(
      startTime.toString(defaultFormat)
    ))
      .diffDays(new XDate(
        endTime.toString(defaultFormat)
      ));
    diff = diff >= 0 ? Math.floor(diff) : -1
    for (let i = 0; i <= diff; i++) {
      let _startTime = i === 0 ? startTime.toString('HH:mm') : '00:00';
      let _endTime = i === diff ? endTime.toString('HH:mm') : '23:59';
      let item: AgendaEntry = {
        name: x.name,
        description: x.desc,
        timeRange: `${_startTime} - ${_endTime}`
      }
      let dateStr = startTime.clone().addDays(i).toString(defaultFormat);
      if (result?.[dateStr]) {
        result[dateStr].push(item);
      } else {
        result[dateStr] = [item]
      }
    }
  })
  return result;
}

export default function TestAgenda() {
  return (
    <View style={{ flex: 1 }} >
      <Agenda
        items={convertTaskListIntoAgendaItems(taskList)}
        renderItem={(item: AgendaEntry) =>
          <View style={{
            width: '100%',
            padding: 10,
            marginTop: 10,
            height: 80,
            backgroundColor: 'lightgreen'
          }}>
            <Text>{item.name}</Text>
            <Text>{item.timeRange}</Text>
            <Text>{item.description}</Text>
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