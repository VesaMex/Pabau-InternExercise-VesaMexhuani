import Link from "next/link"
async function getBookings() {
  const res = await fetch(
    "http://host.docker.internal:5000/api/bookings",
    {
      cache: "no-store",
      mode: "no-cors",
      next: { tags: ["bookings"] },
    }
  )

  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }

  return res.json()
}

interface Booking {
  id: number
  service: string
  doctor_name: string
  start_time: string
  end_time: string
  date: string
}

const Home: React.FC = async () => {
  const bookings: Booking[] = await getBookings()

  console.log(bookings)
  return (
    <div className=" flex flex-col px-10 bg-white">
      <div className="flex justify-center pt-10 text-5xl">
        Hello, I am Vesa
      </div>
      <div className="flex justify-center  text-xl">
        I will try to demonstrate my skills through this demo
      </div>
      <div className="flex justify-center  ">

      <Link
        href={`/booking/add`}
        className=" p-2 border-2 border-orange-300  rounded-md justify-center flex w-56 text-orange-500"
      >
        {" "}
        ADD A BOOKING
      </Link>  </div>
      <h1 className="text-2xl mb-5">
        Here are going to be the links:{" "}
      </h1>
      <div className="flex flex-col gap-3">
        {bookings.map((item, index) => (
          <Link
            key={index}
            href={`/booking/${item.id}`}
            className="hover:underline"
          >
            This Booking is with{" "}
            <span className="ml-1 font-bold">
              {" "}
              {item.doctor_name}{" "}
            </span>{" "}
            For{" "}
            <span className="ml-1 font-bold"> {item.service} </span>{" "}
            and it ends on{" "}
            <span className="ml-1 font-bold"> {item.end_time} </span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Home
