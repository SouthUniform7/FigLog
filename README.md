# Fig Log - A Site for Collecting LEGO Minifigures


## My first full stack web app developed in JavaScript running on NodeJS. Utilizes the front end framework ReactJS, and utilizes back end technologies of ExpressJS, SQLite, Cheerio for webscraping, Axios for making http requests, and Knex for building SQLite Queries.

## About Fig Log

LEGO, a product of interlocking construction blocks, has a large following of investors, collectors, and hobbyists. In late 2021 I realized that my personal collection, amassed mostly in my childhood, had seen a tremendous growth in resale value, specifically the "Minifigures" of characters in my LEGO building kits. Individual Minifigures, consisting of usually just 4 or 5 parts (legs, a torso with arms, a head, a headpiece/hat/hair, and maybe some kind of specific item such as a lightsaber) had seen transaction history in the hundreds or occasionally thousands of dollars. In an attempt to catalog my own collection, I decided to build my first full stack website. The site can take four items, the name of any LEGO minifigure, the product number of the set it came in, and two optional fields for providing any words to exclude from the search and a custom image. With that information, the site's backend performs an eBay search for completed sales of that figure from only that specific set, and uses a web scraping algorithm to find the highest price ever sold for that figure. The backend then makes an insert into the SQLite database of the link to the highest listing, the price, the given name and set number, and even finds its own image link if not already provided with one. The ReactJS front end then makes calls to the database to retrieve the "Fig Log" of the minifigures and presents it to the user with buttons to sort by highest price, by set number, or just by the order the figs were added to the site.

## Contact Information

Feel free to contact me if you have any questions about the project or want to help out.

FigLogDev@gmail.com