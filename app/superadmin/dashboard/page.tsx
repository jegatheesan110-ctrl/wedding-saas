'use client'
import { useState, useEffect } from 'react'

export default function SuperAdminDashboard() {
  const [shops, setShops] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchData = () => {
    fetch('/api/superadmin/shops')
      .then(r => r.json())
      .then(d => {
        setShops(d.shops || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }

  useEffect(() => {
    fetchData()
  }, [])

  const giveFreeTrial = async (shopId: string) => {
    const res = await fetch(
      '/api/superadmin/free-trial',
      {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ shopId })
      }
    )
    const data = await res.json()
    if (data.success) {
      alert('Free trial activated!')
      fetchData()
    }
  }

  const cancelTrial = async (shopId: string) => {
    if (window.confirm('நிச்சயமாக cancel செய்யணுமா?')) {
      const res = await fetch(
        '/api/superadmin/cancel-trial',
        {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json' 
          },
          body: JSON.stringify({ shopId })
        }
      )
      const data = await res.json()
      if (data.success) {
        alert('Trial cancel செய்யப்பட்டது')
        fetchData()
      }
    }
  }

  return (
    <div style={{
      padding: 20,
      background: '#0a0a0a',
      minHeight: '100vh',
      color: '#fff'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 20
      }}>
        <h1 style={{ color: '#d4af37' }}>
          Super Admin
        </h1>
        <button
          onClick={() => {
            document.cookie = 'superadmin=;max-age=0'
            window.location.href = '/superadmin'
          }}
          style={{
            background: 'transparent',
            border: '1px solid #d4af37',
            color: '#d4af37',
            padding: '8px 16px',
            borderRadius: 8,
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>

      <p style={{ color: '#888', marginBottom: 20 }}>
        Total Shops: {shops.length}
      </p>

      {loading ? (
        <p style={{ color: '#666' }}>Loading...</p>
      ) : (
        shops.map((s: any) => (
          <div key={s.id} style={{
            background: '#1a1a1a',
            border: '1px solid #333',
            borderRadius: 12,
            padding: 16,
            marginBottom: 10
          }}>
            <p style={{
              color: '#fff',
              fontWeight: 'bold'
            }}>
              {s.shopName}
            </p>
            <p style={{ color: '#888', fontSize: 13 }}>
              {s.email}
            </p>
            <p style={{
              color: s.isActive ? '#4ade80' : '#ff6b6b',
              fontSize: 13
            }}>
              {s.isActive ? 'Active' : 'Inactive'} 
              - {s.plan}
            </p>
            {!s.isActive ? (
              <button
                onClick={() => giveFreeTrial(s.id)}
                style={{
                  backgroundColor: '#d4af37',
                  color: '#000',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '6px 12px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  marginTop: '8px'
                }}
              >
                🎁 Free Trial கொடு
              </button>
            ) : (
              <button
                onClick={() => cancelTrial(s.id)}
                style={{
                  backgroundColor: '#ef4444',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '6px 12px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  marginTop: '8px'
                }}
              >
                ❌ Cancel Trial
              </button>
            )}
          </div>
        ))
      )}
    </div>
  )
}
