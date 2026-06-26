'use server'

import { auth } from '@/auth'
import { prisma } from '@/lib/db/prisma'
import { revalidatePath } from 'next/cache'
import type { EnquiryStatus, EnquiryType } from '@prisma/client'
import { headers } from 'next/headers'

export async function submitEnquiry(formData: FormData): Promise<{ ok: boolean; error?: string }> {
  try {
    const name = (formData.get('name') as string ?? '').trim()
    const email = (formData.get('email') as string ?? '').trim()
    const type = (formData.get('type') as EnquiryType) ?? 'GENERAL'

    if (!name || !email) return { ok: false, error: 'Name und E-Mail sind erforderlich.' }

    const hdrs = await headers()
    const ip = hdrs.get('x-forwarded-for')?.split(',')[0] ?? hdrs.get('x-real-ip') ?? null

    await prisma.enquiry.create({
      data: {
        type,
        name,
        email,
        phone: (formData.get('phone') as string) || null,
        company: (formData.get('company') as string) || null,
        country: (formData.get('country') as string) || null,
        quantity: formData.get('quantity') ? parseInt(formData.get('quantity') as string, 10) : null,
        message: (formData.get('message') as string) || null,
        ipAddress: ip,
      },
    })

    revalidatePath('/admin/enquiries')
    return { ok: true }
  } catch {
    return { ok: false, error: 'Etwas ist schiefgelaufen. Bitte versuche es erneut.' }
  }
}

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
