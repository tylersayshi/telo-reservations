# Telo Truck Reservation UI

The [Telo truck](https://telotrucks.com/) pre-orders exist on google sheets. I like being able to check things like "my spot in line" directly from my phone. I don't need to spin up a fully functional spreadsheet to do this.

So, I made a quick UI to hotlink to pre-order numbers and show the order of orders in a dead simple UI.

## What I used

- [Waku](https://waku.gg/)
- [Netlify](https://www.netlify.com/)
- [Google Sheets API](https://developers.google.com/sheets/api/guides/concepts) - note this is only fetched on build because I use a static build with RSCs
- [shadcn/ui](https://ui.shadcn.com/)
- [tailwind](https://tailwindcss.com/) - is this one just a given at this point?

## Why is this cool?

Spreadsheets are absolutely everywhere and now we can spin up a custom UI for any spreadsheet we want! And for free too!

This project serves as a great answer to the question: "How can I make a simple and interactive view for my mess of spreadsheets?"
