"use client"

import { useState } from "react"
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RichTextEditor } from "@/components/rich-text-editor"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GripVertical, Plus, Trash2, Settings, ImageIcon, Type, Columns, FileText } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

type BlockType = "text" | "image" | "columns" | "hero" | "cta"

interface Block {
  id: string
  type: BlockType
  content: any
}

interface PageBuilderProps {
  initialBlocks?: Block[]
  onSave: (blocks: Block[]) => void
}

export function PageBuilder({ initialBlocks = [], onSave }: PageBuilderProps) {
  const [blocks, setBlocks] = useState<Block[]>(initialBlocks)
  const [editingBlock, setEditingBlock] = useState<Block | null>(null)
  const [isAddingBlock, setIsAddingBlock] = useState(false)
  const [newBlockType, setNewBlockType] = useState<BlockType>("text")
  const { toast } = useToast()

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const items = Array.from(blocks)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setBlocks(items)
  }

  const handleAddBlock = () => {
    const newBlock: Block = {
      id: `block-${Date.now()}`,
      type: newBlockType,
      content: getDefaultContentForType(newBlockType),
    }

    setBlocks([...blocks, newBlock])
    setIsAddingBlock(false)

    toast({
      title: "Block added",
      description: `A new ${newBlockType} block has been added to the page.`,
    })
  }

  const handleDeleteBlock = (id: string) => {
    setBlocks(blocks.filter((block) => block.id !== id))

    toast({
      title: "Block deleted",
      description: "The block has been removed from the page.",
    })
  }

  const handleEditBlock = (block: Block) => {
    setEditingBlock({ ...block })
  }

  const handleSaveBlock = () => {
    if (!editingBlock) return

    setBlocks(blocks.map((block) => (block.id === editingBlock.id ? editingBlock : block)))

    setEditingBlock(null)

    toast({
      title: "Block updated",
      description: "Your changes have been saved.",
    })
  }

  const handleSavePage = () => {
    onSave(blocks)

    toast({
      title: "Page saved",
      description: "Your page changes have been saved successfully.",
    })
  }

  const getDefaultContentForType = (type: BlockType) => {
    switch (type) {
      case "text":
        return { text: "<p>Enter your content here...</p>" }
      case "image":
        return { src: "/placeholder.svg?height=400&width=800", alt: "Image description", caption: "" }
      case "columns":
        return {
          columns: [{ content: "<p>First column content...</p>" }, { content: "<p>Second column content...</p>" }],
        }
      case "hero":
        return {
          title: "Hero Title",
          subtitle: "Hero subtitle text goes here",
          image: "/placeholder.svg?height=600&width=1200",
          alignment: "center",
        }
      case "cta":
        return {
          title: "Call to Action",
          text: "Click the button below to get started",
          buttonText: "Get Started",
          buttonUrl: "#",
        }
      default:
        return {}
    }
  }

  const renderBlockPreview = (block: Block) => {
    switch (block.type) {
      case "text":
        return <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: block.content.text }} />
      case "image":
        return (
          <div className="space-y-2">
            <img
              src={block.content.src || "/placeholder.svg"}
              alt={block.content.alt}
              className="max-w-full h-auto rounded-md"
            />
            {block.content.caption && (
              <p className="text-sm text-center text-muted-foreground">{block.content.caption}</p>
            )}
          </div>
        )
      case "columns":
        return (
          <div className="grid grid-cols-2 gap-4">
            {block.content.columns.map((column: any, i: number) => (
              <div key={i} className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: column.content }} />
            ))}
          </div>
        )
      case "hero":
        return (
          <div
            className={`relative rounded-lg overflow-hidden h-48 flex items-${block.content.alignment} justify-center`}
          >
            <img
              src={block.content.image || "/placeholder.svg"}
              alt="Hero background"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="relative text-white text-center p-4">
              <h2 className="text-xl font-bold">{block.content.title}</h2>
              <p>{block.content.subtitle}</p>
            </div>
          </div>
        )
      case "cta":
        return (
          <div className="bg-muted rounded-lg p-4 text-center">
            <h3 className="font-bold">{block.content.title}</h3>
            <p className="text-sm mb-4">{block.content.text}</p>
            <Button size="sm">{block.content.buttonText}</Button>
          </div>
        )
      default:
        return <div>Unknown block type</div>
    }
  }

  const renderBlockEditor = () => {
    if (!editingBlock) return null

    switch (editingBlock.type) {
      case "text":
        return (
          <div className="space-y-4">
            <Label>Content</Label>
            <RichTextEditor
              initialValue={editingBlock.content.text}
              onChange={(value) =>
                setEditingBlock({
                  ...editingBlock,
                  content: { ...editingBlock.content, text: value },
                })
              }
              height="min-h-[400px]"
            />
          </div>
        )
      case "image":
        return (
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="image-src">Image URL</Label>
              <Input
                id="image-src"
                value={editingBlock.content.src}
                onChange={(e) =>
                  setEditingBlock({
                    ...editingBlock,
                    content: { ...editingBlock.content, src: e.target.value },
                  })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image-alt">Alt Text</Label>
              <Input
                id="image-alt"
                value={editingBlock.content.alt}
                onChange={(e) =>
                  setEditingBlock({
                    ...editingBlock,
                    content: { ...editingBlock.content, alt: e.target.value },
                  })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image-caption">Caption (optional)</Label>
              <Input
                id="image-caption"
                value={editingBlock.content.caption}
                onChange={(e) =>
                  setEditingBlock({
                    ...editingBlock,
                    content: { ...editingBlock.content, caption: e.target.value },
                  })
                }
              />
            </div>
            {editingBlock.content.src && (
              <div className="border rounded-md p-4 mt-4">
                <p className="text-sm text-muted-foreground mb-2">Preview:</p>
                <img
                  src={editingBlock.content.src || "/placeholder.svg"}
                  alt={editingBlock.content.alt}
                  className="max-w-full h-auto max-h-[300px] mx-auto rounded-md"
                />
              </div>
            )}
          </div>
        )
      case "columns":
        return (
          <div className="space-y-6">
            {editingBlock.content.columns.map((column: any, i: number) => (
              <div key={i} className="space-y-2 border-t pt-4 first:border-t-0 first:pt-0">
                <Label>Column {i + 1} Content</Label>
                <RichTextEditor
                  initialValue={column.content}
                  onChange={(value) => {
                    const newColumns = [...editingBlock.content.columns]
                    newColumns[i] = { ...newColumns[i], content: value }
                    setEditingBlock({
                      ...editingBlock,
                      content: { ...editingBlock.content, columns: newColumns },
                    })
                  }}
                  height="min-h-[200px]"
                />
              </div>
            ))}
          </div>
        )
      case "hero":
        return (
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="hero-title">Title</Label>
              <Input
                id="hero-title"
                value={editingBlock.content.title}
                onChange={(e) =>
                  setEditingBlock({
                    ...editingBlock,
                    content: { ...editingBlock.content, title: e.target.value },
                  })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="hero-subtitle">Subtitle</Label>
              <Input
                id="hero-subtitle"
                value={editingBlock.content.subtitle}
                onChange={(e) =>
                  setEditingBlock({
                    ...editingBlock,
                    content: { ...editingBlock.content, subtitle: e.target.value },
                  })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="hero-image">Background Image URL</Label>
              <Input
                id="hero-image"
                value={editingBlock.content.image}
                onChange={(e) =>
                  setEditingBlock({
                    ...editingBlock,
                    content: { ...editingBlock.content, image: e.target.value },
                  })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="hero-alignment">Text Alignment</Label>
              <Select
                value={editingBlock.content.alignment}
                onValueChange={(value) =>
                  setEditingBlock({
                    ...editingBlock,
                    content: { ...editingBlock.content, alignment: value },
                  })
                }
              >
                <SelectTrigger id="hero-alignment">
                  <SelectValue placeholder="Select alignment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="start">Left</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="end">Right</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )
      case "cta":
        return (
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="cta-title">Title</Label>
              <Input
                id="cta-title"
                value={editingBlock.content.title}
                onChange={(e) =>
                  setEditingBlock({
                    ...editingBlock,
                    content: { ...editingBlock.content, title: e.target.value },
                  })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="cta-text">Text</Label>
              <Input
                id="cta-text"
                value={editingBlock.content.text}
                onChange={(e) =>
                  setEditingBlock({
                    ...editingBlock,
                    content: { ...editingBlock.content, text: e.target.value },
                  })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="cta-button-text">Button Text</Label>
              <Input
                id="cta-button-text"
                value={editingBlock.content.buttonText}
                onChange={(e) =>
                  setEditingBlock({
                    ...editingBlock,
                    content: { ...editingBlock.content, buttonText: e.target.value },
                  })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="cta-button-url">Button URL</Label>
              <Input
                id="cta-button-url"
                value={editingBlock.content.buttonUrl}
                onChange={(e) =>
                  setEditingBlock({
                    ...editingBlock,
                    content: { ...editingBlock.content, buttonUrl: e.target.value },
                  })
                }
              />
            </div>
          </div>
        )
      default:
        return <div>Unknown block type</div>
    }
  }

  const getBlockIcon = (type: BlockType) => {
    switch (type) {
      case "text":
        return <Type className="h-4 w-4" />
      case "image":
        return <ImageIcon className="h-4 w-4" />
      case "columns":
        return <Columns className="h-4 w-4" />
      case "hero":
        return <FileText className="h-4 w-4" />
      case "cta":
        return <FileText className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Page Builder</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsAddingBlock(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Block
          </Button>
          <Button onClick={handleSavePage}>Save Page</Button>
        </div>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="blocks">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
              {blocks.length === 0 ? (
                <div className="border border-dashed rounded-lg p-8 text-center">
                  <p className="text-muted-foreground">
                    No blocks added yet. Click "Add Block" to start building your page.
                  </p>
                </div>
              ) : (
                blocks.map((block, index) => (
                  <Draggable key={block.id} draggableId={block.id} index={index}>
                    {(provided) => (
                      <Card ref={provided.innerRef} {...provided.draggableProps} className="border">
                        <CardHeader className="p-3 flex flex-row items-center justify-between bg-muted/50">
                          <div className="flex items-center gap-2">
                            <div {...provided.dragHandleProps} className="cursor-grab">
                              <GripVertical className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <div className="flex items-center gap-1.5">
                              {getBlockIcon(block.type)}
                              <span className="font-medium capitalize">{block.type} Block</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon" onClick={() => handleEditBlock(block)}>
                              <Settings className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-500 hover:text-red-700"
                              onClick={() => handleDeleteBlock(block.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4">{renderBlockPreview(block)}</CardContent>
                      </Card>
                    )}
                  </Draggable>
                ))
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* Add Block Dialog */}
      <Dialog open={isAddingBlock} onOpenChange={setIsAddingBlock}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Block</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="block-type">Block Type</Label>
            <Select value={newBlockType} onValueChange={(value: BlockType) => setNewBlockType(value)}>
              <SelectTrigger id="block-type" className="mt-1.5">
                <SelectValue placeholder="Select block type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Text</SelectItem>
                <SelectItem value="image">Image</SelectItem>
                <SelectItem value="columns">Columns</SelectItem>
                <SelectItem value="hero">Hero</SelectItem>
                <SelectItem value="cta">Call to Action</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddingBlock(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddBlock}>Add Block</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Block Dialog */}
      <Dialog open={!!editingBlock} onOpenChange={(open) => !open && setEditingBlock(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Edit {editingBlock?.type.charAt(0).toUpperCase()}
              {editingBlock?.type.slice(1)} Block
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">{renderBlockEditor()}</div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingBlock(null)}>
              Cancel
            </Button>
            <Button onClick={handleSaveBlock}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
