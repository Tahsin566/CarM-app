import { getCurrentUser } from "@/actions/Auth"
import AddCarForm from "@/components/AddCar"
import Spinner from "@/components/Spinner"
import { redirect } from "next/navigation"
import { Suspense } from "react"


const page = async () => {

  const user = await getCurrentUser()

  if (user?.role !== 'admin') {
    redirect('/')
  }

  return (
    <Suspense fallback={<Spinner />}>
      <div className="overflow-y-auto">
      <AddCarForm />
      </div>
    </Suspense>
  )
}
export default page