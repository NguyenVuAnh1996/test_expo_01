import dayjs, { Dayjs } from "dayjs";
import { useCallback, useState } from "react"
import { Control, Controller, FieldErrors, FieldValues, Path } from "react-hook-form";
import { Modal, Pressable, StyleProp, Text, TextStyle, TouchableOpacity, TouchableWithoutFeedback, View, ViewBase } from "react-native"
import DateTimePicker, { DateType } from "react-native-ui-datepicker";
import 'dayjs/locale/vi';

// this component uses the library 
// from https://www.npmjs.com/package/react-native-ui-datepicker

const padZeroWithTwoDigits = (input: number): string => {
  let str = String(input);
  if (str.length > 2) return str;
  return str.padStart(2, '0');
}

const convertDateTypeToDayjs = (input: DateType) => {
  if (input
    && typeof input !== 'string'
    && typeof input !== 'number'
    && !(input instanceof Date)
  ) return input;
}

const DateTimePickerLib02 = ({
  value,
  onChange,
  otherProps
}: {
  value?: Date
  onChange: (input: Date) => void;
  otherProps: any
}) => {
  const [inputDate, setInputDate] = useState<DateType>(value);
  const [dateModalOpen, setDateModalOpen] = useState<boolean>(false);
  const handleOpenDateModal = () => {
    setDateModalOpen(true);
  }
  const handleCloseModal = () => {
    setDateModalOpen(false);
  }
  const onChangeDatePicker = useCallback((params: {
    date: DateType
  }) => {
    setInputDate(params.date)
    let _date = convertDateTypeToDayjs(params.date)?.toDate()
    onChange(_date ? _date : new Date())
  }, [])
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
          inputDate
            ? convertDateTypeToDayjs(inputDate)?.format('DD/MM/YYYY')
            : '__/__/____'
        }</Text>
        <View style={{
          borderWidth: 1,
          width: 20,
          height: 20
        }}></View>
      </Pressable>
      <Modal
        transparent={true}
        visible={dateModalOpen}
        onRequestClose={handleCloseModal}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: '#000000a1',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          activeOpacity={1}
          onPress={handleCloseModal}
        >
          <TouchableWithoutFeedback>
            <View style={{
              backgroundColor: 'white'
            }}>
            <DateTimePicker
              mode="single"
              date={inputDate}
              locale='vi'
              onChange={onChangeDatePicker}
              {...otherProps}
            />
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    </>
  )
}

export default function DateTimePickerLib02RHF<T extends FieldValues>({
  control,
  name,
  displayName = '',
  isLabel = false,
  isRequired = false,
  errors,
  labelStyles,
  errorStyles,
  ...otherProps
}: {
  control: Control<T>,
  name: Path<T>,
  errors?: FieldErrors<T>,
  displayName?: string,
  isLabel?: boolean,
  isRequired?: boolean,
  labelStyles?: StyleProp<TextStyle>,
  errorStyles?: StyleProp<TextStyle>,
  [propName: string]: unknown
}) {
  return (
    <>
    {isLabel && <Text style={labelStyles}>{`${displayName}:`}</Text>}
      <Controller
        control={control}
        name={name}
        rules={{ required: isRequired }}
        render={({ field }) =>
          <DateTimePickerLib02
            value={field.value}
            onChange={field.onChange}
            otherProps={otherProps}
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