import { Control, Controller, FieldErrors, FieldValues, Path } from "react-hook-form"
import { StyleProp, Text, TextInput, TextStyle } from "react-native"

export default function TextInputRHF<T extends FieldValues>({
  control,
  name,
  displayName = '',
  isLabel = false,
  isPlaceholder = false,
  errors,
  isRequired = false,
  extraValidate,
  errMess_extra,
  style,
  labelStyles,
  errorStyles,
  ...otherProps
}: {
  control: Control<T>,
  name: Path<T>,
  displayName?: string,
  isLabel?: boolean,
  isPlaceholder?: boolean,
  errors?: FieldErrors<T>,
  isRequired?: boolean,
  extraValidate?: (value: string) => boolean,
  errMess_extra?: string,
  style?: StyleProp<TextStyle>,
  labelStyles?: StyleProp<TextStyle>,
  errorStyles?: StyleProp<TextStyle>,
  [propsName: string]: unknown
}) {
  displayName = displayName === '' ? name : displayName;
  return (
    <>
      {isLabel && <Text style={labelStyles}>{`${displayName}:`}</Text>}
      <Controller
        control={control}
        name={name}
        rules={{
          required: isRequired,
          validate: {
            extra_validate: value => extraValidate ? extraValidate(value) : true
          }
        }}
        render={({ field }) =>
          <TextInput
            {...field}
            onChangeText={value => field.onChange(value)}
            value={field.value}
            placeholder={isPlaceholder ? displayName : ''}
            style={[
              {
                borderWidth: 1,
                marginTop: 10,
                marginBottom: 10
              },
              style
            ]}
            {...otherProps}
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
          {errors?.[name]?.type === 'extra_validate' && errMess_extra}
        </Text>
      )}
    </>
  )
}