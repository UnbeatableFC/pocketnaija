'use client'
import { useState } from 'react'
import axios from 'axios'
import { Pencil, Trash2, Globe, Clock, X, Save, Loader2 } from 'lucide-react'

import { formatDistanceToNow, isFuture } from 'date-fns'
import { Input } from '../ui/input'
import { Card } from '../ui/card'
import { Button } from '../ui/button'

// Define the Bookmark type for strong typing
export type Bookmark = {
  id: string;
  url: string;
  title: string;
  description: string | null;
  image: string | null;
  favicon: string | null;
  domain: string;
  tags: string[];
  expiresAt: Date | null;
  createdAt: Date;
}

type BookmarkCardProps = {
  bookmark: Bookmark;
  // Function passed down from the Dashboard to re-fetch the list
  refresh: () => void; 
}

export default function BookmarkCard({ bookmark, refresh }: BookmarkCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  
  // State for form data, initialized with existing bookmark values
  const [editTitle, setEditTitle] = useState(bookmark.title)
  const [editDescription, setEditDescription] = useState(bookmark.description || '')
  const [editTags, setEditTags] = useState(bookmark.tags.join(', '))
  const [editExpiresAt, setEditExpiresAt] = useState(
    bookmark.expiresAt ? new Date(bookmark.expiresAt).toISOString().split('T')[0] : ''
  )

  // --- DELETE Operation (D in CRUD) ---
  async function handleDelete() {
    if (!window.confirm(`Are you sure you want to delete "${bookmark.title}"?`)) return
    
    setLoading(true)
    try {
      await axios.delete(`/api/bookmarks/${bookmark.id}`)
      refresh() // Refresh the list after successful deletion
    } catch (e) {
      alert('Failed to delete bookmark.')
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  // --- UPDATE Operation (U in CRUD) ---
  async function handleUpdate() {
    setLoading(true)
    try {
      const payload = {
        title: editTitle,
        description: editDescription,
        tags: editTags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0),
        // Handle date string to Date object conversion
        expiresAt: editExpiresAt ? new Date(editExpiresAt) : null, 
      }
      
      await axios.patch(`/api/bookmarks/${bookmark.id}`, payload)
      setIsEditing(false) // Exit edit mode
      refresh() // Refresh the list to show updated values
    } catch (e) {
      alert('Failed to update bookmark.')
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  // Helper to format date relative to now
  const formattedDate = formatDistanceToNow(new Date(bookmark.createdAt), { addSuffix: true })
  
  // Helper to determine expiry status
  const expiryStatus = bookmark.expiresAt && isFuture(new Date(bookmark.expiresAt))
    ? formatDistanceToNow(new Date(bookmark.expiresAt))
    : null

  return (
    <Card className="p-4 flex flex-col space-y-3 shadow-md border-l-4 border-primary/50">
      {isEditing ? (
        // --- EDIT MODE VIEW ---
        <div className="space-y-3">
          <Input 
            value={editTitle} 
            onChange={(e) => setEditTitle(e.target.value)} 
            placeholder="Title" 
            disabled={loading}
          />
          <Input
            value={editDescription} 
            onChange={(e) => setEditDescription(e.target.value)} 
            placeholder="Description" 
            disabled={loading}
          />
          <Input 
            value={editTags} 
            onChange={(e) => setEditTags(e.target.value)} 
            placeholder="Tags (comma-separated)" 
            disabled={loading}
          />
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <Input 
              type="date" 
              value={editExpiresAt} 
              onChange={(e) => setEditExpiresAt(e.target.value)} 
              className="w-auto"
              disabled={loading}
            />
          </div>
          
          <div className="flex justify-end gap-2 pt-2 border-t">
            <Button 
              variant="outline" 
              onClick={() => setIsEditing(false)} 
              disabled={loading}
            >
              <X className="h-4 w-4 mr-1" /> Cancel
            </Button>
            <Button onClick={handleUpdate} disabled={loading} className="bg-green-600 hover:bg-green-700">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4 mr-1" />} Save
            </Button>
          </div>
        </div>
      ) : (
        // --- READ/DISPLAY VIEW ---
        <>
          <a 
            href={bookmark.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-start group hover:text-primary transition-colors"
          >
            {bookmark.favicon && (
              <img 
                src={bookmark.favicon} 
                alt="Favicon" 
                className="w-5 h-5 mr-3 rounded"
              />
            )}
            <div>
              <h3 className="text-lg font-semibold leading-tight group-hover:underline">{bookmark.title}</h3>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Globe className="h-3 w-3" />
                {bookmark.domain}
              </p>
            </div>
          </a>

          {bookmark.description && (
            <p className="text-sm text-gray-600 line-clamp-2">{bookmark.description}</p>
          )}

          <div className="flex flex-wrap gap-2">
            {bookmark.tags.map((tag, index) => (
              <span key={index} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full font-medium">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex justify-between items-center text-xs text-gray-500 pt-2 border-t">
            <div className="flex gap-4">
              <span>Saved {formattedDate}</span>
              {expiryStatus && (
                <span className="flex items-center gap-1 text-red-600 font-medium">
                  <Clock className="h-3 w-3" /> Expires in {expiryStatus}
                </span>
              )}
            </div>
            
            <div className="flex gap-2">
              <Button 
                onClick={() => setIsEditing(true)} 
                variant="outline" 
                size="sm"
                className="h-7 w-7 p-0"
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button 
                onClick={handleDelete} 
                variant="destructive" 
                size="sm"
                className="h-7 w-7 p-0"
                disabled={loading}
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </>
      )}
    </Card>
  )
}