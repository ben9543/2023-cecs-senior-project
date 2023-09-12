# Backend Documentation

## Installation

### 1. Create the virtual environment

```bash
# Windows
python -m venv env

# Mac
python3 -m venv env
```

### 2. Activate the virtual environment

```bash
# Windows 
./env/Script/activate
```

### 3. Run app.py 

    python app.py


## Backend Dev Note 

#### Attributes
- Features: list
- Location: String
- Indoor / outdoor: Boolean
- Noise Level: From 1 to 5 (Float) => avg
- Crowdedness Level: From 1 to 5 (Float) => avg
- Strong WiFi: 1 to 3 (Float) => avg
- Temperature: 1 to 3 (Float) => avg
- Rate: Rating
- Power outlets (optional)
- ADA Accessible (optional)
- Easy to find (optional)

#### API
- `/studyspots`: POST
- `/studyspots`: GET
- `/studyspots`: PUT
- `/studyspots`: DELETE
- `/studyspots/search`: POST
- `/studyspots/:id`: GET

