from langchain_community.llms import Ollama

"""
Inits llama2 model from Ollama and returns the llm object
"""

def init_llama2():
    llm = Ollama(model="llama2", temperature=0.0)
    return llm

if __name__ == "__main__":
    llm = init_llama2()
    print(llm.invoke("Et tu LLAMA!"))
