# Install backend

brew install ruby
gem install bundle
bundle install
./bin/bundle exec rails db:create
./bin/bundle exec rails db:migrate
./bin/bundle exec rails db:seed
./bin/bundle exec rails test
./bin/bundle exec rails s

or

./dev.sh

#
First run backend on port 3000

./dev.sh

then run here in port 3001
First install

brew install node
brew install nvm
nvm install
npm install pnpm
pnpm install
pnpm run dev

or

./dev.sh




# Vite + React + Tailwind CSS starter

Inspired by [posva's](https://github.com/posva) [vite-tailwind-starter](https://github.com/posva/vite-tailwind-starter)

Note if you have access to [Tailwind UI](https://tailwindui.com), you can follow the following steps to add it:

1. Install `@tailwindcss/ui`:

```sh
yarn add @tailwindcss/ui
```

2. Add the plugin in `tailwind.config.js` without changing anything else:

```js
// tailwind.config.js
module.exports = {
  // ...
  // rest of the config
  plugins: [require('@tailwindcss/ui')],
}
```

## Installation

```sh
yarn
```

## Development

```sh
yarn dev
```

## Build

```sh
yarn build
```