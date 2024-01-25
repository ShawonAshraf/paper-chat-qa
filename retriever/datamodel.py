from pydantic import BaseModel


"""
datamodel for fast api to work with query strings passed
as json
"""
class QueryString(BaseModel):
    query: str
