import { useState } from "react"
import { Control, Controller, FieldErrors, FieldValues, Path } from "react-hook-form";
import { Platform, Pressable, StyleProp, Text, TextStyle, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

// this component uses the library 
// from https://github.com/mmazzarolo/react-native-modal-datetime-picker?tab=readme-ov-file

const padZeroWithTwoDigits = (input: number): string => {
  let str = String(input);
  if (str.length > 2) return str;
  return str.padStart(2, '0');
}

const DateTimePickerLib_11 = ({
  value,
  onChange,
  mode = 'date'
}: {
  value?: Date
  onChange: (input: Date) => void
  mode?: 'date' | 'time'
}) => {
  const [inputDate, setInputDate] = useState<Date | undefined>(value);
  const [tempDate, setTempDate] = useState<Date | undefined>(value);
  const [dateModalOpen, setDateModalOpen] = useState<boolean>(false);
  const handleOpenDateModal = () => {
    setDateModalOpen(true);
  }
  const handleConfirm = () => {
    console.log('change: ', JSON.stringify(inputDate))
    setInputDate(tempDate);
    setDateModalOpen(false);
  }
  const handleCancel = () => {
    setDateModalOpen(false);
  }
  const handleDatePickerChange = (date: Date) => {
    console.log('change: ', JSON.stringify(date))
    setTempDate(date);
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
      <DateTimePickerModal
          mode={mode}
          isVisible={dateModalOpen}
          display={mode === 'date' ? 'calendar' : (
            Platform.OS === 'ios' ? 'compact' : 'clock'
          )}
          locale="vi_VN"
          date={inputDate ? inputDate : new Date()}
          onChange={handleDatePickerChange}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          confirmTextIOS='Xác nhận'
          cancelTextIOS='Hủy'
          pickerComponentStyleIOS={{
            position: 'relative',
            padding: 20,
            marginRight: 20
          }}
        />
    </>
  )
}

export default function DateTimePickerLib_11_RHF<T extends FieldValues>({
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
          <DateTimePickerLib_11
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