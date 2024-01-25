from langchain_core.prompts import ChatPromptTemplate

"""
Prepares a prompt template with a default system message
"""


def prepare_template() -> ChatPromptTemplate:
    prompt = ChatPromptTemplate.from_template("""Answer the following question based only on the provided context:

    <context>
    {context}
    </context>

    Question: {input}""")

    return prompt


if __name__ == "__main__":
    prompt = prepare_template()
    print(prompt)
