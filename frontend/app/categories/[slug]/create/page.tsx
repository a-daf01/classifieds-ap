'use client'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import CarFields        from '@/components/forms/CarFields'
import FurnFields       from '@/components/forms/FurnitureFields'
import JobFields        from '@/components/forms/JobFields'
import RecrFields       from '@/components/forms/RecruitmentFields'
import ClothFields      from '@/components/forms/ClothingFields'
import ServFields       from '@/components/forms/ServiceFields'
import ProjFields       from '@/components/forms/ProjectFields'
import GameFields       from '@/components/forms/GameFields'
import DeviceFields     from '@/components/forms/DeviceFields'

const fieldMap: Record<string, React.FC<any>> = {
  cars:        CarFields,
  furniture:   FurnFields,
  jobs:        JobFields,
  recruitment: RecrFields,
  clothing:    ClothFields,
  services:    ServFields,
  projects:    ProjFields,
  games:       GameFields,
  devices:     DeviceFields,
}

export default function CreateListingPage({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params
  const router   = useRouter()
  const { register, handleSubmit, control } = useForm()

  const SpecificFields = fieldMap[slug]

  async function onSubmit(data: any) {
    const payload = { category: slug, ...data }
    const res     = await fetch('/api/listings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (res.ok) {
      const listing = await res.json()
      router.push(`/listings/${listing.id}`)
    } else {
      console.error(await res.text())
      alert('Failed to create listing')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Create a {slug}</h1>

      <label>
        Title
        <input {...register('title', { required: true })} className="input" />
      </label>

      <label>
        Description
        <textarea {...register('description')} className="textarea" />
      </label>

      <label>
        Price
        <input
          type="number"
          step="0.01"
          {...register('price', { valueAsNumber: true })}
          className="input"
        />
      </label>

      {SpecificFields ? (
        <SpecificFields register={register} control={control} />
      ) : (
        <p className="text-red-600">Unknown category: {slug}</p>
      )}

      <label>
        Images
        <input type="file" {...register('images')} multiple className="input" />
      </label>

      <button type="submit" className="btn-primary">
        Create Listing
      </button>
    </form>
  )
}
