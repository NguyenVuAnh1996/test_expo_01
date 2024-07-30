import { Control, Controller, FieldErrors, FieldValues, Path } from "react-hook-form";
import { Pressable, StyleProp, Text, TextStyle, View, ViewStyle } from "react-native";

interface RadioItem {
  label: string
  value: string | number
}

const RadioBtnGroup = ({
  items,
  value,
  onChange,
  radioStyles,
  checkedColor = '#1677FF',
  uncheckedColor = 'lightgrey',
  smallLabelStyles
}: {
  items: RadioItem[]
  value: string | number
  onChange: (value: string | number) => void
  radioStyles?: StyleProp<ViewStyle>
  checkedColor?: string
  uncheckedColor?: string
  smallLabelStyles?: StyleProp<TextStyle>,
}) => {
  return (
    <View style={{
      flexDirection: 'row',
      gap: 20,
      margin: 15,
      marginLeft: 0
    }}>
      {items.map(x =>
        <Pressable
          key={x.value}
          onPress={() => onChange(x.value)}
          style={{
            flexDirection: 'row',
          }}
        >
          <View style={[
            {
              width: 20,
              height: 20,
              backgroundColor: x.value === value ? checkedColor : uncheckedColor,
              borderRadius: 10
            },
            radioStyles
          ]}>
            {x.value === value &&
              <View style={{
                width: 10,
                height: 10,
                backgroundColor: 'white',
                borderRadius: 5,
                margin: 'auto'
              }}></View>
            }
          </View>
          <Text style={[
            {
              marginLeft: 10
            },
            smallLabelStyles
          ]}>{x.label}</Text>
        </Pressable>
      )}
    </View>
  )
}

export default function RadioBtnGroupRHF<T extends FieldValues>({
  items,
  control,
  name,
  displayName = '',
  isLabel = false,
  isRequired = false,
  errors,
  labelStyles,
  errorStyles,
  radioStyles,
  checkedColor,
  uncheckedColor,
  smallLabelStyles
}: {
  items: RadioItem[]
  control: Control<T>,
  name: Path<T>,
  errors?: FieldErrors<T>,
  displayName?: string,
  isLabel?: boolean,
  isRequired?: boolean,
  labelStyles?: StyleProp<TextStyle>,
  errorStyles?: StyleProp<TextStyle>,
  radioStyles?: StyleProp<ViewStyle>,
  checkedColor?: string,
  uncheckedColor?: string,
  smallLabelStyles?: StyleProp<TextStyle>,
}) {
  return (
    <>
      {isLabel && <Text style={labelStyles}>{`${displayName}:`}</Text>}
      <Controller
        control={control}
        name={name}
        rules={{ required: isRequired }}
        render={({ field }) =>
          <RadioBtnGroup
            items={items}
            value={field.value}
            onChange={field.onChange}
            checkedColor={checkedColor}
            uncheckedColor={uncheckedColor}
            radioStyles={radioStyles}
            smallLabelStyles={smallLabelStyles}
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