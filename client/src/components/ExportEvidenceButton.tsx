import { useState } from 'react'

export default function ExportEvidenceButton({ payload }: { payload: any }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleExport() {
    try {
      setLoading(true); setError(null)
      const res = await fetch('/api/vault/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload ?? {})
      })
      const data = await res.json()
      if (!data?.ok) throw new Error('export_failed')
      window.location.href = data.viewUrl
    } catch (e: any) {
      setError('Could not export evidence. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <button
        onClick={handleExport}
        disabled={loading}
        data-testid="button-export-evidence"
        className="rounded-2xl bg-[#2AD17B] text-black font-semibold px-5 py-3 hover:brightness-95 disabled:opacity-60 transition"
      >
        {loading ? 'Preparing…' : 'Export to Evidence Vault'}
      </button>
      {error && <div className="mt-2 text-sm text-red-300">{error}</div>}
    </div>
  )
}
