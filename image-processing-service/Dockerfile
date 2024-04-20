# set base image
FROM python:3.12-slim

# Set the working directory
WORKDIR /app

# Copy just the requirements file to leverage Docker cache
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt
RUN apt-get update && apt-get install ffmpeg libsm6 libxext6  -y

# Copy the JSON key file into the Docker image
COPY app/firebase-admin-key.json ./firebase-admin-key.json

# Set the environment variable
ENV GOOGLE_APPLICATION_CREDENTIALS=/app/firebase-admin-key.json

# Copy the current directory contents into the container at /app
COPY . .

# Make port 80 available to the world outside this container
EXPOSE 8080



# Run app.py when the container launches
CMD ["python", "app/app.py"]
