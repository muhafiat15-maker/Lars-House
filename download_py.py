import urllib.request
url = "https://ak.picdn.net/shutterstock/videos/1027179065/preview/stock-footage-underwater-view-of-green-seagrass-in-the-ocean-swaying-in-the-current.mp4"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req) as response, open('frontend/public/assets/seaweed_bg.mp4', 'wb') as out_file:
        data = response.read()
        out_file.write(data)
        print(f"Success, downloaded {len(data)} bytes")
except Exception as e:
    print(f"Error: {e}")
