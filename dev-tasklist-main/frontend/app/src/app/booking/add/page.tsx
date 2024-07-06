"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { revalidateTag } from "next/cache"
import action from "@/actions/action"

export default function CreateBookingPage() {
  const [form, setForm] = useState({
    service: "",
    doctor_name: "",
    start_time: "",
    end_time: "",
    date: "",
  })
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prevForm) => ({ ...prevForm, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      const res = await fetch(
        `http://host.docker.internal:5000/api/bookings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      )
      if (res.ok) {
        action()
        router.push("/")
      } else {
        throw new Error("Failed to create booking")
      }
    } catch (error) {
      setError("Failed to create booking")
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl mb-4">Create a New Booking</h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-4"
      >
        <div className="col-span-2">
          <label className="block mb-2">
            Service:
            <input
              type="text"
              name="service"
              value={form.service}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />
          </label>
        </div>
        <div className="col-span-2">
          <label className="block mb-2">
            Doctor Name:
            <input
              type="text"
              name="doctor_name"
              value={form.doctor_name}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />
          </label>
        </div>
        <div>
          <label className="block mb-2">
            Start Time:
            <input
              type="date"
              name="start_time"
              value={form.start_time}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />
          </label>
        </div>
        <div>
          <label className="block mb-2">
            End Time:
            <input
              type="date"
              name="end_time"
              value={form.end_time}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />
          </label>
        </div>
        <div className="col-span-2">
          <label className="block mb-2">
            Date:
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />
          </label>
        </div>
        <div className="col-span-2">
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded w-full"
          >
            Create Booking
          </button>
        </div>
      </form>
      <button
        onClick={() => {
          router.push("/")
        }}
        className="mt-4 border-2 border-orange-500 flex items-center justify-center px-4 py-2"
      >
        Go Back
      </button>
    </div>
  )
}
