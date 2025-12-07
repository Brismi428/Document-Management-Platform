from pypdf import PdfReader, PdfWriter
import pdfplumber
from pathlib import Path
import tempfile
from typing import List

class PdfService:
    """Service for PDF manipulation operations"""

    @staticmethod
    def merge_pdfs(pdf_files: List[Path]) -> Path:
        """
        Merge multiple PDF files into one.

        Args:
            pdf_files: List of paths to PDF files to merge

        Returns:
            Path to merged PDF file
        """
        merger = PdfWriter()

        for pdf_file in pdf_files:
            reader = PdfReader(str(pdf_file))
            for page in reader.pages:
                merger.add_page(page)

        # Save merged PDF
        temp_dir = Path(tempfile.gettempdir()) / "pdf-processor"
        temp_dir.mkdir(exist_ok=True)
        output_path = temp_dir / f"merged_{tempfile._get_candidate_names().__next__()}.pdf"

        with open(output_path, "wb") as output_file:
            merger.write(output_file)

        return output_path

    @staticmethod
    def split_pdf(pdf_file: Path, start_page: int, end_page: int) -> Path:
        """
        Split a PDF file by extracting specific pages.

        Args:
            pdf_file: Path to PDF file
            start_page: Starting page number (1-indexed)
            end_page: Ending page number (1-indexed, inclusive)

        Returns:
            Path to split PDF file
        """
        reader = PdfReader(str(pdf_file))
        writer = PdfWriter()

        # Convert to 0-indexed and ensure within bounds
        start_idx = max(0, start_page - 1)
        end_idx = min(len(reader.pages), end_page)

        for page_num in range(start_idx, end_idx):
            writer.add_page(reader.pages[page_num])

        # Save split PDF
        temp_dir = Path(tempfile.gettempdir()) / "pdf-processor"
        temp_dir.mkdir(exist_ok=True)
        output_path = temp_dir / f"split_{tempfile._get_candidate_names().__next__()}.pdf"

        with open(output_path, "wb") as output_file:
            writer.write(output_file)

        return output_path

    @staticmethod
    def extract_text(pdf_file: Path) -> str:
        """
        Extract all text from a PDF file.

        Args:
            pdf_file: Path to PDF file

        Returns:
            Extracted text as string
        """
        text_content = []

        with pdfplumber.open(str(pdf_file)) as pdf:
            for page in pdf.pages:
                text = page.extract_text()
                if text:
                    text_content.append(text)

        return "\n\n".join(text_content)

    @staticmethod
    def get_pdf_info(pdf_file: Path) -> dict:
        """
        Get metadata and information about a PDF file.

        Args:
            pdf_file: Path to PDF file

        Returns:
            Dictionary with PDF information
        """
        reader = PdfReader(str(pdf_file))

        return {
            "num_pages": len(reader.pages),
            "metadata": {
                "title": reader.metadata.title if reader.metadata and reader.metadata.title else None,
                "author": reader.metadata.author if reader.metadata and reader.metadata.author else None,
                "subject": reader.metadata.subject if reader.metadata and reader.metadata.subject else None,
                "creator": reader.metadata.creator if reader.metadata and reader.metadata.creator else None,
            }
        }

    @staticmethod
    def rotate_pages(pdf_file: Path, rotation: int) -> Path:
        """
        Rotate all pages in a PDF.

        Args:
            pdf_file: Path to PDF file
            rotation: Rotation angle (90, 180, 270)

        Returns:
            Path to rotated PDF file
        """
        reader = PdfReader(str(pdf_file))
        writer = PdfWriter()

        for page in reader.pages:
            page.rotate(rotation)
            writer.add_page(page)

        # Save rotated PDF
        temp_dir = Path(tempfile.gettempdir()) / "pdf-processor"
        temp_dir.mkdir(exist_ok=True)
        output_path = temp_dir / f"rotated_{tempfile._get_candidate_names().__next__()}.pdf"

        with open(output_path, "wb") as output_file:
            writer.write(output_file)

        return output_path

    @staticmethod
    def delete_pages(pdf_file: Path, pages_to_delete: List[int]) -> Path:
        """
        Delete specific pages from a PDF.

        Args:
            pdf_file: Path to PDF file
            pages_to_delete: List of page numbers to delete (1-indexed)

        Returns:
            Path to new PDF with pages deleted
        """
        reader = PdfReader(str(pdf_file))
        writer = PdfWriter()

        # Convert to 0-indexed set for faster lookup
        delete_set = set(p - 1 for p in pages_to_delete)

        for page_num, page in enumerate(reader.pages):
            if page_num not in delete_set:
                writer.add_page(page)

        # Save PDF
        temp_dir = Path(tempfile.gettempdir()) / "pdf-processor"
        temp_dir.mkdir(exist_ok=True)
        output_path = temp_dir / f"edited_{tempfile._get_candidate_names().__next__()}.pdf"

        with open(output_path, "wb") as output_file:
            writer.write(output_file)

        return output_path
