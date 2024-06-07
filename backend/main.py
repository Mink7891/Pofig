from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def get_home():
    return "Hello world!"