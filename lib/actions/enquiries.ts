'use server'

import { auth } from '@/auth'
import { prisma } from '@/lib/db/prisma'
import { revalidatePath } from 'next/cache'
import type { EnquiryStatus } from '@prisma/client'

export async function updateEnquiryStatus(id: string, status: EnquiryStatus): Promise<void> {
  const session = await auth()
  if (!session) throw new Error('Unauthorized')

  await prisma.enquiry.update({ where: { id }, data: { status } })
  revalidatePath('/admin/enquiries')
  revalidatePath(`/admin/enquiries/${id}`)
}

export async function deleteEnquiry(id: string): Promise<void> {
  const session = await auth()
  if (!session) throw new Error('Unauthorized')

  await prisma.enquiry.delete({ where: { id } })
  revalidatePath('/admin/enquiries')
}
