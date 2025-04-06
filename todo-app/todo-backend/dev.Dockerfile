# my-app/backend/dev.Dockerfile (Example for Node/Express backend)
# --- ADAPT THIS SIGNIFICANTLY FOR YOUR BACKEND LANGUAGE/FRAMEWORK ---

    FROM node:18-alpine 

    WORKDIR /usr/src/app # Or /app, /code, etc.
    
    # --- Dependency Installation (Adapt based on language) ---
    # Example Node: Copy package files and install all (including dev) dependencies
    COPY package*.json ./
    RUN npm install
    
    # Example Python: Copy requirements and install
    # COPY requirements*.txt ./
    # RUN pip install --no-cache-dir -r requirements.dev.txt # Assuming a dev requirements file
    
    # Example Java/Maven: Copy pom.xml (might involve multi-stage build for caching)
    # COPY pom.xml .
    # RUN mvn dependency:go-offline # Download dependencies
    
    # --- Environment Setup ---
    # Install common tools if needed (e.g., curl, git)
    # RUN apk add --no-cache curl git # For Alpine
    
    # Install language-specific dev tools (e.g., nodemon for Node)
    # Ensure Nodemon is a dev dependency in package.json for Node example
    # RUN npm install -g nodemon # Alternative: global install
    
    # --- Port Exposure ---
    EXPOSE  3000
    
    # --- Runtime Command ---
    # The actual command will be overridden/set in docker-compose.dev.yml
    # This CMD can be a fallback or omitted if compose always specifies the command.
    # Example Node/Nodemon:
    CMD ["npm", "run", "dev"]
    # Example Python/Flask:
    # CMD ["flask", "run", "--host=0.0.0.0", "--port=<your_backend_port>"]
    # Example Python/Uvicorn (FastAPI):
    # CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "<your_backend_port>", "--reload"]