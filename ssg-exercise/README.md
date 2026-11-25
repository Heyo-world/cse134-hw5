## Part 4 Setup & Commands

**Initialize and install Eleventy** (from inside `ssg-exercise/`):
   npm init -y
   npm install @11ty/eleventy

**Build the site**
npx @11ty/eleventy

The output might look like this:
[11ty] Writing ./_site/about.html from ./src/about.njk

[11ty] Writing ./_site/index.html from ./src/index.njk

[11ty] Copied 13 Wrote 2 files in 0.09 seconds (v3.1.8)

**Preview both pages**
npx @11ty/eleventy --serve

The output might look like this:
[11ty] Writing ./_site/about.html from ./src/about.njk

[11ty] Writing ./_site/index.html from ./src/index.njk

[11ty] Copied 13 Wrote 2 files in 0.08 seconds (v3.1.8)

[11ty] Watching…

[11ty] Server at http://localhost:8080/

Open the local URL shown in the terminal and visit both /index.html (Home) and /about.html (About) to verify each page's main content and the shared footer.