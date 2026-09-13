import sys
from pdf2docx import Converter

def convert(pdf_path, docx_path):
    cv = Converter(pdf_path)
    cv.convert(docx_path)
    cv.close()

if __name__ == "__main__":
    pdf_path = sys.argv[1]
    docx_path = sys.argv[2]
    convert(pdf_path, docx_path)
    print("done")