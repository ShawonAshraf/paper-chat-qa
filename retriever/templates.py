from langchain_core.prompts import ChatPromptTemplate

"""
Prepares a prompt template with a default system message
system_message: str - for a custom system message
"""


def prepare_template(system_message: str = "") -> ChatPromptTemplate:
    sys_message = "You are an expert at summarising research papers." if system_message == "" else system_message

    prompt = ChatPromptTemplate.from_messages([
        ("system", sys_message),
        ("user", "{input}")
    ]
    )

    return prompt


if __name__ == "__main__":
    prompt = prepare_template()
    print(prompt)
