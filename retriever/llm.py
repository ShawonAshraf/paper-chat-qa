import os
from langchain_community.llms import Ollama

"""
Inits llama2 model from Ollama and returns the llm object
"""


def init_llama2():  
    # a workaround hack to get things running in containers
    base_url = os.environ.get("OLLAMA_BASE_URL", "http://localhost:11434")
    
    llm = Ollama(model="llama2", temperature=0.0)
    llm.base_url = base_url
    return llm

if __name__ == "__main__":
    llm = init_llama2()
    print(llm.invoke("Et tu LLAMA!"))
