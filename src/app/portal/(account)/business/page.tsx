import { redirect } from 'next/navigation'
import React from 'react'

export default function Business() {
    redirect("/portal/business/details")
  return (
    <div>page</div>
  )
}
