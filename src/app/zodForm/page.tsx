'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  password: z.string().superRefine((val, ctx) => {
    const messages = []
    if (val.length < 8) {
      messages.push('パスワードは8文字以上必要です')
    }
    if (!/[A-Z]/.test(val)) {
      messages.push('大文字を含める必要があります')
    }
    if (!/\d/.test(val)) {
      messages.push('数字を含める必要があります')
    }
    if (messages.length > 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: messages.join('\n'),
      })
    }
  }),
})

type FormValues = z.infer<typeof schema>

export default function Page() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormValues) => {
    try {
      // eslint-disable-next-line no-console
      console.log('送信データ:', data)
    }
    catch (error) {
      console.error('エラー:', error)
    }
  }

  return (
    <form className="my-2 rounded-md border p-8" onSubmit={handleSubmit(onSubmit)}>
      <input className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500" {...register('password')} />
      {errors.password?.message && (
        <ul>
          {
            (errors.password.message).split('\n').map(message => (
              <li key={message} style={{ color: 'red' }}>{message}</li>
            ))
          }
        </ul>
      )}
    </form>
  )
};
