import MediaTable from "@/components/admin/media/media-table"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "@radix-ui/react-icons"
import { Separator } from "@/components/ui/separator"
import MediaUploadDialog from "@/components/admin/media/media-upload-dialog"

export default async function MediaPage() {
  return (
    <div className="w-full">
      <div className="flex justify-between">
        <h1 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">Media</h1>
        <MediaUploadDialog>
          <Button>
            <PlusIcon className="mr-2 h-4 w-4" />
            Upload Media
          </Button>
        </MediaUploadDialog>
      </div>

      <Separator className="my-4" />

      <MediaTable />
    </div>
  )
}
