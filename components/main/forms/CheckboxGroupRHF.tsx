import { Control, Controller, FieldErrors, FieldValues, Path } from "react-hook-form"
import { Pressable, StyleProp, Text, TextStyle, View, ViewStyle } from "react-native"

interface CheckboxItem {
  label: string
  value: string | number
}

const CheckboxGroup = ({
  items,
  value= [],
  onChange,
  boxStyles,
  checkedColor = '#1677FF',
  uncheckedColor = 'lightgrey',
  smallLabelStyles
}: {
  items: CheckboxItem[]
  value?: (string | number)[]
  onChange: (value: (string | number)[]) => void
  boxStyles?: StyleProp<ViewStyle>
  checkedColor?: string
  uncheckedColor?: string
  smallLabelStyles?: StyleProp<TextStyle>,
}) => {
  const handleChange = (boxValue: string | number) => {
    let _values = [...value];
    if (_values.includes(boxValue)) {
      onChange(_values.filter(x => x !== boxValue))
    } else {
      _values.push(boxValue)
      onChange(_values)
    }
  }
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
          onPress={() => handleChange(x.value)}
          style={{
            flexDirection: 'row',
          }}
        >
          <View style={[
            {
              width: 20,
              height: 20,
              backgroundColor: value && value.includes(x.value) ? checkedColor : uncheckedColor,
            },
            boxStyles
          ]}>
            {value && value.includes(x.value) &&
              <Text style={{
                color: 'white',
                margin: 'auto',
                fontWeight: 'bold',
                transform: [
                  { rotateY: '180deg' },
                  { rotateZ: '-45deg' },
                ]
              }}>L</Text>
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

export default function CheckboxGroupRHF<T extends FieldValues>({
  items,
  control,
  name,
  displayName = '',
  isLabel = false,
  isRequired = false,
  errors,
  labelStyles,
  errorStyles,
  boxStyles,
  checkedColor,
  uncheckedColor,
  smallLabelStyles
}: {
  items: CheckboxItem[]
  control: Control<T>,
  name: Path<T>,
  errors?: FieldErrors<T>,
  displayName?: string,
  isLabel?: boolean,
  isRequired?: boolean,
  labelStyles?: StyleProp<TextStyle>,
  errorStyles?: StyleProp<TextStyle>,
  boxStyles?: StyleProp<ViewStyle>,
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
          <CheckboxGroup
            items={items}
            value={field.value}
            onChange={field.onChange}
            checkedColor={checkedColor}
            uncheckedColor={uncheckedColor}
            boxStyles={boxStyles}
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