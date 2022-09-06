import React from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Header from 'components/Header'
import Footer from 'components/Footer'
import MovieMain from 'pages/MovieMain/MovieMain'
import MovieLists from 'pages/MovieLists/MovieLists'
import MovieDetail from 'pages/MovieDetail/MovieDetail'
import SearchResults from 'pages/SearchResults/SearchResults'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MovieMain />} />
        <Route path="/now_playing" element={<MovieLists />} />
        <Route path="/upcoming" element={<MovieLists />} />
        <Route path="/top_rated" element={<MovieLists />} />
        <Route path="/movie_detail/:id" element={<MovieDetail />} />
        <Route path="/search_results" element={<SearchResults />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
