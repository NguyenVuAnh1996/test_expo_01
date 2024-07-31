import RNDateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useRef, useState } from "react"
import { Control, Controller, FieldErrors, FieldValues, Path } from "react-hook-form";
import { Animated, Modal, Platform, Pressable, StyleProp, Text, TextStyle, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"

// this component uses the library 
// from https://github.com/react-native-datetimepicker/datetimepicker

const padZeroWithTwoDigits = (input: number): string => {
  let str = String(input);
  if (str.length > 2) return str;
  return str.padStart(2, '0');
}

const isAndroid = Platform.OS === 'android';
const isIOS = Platform.OS === 'ios';

const iosModalHeight = 100;

const DateTimePickerLib01 = ({
  value,
  onChange,
  mode = 'date'
}: {
  value?: Date
  onChange: (input: Date) => void
  mode?: 'date' | 'time'
}) => {
  const [inputDate, setInputDate] = useState<Date | undefined>(value);
  const [dateModalOpen, setDateModalOpen] = useState<boolean>(false);

  const slidingAnimation = useRef(new Animated.Value(iosModalHeight * -1)).current;

  const handleOpenDateModal = () => {
    setDateModalOpen(true);
    if (isIOS) {
      Animated.timing(slidingAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }

  const handleCloseIOSModal = () => {
    Animated.timing(slidingAnimation, {
      toValue: iosModalHeight * -1,
      duration: 50,
      useNativeDriver: false,
    }).start(() => setDateModalOpen(false));
  }

  const handleDatePickerChange = (event: DateTimePickerEvent, date: Date | undefined) => {
    if (isIOS) {
      handleCloseIOSModal();
    } else {
      setDateModalOpen(false);
    }
    if (event.type === 'set') {
      setInputDate(date ? date : new Date());
      onChange(date ? date : new Date());
    }
  }
  return (
    <>
      <Pressable style={{
        borderWidth: 1,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20
      }} onPress={handleOpenDateModal}>
        <Text>{
          mode === 'date'
            ? (
              inputDate
                ? inputDate.toJSON().slice(0, 10).split('-').reverse().join('/')
                : '__/__/____'
            )
            : (
              inputDate
                ? `${padZeroWithTwoDigits(inputDate.getHours())}:${padZeroWithTwoDigits(inputDate.getMinutes())}`
                : '__:__'
            )
        }</Text>
        <View style={{
          borderWidth: 1,
          width: 20,
          height: 20
        }}></View>
      </Pressable>
      {dateModalOpen && Platform.OS === 'android' &&
        <RNDateTimePicker
          mode={mode}
          display={mode === 'date' ? 'calendar' : 'clock'}
          value={inputDate ? inputDate : new Date()}
          onChange={handleDatePickerChange}
        />
      }
      {Platform.OS === 'ios' &&
        <Modal
          visible={dateModalOpen}
          onRequestClose={handleCloseIOSModal}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: '#000000a1',
            }}
            activeOpacity={1}
            onPress={handleCloseIOSModal}
          >
            <TouchableWithoutFeedback>
              <Animated.View style={{
                width: '100%',
                height: iosModalHeight,
                backgroundColor: 'white',
                alignSelf: 'flex-end',
                position: 'absolute',
                bottom: slidingAnimation,
                padding: 10
              }}>
                <RNDateTimePicker
                  mode={mode}
                  display={mode === 'date' ? 'calendar' : 'compact'}
                  value={inputDate ? inputDate : new Date()}
                  onChange={handleDatePickerChange}
                />
              </Animated.View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </Modal>
      }
    </>
  )
}

export default function DateTimePickerLib01RHF<T extends FieldValues>({
  control,
  name,
  displayName = '',
  isLabel = false,
  isRequired = false,
  errors,
  labelStyles,
  errorStyles,
  mode
}: {
  control: Control<T>,
  name: Path<T>,
  errors?: FieldErrors<T>,
  displayName?: string,
  isLabel?: boolean,
  isRequired?: boolean,
  labelStyles?: StyleProp<TextStyle>,
  errorStyles?: StyleProp<TextStyle>,
  mode?: 'date' | 'time'
}) {
  return (
    <>
      {isLabel && <Text style={labelStyles}>{`${displayName}:`}</Text>}
      <Controller
        control={control}
        name={name}
        rules={{ required: isRequired }}
        render={({ field }) =>
          <DateTimePickerLib01
            value={field.value}
            onChange={field.onChange}
            mode={mode}
          />
        }
      />
      {errors?.[name] && (
        <Text style={[
          {
            color: 'red',
            marginBottom: 15
          },
          errorStyles
        ]}>
          {errors?.[name]?.type === 'required' && `${displayName} không được để trống!`}
        </Text>
      )}
    </>
  )
}