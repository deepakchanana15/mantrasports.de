'use client'

import { useState } from 'react'
import { saveSettings } from '@/lib/actions/settings'

const inputCls = 'w-full rounded border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 disabled:bg-neutral-50 disabled:text-neutral-400'

const FIELDS = [
  { section: 'Branding', items: [
    { key: 'site_name',    label: 'Site Name',    type: 'text',     placeholder: 'Mantra Sports DE' },
    { key: 'site_tagline', label: 'Tagline',      type: 'text',     placeholder: 'Ohne Grenzen spielen.' },
  ]},
  { section: 'Contact', items: [
    { key: 'contact_email',   label: 'Contact Email',   type: 'email',  placeholder: 'info@mantrasports.de' },
    { key: 'contact_phone',   label: 'Phone Number',    type: 'tel',    placeholder: '+49 ...' },
    { key: 'contact_address', label: 'Address',         type: 'text',   placeholder: 'Street, City, Germany' },
    { key: 'whatsapp_number', label: 'WhatsApp Number', type: 'tel',    placeholder: '+49...' },
  ]},
  { section: 'Social Media', items: [
    { key: 'social_instagram', label: 'Instagram URL', type: 'url', placeholder: 'https://instagram.com/...' },
    { key: 'social_facebook',  label: 'Facebook URL',  type: 'url', placeholder: 'https://facebook.com/...' },
    { key: 'social_linkedin',  label: 'LinkedIn URL',  type: 'url', placeholder: 'https://linkedin.com/...' },
    { key: 'social_youtube',   label: 'YouTube URL',   type: 'url', placeholder: 'https://youtube.com/...' },
  ]},
  { section: 'SEO', items: [
    { key: 'meta_title',       label: 'Default Meta Title',       type: 'text',     placeholder: 'Mantra Sports DE — Premium Cricket' },
    { key: 'meta_description', label: 'Default Meta Description', type: 'textarea', placeholder: '160 chars max...' },
  ]},
  { section: 'Footer', items: [
    { key: 'footer_text', label: 'Footer Copyright Text', type: 'text', placeholder: '© 2025 Mantra Sports. Alle Rechte vorbehalten.' },
  ]},
]

export function SettingsForm({
  settings,
  disabled,
}: {
  settings: Record<string, string>
  disabled?: boolean
}) {
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSaving(true)
    setSaved(false)
    setError(null)

    const fd = new FormData(e.currentTarget)
    try {
      await saveSettings(fd)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error saving settings.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      )}

      {FIELDS.map(({ section, items }) => (
        <div key={section} className="rounded border border-neutral-200 bg-white p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-500">{section}</h2>
          <div className="space-y-4">
            {items.map(({ key, label, type, placeholder }) => (
              <div key={key}>
                <label className="mb-1.5 block text-sm font-medium text-neutral-700">{label}</label>
                {type === 'textarea' ? (
                  <textarea
                    name={`setting_${key}`}
                    defaultValue={settings[key] ?? ''}
                    rows={2}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={inputCls}
                  />
                ) : (
                  <input
                    type={type}
                    name={`setting_${key}`}
                    defaultValue={settings[key] ?? ''}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={inputCls}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={saving || disabled}
          className="rounded bg-brand-500 px-6 py-2.5 font-display text-sm font-bold uppercase tracking-wider text-white hover:bg-brand-600 disabled:opacity-60"
        >
          {saving ? 'Saving…' : 'Save Settings'}
        </button>
        {saved && (
          <span className="text-sm font-medium text-green-600">✓ Settings saved</span>
        )}
      </div>
    </form>
  )
}
