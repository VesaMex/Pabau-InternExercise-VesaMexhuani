"use client"
import { useRouter } from "next/navigation"
import React from "react"

function ReturnButton() {
  const router = useRouter()

  return (
    <button
      onClick={() => {
        router.push("/")
      }}
      className="border-2 border-orange-500 flex items-center justify-center rounded-md hover:bg-orange-300/20 px-4 py-2 text-sm"
    >
      {" "}
      Go Back
    </button>
  )
}

export default ReturnButton
