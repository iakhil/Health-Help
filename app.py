# # from sanic import Sanic 
# # import aiosqlite
# # from sanic.response import json 

# # app = Sanic("CRUD app")


# # async def init_db():
# #     async with aiosqlite.connect('items.db') as db:
# #         await db.execute('''CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY, content TEXT)''')
# #         await db.commit()

# # items = {}

# # @app.post("/item")
# # async def create_item(request):
# #     async with aiosqlite.connect('items.db') as db:
# #         cursor = await db.execute("INSERT INTO items (content) VALUES (?)", (request.json['content'],))
# #         await db.commit()
    
# #     return json({"status": "item created", "id": cursor.lastrowid()}, 201})


# from sanic import Sanic 
# from sanic.response import json 

# app = Sanic("crud_app")

# data = {}

# @app.post("/create")

# async def create(request):
#     item_id = request.json.get("id")
#     item = request.json.get("item")

#     if item_id in data:
#         return json({"message": "Item already exists."}, status=400)

#     data[item_id] = item 
#     print(data)
#     return json({"message": "Item created."}, status=201)


# @app.get("/read/<item_id>")

# async def read(request, item_id):
#     item = data.get(item_id)

#     if not item:
#         return json({"message": "Item not found."}, status=404)
     
#     return json({"item": item})

    

# @app.put("/update/<item_id>")
# async def update(request, item_id):
#     new_item = request.json.get("item")

#     if item_id not in data:
#         return json({"message": "Item not found."}, status=404)


#     data[item_id] = new_item 
#     return json({"message": "Item updated."})


# @app.delete("/delete/<item_id>")

# async def delete(request, item_id):

#     if item_id not in data:
#         return json({"message": "Item not found."}, status=404)

#     del data[item_id] 
#     return json({"message": "item deleted."})

# if __name__ == "__main__":
#     app.run(host="0.0.0.0", port=8000)


from sanic import Sanic 
from sanic.response import json
import aiosqlite 
from sanic_cors import CORS
from . assistant import assistant_response
app = Sanic(name="crud_app")

CORS(app)
db_path = 'mydatabase.db'

class CrudApp:

    def __init__(self):

        app.add_task(self.setup_db())


    async def hello(self, request):

        return json({"message": "Hello!"})



    async def setup_db(self):

        async with aiosqlite.connect(db_path) as db:
            await db.execute("""
            CREATE TABLE IF NOT EXISTS items (
                id INTEGER PRIMARY KEY,
                name TEXT NOT NULL,
                description TEXT
            );
            """    
            )

            await db.commit()

    async def create(self, request):
        name = request.json.get("name")
        description = request.json.get("description")

        async with aiosqlite.connect(db_path) as db:

            cursor = await db.cursor()
            await cursor.execute("INSERT INTO items (name, description) VALUES (?, ?)", (name, description))
            await db.commit()
            item_id = cursor.lastrowid
            await cursor.close()

        return json({"message": "Item created", "id": item_id})

    
    async def read(self , request, item_id: int):

        async with aiosqlite.connect(db_path) as db:
            cursor = await db.cursor()
            await cursor.execute("SELECT * FROM items where id = ?", (item_id,))
            item = await cursor.fetchone()
            await cursor.close()


        if not item:
            return json({"message": "Item not found."}, status=404)

        return json({"item": {"id": item[0], "name": item[1], "description": item[2]}})

    
    async def update(self, request, item_id: int):

        new_data = request.json

        async with aiosqlite.connect(db_path) as db:
            await db.execute("UPDATE items SET name = ?, description = ? WHERE id = ?", (new_data["name"], new_data["description"], item_id))
            await db.commit()

        return json({"message": "Item updated."})


    async def delete(self, request, item_id: int):
        async with aiosqlite.connect(db_path) as db:

            await db.execute("DELETE FROM items where id = ?", (item_id,))
            await db.commit()


        return json({"message": "Item deleted."})

    
    async def get_assistant_response():

        async with aiosqlite.connect(db_path) as db:
            cursor = await db.cursor()
            query = await cursor.fetchone()

        assist_response = assistant_response(query)

        return json({"assistant_response": assist_response     
        
        })


crud_app = CrudApp()

app.add_route(crud_app.create, '/create', methods=['POST'])
app.add_route(crud_app.read, '/read/<item_id:int>', methods=['GET'])
app.add_route(crud_app.update, '/update/<item_id:int>', methods=['PUT'])
app.add_route(crud_app.delete, '/delete/<item_id:int>', methods=['DELETE'])
app.add_route(crud_app.hello, '/', methods=['GET'])
app.add_route(crud_app.assist, '/assist', methods=['GET', 'POST'])

db_settings = {

    'DB_HOST': 'localhost', 
    'DB_NAME': 'appdb',
    'DB_USER': 'appuser'
}

app.config.update(db_settings)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
