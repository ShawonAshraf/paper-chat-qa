import os
import argparse
from loguru import logger

from docs import load_pdf_document, create_chunks, load_document_embeddings
from chains import get_retrieval_chain
from llm import init_llama2
from templates import prepare_template

argparser = argparse.ArgumentParser()
argparser.add_argument("-f", "--file", type=str,
                       required=True, help="Path to the pdf file")
argparser.add_argument("-pdir", "--persist_dir", type=str,
                       default=None, help="Directory for db persist")
args = argparser.parse_args()

if __name__ == "__main__":
    if os.path.exists(args.file):
        logger.info(f"File found at: f{args.file}")
    else:
        logger.error("File not found!")

    logger.info("Loading PDF File.")
    pdf_doc = load_pdf_document(args.file)
    logger.success("Done!")

    logger.info("Splitting document into chunks.")
    chunks = create_chunks(pdf_doc)
    logger.success("Done!")

    logger.info("Loading documents embedding")
    logger.info(f"DB persistent directory: {args.persist_dir}")
    vectors = load_document_embeddings(chunks, args.persist_dir)
    logger.success("Done!")

    llm = init_llama2()
    prompt = prepare_template()

    logger.info("Fetching retrieval chain")
    rchain = get_retrieval_chain(vectors, llm, prompt)
    logger.success("Retrieval chain has been created.")

    logger.info("Ready for retrieval.")
    inp = input(">>> ")
    while inp != "/exit":
        response = rchain.invoke(
            {"input": str(inp)}
        )
        print(f">>> {response['answer']}")

        inp = input(">>> ")

    logger.info("Exiting.")
