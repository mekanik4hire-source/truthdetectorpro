import { useEffect, useState } from 'react'
import { useRoute } from 'wouter'
import { ShieldCheck, Download, Copy, Check } from 'lucide-react'

type VaultDoc = {
  id: string
  createdAt: string
  hash: string
  payload: any
}

export default function VaultViewer() {
  const [, params] = useRoute('/vault/:id')
  const [doc, setDoc] = useState<VaultDoc | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const vaultId = params?.id

  useEffect(() => {
    if (!vaultId) return

    async function fetchDoc() {
      try {
        setLoading(true)
        const res = await fetch(`/api/vault/${vaultId}/download`)
        if (!res.ok) throw new Error('not_found')
        const data = await res.json()
        setDoc(data)
      } catch (e) {
        setError('Evidence document not found.')
      } finally {
        setLoading(false)
      }
    }

    fetchDoc()
  }, [vaultId])

  const handleDownload = () => {
    window.location.href = `/api/vault/${vaultId}/download`
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (e) {
      console.error('Failed to copy link')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0E12] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#C69C6D] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/60">Loading evidence...</p>
        </div>
      </div>
    )
  }

  if (error || !doc) {
    return (
      <div className="min-h-screen bg-[#0B0E12] text-white flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <ShieldCheck className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Evidence Not Found</h1>
          <p className="text-white/60 mb-6">{error}</p>
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-2xl bg-[#2AD17B] px-5 py-3 text-black font-semibold hover:brightness-95 transition"
          >
            Go to Home
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0B0E12] text-white">
      <div className="h-1 w-full bg-gradient-to-r from-[#C69C6D] via-[#A87C48] to-[#2A8C82]" />

      <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C69C6D] bg-white/5 px-3 py-1 text-xs text-white/80 mb-4">
            <ShieldCheck className="h-3.5 w-3.5" /> Evidence Vault
          </div>
          <h1 className="text-4xl font-extrabold mb-2">Evidence Document</h1>
          <p className="text-white/60">
            Permanent cryptographic record • ID: <span className="font-mono text-[#C69C6D]">{doc.id}</span>
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <div className="text-xs text-white/60 mb-1">Created</div>
              <div className="font-mono text-sm">{new Date(doc.createdAt).toLocaleString()}</div>
            </div>
            <div>
              <div className="text-xs text-white/60 mb-1">Hash</div>
              <div className="font-mono text-sm text-[#C69C6D]">{doc.hash}</div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6">
            <div className="text-xs text-white/60 mb-3">Evidence Payload</div>
            <pre className="bg-black/30 rounded-lg p-4 overflow-x-auto text-sm font-mono">
              {JSON.stringify(doc.payload, null, 2)}
            </pre>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleDownload}
            data-testid="button-download-evidence"
            className="inline-flex items-center gap-2 rounded-2xl bg-[#2AD17B] px-5 py-3 text-black font-semibold hover:brightness-95 transition"
          >
            <Download className="h-5 w-5" /> Download JSON
          </button>
          <button
            onClick={handleCopyLink}
            data-testid="button-copy-link"
            className="inline-flex items-center gap-2 rounded-2xl border border-white/20 px-5 py-3 hover:bg-white/10 transition"
          >
            {copied ? (
              <>
                <Check className="h-5 w-5" /> Link Copied!
              </>
            ) : (
              <>
                <Copy className="h-5 w-5" /> Copy Link
              </>
            )}
          </button>
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-2xl border border-white/20 px-5 py-3 hover:bg-white/10 transition"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  )
}
