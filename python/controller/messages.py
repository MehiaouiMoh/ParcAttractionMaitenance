import request.request as req

#Ajouter un message (libre pour visiteur) :
def add_message(data):
    if not data.get("message"):
        return False

    requete = """
        INSERT INTO messages (nom, prenom, message, note_attraction)
        VALUES (?, ?, ?, ?)
    """
    return req.insert_in_db(
        requete,
        (data.get("nom"), data.get("prenom"), data["message"], data.get("note_attraction"))
    )

#Récupérer tous les messages :
def get_all_messages():
    requete = "SELECT * FROM messages ORDER BY message_id DESC"
    return req.select_from_db(requete)
