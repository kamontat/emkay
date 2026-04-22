# emkay

Share your member card without hassle

![image](https://github.com/user-attachments/assets/93b2930b-fae4-4a5a-b3ea-c885eea4cbc0)

## Prerequisites

- Install Ruby and Nodejs (version matches **.tool-versions**)
- Create **.env** file or set up environment `MK_USERNAME` and `MK_PASSWORD`
  - `source .env` && `export MK_PASSWORD MK_USERNAME`

## Scraper

This component will scrape data from website and save as json (**data.json**).

1. Move directory to **scraper**
2. Run `bundle install` to install dependencies (only first time)
3. Run `npx playwright install chromium chromium-headless-shell` to install playwright (only first time)
4. Run scraper by `ruby main.rb`

```bash
pushd scraper; ruby main.rb; popd
```

## Renderer

This component will create website with scrape information.

1. Move directory to **renderer**
2. Run renderer by `pnpm dev`

```bash
pushd renderer; pnpm dev; popd
```
