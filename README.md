This is a test web application created using tutorials, AI and self taught skills.

## Project Setup

For this, Use Visual Studio Code!

### 1. Clone the Repository

Clone this repository to your local machine:

```sh
https://github.com/I-k-a-r-o-s/Movie-Explorer.git
```

### 2. Install Dependencies

In the VSCode terminal, run this command to install all required npm packages:

```sh
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory and add your TMDB API key and base URL:

```
REACT_APP_TMDB_API_KEY=your_tmdb_api_key_here
REACT_APP_TMDB_BASE_URL=https://api.themoviedb.org/3
```

> **Note:** You can get a TMDB API key by signing up at [https://www.themoviedb.org/](https://www.themoviedb.org/).

### 4. Start the Development Server

Run the app locally:

```sh
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## API Usage

The TMDB API is used to fetch trending movies,search results, and movie details.

## Features implemented
1.Login interface (No validations as this is a test application)
2.Search bar
3.Grid display with title,rating and release year
4.Light/Dark mode
5.Infinite scroll for search results
6.Saving favorite movies
7.Navbar for easy navigation
8.Movie details with watch trailer(if available),cast
