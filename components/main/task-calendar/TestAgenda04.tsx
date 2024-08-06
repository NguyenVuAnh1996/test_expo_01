import { useState } from 'react';
import { Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Calendar, CalendarTouchableOpacityProps, ICalendarEventBase } from 'react-native-big-calendar'
import 'dayjs/locale/vi'

const events = [
  {
    title: 'Meeting',
    start: new Date(2024, 7, 11, 10, 0),
    end: new Date(2024, 7, 12, 6, 30),
  },
  {
    title: 'Coffee break',
    start: new Date(2024, 7, 11, 2, 45),
    end: new Date(2024, 7, 13, 16, 30),
  },
]

type CalendarMode = 'month' | 'week' | '3days' | 'day' | 'schedule' | 'custom';

const arr: CalendarMode[] = ['month', 'week', '3days', 'day', 'schedule', 'custom']

export default function TestAgenda04() {
  const [toggle, setToggle] = useState<CalendarMode>('month');
  return (
    <>
      <View style={{
        height: 100
      }}>
      <ScrollView horizontal style={{
        width: '100%',
        flexDirection: 'row'
      }}>
        {arr.map((x: CalendarMode) =>
          <Pressable key={x} style={{
            width: 50,
            height: 50,
            margin: 20,
            backgroundColor: 'lightblue',
            justifyContent: 'center',
            alignItems: 'center'
          }} onPress={() => setToggle(x)}>
            <Text>{x}</Text>
          </Pressable>
        )}
      </ScrollView>
      </View>
      <View style={{
        flex: 1
      }}>
        <Calendar
          events={events}
          height={600}
          mode={toggle}
          locale='vi'
          dayHeaderHighlightColor='green'
          weekDayHeaderHighlightColor='green'
          dayHeaderStyle={{
            backgroundColor: 'transparent'
          }}
          eventCellStyle={{
            padding: 1,
            paddingLeft: 5
          }}
        />
      </View>
    </>
  )
}