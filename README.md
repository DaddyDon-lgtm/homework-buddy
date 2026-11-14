# Homework Buddy

A bilingual (Traditional Chinese and English) homework practice app for a tablet.

Live app: https://daddydon-lgtm.github.io/homework-buddy/

## How this repository is laid out

- The files at the top level are the finished app. GitHub Pages serves them from the `main` branch.
- `source/` holds the code the app is built from.

## Changing the app

Requires Node.js 20 or newer.

```
cd source
npm install
npm run dev      # try it locally
npm run build    # creates source/dist
```

Then copy the contents of `source/dist` over the top-level files and commit.

## Privacy

No AI key or practice data is stored in this repository. Both stay on the device.
