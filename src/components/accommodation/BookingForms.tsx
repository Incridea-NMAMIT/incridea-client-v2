import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { UploadButton } from '../../utils/uploadthing'
import { toast } from 'react-toastify'
import { bookIndividual } from '../../api/accommodation'
import { Loader2 } from 'lucide-react'

// Schemas
const individualSchema = z.object({
  gender: z.enum(['MALE', 'FEMALE']),
  checkIn: z.string().min(1, 'Check-in time is required'),
  checkOut: z.string().min(1, 'Check-out time is required'),
  idCard: z.string().url('ID Card image is required'),
})

type IndividualForm = z.infer<typeof individualSchema>

export const IndividualBookingForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<IndividualForm>({
    resolver: zodResolver(individualSchema),
    defaultValues: {
      gender: 'MALE'
    }
  })

  // Watch ID Card to show preview or status
  const idCard = watch('idCard')

  const onSubmit = async (data: IndividualForm) => {
    setLoading(true)
    try {
      const response = await bookIndividual({
        ...data,
        checkIn: new Date(data.checkIn).toISOString(),
        checkOut: new Date(data.checkOut).toISOString()
      })
      
      const { payment } = response
      
      const loadScript = (src: string) => {
        return new Promise((resolve) => {
            const script = document.createElement('script')
            script.src = src
            script.onload = () => resolve(true)
            script.onerror = () => resolve(false)
            document.body.appendChild(script)
        })
      }

      const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
      if (!res) {
          toast.error('Razorpay SDK failed to load')
          setLoading(false)
          return
      }

      const options = {
          key: payment.key,
          amount: payment.amount,
          currency: payment.currency,
          name: "Incridea",
          description: "Accommodation Booking",
          order_id: payment.orderId,
          handler: function (_response: any) {
             toast.success('Payment Successful!')
             // Ideally verify payment here
             onSuccess()
          },
          prefill: {
              // We could pass user details if available
          },
          theme: {
              color: '#3399cc'
          }
      }

      const rzp = new (window as any).Razorpay(options)
      rzp.on('payment.failed', function (response: any) {
          toast.error(response.error.description || 'Payment Failed')
      })
      rzp.open()

    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Booking failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Gender</label>
          <select {...register('gender')} className="w-full bg-white/10 border border-white/20 rounded p-2 focus:outline-none focus:border-primary-500">
            <option value="MALE" className="text-black">Male</option>
            <option value="FEMALE" className="text-black">Female</option>
          </select>
          {errors.gender && <p className="text-red-400 text-xs mt-1">{errors.gender.message}</p>}
        </div>

        <div>
           {/* Date pickers - simple datetime-local for now */}
           <label className="block text-sm font-medium mb-1">Check In</label>
           <input type="datetime-local" {...register('checkIn')} className="w-full bg-white/10 border border-white/20 rounded p-2 focus:outline-none" />
           {errors.checkIn && <p className="text-red-400 text-xs mt-1">{errors.checkIn.message}</p>}
        </div>

        <div>
           <label className="block text-sm font-medium mb-1">Check Out</label>
           <input type="datetime-local" {...register('checkOut')} className="w-full bg-white/10 border border-white/20 rounded p-2 focus:outline-none" />
           {errors.checkOut && <p className="text-red-400 text-xs mt-1">{errors.checkOut.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">ID Card (Government/College ID)</label>
        <div className="border border-white/20 border-dashed rounded p-4 flex flex-col items-center justify-center bg-white/5">
            {idCard ? (
                <div className="text-green-400 text-sm">ID Card Uploaded</div>
            ) : (
                <UploadButton
                    endpoint="accommodationIdProof"
                    onClientUploadComplete={(res) => {
                        if (res?.[0]?.url) {
                            setValue('idCard', res[0].url)
                            toast.success('Upload complete')
                        }
                    }}
                    onUploadError={(error: Error) => {
                        toast.error(`Upload failed: ${error.message}`)
                    }}
                />
            )}
        </div>
        {errors.idCard && <p className="text-red-400 text-xs mt-1">{errors.idCard.message}</p>}
      </div>

      <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors flex justify-center items-center">
        {loading ? <Loader2 className="animate-spin" /> : 'Book & Pay'}
      </button>
    </form>
  )
}



