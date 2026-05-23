'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Plus, Edit2, Trash2, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

interface MarketDataItem {
  id: string
  title: string
  content: string
  source?: string
  created_at: string
  updated_at: string
}

export default function MarketDataPage() {
  const supabase = createClient()
  const [data, setData] = useState<MarketDataItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMarketData()
  }, [])

  const fetchMarketData = async () => {
    try {
      const { data: items, error } = await supabase
        .from('market_data')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setData(items || [])
    } catch (error) {
      console.error('Failed to fetch market data:', error)
      toast.error('Failed to load market data')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return

    try {
      const { error } = await supabase.from('market_data').delete().eq('id', id)

      if (error) throw error
      toast.success('Market data deleted')
      fetchMarketData()
    } catch (error) {
      console.error('Failed to delete market data:', error)
      toast.error('Failed to delete market data')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Market Data</h1>
          <p className="text-muted-foreground mt-2">
            Manage market news and updates
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Market Update
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-8 text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-muted-foreground" />
              <p className="text-muted-foreground">Loading market data...</p>
            </div>
          ) : data.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              No market data found. Create your first update to get started.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {item.source || '-'}
                    </TableCell>
                    <TableCell>
                      {new Date(item.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="ghost" size="sm">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() =>
                          handleDelete(item.id, item.title)
                        }
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
