"use client"

import React from "react"

import { useState, useEffect } from "react"
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  ImageIcon,
  Link,
  Heading1,
  Heading2,
  Heading3,
  Undo,
  Redo,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface RichTextEditorProps {
  initialValue?: string
  onChange: (value: string) => void
  height?: string
  placeholder?: string
}

export function RichTextEditor({
  initialValue = "",
  onChange,
  height = "min-h-[300px]",
  placeholder = "Start typing...",
}: RichTextEditorProps) {
  const [content, setContent] = useState(initialValue)
  const [htmlView, setHtmlView] = useState(false)
  const [imageDialogOpen, setImageDialogOpen] = useState(false)
  const [linkDialogOpen, setLinkDialogOpen] = useState(false)
  const [imageUrl, setImageUrl] = useState("")
  const [imageAlt, setImageAlt] = useState("")
  const [linkUrl, setLinkUrl] = useState("")
  const [linkText, setLinkText] = useState("")
  const [selection, setSelection] = useState<{ start: number; end: number } | null>(null)

  const editorRef = React.useRef<HTMLDivElement>(null)

  useEffect(() => {
    onChange(content)
  }, [content, onChange])

  const execCommand = (command: string, value = "") => {
    document.execCommand(command, false, value)
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML)
    }
  }

  const handleInsertImage = () => {
    if (imageUrl) {
      execCommand("insertHTML", `<img src="${imageUrl}" alt="${imageAlt}" class="my-2 max-w-full h-auto" />`)
      setImageUrl("")
      setImageAlt("")
      setImageDialogOpen(false)
    }
  }

  const handleInsertLink = () => {
    if (linkUrl) {
      const text = linkText || linkUrl
      execCommand("insertHTML", `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer">${text}</a>`)
      setLinkUrl("")
      setLinkText("")
      setLinkDialogOpen(false)
    }
  }

  const saveSelection = () => {
    const selection = window.getSelection()
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0)
      const preSelectionRange = range.cloneRange()
      if (editorRef.current) {
        preSelectionRange.selectNodeContents(editorRef.current)
        preSelectionRange.setEnd(range.startContainer, range.startOffset)
        const start = preSelectionRange.toString().length
        setSelection({
          start,
          end: start + range.toString().length,
        })
      }
    }
  }

  const restoreSelection = () => {
    if (selection && editorRef.current) {
      const range = document.createRange()
      range.selectNodeContents(editorRef.current)
      const textNodes = getTextNodesIn(editorRef.current)
      let charCount = 0
      let startNode = null
      let startOffset = 0
      let endNode = null
      let endOffset = 0

      for (let i = 0; i < textNodes.length; i++) {
        const node = textNodes[i]
        const nextCharCount = charCount + node.length

        if (!startNode && selection.start >= charCount && selection.start <= nextCharCount) {
          startNode = node
          startOffset = selection.start - charCount
        }

        if (!endNode && selection.end >= charCount && selection.end <= nextCharCount) {
          endNode = node
          endOffset = selection.end - charCount
          break
        }

        charCount = nextCharCount
      }

      if (startNode && endNode) {
        range.setStart(startNode, startOffset)
        range.setEnd(endNode, endOffset)

        const sel = window.getSelection()
        if (sel) {
          sel.removeAllRanges()
          sel.addRange(range)
        }
      }
    }
  }

  const getTextNodesIn = (node: Node): Text[] => {
    const textNodes: Text[] = []
    if (node.nodeType === 3) {
      textNodes.push(node as Text)
    } else {
      const children = node.childNodes
      for (let i = 0; i < children.length; i++) {
        textNodes.push(...getTextNodesIn(children[i]))
      }
    }
    return textNodes
  }

  return (
    <div className="border rounded-md">
      <div className="bg-muted p-2 border-b flex flex-wrap gap-1">
        <Button variant="ghost" size="icon" onClick={() => execCommand("bold")}>
          <Bold className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => execCommand("italic")}>
          <Italic className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => execCommand("underline")}>
          <Underline className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-border mx-1 self-center" />
        <Button variant="ghost" size="icon" onClick={() => execCommand("insertUnorderedList")}>
          <List className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => execCommand("insertOrderedList")}>
          <ListOrdered className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-border mx-1 self-center" />
        <Button variant="ghost" size="icon" onClick={() => execCommand("justifyLeft")}>
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => execCommand("justifyCenter")}>
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => execCommand("justifyRight")}>
          <AlignRight className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-border mx-1 self-center" />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            saveSelection()
            setImageDialogOpen(true)
          }}
        >
          <ImageIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            saveSelection()
            setLinkDialogOpen(true)
          }}
        >
          <Link className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-border mx-1 self-center" />
        <Button variant="ghost" size="icon" onClick={() => execCommand("formatBlock", "<h1>")}>
          <Heading1 className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => execCommand("formatBlock", "<h2>")}>
          <Heading2 className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => execCommand("formatBlock", "<h3>")}>
          <Heading3 className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-border mx-1 self-center" />
        <Button variant="ghost" size="icon" onClick={() => execCommand("undo")}>
          <Undo className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => execCommand("redo")}>
          <Redo className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="visual">
        <TabsList className="bg-muted border-b rounded-none">
          <TabsTrigger value="visual">Visual</TabsTrigger>
          <TabsTrigger value="html">HTML</TabsTrigger>
        </TabsList>
        <TabsContent value="visual" className="p-0 m-0">
          <div
            ref={editorRef}
            className={`p-4 focus:outline-none ${height} overflow-y-auto`}
            contentEditable
            dangerouslySetInnerHTML={{ __html: content }}
            onInput={(e) => setContent(e.currentTarget.innerHTML)}
            onBlur={() => onChange(content)}
            onFocus={() => {
              if (content === "") {
                setContent("<p><br></p>")
              }
            }}
            data-placeholder={placeholder}
          />
        </TabsContent>
        <TabsContent value="html" className="p-0 m-0">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={`border-0 rounded-none ${height} font-mono text-sm`}
          />
        </TabsContent>
      </Tabs>

      <Dialog open={imageDialogOpen} onOpenChange={setImageDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insert Image</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image-url" className="text-right">
                Image URL
              </Label>
              <Input
                id="image-url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image-alt" className="text-right">
                Alt Text
              </Label>
              <Input
                id="image-alt"
                value={imageAlt}
                onChange={(e) => setImageAlt(e.target.value)}
                className="col-span-3"
              />
            </div>
            {imageUrl && (
              <div className="border rounded-md p-2 mt-2">
                <p className="text-sm text-muted-foreground mb-2">Preview:</p>
                <img src={imageUrl || "/placeholder.svg"} alt={imageAlt} className="max-h-[200px] max-w-full mx-auto" />
              </div>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setImageDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleInsertImage}>Insert Image</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={linkDialogOpen} onOpenChange={setLinkDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insert Link</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="link-url" className="text-right">
                URL
              </Label>
              <Input
                id="link-url"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="link-text" className="text-right">
                Text
              </Label>
              <Input
                id="link-text"
                value={linkText}
                onChange={(e) => setLinkText(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setLinkDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleInsertLink}>Insert Link</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
