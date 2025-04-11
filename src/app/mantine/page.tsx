'use client'

import { MantineProvider } from '@mantine/core'

import { DatePicker } from '@mantine/dates'
import { useState } from 'react'
import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'

export default function App() {
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null])

  return (
    <MantineProvider>
      <DatePicker excludeDate={date => date.getDay() !== 5} type="range" value={value} onChange={setValue} />
    </MantineProvider>
  )
}
