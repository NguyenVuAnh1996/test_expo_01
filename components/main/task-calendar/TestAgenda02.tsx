import { StyleSheet, View } from 'react-native';
import WeeklyCalendar from 'react-native-weekly-calendar';

const sampleEvents = [
  { 'start': '2024-08-03 09:00:00', 'duration': '00:20:00', 'note': 'Walk my dog' },
  { 'start': '2024-08-04 14:00:00', 'duration': '01:00:00', 'note': 'Doctor\'s appointment' },
  { 'start': '2024-08-05 08:00:00', 'duration': '00:30:00', 'note': 'Morning exercise' },
  { 'start': '2024-08-05 14:00:00', 'duration': '02:00:00', 'note': 'Meeting with client' },
  { 'start': '2024-08-05 19:00:00', 'duration': '01:00:00', 'note': 'Dinner with family' },
  { 'start': '2024-08-06 09:30:00', 'duration': '01:00:00', 'note': 'Schedule 1' },
  { 'start': '2024-08-06 11:00:00', 'duration': '02:00:00', 'note': 'Schedule 2' },
  { 'start': '2024-08-06 15:00:00', 'duration': '01:30:00', 'note': 'Schedule 3' },
  { 'start': '2024-08-06 18:00:00', 'duration': '02:00:00', 'note': 'Schedule 4' },
  { 'start': '2024-08-06 22:00:00', 'duration': '01:00:00', 'note': 'Schedule 5' }
]

export default function TestAgenda() {
  return (
    <View style={styles.container}>
      <WeeklyCalendar 
        events={sampleEvents} 
        locale='vi'
        style={{ height: 400 }} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});