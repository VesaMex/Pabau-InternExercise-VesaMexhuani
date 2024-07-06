import ReturnButton from "./_components/returnButton"

interface PageProps {
  params: { id: string }
}
interface Booking {
  id: number
  service: string
  doctor_name: string
  start_time: string
  end_time: string
  date: string
}
async function getBookingsById(id: string) {
  const res = await fetch(
    `http://host.docker.internal:5000/api/bookings/${id}`,
    { cache: "no-store", mode: "no-cors" }
  )

  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }

  return res.json()
}
export default async function Page({ params }: PageProps) {
  const booking: Booking = await getBookingsById(params.id)
  return (
    <>
      <h1 className="text-2xl">
        This Booking is with{" "}
        <span className="ml-1 font-bold">{booking.doctor_name} </span>{" "}
        For <span className="ml-1 font-bold">{booking.service} </span>{" "}
        and it ends on{" "}
        <span className="ml-1 font-bold">{booking.end_time} </span>
        <div className="flex justify-center mt-4">
          {" "}
          <ReturnButton />
        </div>
      </h1>
    </>
  )
}
