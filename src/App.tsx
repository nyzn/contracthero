import { useState } from "react";
import { Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { Worker } from "@react-pdf-viewer/core";
import { Button } from "./components/Button";
import tw, { styled } from "twin.macro";
import { SubmitHandler, useForm } from "react-hook-form";
import { PdfDocument } from "pdfjs-dist";

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: DeepSkyBlue;
`;

const Container = styled.div(() => [
  tw`
    grid
    grid-cols-1
    gap-4
    mb-4
   `,
]);

const PDFContainer = styled.div`
  width: 100%;
  height: 800px;
  overflow-y: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

type FormValues = {
  fileInput: File[];
};

export const App = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<FormValues>({ mode: "onChange" });

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const [viewPdf, setViewPdf] = useState<string | null>(null);

  const fileType = ["application/pdf"];

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("SUBMIT: ", data);
    let reader = new FileReader();
    reader.readAsDataURL(data.fileInput[0]);
    reader.onloadend = async (e) => {
      const contents = e.target.result;
      console.log("DATA: ", e);
      setViewPdf(contents as string);
    };
  };

  const onDocumentLoad = (e) => {
    console.log("LOADED DOCUMENT: ", e);
  };

  return (
    <>
      <div>
        <Title>PDF Form</Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Container>
            <input
              type="file"
              accept="application/pdf"
              required
              {...register("fileInput", {
                required: "Please select a file",
                validate: {
                  lessThan10MB: (files: File[]) =>
                    files[0]?.size < 10000000 || "Max 10MB",
                  acceptedFormats: (files: File[]) =>
                    fileType.includes(files[0].type) ||
                    "Only PDF-Files allowed",
                },
              })}
            />

            {errors.fileInput &&
              errors.fileInput.type === "acceptedFormats" && (
                <div className="error-msg">{errors.fileInput.message}</div>
              )}

            {errors.fileInput && errors.fileInput.type === "lessThan10MB" && (
              <div className="error-msg">{errors.fileInput.message}</div>
            )}

            <Button
              label="UPLOAD"
              disabled={!(isDirty || errors.fileInput)}
              type="submit"
            />
          </Container>
        </form>

        <Button
          primary
          label="Copy"
          onClick={() => navigator.clipboard.writeText(viewPdf)}
        />

        <Title>PDF Viewer</Title>

        <PDFContainer>
          {viewPdf && (
            <>
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.10.111/build/pdf.worker.min.js">
                <Viewer
                  fileUrl={viewPdf}
                  plugins={[defaultLayoutPluginInstance]}
                  onDocumentLoad={onDocumentLoad}
                />
              </Worker>
            </>
          )}

          {!viewPdf && <>No pdf file selected</>}
        </PDFContainer>
      </div>
    </>
  );
};
