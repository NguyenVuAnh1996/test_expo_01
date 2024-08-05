import { useState } from "react";
import MonthLayout, { months } from "./MonthLayout";
import { Dimensions, Modal, Pressable, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import YearGroupLayout, { getFirstYearOfGroupFromYear } from "./YearGroupLayout";

const screenWidth = Dimensions.get("window").width;
const calendarWidth = screenWidth * 0.9;

const formatDate = (date: Date) => {
  let _date = String(date.getDate());
  _date = _date.length < 2 ? '0' + _date : _date;
  let _month = String(date.getMonth() + 1)
  _month = _month.length < 2 ? '0' + _month : _month;
  return `${_date}/${_month}/${date.getFullYear()}`
}

export default function CrudeDatepicker({
  value,
  onChange
}: {
  value: Date | undefined
  onChange: (input: Date) => void
}) {
  const current = value ? value : new Date()
  const [inputDate, setInputDate] = useState<Date>(current);
  const [currentYear, setCurrentYear] = useState<number>(current.getFullYear());
  const [currentJsMonth, setCurrentJsMonth] = useState<number>(current.getMonth());
  const [currentFirstYearOfGroup, setCurrentFirstYearOfGroup] = useState<number>(getFirstYearOfGroupFromYear(currentYear));
  const [mode, setMode] = useState<'month' | 'years'>('month');

  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const handlePrevBtn = () => {
    if (mode === 'month') {
      if (currentJsMonth === 0) {
        setCurrentJsMonth(11);
        let _year = currentYear - 1;
        setCurrentYear(_year);
        setCurrentFirstYearOfGroup(getFirstYearOfGroupFromYear(_year));
      } else {
        setCurrentJsMonth(currentJsMonth - 1);
      }
    } else {
      // mode === years
      setCurrentFirstYearOfGroup(currentFirstYearOfGroup - 9);
    }
  }

  const handleNextBtn = () => {
    if (mode === 'month') {
      if (currentJsMonth === 11) {
        setCurrentJsMonth(0);
        let _year = currentYear + 1;
        setCurrentYear(_year);
        setCurrentFirstYearOfGroup(getFirstYearOfGroupFromYear(_year));
      } else {
        setCurrentJsMonth(currentJsMonth + 1);
      }
    } else {
      // mode === years
      setCurrentFirstYearOfGroup(currentFirstYearOfGroup + 9);
    }
  }

  const handleSwitchMode = () => {
    setMode(mode === 'month' ? 'years' : 'month');
  }

  const handleChangeDate = (input: Date) => {
    setInputDate(input);
    onChange(input);
  }

  const handleChooseYear = (year: number) => {
    setCurrentYear(year);
    setMode('month');
  }

  return (
    <>
      <Pressable style={{
        borderWidth: 1,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20
      }} onPress={() => setModalOpen(true)}>
        <Text>{
          inputDate
            ? formatDate(inputDate)
            : '__/__/____'
        }</Text>
        <View style={{
          borderWidth: 1,
          width: 20,
          height: 20
        }}></View>
      </Pressable>
      <ModalContainer
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
      >
        <View style={{ 
          backgroundColor: 'white',
          padding: 10
         }}>
          <View style={{
            width: calendarWidth,
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
            <Pressable style={styles.controlbtn} onPress={handlePrevBtn}>
              <Text style={styles.controlBtnText}>{'<<'}</Text>
            </Pressable>
            <Pressable style={styles.dateBtn} onPress={handleSwitchMode}>
              <Text style={styles.dateBtnText}>{`${months[currentJsMonth].longName}, ${currentYear}`}</Text>
            </Pressable>
            <Pressable style={styles.controlbtn} onPress={handleNextBtn}>
              <Text style={styles.controlBtnText}>{'>>'}</Text>
            </Pressable>
          </View>
          {mode === 'month'
            ? <MonthLayout
              year={currentYear}
              month={currentJsMonth}
              layoutWidth={calendarWidth}
              chosenDate={value ? value : inputDate}
              setChosenDate={handleChangeDate}
            />
            : <YearGroupLayout
              year={currentYear}
              currentFirstYear={currentFirstYearOfGroup}
              handleChooseYear={handleChooseYear}
            />
          }
        </View>
      </ModalContainer>
    </>
  )
}

const ModalContainer = ({
  isModalOpen,
  setModalOpen,
  children
}: {
  isModalOpen: boolean
  setModalOpen: (input: boolean) => void
  children: any
}) => (
  <Modal
    transparent={true}
    visible={isModalOpen}
    onRequestClose={() => setModalOpen(false)}
  >
    <TouchableOpacity
      style={{
        flex: 1,
        backgroundColor: '#000000a1',
        justifyContent: 'center',
        alignItems: 'center'
      }}
      activeOpacity={1}
      onPress={() => setModalOpen(false)}
    >
      <TouchableWithoutFeedback>
        {children}
      </TouchableWithoutFeedback>
    </TouchableOpacity>
  </Modal>
)

const styles = StyleSheet.create({
  controlbtn: {
    width: 40,
    height: 40,
    backgroundColor: 'darkgreen',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  controlBtnText: {
    color: 'white',
    fontWeight: 'bold'
  },
  dateBtn: {
    width: '45%',
    backgroundColor: 'darkgreen',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30
  },
  dateBtnText: {
    fontSize: 20,
    color: 'white'
  }
})