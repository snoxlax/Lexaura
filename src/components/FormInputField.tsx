import { Control } from "react-hook-form"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"

interface FormInputFieldProps {
  control: Control,
  name: string,
  label: string,
  placeholder: string,
  description?: string
}

export default function FormInputField({ control, name, label, placeholder, description }: FormInputFieldProps) {
  return <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input {...field} placeholder={placeholder} autoFocus />
        </FormControl>
        <FormDescription>
          {description}
        </FormDescription>
        <FormMessage />
      </FormItem>
    )}
  />
};
