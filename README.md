# paper-summariser

Summarises and queries research papers using Retrieval Augmented Generation using LLAMA2. 

## retriever module

- Language Model: Llama2
- VectorDB: ChromaDB
- Chains: Langchain
- File format: PDF

### cli usage

```bash
python -f file_path -pdir persist_dir 
# -pdir is optional and only needed if you want to store the 
# vectors on disk
```

The cli provides a shell to run queries via langchain. Type `/exit` to quit the shell.

### REST API

```bash
uvicorn api:app --host 0.0.0.0 --port 8000
```

#### Endpoints

- `/` : root
- `/upload` : upload file as multipart PUT request
- `/query`: send query as json, POST

For detailed API docs, check `http://0.0.0.0:8000/docs`.


## env setup
```bash
cd retriever
conda env create -f environment.yml
```
