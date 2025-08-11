import { pdfjs } from 'react-pdf';

// Configure react-pdf worker using local worker file in public directory
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.js';

console.log('🔧 React-PDF configured with local worker:', pdfjs.GlobalWorkerOptions.workerSrc);

export interface PdfToImageOptions {
  pageNumber?: number;
  scale?: number;
  format?: 'png' | 'jpeg';
  quality?: number;
}

export const convertPdfToImage = async (
  pdfData: string | File | ArrayBuffer, 
  options: PdfToImageOptions = {}
): Promise<string> => {
  const {
    pageNumber = 1,
    scale = 2.0,
    format = 'png',
    quality = 0.9
  } = options;

  try {
    let pdfUrl: string;
    
    // Convert different input types to URL
    if (pdfData instanceof File) {
      pdfUrl = URL.createObjectURL(pdfData);
    } else if (typeof pdfData === 'string') {
      pdfUrl = pdfData;
    } else {
      // Convert ArrayBuffer to blob URL
      const blob = new Blob([pdfData], { type: 'application/pdf' });
      pdfUrl = URL.createObjectURL(blob);
    }

    // Load the PDF document
    const loadingTask = pdfjs.getDocument(pdfUrl);
    const pdf = await loadingTask.promise;
    
    // Get specified page
    const page = await pdf.getPage(pageNumber);
    
    // Create canvas
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    if (!context) {
      throw new Error('Could not get canvas 2d context');
    }
    
    // Set viewport with scale
    const viewport = page.getViewport({ scale });
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    
    // Render page to canvas
    const renderContext = {
      canvasContext: context,
      viewport: viewport,
      canvas: canvas
    };
    
    await page.render(renderContext).promise;
    
    // Convert canvas to image
    const mimeType = format === 'png' ? 'image/png' : 'image/jpeg';
    const imageDataUrl = canvas.toDataURL(mimeType, quality);
    
    // Clean up blob URL if we created one
    if (pdfUrl.startsWith('blob:')) {
      URL.revokeObjectURL(pdfUrl);
    }
    
    return imageDataUrl;
    
  } catch (error) {
    console.error('Error converting PDF to image:', error);
    throw new Error(`Failed to convert PDF to image: ${error}`);
  }
};

export const getPdfPageCount = async (pdfData: string | File | ArrayBuffer): Promise<number> => {
  try {
    let pdfUrl: string;
    
    if (pdfData instanceof File) {
      pdfUrl = URL.createObjectURL(pdfData);
    } else if (typeof pdfData === 'string') {
      pdfUrl = pdfData;
    } else {
      const blob = new Blob([pdfData], { type: 'application/pdf' });
      pdfUrl = URL.createObjectURL(blob);
    }

    const loadingTask = pdfjs.getDocument(pdfUrl);
    const pdf = await loadingTask.promise;
    
    const pageCount = pdf.numPages;
    
    // Clean up blob URL if we created one
    if (pdfUrl.startsWith('blob:')) {
      URL.revokeObjectURL(pdfUrl);
    }
    
    return pageCount;
  } catch (error) {
    console.error('Error getting PDF page count:', error);
    throw error;
  }
};
