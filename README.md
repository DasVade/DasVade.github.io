# Local Preview & Publish

```bash
python3 -m http.server 8000
curl -I http://localhost:8000/
curl -I http://localhost:8000/favicon.ico
curl -I http://localhost:8000/assets/avatar.jpg
curl -I http://localhost:8000/assets/cv.pdf
git add .
git commit -m "Refactor homepage into modular static structure"
git push
```
