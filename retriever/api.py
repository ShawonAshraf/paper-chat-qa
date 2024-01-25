from typing import Annotated
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from docs import create_chunks, load_document_embeddings
from chains import get_retrieval_chain
from llm import init_llama2
from templates import prepare_template

from langchain_community.document_loaders import PyPDFLoader
from tempfile import NamedTemporaryFile

from datamodel import QueryString


# app properties
app = FastAPI()
# properties for retrieval
app.vector_store = None  # type: ignore
app.chain = None  # type: ignore
app.llm = init_llama2()  # type: ignore
app.prompt = prepare_template()  # type: ignore

origins = [
    "http://localhost",
    "http://localhost:4200",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)



# routes
@app.get("/")
async def root():
    return {
        "message": "retriever api",
        "status": "OK"
    }


@app.post("/files/")
async def create_file(file: Annotated[bytes, File()]):
    return {"file_size": len(file)}


@app.post("/upload/")
# https://stackoverflow.com/questions/77033636/getting-a-flask-filestorage-object-into-langchain-textloader-load-function
async def upload_and_init(file: UploadFile):
    print(file.filename)
    contents = await file.read()

    # save a temporary file
    with NamedTemporaryFile(delete=False) as tmp:
        tmp.write(contents)
        loader = PyPDFLoader(file_path=tmp.name)
        # read contents into a langchain document
        doc = loader.load()

        # split document into chunks
        chunks = create_chunks(doc)
        # load document embeddings
        vectors = load_document_embeddings(chunks)

        # kinda sketchy solution
        # aber hätte hätte fahrradkette
        app.vector_store = vectors  # type: ignore

        # init retrieval chain
        app.chain = get_retrieval_chain(
            vectors, app.llm, app.prompt)  # type: ignore

    return {"name": file.filename}


@app.post("/query/")
async def query(query: QueryString):
    query_obj = query.query
    input_str = {"input": query_obj}  # type: ignore
    results = app.chain.invoke(input_str)  # type: ignore
    return {"results": results["answer"]}
