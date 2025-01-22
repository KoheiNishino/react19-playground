'use client'

import { useForm } from 'react-hook-form'

interface Form {
  firstName: string
  lastName: string
  email: string
}

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>()

  return (
    <form
      className="mx-auto w-1/2 space-y-4 p-6"
      // eslint-disable-next-line no-alert
      onSubmit={handleSubmit(data => alert(JSON.stringify(data)))}
    >
      <label className="block">
        <span className="block text-sm font-medium text-gray-700">姓</span>
        <input
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          {...register('lastName', {
            required: '姓は必須です',
            maxLength: { value: 5, message: '姓は5文字以内で入力してください' },
          })}
        />
        {errors.lastName && (
          <span className="mt-1 text-sm text-red-600">{errors.lastName.message}</span>
        )}
      </label>
      <label className="block">
        <span className="block text-sm font-medium text-gray-700">名</span>
        <input
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          {...register('firstName', {
            required: '名は必須です',
            maxLength: { value: 5, message: '名は5文字以内で入力してください' },
          })}
        />
        {errors.firstName && (
          <span className="mt-1 text-sm text-red-600">{errors.firstName.message}</span>
        )}
      </label>
      <label className="block">
        <span className="block text-sm font-medium text-gray-700">メールアドレス</span>
        <input
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          {...register('email', {
            required: 'メールアドレスは必須です',
            pattern: {
              value: /\S[^\s@]*@\S+\.\S+/,
              message: '有効なメールアドレスを入力してください',
            },
          })}
        />
        {errors.email && (
          <span className="mt-1 text-sm text-red-600">{errors.email.message}</span>
        )}
      </label>
      <button
        type="submit"
        className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        送信
      </button>
    </form>
  )
}
