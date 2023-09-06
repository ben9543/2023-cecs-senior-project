# Mock-up data

class FakeStudySpot():
    def __init__(self, features, location, noise_level:float, crowdedness_level:float, wifi_level:float, temperature_level:float, rate:float, outlet_exists:bool=None, ada_exists:bool=None, easy_to_find:bool=None):
        self.features = features 
        self.location = location
        self.noise_level = noise_level 
        self.crowdedness_level = crowdedness_level 
        self.wifi_level = wifi_level
        self.temperature_level = temperature_level 
        self.rate = rate
        self.outlet_exists =  outlet_exists
        self.ada_exists = ada_exists 
        self.easy_to_find = easy_to_find
        

studyspots = [
    
]

class StudySpots():

    def __init__(self):
        pass

    def get_studyspots(self):
        return studyspots


