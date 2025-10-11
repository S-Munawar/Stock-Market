import { Label } from '@radix-ui/react-dropdown-menu'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@radix-ui/react-select'
import React from 'react'
import { Controller } from 'react-hook-form'

const SelectField = ({ name, label, placeholder, options, control, error, required }: SelectFieldProps) => {
  return (
    <div className='space-y-2'>
      <Label className='form-label'>
        {label}
      </Label>

      <Controller
        name={name}
        control={control}
        rules={{
          required: required ? `${label} is required` : false
        }}
        render={({ field }) => (
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger className='select-trigger'>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent className='bg-gray-800 border-gray-600 text-white'>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value} className='focus:bg-gray-600' onClick={() => field.onChange(option.value)}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
            {error && <p className='form-error'>{error.message}</p>}
          </Select>
        )}
      />
    </div>
  );
}

export default SelectField
