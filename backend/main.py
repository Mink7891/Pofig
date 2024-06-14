from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class SCVAdd(BaseModel):
   
   appointment: str
   specialization: str 

# class SCV(SCVAdd):
#    id: int
#    model_config = ConfigDict(from_attributes=True)


@app.get("/CV")
def get_CV():
    cv = SCVAdd(appointment="Разработчик", specialization="Backend-программист")
    return {"data": cv}