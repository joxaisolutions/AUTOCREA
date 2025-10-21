import type { CodeTemplate } from '../types'

export const flaskApiTemplate: CodeTemplate = {
  id: 'flask-api',
  name: 'Flask REST API',
  description: 'API RESTful con Flask, Blueprint pattern y SQLAlchemy',
  category: 'backend',
  framework: 'Flask',
  language: 'Python',
  icon: '🐍',
  tags: ['flask', 'python', 'api', 'rest', 'sqlalchemy'],
  complexity: 'beginner',
  estimatedTime: '8 min',
  files: [
    {
      path: 'app.py',
      language: 'python',
      content: `from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)

# Configuration
app.config['JSON_SORT_KEYS'] = False
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True

# In-memory database (replace with actual DB)
users = [
    {"id": 1, "name": "Juan Pérez", "email": "juan@example.com"},
    {"id": 2, "name": "María García", "email": "maria@example.com"}
]

@app.route('/')
def index():
    return jsonify({
        "message": "🚀 Flask API funcionando correctamente",
        "version": "1.0.0",
        "createdWith": "AUTOCREA - Powered by JoxAI"
    })

@app.route('/health')
def health():
    return jsonify({
        "status": "healthy",
        "timestamp": datetime.now().isoformat()
    })

@app.route('/api/users', methods=['GET'])
def get_users():
    return jsonify({
        "data": users,
        "count": len(users)
    })

@app.route('/api/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = next((u for u in users if u['id'] == user_id), None)
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify({"data": user})

@app.route('/api/users', methods=['POST'])
def create_user():
    data = request.get_json()
    
    if not data or not data.get('name') or not data.get('email'):
        return jsonify({"error": "Name and email are required"}), 400
    
    new_user = {
        "id": max([u['id'] for u in users]) + 1 if users else 1,
        "name": data['name'],
        "email": data['email'],
        "createdAt": datetime.now().isoformat()
    }
    
    users.append(new_user)
    return jsonify({"data": new_user, "message": "User created successfully"}), 201

@app.route('/api/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    user = next((u for u in users if u['id'] == user_id), None)
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    data = request.get_json()
    user['name'] = data.get('name', user['name'])
    user['email'] = data.get('email', user['email'])
    user['updatedAt'] = datetime.now().isoformat()
    
    return jsonify({"data": user, "message": "User updated successfully"})

@app.route('/api/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    global users
    user = next((u for u in users if u['id'] == user_id), None)
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    users = [u for u in users if u['id'] != user_id]
    return jsonify({"message": "User deleted successfully"})

@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Route not found"}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({"error": "Internal server error"}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)`
    },
    {
      path: 'requirements.txt',
      language: 'text',
      content: `Flask==3.0.3
flask-cors==4.0.0
python-dotenv==1.0.1
gunicorn==22.0.0`
    },
    {
      path: '.env.example',
      language: 'text',
      content: `PORT=5000
FLASK_ENV=development
SECRET_KEY=your_secret_key_here

# Database
DATABASE_URL=

# API Keys
API_KEY=`
    },
    {
      path: '.gitignore',
      language: 'text',
      content: `__pycache__/
*.py[cod]
*$py.class
*.so
.Python
venv/
ENV/
env/
.venv
pip-log.txt
pip-delete-this-directory.txt
.env
.env.local
.DS_Store`
    },
    {
      path: 'README.md',
      language: 'markdown',
      content: `# Flask REST API

API REST con Flask creada con **AUTOCREA** - Powered by **JoxAI**

## 🚀 Características

- 🐍 Flask con Python 3.10+
- 🌐 CORS habilitado
- 📝 Logging automático
- ♻️ Hot reload en desarrollo
- 🏗️ RESTful architecture
- 🔒 Manejo de errores

## 📦 Instalación

\`\`\`bash
python -m venv venv
source venv/bin/activate  # En Windows: venv\\Scripts\\activate
pip install -r requirements.txt
\`\`\`

## 🔧 Configuración

Crea un archivo \`.env\` basado en \`.env.example\`:

\`\`\`bash
cp .env.example .env
\`\`\`

## 🏃‍♂️ Desarrollo

\`\`\`bash
python app.py
\`\`\`

## 🏗️ Producción

\`\`\`bash
gunicorn --bind 0.0.0.0:5000 app:app
\`\`\`

## 📡 Endpoints

- \`GET /\` - Root endpoint
- \`GET /health\` - Health check
- \`GET /api/users\` - Obtener todos los usuarios
- \`GET /api/users/<id>\` - Obtener usuario por ID
- \`POST /api/users\` - Crear usuario
- \`PUT /api/users/<id>\` - Actualizar usuario
- \`DELETE /api/users/<id>\` - Eliminar usuario

## 📝 Ejemplo de uso

\`\`\`bash
# Obtener usuarios
curl http://localhost:5000/api/users

# Crear usuario
curl -X POST http://localhost:5000/api/users \\
  -H "Content-Type: application/json" \\
  -d '{"name": "Juan", "email": "juan@example.com"}'
\`\`\`

---

**Creado con ❤️ usando AUTOCREA**`
    }
  ],
  dependencies: [
    'Flask==3.0.3',
    'flask-cors==4.0.0',
    'python-dotenv==1.0.1',
    'gunicorn==22.0.0'
  ],
  scripts: {
    dev: 'python app.py',
    start: 'gunicorn --bind 0.0.0.0:5000 app:app'
  },
  envVariables: ['PORT', 'FLASK_ENV', 'SECRET_KEY', 'DATABASE_URL'],
  setupInstructions: [
    'Crea un entorno virtual con python -m venv venv',
    'Activa el entorno virtual',
    'Instala las dependencias con pip install -r requirements.txt',
    'Copia .env.example a .env y configura las variables',
    'Inicia el servidor con python app.py',
    'La API estará disponible en http://localhost:5000'
  ]
}
