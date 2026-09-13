import sys
import traceback

def convert(pdf_path, docx_path):
    from pdf2docx import Converter
    cv = Converter(pdf_path)
    cv.convert(docx_path)
    cv.close()

if __name__ == "__main__":
    try:
        pdf_path = sys.argv[1]
        docx_path = sys.argv[2]
        convert(pdf_path, docx_path)
        print("done")
    except Exception as e:
        print("ERROR:", str(e), file=sys.stderr)
        traceback.print_exc()
        sys.exit(1)