import request.request as req

def add_attraction(data):
    if not data.get("nom") or not data.get("description"):
        return False

    if data.get("difficulte") is None:
        return False

    visible = data.get("visible", True)

    if data.get("attraction_id"):
        requete = """
            UPDATE attraction
            SET nom = ?, description = ?, difficulte = ?, visible = ?
            WHERE attraction_id = ?
        """
        req.insert_in_db(
            requete,
            (data["nom"], data["description"], data["difficulte"], visible, data["attraction_id"])
        )
        return data["attraction_id"]
    else:
        requete = """
            INSERT INTO attraction (nom, description, difficulte, visible)
            VALUES (?, ?, ?, ?)
        """
        return req.insert_in_db(
            requete,
            (data["nom"], data["description"], data["difficulte"], visible)
        )


def get_all_attraction():
    json = req.select_from_db("SELECT * FROM attraction WHERE visible = 1")
    
    return json

def get_all_attractions_admin():
    json = req.select_from_db("SELECT * FROM attraction")

    return json

def get_attraction(id):
    if (not id):
        return False

    json = req.select_from_db("SELECT * FROM attraction WHERE attraction_id = ? AND visible = 1", (id,))

    if len(json) > 0:
        return json[0]
    else:
        return []

def delete_attraction(id):
    if (not id):
        return False

    req.delete_from_db("DELETE FROM attraction WHERE attraction_id = ?", (id,))

    return True