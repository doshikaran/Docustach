"use client";

import {
  ChevronDown,
  ChevronUp,
  Loader2,
  RotateCw,
  Search,
} from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { useToast } from "./ui/use-toast";
import { useResizeDetector } from "react-resize-detector";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import SimpleBar from "simplebar-react";
import PdfScreenFull from "./PdfScreenFull";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface PdfRendererProps {
  url: string;
}
const PdfRenderer = ({ url }: PdfRendererProps) => {
  const [numPages, setNumPages] = useState<number>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [scale, setScale] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [renderedSclae, setRenderedScale] = useState<number | null>(null);

  const isLoading = renderedSclae !== scale;

  const { toast } = useToast();
  const { width, ref } = useResizeDetector();
  const CustomPageValidator = z.object({
    page: z
      .string()
      .refine((val) => Number(val) > 0 && Number(val) <= numPages!, {
        message: "Invalid page number",
      }),
  });
  type TCustomPageValidator = z.infer<typeof CustomPageValidator>;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TCustomPageValidator>({
    defaultValues: {
      page: "1",
    },
    resolver: zodResolver(CustomPageValidator),
  });
  // const prevClick = () => {
  //   setCurrentPage((prev) => {
  //     prev - 1 > 1 ? prev - 1 : 1;
  //     setValue("page", String(currentPage - 1));

  //   });
  // };
  // const nextClick = () => {
  //   setCurrentPage((prev) => (prev + 1 > numPages! ? numPages! : prev + 1));
  // };
  const pageSubmit = ({ page }: TCustomPageValidator) => {
    setCurrentPage(Number(page));
    setValue("page", String(page));
  };

  return (
    <div className="w-full bg-white rounded-md shadow flex flex-col items-center">
      <div className="'h-14 w-full border-b border-zinc-200 flex items-center justify-between px-3">
        <div className="flex items-center gap-2">
          {/* previous page button */}
          <Button
            disabled={currentPage <= 1}
            onClick={() => {
              setCurrentPage((prev) =>
                prev - 1 > numPages! ? numPages! : prev - 1
              );
              setValue("page", String(currentPage - 1));
            }}
            variant={"ghost"}
            aria-label="previous-page"
            className=" m-1"
          >
            <ChevronDown className=" h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Input
              {...register("page")}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit(pageSubmit)();
                }
              }}
              className={cn(
                " w-10 h-4 rounded-none",
                errors.page && " focus-visible:ring-red-600"
              )}
            />
            <p className=" text-zinc-700 text-sm space-x-1">
              <span>/</span>
              <span>{numPages ?? "- "}</span>
            </p>
          </div>
          {/* next page button */}
          <Button
            disabled={numPages === undefined || currentPage === numPages}
            onClick={() => {
              setCurrentPage((prev) =>
                prev + 1 > numPages! ? numPages! : prev + 1
              );
              setValue("page", String(currentPage + 1));
            }}
            variant={"ghost"}
            aria-label="next-page"
            className=" m-1"
          >
            <ChevronUp className=" h-5 w-5" />
          </Button>
        </div>

        <div className="space-x-3">
          {/* zoom */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className=" gap-2" aria-label="zoom" variant={"ghost"}>
                <Search className=" h-5 w-5" />
                {scale * 100}%{" "}
                <ChevronDown className=" h-3 w-3 font-extrabold" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
            <DropdownMenuItem onSelect={() => setScale(0.5)}>
                50%
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setScale(0.75)}>
                75%
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setScale(0.90)}>
                90%
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setScale(1)}>
                100%
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setScale(1.5)}>
                150%
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setScale(2)}>
                200%
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setScale(2.5)}>
                250%
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setScale(3)}>
                300%
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* rotate */}
          <Button
            onClick={() => setRotation((prev) => prev + 90)}
            variant="ghost"
            aria-label="rotate 90 degrees"
          >
            <RotateCw className=" h-4 w-4" />
          </Button>

          {/* full screen */}
          <PdfScreenFull fileUrl={url} />
        </div>
      </div>

      <div className="'flex-1 w-full max-h-screen">
        <SimpleBar autoHide={false} className=" max-h-[calc(100vh-10rem)]">
          <div ref={ref}>
            <Document
              file={url}
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
              {isLoading && renderedSclae ? (
                <Page
                  key={"@" + renderedSclae}
                  pageNumber={currentPage}
                  width={width ? width : 1}
                  scale={scale}
                  rotate={rotation}
                />
              ) : null}
              <Page
                key={"@" + scale}
                className={cn(isLoading ? " hidden" : "")}
                pageNumber={currentPage}
                width={width ? width : 1}
                scale={scale}
                rotate={rotation}
                loading={
                  <div className=" flex justify-center">
                    <Loader2 className=" h-5 w-5 my-20 animate-spin" />
                  </div>
                }
                onRenderSuccess={() => setRenderedScale(scale)}
              />
            </Document>
          </div>
        </SimpleBar>
      </div>
    </div>
  );
};

export default PdfRenderer;
