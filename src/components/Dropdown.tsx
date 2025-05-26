import React, { useState, useRef, useEffect } from 'react'

type Option = {
  label: string
  value: string
}

type CustomDropdownProps = {
  options: Option[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

const Dropdown: React.FC<CustomDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select...'
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const selected = options.find(opt => opt.value === value)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (option: Option) => {
    onChange(option.value)
    setIsOpen(false)
  }

  return (
    <div className='relative w-64' ref={dropdownRef}>
      <button
        className='w-full px-4 py-2 border border-gray-500/30 rounded text-left bg-[var(--background)] text-[var(--foreground)]'
        onClick={() => setIsOpen(prev => !prev)}
      >
        {selected?.label || placeholder}
      </button>

      {isOpen && (
        <ul className='absolute z-10 w-full mt-1 border bg-white rounded shadow bg-[var(--background)]'>
          {options.map(option => (
            <li
              key={option.value}
              onClick={() => handleSelect(option)}
              className={`px-4 py-2 bg-[var(--background)] text-[var(--foreground)] cursor-pointer hover:bg-gray-500 ${
                option.value === value ? 'bg-gray-600' : ''
              }`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Dropdown
