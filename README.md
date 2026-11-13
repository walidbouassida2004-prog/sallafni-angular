# Sallafni (Angular)

Angular 22 · standalone components · signals · hash routing (same `#/borrower` style URLs as the original).

    npm install
    npm start        # http://localhost:4200
    npm run build    # output in dist/sallafni

Structure

    src/app/core      models, demo data, Store (signals-based state, replaces the old global variables)
    src/app/shared    item-card, request-dialog, rate-dialog
    src/app/pages     home, login, profile, choose, lender, borrower
    src/styles.css    global theme (navy, Cormorant Garamond headings)

Item photos are optional: add files to `public/images/` (drill.png, tent.png, bike.png);
cards fall back to the icon when a photo is missing.
