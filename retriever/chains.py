from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains import create_retrieval_chain


def get_retrieval_chain(vectors, llm, prompt):
    document_chain = create_stuff_documents_chain(llm, prompt)
    retriever = vectors.as_retriever()
    chain = create_retrieval_chain(retriever, document_chain)

    return chain
