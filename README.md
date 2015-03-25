# Landline

[![Build Status](https://travis-ci.org/asm-products/landline-web.svg)](https://travis-ci.org/asm-products/landline-web) <a href="https://assembly.com/landline/bounties?utm_campaign=assemblage&utm_source=landline&utm_medium=repo_badge"><img src="https://asm-badger.herokuapp.com/landline/badges/tasks.svg" height="24px" alt="Open Tasks" /></a>

## Getting Started

Developing on landline-web is fairly straightforward with the default development API:

```
cp .env.sample .env
```

You can point Landline to a different instance of the [API](https://github.com/asm-products/landline-web) by changing the value of `LANDLINE_API_URL` in `.env`. By default, it points to the development API.

Then, after running `npm install` (but you've probably already done that, right?), just run `npm run dev` and you should be good to go.

Be sure to compile your changes with `npm run build` (or simply `webpack` if you have [webpack](http://webpack.github.io/) installed globally) before committing and submitting a pull request.

## Contributing

Pull requests are always welcome. Please try to follow the style of the code around
what you're working on. In general, this means:

- Two spaces, not tabs
- ES6 style (`function` should rarely be needed)
- Alphabetize dependencies and method names (except for methods like `init`)

## Hosted, flexible chat

This is a product being built by the Assembly community. You can help push this idea forward by visiting [https://assembly.com/landline](https://assembly.com/landline).

### How Assembly Works

Assembly products are built with contributions from the community. Collaborators share revenue equitably, and Assembly handles hosting, legal, finance, etc.

Visit [https://assembly.com](https://assembly.com) to learn more.
