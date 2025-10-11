import React from 'react'
import { Label } from "@/components/ui/label"
import { cn } from '@/lib/utils'


const InputField = ({ 
    name, 
    label, 
    placeholder, 
    type="text", 
    register, 
    error, 
    validation, 
    disabled, 
    value 
}: FormInputProps) => {

  return (
    <div className='space-y-2'>
      <Label htmlFor={name} className='form-label'>
        {label}
      </Label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        {...register(name, validation)}
        className={cn('form-input', {'opacity-50 cursor-not-allowed': disabled})}
      />
      {error && <p className="text-red-500">{error.message}</p>}
    </div>
  )
}

export default InputField
