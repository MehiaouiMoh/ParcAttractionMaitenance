from flask import Flask, jsonify, request
from flask_cors import CORS

import request.request as req
import controller.auth.auth as user
import controller.attraction as attraction
import controller.messages as messages

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():
    return 'Hello, Docker!'

# Attraction
@app.post('/attraction')
def addAttraction():
    print("okok", flush=True)
    # Fonction vérif token
    checkToken = user.check_token(request)
    if (checkToken != True):
        return checkToken

    json = request.get_json()
    retour = attraction.add_attraction(json)
    if (retour):
        return jsonify({"message": "Element ajouté.", "result": retour}), 200
    return jsonify({"message": "Erreur lors de l'ajout.", "result": retour}), 500

## Route pour le visiteur : retourne uniquement les attraction visibles
@app.get('/attraction')
def getAllAttraction():
    result = attraction.get_all_attraction()
    return result, 200
## Route pour les visiteurs : voir les commentaires
@app.get('/messages')
def getAllMessages():
    result = messages.get_all_messages()  # ta fonction Python get_all_messages()
    return jsonify(result), 200

@app.post('/messages')
def post_message():
    data = request.get_json()  # <-- récupère le JSON envoyé depuis Angular
    if not data.get("message"):
        return jsonify({"message": "Le message est obligatoire"}), 400

    result = messages.add_message(data)  # <-- ta fonction Python pour ajouter en BDD
    if result:
        return jsonify({"message": "Message ajouté avec succès"}), 200
    else:
        return jsonify({"message": "Erreur lors de l'ajout du message"}), 500


@app.get('/attraction/<int:index>')
def getAttraction(index):
    result = attraction.get_attraction(index)
    return result, 200

## Route admin : peut tout voir (attractions visible et invisible)
@app.get('/attractionAdmin')
def getAttractionAdmin():
    
    ##Verifier le token de l'admin
    checkToken = user.check_token(request)
    if (checkToken != True):
        return checkToken
    
    result = attraction.get_all_attractions_admin()
    return result, 200

@app.delete('/attraction/<int:index>')
def deleteAttraction(index):

    # Fonction vérif token
    checkToken = user.check_token(request)
    if (checkToken != True):
        return checkToken

    json = request.get_json()
    
    if (attraction.delete_attraction(index)):
        return "Element supprimé.", 200
    return jsonify({"message": "Erreur lors de la suppression."}), 500

@app.post('/login')
def login():
    json = request.get_json()

    if (not 'name' in json or not 'password' in json):
        result = jsonify({'messages': ["Nom ou/et mot de passe incorrect"]})
        return result, 400
    
    cur, conn = req.get_db_connection()
    requete = f"SELECT * FROM users WHERE name = '{json['name']}' AND password = '{json['password']}';"
    cur.execute(requete)
    records = cur.fetchall()
    conn.close()

    result = jsonify({"token": user.encode_auth_token(list(records[0])[0]), "name": json['name']})
    return result, 200