import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Expand } from "lucide-react";
import SimpleBar from "simplebar-react";
import { Document, Page, pdfjs } from "react-pdf";
import { Loader2 } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { useResizeDetector } from "react-resize-detector";

interface PdfScreenFullProps {
  fileUrl: string;
}
const PdfScreenFull = ({ fileUrl }: PdfScreenFullProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [numPages, setNumPages] = useState<number>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [scale, setScale] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);

  const { toast } = useToast();
  const { width, ref } = useResizeDetector();

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(v) => {
        if (!v) {
          setIsOpen(v);
        }
      }}
    >
      <DialogTrigger onClick={() => setIsOpen(true)} asChild>
        {/* full screen */}
        <Button className=" gap-2" aria-label="fullscreen" variant="ghost">
          <Expand className=" h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className=" max-w-7xl w-full">
        <SimpleBar className=" mt-5 max-h-[calc(100vh-10rem)]" autoHide={false}>
          <div ref={ref}>
            <Document
              file={fileUrl}
              className=" max-h-full"
              loading={
                <div className="  flex justify-center">
                  <Loader2 className=" h-5 w-5 my-20 animate-spin" />
                </div>
              }
              onLoadError={() => {
                toast({
                  title: "Error",
                  description: "Unable to load pdf. Please try again",
                  variant: "destructive",
                });
              }}
              onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            >
              {new Array(numPages).fill(0).map((_, index) => (
                <Page
                  key={index}
                  pageNumber={index + 1}
                  width={width ? width : 1}
                  //   scale={scale}
                  //   rotate={rotation}
                />
              ))}
            </Document>
          </div>
        </SimpleBar>
      </DialogContent>
    </Dialog>
  );
};
export default PdfScreenFull;
