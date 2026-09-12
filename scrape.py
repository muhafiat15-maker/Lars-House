import urllib.request, re
req = urllib.request.Request("https://pixabay.com/videos/search/underwater%20seaweed/", headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    links = re.findall(r'https://cdn\.pixabay\.com/video/[^"]+\.mp4', html)
    print(list(set(links)))
except Exception as e:
    print(e)
